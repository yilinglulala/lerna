// 属性配置项
import img from "@/assets/img/01.png"
// todo
const lcrOption = [
  { label: '左', value: 'left' },
  { label: '居中', value: 'center' },
  { label: '右', value: 'right' },
]
const containerConfig = [
  { desc: '水平对齐', prop: 'justify-content', renderType: 'radio-button', options: lcrOption },
  { desc: '垂直对齐', prop: 'align-items', renderType: 'radio-button', options: lcrOption },
]
// 文本
export const text = {
  component: 'div',
  text: '文本',
  style: {
    display: 'flex'
  },
  // container: [
  //   { desc: '水平对齐', prop: 'justify-content' },
  //   { desc: '垂直对齐', prop: 'align-item' },
  // ],
  // bind: [
  //   { desc: '文本内容', prop: 'text' },
  // ],
  // style: [
  //   { desc: '字体大小', prop: 'font-size' },
  //   { desc: '字体颜色', prop: 'font-color' },
  //   { desc: '行高', prop: 'line-height' },
  // ],
  containerConfig,
  event: [],
}

// 图片
export const image = {
  component: 'img',
  // container: [],
  // style: [],
  bind: {
    src: img
  },
  event: [],
}