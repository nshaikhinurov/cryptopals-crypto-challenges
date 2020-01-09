/* eslint-disable max-lines-per-function */
// https://cryptopals.com/sets/2/challenges/9

import { pkcsPad } from './helpers'

describe('Implement PKCS#7 padding', () => {
	test('should pad any block to a specific block length', () => {
		const paddedBuffer = pkcsPad(20, Buffer.from('YELLOW SUBMARINE'))
		console.log('TCL: paddedBuffer', paddedBuffer)

		expect(paddedBuffer).toEqual(
			Buffer.from('YELLOW SUBMARINE\x04\x04\x04\x04'),
		)
	})
})
