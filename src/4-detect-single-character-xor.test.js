// https://cryptopals.com/sets/1/challenges/4
import fetch from 'node-fetch'
import * as R from 'ramda'
import * as RA from 'ramda-adjunct'
import { decipherSingleByteXor, scoreEnglishText } from './helpers'

describe('Detect single-character XOR', () => {
	test('should find the encrypted string', async () => {
		const strings = await fetch(
			'https://cryptopals.com/static/challenge-data/4.txt',
		)
			.then(res => res.text())
			.then(
				R.pipe(
					R.split('\n'),
					R.filter(RA.lengthEq(60)),
				),
			)

		const decryption = R.pipe(
			R.map(string => {
				const buf = Buffer.from(string, 'hex')
				return decipherSingleByteXor(buf)
			}),
			R.filter(({ key }) => Boolean(key)),
			R.sortBy(({ plainText }) => scoreEnglishText(plainText)),
			R.last,
		)(strings)

		expect(decryption).toMatchObject({
			keyChar: '5',
			plainText: 'Now that the party is jumping\n',
		})
	})
})
