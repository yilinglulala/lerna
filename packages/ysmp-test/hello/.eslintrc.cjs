/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier/skip-formatting'
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  rules: {
    // '@typescript-eslint/no-var-requires': 0,
    // '@typescript-eslint/no-explicit-any': 'off',
    // camelcase: 'off',
    // '@typescript-eslint/camelcase': 0,
    // 'prefer-const': [
    //   'off',
    //   {
    //     destructuring: 'any',
    //     ignoreReadBeforeAssign: false
    //   }
    // ],
    // '@typescript-eslint/no-empty-interface': 'off',
    // 'no-misleading-character-class': 'off',
    // 'no-useless-escape': 'off',
    // '@typescript-eslint/type-annotation-spacing': 'off',
    // '@typescript-eslint/member-delimiter-style': 'off',
    // '@typescript-eslint/no-empty-function': 'off',
    // '@typescript-eslint/no-inferrable-types': 'off',
    // '@typescript-eslint/interface-name-prefix': 'off',
    // // 'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    // // 'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    // 'no-async-promise-executor': 'off',
    // 'require-atomic-updates': 'off',
    // '@typescript-eslint/no-unused-vars': 'off',
    // '@typescript-eslint/class-name-casing': 'off',
    // '@typescript/class-name-casing': 'off',
    'vue/multi-word-component-names': [ // 组件名称要多单词组成，index 除外
      'error',
      {
        ignores: ['index']
      }
    ]
  }
}
