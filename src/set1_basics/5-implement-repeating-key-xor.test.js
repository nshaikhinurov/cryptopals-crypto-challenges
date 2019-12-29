// https://cryptopals.com/sets/1/challenges/3
import { repeatingXor } from './helpers'

describe('Implement repeating-key XOR', () => {
	test('should encrypt, using repeating-key XOR', () => {
		const keyBuf = Buffer.from('ICE', 'utf8')
		const plainTextBuf = Buffer.from(
			"Burning 'em, if you ain't quick and nimble\nI go crazy when I hear a cymbal",
			'utf8'
		)

		expect(repeatingXor(keyBuf, plainTextBuf).toString('hex')).toEqual(
			'0b3637272a2b2e63622c2e69692a23693a2a3c6324202d623d63343c2a26226324272765272a282b2f20430a652e2c652a3124333a653e2b2027630c692b20283165286326302e27282f'
		)
	})
})
