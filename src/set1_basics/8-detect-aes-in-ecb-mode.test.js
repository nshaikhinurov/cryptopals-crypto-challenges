/* eslint-disable max-lines-per-function */

import fetch from 'node-fetch'
import * as R from 'ramda'
import * as RA from 'ramda-adjunct'

describe('Detect AES in ECB mode', () => {
	test('should detect AES in ECB mode within hex-encoded strings', async () => {
		const encryptedStrings = await fetch(
			'https://cryptopals.com/static/challenge-data/8.txt',
		)
			.then(res => res.text())
			.then(R.split('\n'))
			.then(RA.compact)

		const { string } = R.pipe(
			R.map(string => ({
				string,
				blocks: R.splitEvery(2 * 16)(string),
				uniqueBlocks: R.pipe(
					R.splitEvery(2 * 16), // 128 bit AES blocks
					R.uniq,
					R.length,
				)(string),
			})),
			R.reduce(R.minBy(R.prop('uniqueBlocks')), { uniqueBlocks: Infinity }),
			R.tap(console.log),
		)(encryptedStrings)

		return expect(string).toEqual(
			'd880619740a8a19b7840a8a31c810a3d08649af70dc06f4fd5d2d69c744cd283e2dd052f6b641dbf9d11b0348542bb5708649af70dc06f4fd5d2d69c744cd2839475c9dfdbc1d46597949d9c7e82bf5a08649af70dc06f4fd5d2d69c744cd28397a93eab8d6aecd566489154789a6b0308649af70dc06f4fd5d2d69c744cd283d403180c98c8f6db1f2a3f9c4040deb0ab51b29933f2c123c58386b06fba186a',
		)
	})
})
