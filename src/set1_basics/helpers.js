import * as R from 'ramda'
import { getExpectedFrequencyTable, getFrequencyTable } from './frequencyTable'

export const xor = (buf1, buf2) => {
	const xor = Buffer.alloc(buf1.length)

	for (let i = 0; i < buf1.length; ++i) {
		xor[i] = buf1[i] ^ buf2[i]
	}

	return xor
}

const expectedTable = getExpectedFrequencyTable()
export const scoreEnglishText = text => {
	return R.reduce((score, char) => score + expectedTable[char] || 0, 0, text)
}

export const decipherSingleByteXor = encryptedBuffer => {
	const decipheredText = R.pipe(
		R.map(key => {
			const text = xor(
				encryptedBuffer,
				Buffer.alloc(encryptedBuffer.length, key)
			).toString('utf8')
			const score = scoreEnglishText(text)
			return [key, text, score]
		}),
		R.sortBy(([key, text, score]) => -score),
		R.head,
		([key, decipheredText, score]) => decipheredText
	)(R.range(0, 256))
	return decipheredText
}
