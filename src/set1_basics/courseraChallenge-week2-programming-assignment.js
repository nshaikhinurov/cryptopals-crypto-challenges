import * as R from 'ramda'
import crypto from 'crypto'
import { xor } from './helpers'

const decryptInCbcMode = (key, ciphertextBuffer) => {
	const iv = R.slice(0, 16)(ciphertextBuffer)
	const cipherBlocks = R.pipe(
		R.slice(16, Infinity),
		R.splitEvery(16),
		R.map(Buffer.from),
	)(ciphertextBuffer)

	const { decryption } = R.reduce(
		({ decryption, toXorWith }, cipherBlock) => {
			const decipher = crypto.createDecipheriv('AES-128-ECB', key, null)
			decipher.setAutoPadding(false) // When data has been encrypted without standard block padding, calling decipher.setAutoPadding(false) will disable automatic padding to prevent decipher.final() from checking for and removing padding.

			const nextDecryptedBlock = xor(
				Buffer.concat([decipher.update(cipherBlock), decipher.final()]),
				toXorWith,
			)

			return {
				decryption: Buffer.concat([decryption, nextDecryptedBlock]),
				toXorWith: cipherBlock,
			}
		},
		{
			decryption: Buffer.alloc(0),
			toXorWith: iv,
		},
	)(cipherBlocks)

	const decryptionWithPaddingRemoved = R.slice(
		0,
		-R.last(decryption),
		decryption,
	)

	return decryptionWithPaddingRemoved
}

const cbcEncryptions = [
	'140b41b22a29beb4061bda66b6747e14',
	'4ca00ff4c898d61e1edbf1800618fb2828a226d160dad07883d04e008a7897ee2e4b7465d5290d0c0e6c6822236e1daafb94ffe0c5da05d9476be028ad7c1d81',

	'140b41b22a29beb4061bda66b6747e14',
	'5b68629feb8606f9a6667670b75b38a5b4832d0f26e1ab7da33249de7d4afc48e713ac646ace36e872ad5fb8a512428a6e21364b0c374df45503473c5242a253',
]

const ctrEncryptions = [
	'36f18357be4dbd77f050515c73fcf9f2',
	'69dda8455c7dd4254bf353b773304eec0ec7702330098ce7f7520d1cbbb20fc388d1b0adb5054dbd7370849dbf0b88d393f252e764f1f5f7ad97ef79d59ce29f5f51eeca32eabedd9afa9329',

	'36f18357be4dbd77f050515c73fcf9f2',
	'770b80259ec33beb2561358a9f2dc617e46218c0a53cbeca695ae45faa8952aa0e311bde9d4e01726d3184c34451',
]

R.pipe(
	R.map(hex => Buffer.from(hex, 'hex')),
	R.splitEvery(2),
	R.map(R.apply(decryptInCbcMode)),
	R.map(buf => buf.toString('utf8')),
	console.log,
)(cbcEncryptions)

// R.pipe(
// 	R.map(hex => Buffer.from(hex, 'hex')),
// 	R.splitEvery(2),
// 	R.map(R.apply(decryptInCtrMode)),
// 	R.map(buf => buf.toString('utf8')),
// 	console.log,
// )(ctrEncryptions)
