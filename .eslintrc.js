module.exports = {
  root: true,
  env: {
    browser: true,
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
  extends: [
    'plugin:vue/recommended',
    '@vue/airbnb',
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'vue/multiline-html-element-content-newline': 0,
    'import/prefer-default-export': 0,
    'vue/max-attributes-per-line': [2, {
      singleline: 4,
      multiline: {
        max: 1,
        allowFirstLine: false
      }
    }],
    // This rule enforces a line break before tag's closing brackets.
    'vue/html-closing-bracket-newline': ['error', {
      'singleline': 'never',
      'multiline': 'always',
    }],
    'vue/singleline-html-element-content-newline': 0,
    // disallow reassignment of function parameters
    // disallow parameter object manipulation except for specific exclusions
    'no-param-reassign': ['error', {
      props: true,
      ignorePropertyModificationsFor: [
        'state', // for vuex state
        'acc', // for reduce accumulators
        'e' // for e.returnvalue
      ]
    }],
    'consistent-return': 0,
    'arrow-body-style': 'warn',
    'no-restricted-syntax': 0,
  },
};
