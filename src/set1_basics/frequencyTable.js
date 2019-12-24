/* eslint-disable no-plusplus */
import fs from 'fs'
import path from 'path'
import * as R from 'ramda'

// 			R.toPairs,
// 			R.sortBy(([key, frequency]) => frequency),
// 			R.reverse

const emptyTable = {
	A: 0,
	B: 0,
	C: 0,
	D: 0,
	E: 0,
	F: 0,
	G: 0,
	H: 0,
	I: 0,
	K: 0,
	L: 0,
	M: 0,
	N: 0,
	O: 0,
	P: 0,
	Q: 0,
	R: 0,
	S: 0,
	T: 0,
	V: 0,
	X: 0,
	Y: 0,
	Z: 0,
	a: 0,
	b: 0,
	c: 0,
	d: 0,
	e: 0,
	f: 0,
	g: 0,
	h: 0,
	i: 0,
	k: 0,
	l: 0,
	m: 0,
	n: 0,
	o: 0,
	p: 0,
	q: 0,
	r: 0,
	s: 0,
	t: 0,
	v: 0,
	x: 0,
	y: 0,
	z: 0,
	' ': 0,
}

export const getFrequencyTable = text => {
	const totals = R.clone(emptyTable)
	return R.pipe(
		R.reduce(
			([totals, charactersCount], char) => {
				// console.log('TCL: totals, charactersCount', totals, charactersCount)
				// eslint-disable-next-line no-plusplus
				if (R.has(char, totals)) {
					totals[char]++
				}
				return [totals, charactersCount + 1]
			},
			[totals, 0]
		),
		// R.pickBy((v, k) => R.test(/[a-zA-Z0-9]/, k)),
		// R.pickBy((v, k) => (alphabet ? R.includes(k, alphabet) : true)),
		([filteredTotals, charactersCount]) => {
			console.log(
				'TCL: filteredTotals, charactersCount',
				filteredTotals,
				charactersCount
			)
			// const charactersCount = R.pipe(
			// 	R.values,
			// 	R.sum
			// )(filteredTotals)
			return R.map(value => value / charactersCount, filteredTotals)
		}
	)(text)
}

const text = fs.readFileSync(
	path.resolve(__dirname, '../', 'text_sample.txt'),
	'utf8'
)
export const getExpectedFrequencyTable = () => {
	let table = null

	table = getFrequencyTable(text)
	return table
}
