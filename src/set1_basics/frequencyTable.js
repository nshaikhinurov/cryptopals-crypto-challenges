import fs from 'fs'
import path from 'path'
import * as R from 'ramda'

fs.readFile(
	path.resolve(__dirname, '../', 'text_sample.txt'),
	'utf8',
	(err, contents) => {
		R.pipe(
			R.reduce((totals, char) => {
				// eslint-disable-next-line no-plusplus
				totals[char] = (totals[char] || 0) + 1
				return totals
			}, {}),
			totals => {
				const frequencyTable = R.pipe(
					// R.pickBy((v, k) => R.test(/[a-z]/, k)),
					filteredTotals => {
						console.log('TCL: filteredTotals', filteredTotals)
						const charactersCount = R.pipe(
							R.values,
							R.sum
						)(filteredTotals)
						console.log('TCL: charactersCount', charactersCount)

						const frequencyTable = R.pipe(
							R.map(value => {
								return value / charactersCount
							}),
							R.toPairs,
							R.sortBy(([key, frequency]) => frequency),
							R.reverse
						)(filteredTotals)

						console.log(`Characters: ${charactersCount}`, frequencyTable)
					}
				)(totals)
			}
		)(contents)
	}
)

console.log('after calling readFile')
