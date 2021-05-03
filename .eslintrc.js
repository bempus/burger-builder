module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['plugin:react/recommended', 'airbnb'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react'],
  rules: {
    'no-restricted-syntax': [0],
    'no-unused-expressions': [0],
    'no-unused-vars': [1, { argsIgnorePattern: '(action | props)' }],
    'no-return-assign': [0],
    'no-shadow': [1, { allow: ['props'] }],
    'guard-for-in': [0],
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'react/jsx-props-no-spreading': [0],
    'react/destructuring-assignment': [0],
    'react/prop-types': [0],
    'react/no-array-index-key': [0], // REMOVE THIS
    'jsx-a11y/click-events-have-key-events': [0],
    'jsx-a11y/no-noninteractive-element-interactions': [0],
  },
};
