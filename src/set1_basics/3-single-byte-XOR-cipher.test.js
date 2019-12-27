// https://cryptopals.com/sets/1/challenges/3
import * as R from 'ramda'
import { scoreEnglishText, xor } from './helpers'

describe('Single-byte XOR cipher', () => {
	test('should find the key and decrypt the message', () => {
		const buf = Buffer.from(
			'1b37373331363f78151b7f2b783431333d78397828372d363c78373e783a393b3736',
			'hex'
		)

		const decipheredText = R.pipe(
			R.map(key => {
				const text = xor(buf, Buffer.alloc(buf.length, key)).toString('utf8')
				const score = scoreEnglishText(text)
				return [key, text, score]
			}),
			R.sortBy(([key, text, score]) => -score),
			R.head,
			([key, decipheredText, score]) => decipheredText
		)(R.range(0, 128))

		expect(decipheredText).toEqual("Cooking MC's like a pound of bacon")
	})
})
