const path = require('path')

module.exports = {
	// Используем данные конфигурации (готовые наборы правил)
	extends: [
		// Рекомендуемый набор правил
		'eslint:recommended',

		// Проверка правильных импортов модулей
		'plugin:import/errors',

		// Довольно строгие требования к коду, лучшие практики
		'eslint-config-airbnb',

		'plugin:security/recommended',

		// Отключаем проверку правил форматирования в ESLint, давая Prettier самому форматировать код
		'eslint-config-prettier',
	],

	plugins: [
		//
		'security',
	],

	// Для поддержки экспериментального синтаксиса используем парсер babel-eslint, конфигурация подтягивается из .babelrc
	parser: 'babel-eslint',
	parserOptions: {
		ecmaVersion: 9,
		ecmaFeatures: {
			jsx: true,
			legacyDecorators: true,
		},
	},

	// An environment defines global variables that are predefined
	env: {
		es6: true,
		browser: true,
		jest: true,
		node: true,
	},

	settings: {
		// uses 'eslint-import-resolver-webpack' for aliases:
		'import/resolver': {
			node: {}, // placed above other resolver configs
			webpack: {
				config: path.resolve(__dirname, 'webpack.config.client.js'),
			},
		},
	},

	// Здесь переопределяем правила из extends
	rules: {
		// Forbid the import of external modules that are not declared in the package.json's dependencies, devDependencies
		'import/no-extraneous-dependencies': 'error',

		'import/prefer-default-export': 'off',

		// enforces a maximum number of lines in a file
		'max-lines': ['error', 300],

		// Ограничиваем максимальную длину функции в строках
		'max-lines-per-function': [
			'warn',
			{ max: 100, skipBlankLines: true, skipComments: true, IIFEs: true },
		],

		// Ограничиваем максимальное количество statements в функции
		'max-statements': ['warn', 30],

		// Ограничиваем максимальное количество параметров функции
		'max-params': ['error', 4],

		// Ограничиваем максимальное количество вложенных коллбеков
		'max-nested-callbacks': ['error', 4],

		// Ограничиваем количество независимых путей выполнения кода
		complexity: ['error', 10],

		// Webpack does tree shaking, but you should delete unused vars
		'no-unused-vars': 'warn',

		// Переходим на let/const
		'no-var': 'error',

		// Рекомендовать const вместо let, если переменная не изменяется
		'prefer-const': 'error',

		// Отключаем проверку символов перевода строк (LF/CRLF)
		'linebreak-style': 'off',

		// Разрешаем использовать только явные методы console
		'no-console': ['error', { allow: ['warn', 'error', 'info'] }],

		// Разрешаем использовать функции до объявления потому что все равно hoisting
		'no-use-before-define': ['error', { functions: false, classes: true }],

		//  использовать короткий синтаксис литерала объекта (let obj = {x})
		'object-shorthand': 'warn',

		// Разрешаем затенение переменных внешней области видимости
		'no-shadow': 'off',

		// Не рекомендуется изменять параметры функций, side effects, not pure functions!
		'no-param-reassign': 'warn',

		// Не предупреждать, если _ в идентификаторе. Нормально, потому что такие идентификаторы находятся в MongoDB
		'no-underscore-dangle': 'off',

		// Destructuring
		'prefer-destructuring': ['error', { object: true, array: false }],

		// Предупреждаем об избыточных конструкциях в условных операторах
		'no-else-return': ['error', { allowElseIf: false }],

		// Нужно прописывать default-кейс в switсh, чтобы отлавливать баги, например, выбрасывать ошибку, если все случаи уже рассмотрены
		'default-case': 'warn',

		// the logical OR can be used to provide the same functionality
		'no-unneeded-ternary': ['error', { defaultAssignment: false }],

		//Это правило направлено на обеспечение согласованного стиля условий, которые сравнивают переменную с литеральным значением.
		yoda: ['error', 'never', { exceptRange: true }],

		//Это правило обеспечивает максимальную глубину, в которую обратные вызовы могут быть вложены для повышения ясности кода.
		'max-nested-callbacks': ['warn', 5],

		'import/no-self-import': 'off',
	},
}
