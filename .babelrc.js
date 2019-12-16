const path = require('path')

const isTest = String(process.env.NODE_ENV) === 'test'

module.exports = {
	presets: ['@babel/preset-env'],
	plugins: [
		['@babel/plugin-proposal-decorators', { decoratorsBeforeExport: true }],
		['@babel/plugin-proposal-class-properties', { loose: true }],
	],
	env: {
		test: {
			presets: [
				[
					'@babel/preset-env',
					{
						targets: {
							node: 'current',
						},
					},
				],
			],
		},
	},
}
