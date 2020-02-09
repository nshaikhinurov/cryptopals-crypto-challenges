import crypto from 'crypto'
import * as R from 'ramda'
import path from 'path'
import fs from 'fs'

const hashByChunks = buffer => {
	const chunks = R.pipe(
		R.splitEvery(1024),
		R.map(Buffer.from),
	)(buffer)

	return R.reduceRight((nextChunkHash, chunk) => {
		const hash = crypto.createHash('sha256')
		hash.update(Buffer.concat([chunk, nextChunkHash]))
		return hash.digest()
	}, Buffer.alloc(0))(chunks)
}

R.pipe(
	fs.readFileSync,
	hashByChunks,
	b => b.toString('hex'),
	console.log,
)(path.resolve(__dirname, 'files/6.2.birthday.mp4_download'))
