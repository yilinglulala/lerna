'use strict';
const package1 = require('package1')
const {CONSTANT} = require('utils')

module.exports = package2;

function package2() {
  console.log(package1())
  let a = new CONSTANT({a:{b:1,c:{d:2}}})  
  console.log(a.getFilterText('a.c','d'))
  return 'Hello from package2';
}
package2()