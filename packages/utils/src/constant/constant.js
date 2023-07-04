// import get from 'lodash/get' 这种方式也可以
let { get } = require('lodash');
// import _ from 'lodash/index'

class CONSTANT {

  source = {}

  constructor(source) {
    this.source = source || {}
    console.log(this.source)
  }

  getFilterText(path, key, defaultValue) {
    return path && get(this.source, [...path.split('.'), key], defaultValue)
  }

  getFilter(path, textKey="text") {
    const data = get(this.source, path, {})
    return Object.entries(data).map(([value, text]) => {
      // 支持数字、boolean类型
      if (/^[0-9]*$/.test(value) || value === 'true' || value === 'false') {
        value = eval(value)
      }
      return { [textKey]: text, value }
    })
  }
  
}

module.exports = CONSTANT
