import * as R from 'ramda'
import { xor } from './helpers'

const outputs = [
	'e86d2de2e1387ae9',
	'1792d21db645c008',
	'5f67abaf5210722b',
	'bbe033c00bc9330e',
	'7c2822ebfdc48bfb',
	'325032a9c5e2364b',
	'7b50baab07640c3d',
	'ac343a22cea46d60',
]

R.pipe(
	R.splitEvery(2),
	R.map(([a, b]) =>
		xor(Buffer.from(a, 'hex'), Buffer.from(b, 'hex')).toString('hex'),
	),
	console.log,
)(outputs)
