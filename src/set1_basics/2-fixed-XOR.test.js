// https://cryptopals.com/sets/1/challenges/2

describe('Fixed XOR', () => {
	test('should take two equal-length buffers and produce their XOR combination', () => {
		const buf1 = Buffer.from('1c0111001f010100061a024b53535009181c', 'hex')
		const buf2 = Buffer.from('686974207468652062756c6c277320657965', 'hex')
		const xor = Buffer.alloc(buf1.length)
		const expectedBuf = Buffer.from(
			'746865206b696420646f6e277420706c6179',
			'hex'
		)

		for (let i = 0; i < buf1.length; ++i) {
			xor[i] = buf1[i] ^ buf2[i]
		}

		expect(xor).toEqual(expectedBuf)
	})
})
