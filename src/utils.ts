import * as core from '@actions/core'
import * as cache from '@actions/cache'
export const IS_WINDOWS = process.platform === 'win32'
export const IS_LINUX = process.platform === 'linux'
export const IS_MAC = process.platform === 'darwin'
export const WINDOWS_ARCHS = ['x86', 'x64']
export const WINDOWS_PLATFORMS = ['win32', 'win64']

export function isGhes(): boolean {
  const ghUrl = new URL(
    process.env['GITHUB_SERVER_URL'] || 'https://github.com'
  )
  return ghUrl.hostname.toUpperCase() !== 'GITHUB.COM'
}

export function isCacheFeatureAvailable(): boolean {
  if (cache.isFeatureAvailable()) {
    return true
  }

  if (isGhes()) {
    core.warning(
      'Caching is only supported on GHES version >= 3.5. If you are on a version >= 3.5, please check with your GHES admin if the Actions cache service is enabled or not.'
    )
    return false
  }

  core.warning(
    'The runner was not able to contact the cache service. Caching will be skipped'
  )
  return false
}

export async function restoreCasheByPrimaryKey(
  paths: string[],
  key: string
): Promise<string | undefined> {
  let matchedKey
  try {
    core.info(`Trying to restore: ${paths.slice().toString()}`)
    matchedKey = await cache.restoreCache(paths.slice(), key, [key])
  } catch (err) {
    const message = (err as Error).message
    core.info(`[warning]${message}`)
    core.setOutput('cache-hit', false)
    return
  }
  return matchedKey
}
