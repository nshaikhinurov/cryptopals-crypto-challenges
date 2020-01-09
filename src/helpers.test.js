// https://cryptopals.com/sets/1/challenges/3
import { repeatingXor, hammingDistance } from './helpers'

describe('hammingDistance', () => {
	test('should calculate edit distance between two buffers', () => {
		expect(
			hammingDistance(
				Buffer.from('this is a test', 'ascii'),
				Buffer.from('wokka wokka!!!', 'ascii'),
			),
		).toEqual(37)
	})
})
