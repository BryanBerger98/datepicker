module.exports = {
	root: true,
	env: {
		browser: true,
		es6: true,
		node: true, 
	},
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:react-hooks/recommended',
	],
	parserOptions: {
		// tsconfigRootDir: __dirname,
		ecmaVersion: 'latest',
		sourceType: 'module',
		// project: './tsconfig.json',
	},
	ignorePatterns: ['dist', '.eslintrc.cjs', '!.lintstagedrc.js'],
	parser: '@typescript-eslint/parser',
	plugins: [ 'react', 'react-refresh', '@typescript-eslint', 'jsx-a11y', 'import', 'react-hooks' ],
	rules: {
		// Syntax
		indent: [ 'warn', 'tab', { 'SwitchCase': 1 } ],
		semi: [ 'warn', 'always' ],
		quotes: [ 'warn', 'single' ],
		'linebreak-style': [ 'warn', 'unix' ],
		'array-bracket-spacing': [ 'warn', 'always' ],
		'computed-property-spacing': [ 'warn', 'always' ],
		'comma-dangle': [
			'warn',
			{
				'arrays': 'always-multiline',
				'objects': 'always-multiline',
				'imports': 'always-multiline',
				'exports': 'always-multiline',
				'functions': 'never',
			},
		],
		'comma-spacing': [ 'warn', {
			'before': false,
			'after': true, 
		} ],
		'arrow-spacing': 'warn',
		'key-spacing': [
			'warn',
			{
				'beforeColon': false,
				'afterColon': true,
				'mode': 'strict',
			},
		],
		'no-multi-spaces': 'warn',
		'no-multiple-empty-lines': 'warn',
		'no-empty-function': 'warn',
		'require-await': 'off',
		'template-curly-spacing': [ 'warn', 'always' ],
		'brace-style': [ 'warn', '1tbs' ],
		'prefer-destructuring': [
			'warn',
			{
				'VariableDeclarator': {
					'array': true,
					'object': true,
				},
				'AssignmentExpression': {
					'array': true,
					'object': true,
				},
			},
			{ 'enforceForRenamedProperties': false },
		],
		'one-var-declaration-per-line': [ 'error', 'always' ],
		'one-var': [ 'error', 'never' ],
		'rest-spread-spacing': [ 'warn', 'never' ],
		'no-param-reassign': 'error',
		'no-constant-binary-expression': 'error',
		'no-new-native-nonconstructor': 'error',
		// Objects
		'object-curly-spacing': 'off',
		'object-property-newline': 'warn',
		'object-curly-newline': [
			'warn',
			{
				'ObjectExpression': {
					'multiline': true,
					'minProperties': 2,
				},
				'ObjectPattern': 'never',
				'ImportDeclaration': 'never',
				'ExportDeclaration': {
					'multiline': true,
					'minProperties': 4,
				},
			},
		],
		'prefer-object-has-own': 'warn',
		'prefer-object-spread': 'warn',
		'object-shorthand': 'warn',
		// Functions
		'func-names': [ 'warn', 'as-needed' ],
		'no-func-assign': 'error',
		// Conditions
		'default-case': 'warn',
		'default-case-last': 'warn',
		'no-duplicate-case': 'warn',
		'no-constant-condition': 'warn',
		'no-self-compare': 'error',
		// Loops
		'for-direction': 'warn',
		'no-unmodified-loop-condition': 'error',
		// Variables and constants
		'no-var': 'error',
		'no-const-assign': 'error',
		'no-multi-assign': 'warn',
		'no-self-assign': [ 'warn', { 'props': true } ],
		'no-use-before-define': 'warn',
		// Classes and constructors
		'new-cap': [
			'warn',
			{
				'capIsNew': false,
				'newIsCap': true,
			},
		],
		'no-constructor-return': 'error',
		'no-unused-private-class-members': 'warn',
		// Async and promises
		'no-promise-executor-return': 'error',
		// Text
		'valid-typeof': 'error',
		'no-template-curly-in-string': 'error',
		// Imports
		'import/no-unresolved': 'error',
		'import/order': [
			'warn',
			{
				'groups': [ 'builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'unknown' ],
				'pathGroups': [
					{
						'pattern': '{.,..}/*.css',
						'group': 'sibling',
						'position': 'after',
					},
				],
				'alphabetize': {
					'order': 'asc',
					'caseInsensitive': true,
				},
				'newlines-between': 'always',
			},
		],
		// "import/no-unused-modules": [
		// 	1,
		// 	{
		// 		"unusedExports": true,
		// 		"missingExports": true,
		// 		"ignoreExports": ["./tailwind.config.js"]
		// 	}
		// ],
		// ES6
		'no-duplicate-imports': [ 'error' ],
		'no-class-assign': 'error',
		// React
		'react/react-in-jsx-scope': 'off',
		'react/jsx-uses-react': 'off',
		'react/jsx-filename-extension': [ 'error', { 'extensions': [ '.jsx', '.tsx' ] } ],
		'react/jsx-uses-vars': 'warn',
		'react/no-unescaped-entities': 'warn',
		'react/destructuring-assignment': 'warn',
		'react/jsx-one-expression-per-line': 'off',
		'react/function-component-definition': [
			'warn',
			{
				'namedComponents': 'arrow-function',
				'unamedComponents': 'arrow-function',
			},
		],
		'react/jsx-closing-bracket-location': [ 'warn', 'tag-aligned' ],
		'react/jsx-closing-tag-location': 'warn',
		'react/jsx-curly-brace-presence': 'warn',
		'react/jsx-curly-newline': [
			'warn',
			{
				'multiline': 'consistent',
				'singleline': 'forbid',
			},
		],
		'react/jsx-curly-spacing': [
			'warn',
			{
				'when': 'always',
				'children': true,
			},
		],
		'react/button-has-type': 'warn',
		'react/jsx-boolean-value': 'warn',
		'react/hook-use-state': 'warn',
		'react/jsx-fragments': 'warn',
		'react/jsx-handler-names': 'off',
		'react/jsx-pascal-case': 'warn',
		'react/jsx-no-leaked-render': 'error',
		'react/jsx-no-constructed-context-values': 'error',
		'react/jsx-no-comment-textnodes': 'warn',
		'react/jsx-indent': [
			'warn',
			'tab',
			{
				'indentLogicalExpressions': true,
				'checkAttributes': true,
			},
		],
		'react/jsx-no-bind': [ 'warn', { 'allowArrowFunctions': true } ],
		'react/jsx-wrap-multilines': 'warn',
		'react/no-array-index-key': 'off',
		'react/no-danger': 'error',
		'react/no-deprecated': 'error',
		'react/no-multi-comp': 'off',
		'react/no-this-in-sfc': 'error',
		'react/no-typos': 'error',
		'react/no-unstable-nested-components': 'error',
		'react/no-unused-state': 'warn',
		// React props
		'react/no-children-prop': 'error',
		'react/jsx-props-no-multi-spaces': 'warn',
		'react/jsx-sort-props': [
			'warn',
			{
				'shorthandLast': true,
				'callbacksLast': true,
				'reservedFirst': [ 'key' ],
			},
		],
		'react/jsx-indent-props': [
			'warn',
			{
				'indentMode': 'tab',
				'ignoreTernaryOperator': true,
			},
		],
		'react/jsx-no-duplicate-props': 'error',
		'react/prop-types': 'off',
		'react/no-unused-prop-types': 'warn',
		'react/forbid-prop-types': 'warn',
		'react/boolean-prop-naming': [ 'error', {
			'rule': '^(is|has|with)[A-Z]([A-Za-z0-9]?)+',
			'validateNested': true, 
		} ],
		'react/jsx-max-props-per-line': [ 'warn', { 'maximum': 1 } ],
		'react/jsx-first-prop-new-line': [ 'warn', 'multiline' ],
		'react/jsx-props-no-spreading': 'off',
		'react/require-default-props': 'off',
		// React classes
		'react/prefer-es6-class': 'error',
		'react/state-in-constructor': [ 'warn', 'always' ],
		'react/no-access-state-in-setstate': 'warn',
		'react/no-arrow-function-lifecycle': 'warn',
		'react/no-did-mount-set-state': 'error',
		'react/no-did-update-set-state': 'error',
		'react/no-invalid-html-attribute': 'error',
		'react/no-redundant-should-component-update': 'error',
		'react/no-unused-class-component-methods': 'warn',
		// JSX
		'jsx-quotes': [ 'warn', 'prefer-double' ],
		'jsx-a11y/no-static-element-interactions': 'error',
		'jsx-a11y/anchor-is-valid': 'off',
		'jsx-a11y/mouse-events-have-key-events': 'off',
		'jsx-a11y/click-events-have-key-events': 'off',
		'jsx-a11y/no-noninteractive-element-interactions': 'off',
		// TypeScript
		'@typescript-eslint/no-unused-vars': 'warn',
		'@typescript-eslint/object-curly-spacing': [ 'warn', 'always' ],
		'@typescript-eslint/no-explicit-any': 'off',
		'@typescript-eslint/ban-types': [
			'error',
			{
				'types': { '{}': false },
				'extendDefaults': true,
			},
		],
	},
	'settings': {
		'react': {
			'version': 'detect',
		},
		'import/extensions': [ '.tsx', '.ts' ],
		'import/parsers': { '@typescript-eslint/parser': [ '.ts', '.tsx' ] },
		'import/resolver': { 'typescript': { 'project': [ 'packages/datepicker/tsconfig.json', 'apps/www/tsconfig.json' ] } },
	},
};
