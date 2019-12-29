// https://cryptopals.com/sets/1/challenges/3
import { decipherSingleByteXor } from './helpers'

describe('Single-byte XOR cipher', () => {
	test('should find the key and decrypt the message', () => {
		const buf = Buffer.from(
			'1b37373331363f78151b7f2b783431333d78397828372d363c78373e783a393b3736',
			'hex'
		)

		expect(decipherSingleByteXor(buf)).toMatchObject({
			keyChar: 'X',
			plainText: "Cooking MC's like a pound of bacon",
		})
	})
})
