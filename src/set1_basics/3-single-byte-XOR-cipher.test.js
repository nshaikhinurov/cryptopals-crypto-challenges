// https://cryptopals.com/sets/1/challenges/3
import * as R from 'ramda'
import { scoreEnglishText } from './helpers'

// describe('Single-byte XOR cipher', () => {
// test('should find the key and decrypt the message', () => {
const buf = Buffer.from(
	'1b37373331363f78151b7f2b783431333d78397828372d363c78373e783a393b3736',
	'hex'
)

const strings = R.pipe(
	R.map(key => {
		const bufCopy = Buffer.from(buf)
		for (let i = 0; i < bufCopy.length; ++i) {
			bufCopy[i] = bufCopy[i] ^ key
		}

		return [key, bufCopy.toString('utf8')]
	}),
	R.sortBy(([key, text]) => scoreEnglishText(text)),
	R.reverse,
	R.take(3),
	R.map(([key, text]) => {
		// console.log(`key: ${String.fromCharCode(key)} Result: ${text}`)
	})
)(R.range(0, 128))
// console.log(
// 	`key: ${String.fromCharCode(key)} Result: ${bufCopy.toString('utf8')}`
// )
// })
// })

const ciphertext = Buffer.from(
	'1b37373331363f78151b7f2b783431333d78397828372d363c78373e783a393b3736',
	'hex'
)
const scores = []
for (let i = 32; i < 128; i++) {
	const result = Buffer.alloc(ciphertext.length)
	let score = 0
	for (let j = 0; j < result.length; j++) {
		result[j] = ciphertext[j] ^ i
		if (
			(result[j] >= 65 && result[j] < 91) ||
			(result[j] >= 97 && result[j] < 123)
		) {
			score++
		}
	}
	scores.push({ char: i, score, result: result.toString('ascii') })
	// console.log(i, result.toString('ascii'), score);
}

let max = { score: 0 }

scores.forEach(function(score) {
	if (score.score > max.score) max = score
})

console.log(max)
