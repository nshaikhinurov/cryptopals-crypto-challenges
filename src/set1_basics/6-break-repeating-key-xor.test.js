// https://cryptopals.com/sets/1/challenges/3
import fetch from 'node-fetch'
import * as R from 'ramda'
import util from 'util'
import { hammingDistance, decipherSingleByteXor, average } from './helpers'

util.inspect.defaultOptions.maxArrayLength = 25
util.inspect.defaultOptions.depth = 10
util.inspect.defaultOptions.compact = false

describe('Break repeating-key XOR', () => {
	test('should decrypt repeating-key XOR', async () => {
		const encryptedBuffer = await fetch(
			'https://cryptopals.com/static/challenge-data/6.txt'
		)
			.then(res => res.text())
			.then(base64 => Buffer.from(base64, 'base64'))
		console.log('TCL: encryptedBuffer', encryptedBuffer.length)

		R.pipe(
			R.map(keySize => {
				const normalizedDistance = R.pipe(
					R.splitEvery(keySize),
					R.take(4),
					R.aperture(2),
					R.map(R.apply(hammingDistance)),
					average,
					R.divide(R.__, keySize)
				)(encryptedBuffer)

				// const firstBunchOfBytes = Uint8Array.prototype.slice.call(
				// 	encryptedBuffer,
				// 	0,
				// 	keySize
				// )
				// const secondBunchOfBytes = Uint8Array.prototype.slice.call(
				// 	encryptedBuffer,
				// 	keySize,
				// 	2 * keySize
				// )
				// const normalizedDistance =
				// 	hammingDistance(firstBunchOfBytes, secondBunchOfBytes) / keySize

				return [keySize, normalizedDistance]
			}),
			R.sortBy(([keySize, distance]) => distance),
			R.take(7),
			R.tap(console.log)
			// R.map(([keySize]) => {
			// 	const chunks = R.splitEvery(keySize, encryptedBuffer)
			// 	// console.log('TCL: chunks', keySize, chunks)
			// 	return [keySize, chunks]
			// }),
			// // R.tap(console.log),
			// R.map(([keySize, chunks]) => [keySize, R.transpose(chunks)]),
			// R.map(([keySize, tranposedArrays]) => [
			// 	keySize,
			// 	R.map(Buffer.from)(tranposedArrays),
			// ]),
			// R.map(([keySize, singleByteXorEncryptions]) => [
			// 	keySize,
			// 	R.map(decipherSingleByteXor, singleByteXorEncryptions),
			// ]),

			// R.tap(console.log)
		)(R.range(2, 40))
	})
})
