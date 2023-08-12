import {wait} from '../src/wait'
import * as process from 'process'
import * as cp from 'child_process'
import * as path from 'path'
import {expect, test} from '@jest/globals'
import {run} from '../src/main'


test('test install all components', async () => {
  await run()
}, 300000)
