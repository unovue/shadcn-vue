import type { Config } from '../../src/utils/get-config'
import { describe, expect, it } from 'vitest'
import { getWorkspacePathOption, groupWorkspaceFiles } from '../../src/utils/add-components'

function makeConfig(cwd: string, hooks?: string) {
  return {
    aliases: { components: '@/components', ui: '@/components/ui', lib: '@/lib', composables: '@/composables', utils: '@/lib/utils', hooks },
    resolvedPaths: { cwd },
  } as unknown as Config
}

describe('groupWorkspaceFiles', () => {
  const app = makeConfig('/mono/apps/web')
  const ui = makeConfig('/mono/packages/ui')
  const workspace = { components: app, ui, lib: ui, composables: app }

  const group = (files: any[], config = app) =>
    groupWorkspaceFiles(files, config, workspace).map(g => ({
      cwd: g.config.resolvedPaths.cwd,
      files: g.files.map(f => f.path),
    }))

  it('keeps the type grouping for files without a placeholder', () => {
    expect(group([
      { path: 'a.vue', type: 'registry:ui' },
      { path: 'b.ts', type: 'registry:lib' },
      { path: 'c.vue', type: 'registry:component' },
      { path: 'd.ts', type: 'registry:file', target: '@scope/d.ts' },
    ])).toEqual([
      { cwd: '/mono/packages/ui', files: ['a.vue'] },
      { cwd: '/mono/apps/web', files: ['b.ts'] },
      { cwd: '/mono/apps/web', files: ['c.vue'] },
      { cwd: '/mono/apps/web', files: ['d.ts'] },
    ])
  })

  it('picks the workspace config of the placeholder alias', () => {
    expect(group([
      { path: 'a.ts', type: 'registry:ui', target: '@lib/a.ts' },
      { path: 'b.vue', type: 'registry:component', target: '@components/acme/b.vue' },
    ])).toEqual([
      { cwd: '/mono/packages/ui', files: ['a.ts'] },
      { cwd: '/mono/apps/web', files: ['b.vue'] },
    ])
  })

  it('keeps @ui/ files in the registry:ui group', () => {
    expect(group([
      { path: 'registry/ui/button/Button.vue', type: 'registry:ui' },
      { path: 'registry/ui/button-group/index.ts', type: 'registry:ui', target: '@ui/button-group/index.ts' },
    ])).toEqual([
      { cwd: '/mono/packages/ui', files: ['registry/ui/button/Button.vue', 'registry/ui/button-group/index.ts'] },
    ])
  })

  it('sends @hooks/ to composables unless aliases.hooks is set', () => {
    const files = [{ path: 'use-x.ts', type: 'registry:hook', target: '@hooks/use-x.ts' }]
    expect(group(files)).toEqual([{ cwd: '/mono/apps/web', files: ['use-x.ts'] }])

    const withHooks = makeConfig('/mono/apps/web', '@workspace/ui/hooks')
    const result = groupWorkspaceFiles(files as any, withHooks, { ...workspace, hooks: ui })
    expect(result.map(g => g.config.resolvedPaths.cwd)).toEqual(['/mono/packages/ui'])
  })
})

describe('getWorkspacePathOption', () => {
  it('gives a file --path to the first group only', () => {
    expect([0, 1].map(i => getWorkspacePathOption('/tmp/Selected.vue', i))).toEqual(['/tmp/Selected.vue', undefined])
  })

  it('gives a directory --path to every group', () => {
    expect([0, 1].map(i => getWorkspacePathOption('src/custom', i))).toEqual(['src/custom', 'src/custom'])
    expect(getWorkspacePathOption(undefined, 1)).toBeUndefined()
  })
})
