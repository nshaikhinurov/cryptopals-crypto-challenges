// https://cryptopals.com/sets/1/challenges/3
import fetch from 'node-fetch'
import * as R from 'ramda'
import * as RA from 'ramda-adjunct'
import { decipherSingleByteXor, scoreEnglishText } from './helpers'

describe('Detect single-character XOR', () => {
	test('should find the encrypted string', async () => {
		const strings = await fetch(
			'https://cryptopals.com/static/challenge-data/4.txt'
		)
			.then(res => res.text())
			.then(
				R.pipe(
					R.split('\n'),
					R.filter(RA.lengthEq(60))
				)
			)

		const decipheredText = R.pipe(
			R.map(string => {
				const buf = Buffer.from(string, 'hex')
				return decipherSingleByteXor(buf)
			}),
			R.filter(Boolean),
			R.reject(R.contains('�')),
			R.sortBy(scoreEnglishText),
			R.last
		)(strings)

		expect(decipheredText).toEqual('Now that the party is jumping\n')
	})
})
