module.exports = {
  'env': {
    'es2021': true,
    'node': true,
  },
  'parserOptions': {
    'ecmaVersion': 'latest',
    'sourceType': 'module',
  },
  'overrides': [
    {
      'files': ['*.ts'],
      'parser': '@typescript-eslint/parser',
      'plugins': ['@typescript-eslint'],
      'extends': ['eslint-config-brisk/tslint'],
      'rules': {
        'no-redeclare': 'off',
        '@typescript-eslint/no-redeclare': 'warn',
      },
    },
    {
      'files': ['*.js'],
      'extends': ['eslint-config-brisk/jslint'],
    },
  ],

};
