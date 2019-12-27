/* eslint-disable no-plusplus */
/* eslint-disable security/detect-object-injection */
/* eslint-disable no-bitwise */
import * as R from 'ramda'
import { getExpectedFrequencyTable } from './frequencyTable'

export const xor = (buf1, buf2) => {
	const xor = Buffer.alloc(buf1.length)

	for (let i = 0; i < buf1.length; ++i) {
		xor[i] = buf1[i] ^ buf2[i]
	}

	return xor
}

export const hammingDistance = (buf1, buf2) => {
	const string = xor(buf1, buf2).toString('binary')
	console.log('TCL: hammingDistance -> string', string)
	return R.sum(xor(buf1, buf2))
}

export const repeatingXor = (keyBuf, plainTextBuf) => {
	const xor = Buffer.alloc(plainTextBuf.length)

	for (let i = 0; i < plainTextBuf.length; ++i) {
		xor[i] = keyBuf[i % keyBuf.length] ^ plainTextBuf[i]
	}

	return xor
}

const expectedTable = getExpectedFrequencyTable()
export const scoreEnglishText = text => {
	return R.reduce((score, char) => score + (expectedTable[char] || 0), 0, text)
}

export const decipherSingleByteXor = encryptedBuffer => {
	const decipheredText = R.pipe(
		R.map(key => [
			key,
			xor(encryptedBuffer, Buffer.alloc(encryptedBuffer.length, key)).toString(
				'utf8'
			),
		]),
		R.reject(([key, text]) => R.contains('�', text)),
		R.map(([key, text]) => [key, text, scoreEnglishText(text)]),
		R.sortBy(([key, text, score]) => -score),
		// R.tap(console.log),
		R.take(1),
		// R.tap(console.log),
		R.map(([key, decipheredText, score]) => decipheredText),
		R.head
	)(R.range(0, 256))

	return decipheredText
}
