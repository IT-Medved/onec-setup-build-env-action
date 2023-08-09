import * as exec from '@actions/exec'
import * as core from '@actions/core'
import {wait} from './wait'

async function run(): Promise<void> {
  const platformType = process.platform
  try {
    let extension = ''
    let platform = ''

    switch (platformType) {
      case 'win32': {
        extension = 'zip'
        platform = 'Windows'
        break
      }
      case 'darwin': {
        extension = 'tar.gz'
        platform = 'Darwin'
        break
      }
      case 'linux': {
        extension = 'tar.gz'
        platform = 'Linux'
        break
      }
      default: {
        throw new Error('Not supported on this OS type')
      }
    }

    await exec.exec(
      `curl -L https://github.com/v8platform/oneget/releases/download/v0.6.0/oneget_${platform}_x86_64.${extension} --output oneget.${extension}`
    )
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run()
