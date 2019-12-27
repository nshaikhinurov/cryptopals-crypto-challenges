import * as R from 'ramda'
import { getExpectedFrequencyTable, getFrequencyTable } from './frequencyTable'

export const xor = (buf1, buf2) => {
	const xor = Buffer.alloc(buf1.length)

	for (let i = 0; i < buf1.length; ++i) {
		xor[i] = buf1[i] ^ buf2[i]
	}

	return xor
}

export const chiSquared = (observedTable, expectedTable) => {
	return R.pipe(
		R.toPairs,
		R.reduce(
			(sum, [key, value]) =>
				sum +
				(expectedTable[key]
					? Math.pow(expectedTable[key] - value, 2) / expectedTable[key]
					: 0),
			0
		)
	)(observedTable)
}

const expectedTable = getExpectedFrequencyTable()
export const scoreEnglishText = text => {
	// console.log('Scoring: text', text)
	// const observedTable = getFrequencyTable(text)
	// console.log('TCL: observedTable(text)', observedTable)
	// return chiSquared(observedTable, expectedTable)
	return R.reduce((score, char) => score + expectedTable[char] || 0, 0, text)
	// const mapIndexed = R.addIndex(R.map)
	// const table = R.pipe(
	// 	R.reverse,
	// 	mapIndexed((v, i) => ({ [v]: i })),
	// 	R.mergeAll
	// )([...'etaoinshrdlcumwfgypbvkjxqz'])

	// R.pipe(
	// 	R.map(v => table[v] || 0),
	// 	R.sum
	// )([...text])
}
