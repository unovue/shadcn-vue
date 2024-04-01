import { execSync } from 'node:child_process'
import { consola } from 'consola'
import { versionBump } from 'bumpp'
import { type SemverBumpType, generateMarkDown, getCurrentGitBranch, loadChangelogConfig } from 'changelogen'
import { inc } from 'semver'
import { $fetch } from 'ofetch'
import { determineBumpType, getContributors, getLatestCommits, isGitClean, loadWorkspace, updateChangelogFile } from './utils'
import 'dotenv/config'

const remoteName = 'origin'

// Taken from Nuxt Repo (https://github.com/nuxt/nuxt/tree/main/scripts)
async function main() {
  const isClean = isGitClean()

  if (!isClean) {
    consola.error('Git Repository is not clean, there are changes that are not commited yet.')
    process.exit(1)
  }

  const workspace = await loadWorkspace(process.cwd())
  const currentVersion = workspace.find('www').data.version
  const bumpType: SemverBumpType = await determineBumpType() || 'patch'
  const inferredNewVersion = inc(currentVersion, bumpType)

  const isInferredOk = await consola.prompt(`Staring to release '${bumpType}' version from v${currentVersion} -> v${inferredNewVersion}, is this OK?`, {
    type: 'confirm',
  })

  // exit process when no valid input is recieved
  if (typeof isInferredOk !== 'boolean')
    process.exit()

  let newVersion: string | null = null

  if (isInferredOk) {
    newVersion = inferredNewVersion
  }

  else {
    consola.info('Please select next version manually.')

    const result = await versionBump({
      currentVersion,
      files: [],
    })

    newVersion = result.newVersion
  }

  consola.info(`Releasing version: v${newVersion}`)
  const config = await loadChangelogConfig(process.cwd(), {})
  const repo = config.repo.repo!
  const releaseBranch = await getCurrentGitBranch()

  consola.info(`Fetching latest commits ...`)

  const allCommits = await getLatestCommits()
  const filteredCommits = allCommits.filter((commit) => {
    const isChore = commit.type === 'chore'
    const isDependencyScope = commit.scope === 'deps'
    const isBreaking = commit.isBreaking
    const isTypeInConfig = config.types[commit.type]
    return isTypeInConfig && (!isChore || !isDependencyScope || isBreaking)
  })

  consola.info(`Generating changelog ...`)

  const changelog = await generateMarkDown(filteredCommits, config)

  // Create and push a branch with bumped versions if it has not already been created
  const branchExists = execSync(`git ls-remote --heads ${remoteName} v${newVersion}`).toString().trim().length > 0
  if (!branchExists) {
    consola.info(`Pushing a new branch named v${newVersion} to ${remoteName}`)
    execSync(`git checkout -b v${newVersion}`, { stdio: 'ignore' })

    for (const pkg of workspace.packages.filter(p => !p.data.private))
      workspace.setVersion(pkg.data.name, newVersion!)

    await workspace.save()

    execSync(`git commit -am v${newVersion}`, { stdio: 'ignore' })

    consola.info(`Updating changelog.md file ...`)

    updateChangelogFile(`v${currentVersion}`, `v${newVersion}`)
    execSync(`git commit --amend --no-edit`, { stdio: 'ignore' })
    execSync(`git push -u ${remoteName} v${newVersion}`, { stdio: 'ignore' })
  }

  // Get the current PR for this release, if it exists
  consola.info(`Fetching the created PR ...`)

  const [currentPR] = await $fetch<any[]>(`https://api.github.com/repos/${repo}/pulls?head=v${newVersion}`)
  const contributors = await getContributors(repo, process.env.githubToken!)

  const releaseNotes = [
    currentPR?.body,
    changelog
      .replace(/### ❤️ Contributors[\s\S]*$/, ''),
    '### ❤️ Contributors',
    contributors.map(c => `- ${c.name} (@${c.username})`).join('\n'),
  ].join('\n')

  // Create a PR with release notes if none exists
  if (!currentPR) {
    consola.info(`Creating v${newVersion} PR with release notes`)

    await $fetch(`https://api.github.com/repos/${repo}/pulls`, {
      method: 'POST',
      headers: {
        Authorization: `token ${process.env.githubToken}`,
      },
      body: {
        title: `v${newVersion}`,
        head: `v${newVersion}`,
        base: releaseBranch,
        body: releaseNotes,
        draft: true,
      },
    })
  }
  else {
    consola.info(`Updating v${newVersion} PR with release notes`)

    await $fetch(`https://api.github.com/repos/${repo}/pulls/${currentPR.number}`, {
      method: 'PATCH',
      headers: {
        Authorization: `token ${process.env.githubToken}`,
      },
      body: {
        body: releaseNotes,
      },
    })
  }

  consola.success(`Done, check https://github.com/${repo}/pulls`)
}

main().catch((err) => {
  consola.error(err)
  process.exit(1)
})
