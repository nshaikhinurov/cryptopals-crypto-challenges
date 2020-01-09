// https://cryptopals.com/sets/1/challenges/1

describe('Convert hex to base64', () => {
	test('should convert hex string to base64 representation', () => {
		const result = Buffer.from(
			'49276d206b696c6c696e6720796f757220627261696e206c696b65206120706f69736f6e6f7573206d757368726f6f6d',
			'hex',
		).toString('base64')

		expect(result).toEqual(
			'SSdtIGtpbGxpbmcgeW91ciBicmFpbiBsaWtlIGEgcG9pc29ub3VzIG11c2hyb29t',
		)
	})
})
