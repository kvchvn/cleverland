module.exports = {
  extends: [require.resolve('arui-presets-lint/eslint'), 'plugin:react/recommended', 'plugin:react/jsx-runtime'],
  parserOptions: {
    project: ['./tsconfig.eslint.json',/* './cypress/tsconfig.json' */],
  },

  overrides: [
    {
      files: ['config/**/*.ts', 'src/global-definitions.d.ts', 'src/libs.d.ts'],
      rules: {
        'import/no-default-export': 'off',
      },
    },
  ],
  rules: {
    'import/no-extraneous-dependencies': [
      'error',
      {
        // TODO: добавить после cypess 'cypress/**/*.ts',
        devDependencies: ['**/*.test.{ts,tsx,js,jsx}'],
      },
    ],
    indent: 'off', // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/indent.md
    '@typescript-eslint/no-unused-vars': ['warn', {
      argsIgnorePattern: '^_',
      varsIgnorePattern: 'React'
    }],
    'no-nested-ternary': 'off',
    'no-unneeded-ternary': 'off',
    'no-param-reassign': ['error', {'ignorePropertyModificationsFor': ['state']}],
    'unicorn/filename-case': 'off',
    'react/state-in-constructor': ['error', 'always'],
    'react/jsx-fragments': ['warn', 'syntax'],
    'class-methods-use-this': 'off',
    'jsx-a11y/no-noninteractive-element-interactions': 'off',
    'jsx-a11y/click-events-have-key-events': 'off',
    'jsx-a11y/control-has-associated-label': 'off',
    'jsx-a11y/no-static-element-interactions': 'off',
    'jsx-a11y/mouse-events-have-key-events': 'off'
  },
  ignorePatterns: ['coverage', 'cypress.config.ts'],
};
