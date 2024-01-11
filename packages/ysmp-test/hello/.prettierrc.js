module.exports = {
  $schema: 'https://json.schemastore.org/prettierrc',
  semi: false,
  tabWidth: 2,
  useTabs: false, //是否使用tab进行缩进，默认为false，表示用空格进行缩减
  singleQuote: false,
  printWidth: 120, //一行的字符数，如果超过会进行换行，默认为80
  trailingComma: 'es5', //是否使用尾逗号，有三个可选值"<none|es5|all>"
  bracketSpacing: true, //对象大括号直接是否有空格，默认为true，效果：{ foo: bar }
  arrowParens: 'avoid', //围绕一个唯一的箭头函数参数包括括号。
  jsxBracketSameLine: false, // JSX标签闭合位置 默认false
  eslintIntegration: false, //不让prettier使用eslint的代码格式进行校验
  ignorePath: '.prettierignore', // 不使用prettier格式化的文件填写在项目的.prettierignore文件中
  jsxSingleQuote: false, // 在jsx中使用单引号代替双引号
  requireConfig: false, // Require a 'prettierconfig' to format prettier
  stylelintIntegration: false, //不让prettier使用stylelint的代码格式进行校验
  tslintIntegration: false, // 不让prettier使用tslint的代码格式进行校验
  endOfLine: 'crlf' // 换行符使用 crlf
}
