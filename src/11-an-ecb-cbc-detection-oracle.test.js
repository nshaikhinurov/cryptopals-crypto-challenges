/* eslint-disable max-lines-per-function */
// https://cryptopals.com/sets/2/challenges/10

import fetch from 'node-fetch'
import * as R from 'ramda'
import { decryptInCbcMode } from './courseraChallenge-week2-programming-assignment'

describe('An ECB/CBC detection oracle', () => {
	test('should implement CBC mode by hand by taking the ECB function', async () => {
		const key = Buffer.from('YELLOW SUBMARINE')
		const iv = Buffer.alloc(16)

		const encryption = await fetch(
			'https://cryptopals.com/static/challenge-data/10.txt',
		)
			.then(res => res.text())
			.then(R.replace('\n', ''))
			.then(base64 => Buffer.from(base64, 'base64'))
	})
})
