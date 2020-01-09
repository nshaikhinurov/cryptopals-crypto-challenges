/* eslint-disable no-plusplus */
/* eslint-disable security/detect-object-injection */
/* eslint-disable no-bitwise */
import * as R from 'ramda'
import { getExpectedFrequencyTable } from './frequencyTable'

export const xor = (buf1, buf2) => {
	if (buf1.length !== buf2.length) {
		throw new Error('`xor` must be applied to buffers of the same length.')
	}

	const xor = Buffer.alloc(buf1.length)

	for (let i = 0; i < buf1.length; ++i) {
		xor[i] = buf1[i] ^ buf2[i]
	}

	return xor
}

export const repeatingXor = (keyBuf, plainTextBuf) => {
	const xor = Buffer.alloc(plainTextBuf.length)

	for (let i = 0; i < plainTextBuf.length; ++i) {
		xor[i] = keyBuf[i % keyBuf.length] ^ plainTextBuf[i]
	}

	return xor
}

export const pkcsPad = R.curry((length, buffer) => {
	if (buffer.length > length) {
		throw new Error(
			"Padding should expand the block, but target length was less than buffer's length",
		)
	}

	const paddedBuffer = Buffer.alloc(length)
	for (let i = 0; i < length; i++) {
		paddedBuffer[i] = buffer[i] || length - buffer.length
	}

	return paddedBuffer
})

const toBinaryString = buffer =>
	R.reduce(
		(binaryString, byte) => binaryString + byte.toString(2).padStart(8, '0'),
		'',
		buffer,
	)

export const hammingDistance = (buf1, buf2) => {
	return R.pipe(
		xor,
		toBinaryString,
		R.sum,
	)(buf1, buf2)
}

const expectedTable = getExpectedFrequencyTable()
export const scoreEnglishText = text => {
	return R.reduce((score, char) => score + (expectedTable[char] || 0), 0, text)
}

export const decipherSingleByteXor = encryptedBuffer =>
	R.pipe(
		// Match each possible key with its corresponding decrypted plain text
		R.map(key => {
			return {
				key,
				plainText: xor(
					encryptedBuffer,
					Buffer.alloc(encryptedBuffer.length, key),
				).toString('utf8'),
			}
		}),

		// Get rid of unprintable decryptions
		R.reject(({ plainText }) => R.contains('�', plainText)),

		// Score rest decryptions
		R.map(({ key, plainText }) => ({
			key,
			plainText,
			score: scoreEnglishText(plainText),
		})),

		R.sortBy(({ score }) => -score),
		R.head,
		R.defaultTo({
			key: null,
			plainText: null,
		}),
		({ key, plainText }) => ({
			key,
			keyChar: String.fromCharCode(key),
			plainText,
		}),
	)(R.range(0, 255))

export const average = R.converge(R.divide, [R.sum, R.length])

export const charRange = (startChar, endChar) => [
	...R.apply(String.fromCharCode)(
		R.range(startChar.charCodeAt(0), endChar.charCodeAt(0)),
	),
]
