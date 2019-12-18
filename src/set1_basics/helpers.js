import * as R from 'ramda'

export const xor = (buf1, buf2) => {
	const xor = Buffer.alloc(buf1.length)

	for (let i = 0; i < buf1.length; ++i) {
		xor[i] = buf1[i] ^ buf2[i]
	}

	return xor
}

export const scoreEnglishText = text => {
	const mapIndexed = R.addIndex(R.map)
	const table = R.pipe(
		R.reverse,
		mapIndexed((v, i) => ({ [v]: i })),
		R.mergeAll
	)([...'etaoinshrdlcumwfgypbvkjxqz'])

	R.pipe(
		R.map(v => table[v] || 0),
		R.sum
	)([...text])
}
