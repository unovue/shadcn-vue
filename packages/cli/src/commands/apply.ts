import type { registryConfigSchema } from '@/src/registry/schema'
import { Command } from 'commander'
import path from 'pathe'
import prompts from 'prompts'
import { z } from 'zod'
import { runInit } from '@/src/commands/init'
import { preFlightApply } from '@/src/preflights/preflight-apply'
import { decodePreset, isPresetCode } from '@/src/preset/preset'
import {
  DEFAULT_PRESETS,
  resolveInitUrl,
  resolveRegistryBaseConfig,
} from '@/src/preset/presets'
import { BASES, SHADCN_VUE_URL } from '@/src/registry/constants'
import { clearRegistryContext } from '@/src/registry/context'
import { isUrl } from '@/src/registry/utils'
import { loadEnvFiles } from '@/src/utils/env-loader'
import * as ERRORS from '@/src/utils/errors'
import { withFileCopyBackup } from '@/src/utils/file-helper'
import { getProjectComponents } from '@/src/utils/get-project-info'
import { handleError } from '@/src/utils/handle-error'
import { highlighter } from '@/src/utils/highlighter'
import { logger } from '@/src/utils/logger'

export const applyOptionsSchema = z.object({
  cwd: z.string(),
  positionalPreset: z.string().optional(),
  preset: z.string().optional(),
  yes: z.boolean(),
  silent: z.boolean(),
})

const PRESET_NAMES = Object.keys(DEFAULT_PRESETS)

export const apply = new Command()
  .name('apply')
  .description('apply a preset to an existing project')
  .argument('[preset]', 'the preset to apply')
  .option('--preset <preset>', 'preset configuration to apply')
  .option('-y, --yes', 'skip confirmation prompt.', false)
  .option(
    '-c, --cwd <cwd>',
    'the working directory. defaults to the current directory.',
    process.cwd(),
  )
  .option('-s, --silent', 'mute output.', false)
  .action(async (positionalPreset, opts) => {
    try {
      const options = applyOptionsSchema.parse({
        ...opts,
        cwd: path.resolve(opts.cwd),
        positionalPreset,
      })

      const presetValue = resolveApplyPreset(options)

      const preflight = await preFlightApply(options)

      if (preflight.errors[ERRORS.MISSING_DIR_OR_EMPTY_PROJECT]) {
        logger.break()
        logger.error(
          `The ${highlighter.info(
            'apply',
          )} command only works in an existing project.`,
        )
        logger.error(`Run ${highlighter.info(getInitCommand(presetValue))} first.`)
        logger.break()
        process.exit(1)
      }

      if (preflight.errors[ERRORS.MISSING_CONFIG]) {
        logger.break()
        logger.error(
          `No ${highlighter.info('components.json')} found at ${highlighter.info(
            options.cwd,
          )}.`,
        )
        logger.error(`Run ${highlighter.info(getInitCommand(presetValue))} first.`)
        logger.break()
        process.exit(1)
      }

      const existingConfig = preflight.config
      if (!existingConfig) {
        process.exit(1)
      }

      if (!presetValue) {
        logger.break()
        logger.error(
          `Please provide a preset to apply.\nAvailable presets: ${PRESET_NAMES.join(
            ', ',
          )}\nYou can also pass an encoded preset code or a preset URL.`,
        )
        logger.break()
        process.exit(1)
      }

      // Reject obviously invalid preset strings early.
      if (
        !isUrl(presetValue)
        && !isPresetCode(presetValue)
        && !(presetValue in DEFAULT_PRESETS)
      ) {
        logger.break()
        logger.error(
          `Invalid preset: ${highlighter.info(
            presetValue,
          )}.\nAvailable presets: ${PRESET_NAMES.join(', ')}`,
        )
        logger.break()
        process.exit(1)
      }

      const currentBase = getBase(existingConfig.style)
      const currentRtl = existingConfig.rtl ?? false

      const initUrl = resolveApplyInitUrl(presetValue, {
        base: currentBase,
        rtl: currentRtl,
      })
      if (!initUrl) {
        logger.break()
        logger.error(
          `Invalid preset: ${highlighter.info(
            presetValue,
          )}.\nAvailable presets: ${PRESET_NAMES.join(', ')}`,
        )
        logger.break()
        process.exit(1)
      }

      const reinstallComponents = await getProjectComponents(options.cwd)

      if (!options.yes) {
        logger.break()
        logger.warn(
          highlighter.warn(
            `Applying a new preset will overwrite existing UI components, fonts, and CSS variables.`,
          ),
        )
        logger.warn(
          `Commit or stash your changes before continuing so you can easily go back.`,
        )
        logger.break()
        logger.log('  The following components will be re-installed:')
        if (reinstallComponents.length) {
          for (let i = 0; i < reinstallComponents.length; i += 8) {
            logger.log(`  - ${reinstallComponents.slice(i, i + 8).join(', ')}`)
          }
        }
        else {
          logger.log('  - No installed UI components were detected.')
        }
        logger.break()

        const { proceed } = await prompts({
          type: 'confirm',
          name: 'proceed',
          message: 'Would you like to continue?',
          initial: false,
        })

        if (!proceed) {
          logger.break()
          process.exit(1)
        }
      }

      await loadEnvFiles(options.cwd)

      // Wrap runInit in a backup/restore primitive. runInit funnels errors
      // through addComponents → handleError → process.exit, which bypasses
      // any try/catch here, so we rely on withFileCopyBackup's exit listener
      // to restore components.json on failure.
      await withFileCopyBackup(
        path.resolve(options.cwd, 'components.json'),
        async () => {
          const {
            registryBaseConfig,
            installStyleIndex,
            url: cleanInitUrl,
          } = await resolveRegistryBaseConfig(initUrl, options.cwd, {
            registries: existingConfig.registries as
            | z.infer<typeof registryConfigSchema>
            | undefined,
          })

          await runInit({
            cwd: options.cwd,
            preset: presetValue,
            base: currentBase,
            registryBaseConfig,
            installStyleIndex,
            components: [cleanInitUrl, ...reinstallComponents],
            yes: true,
            force: false,
            defaults: false,
            silent: options.silent,
            isNewProject: false,
            cssVariables: existingConfig.tailwind?.cssVariables ?? true,
            baseStyle: installStyleIndex !== false,
            rtl: currentRtl,
            reinstall: true,
            skipPreflight: true,
          })
        },
        {
          suffix: '.apply.bak',
          onBackupFailure: () => {
            logger.error(
              `Could not back up ${highlighter.info(
                'components.json',
              )}. Aborting.`,
            )
          },
        },
      )

      logger.break()
      logger.log(`${highlighter.success('Success!')} Preset applied.`)
      logger.break()
    }
    catch (error) {
      logger.break()
      handleError(error)
    }
    finally {
      clearRegistryContext()
    }
  })

export function resolveApplyPreset(options: z.infer<typeof applyOptionsSchema>) {
  const positionalPreset = options.positionalPreset?.trim()
  const flagPreset = options.preset?.trim()

  if (positionalPreset && flagPreset && positionalPreset !== flagPreset) {
    logger.error(
      `Received two different preset values. Use either the positional preset or ${highlighter.info(
        '--preset',
      )}, or pass the same value to both.`,
    )
    logger.break()
    process.exit(1)
  }

  return flagPreset ?? positionalPreset
}

function quoteShellArg(value: string) {
  return /[^\w./:-]/.test(value) ? JSON.stringify(value) : value
}

export function getInitCommand(preset?: string) {
  if (!preset) {
    return 'shadcn-vue init'
  }

  return `shadcn-vue init --preset ${quoteShellArg(preset)}`
}

/**
 * Returns the component-library base for a composed style identifier
 * (e.g. `reka-vega` → `reka`). Falls back to the first registered base
 * (`reka`) when the style is empty or unrecognised.
 *
 * Mirrors shadcn-ui's `getBase` helper but adapted to shadcn-vue's
 * `${base}-${visualStyle}` style id convention.
 */
export function getBase(style: string | undefined): string {
  const fallback = BASES[0]?.name ?? 'reka'
  if (!style) {
    return fallback
  }

  const [maybeBase] = style.split('-')
  if (maybeBase && BASES.find(b => b.name === maybeBase)) {
    return maybeBase
  }

  return fallback
}

/**
 * Resolves a preset input (named, encoded, or URL) into the final `/init`
 * registry URL that `resolveRegistryBaseConfig` will fetch. The project's
 * current `base` and `rtl` are forced onto the resulting URL so applying a
 * preset never silently switches the user's component library or RTL setting.
 *
 * This is the shadcn-vue equivalent of shadcn-ui's `resolveApplyInitUrl`.
 */
export function resolveApplyInitUrl(
  presetArg: string,
  options: { base: string, rtl: boolean, template?: string },
): string | null {
  if (isUrl(presetArg)) {
    const url = new URL(presetArg)

    // Record an init run for first-party shadcn-vue /init URLs only.
    if (
      url.pathname === '/init'
      && presetArg.startsWith(SHADCN_VUE_URL)
    ) {
      url.searchParams.set('track', '1')
    }

    url.searchParams.set('base', options.base)
    url.searchParams.set('rtl', String(options.rtl))

    return url.toString()
  }

  if (isPresetCode(presetArg)) {
    const decoded = decodePreset(presetArg)
    if (!decoded) {
      logger.error(`Invalid preset code: ${highlighter.info(presetArg)}`)
      logger.break()
      process.exit(1)
    }
    return resolveInitUrl(
      { ...decoded, base: options.base, rtl: options.rtl },
      { template: options.template, preset: presetArg },
    )
  }

  const preset = DEFAULT_PRESETS[presetArg as keyof typeof DEFAULT_PRESETS]
  if (!preset) {
    return null
  }

  return resolveInitUrl(
    { ...preset, base: options.base, rtl: options.rtl },
    { template: options.template },
  )
}
