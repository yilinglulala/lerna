export const lcrOption = [
  { label: '左', value: 'left' },
  { label: '居中', value: 'center' },
  { label: '右', value: 'right' },
]

export const tcbOption = [
  { label: '上', value: 'flex-start' },
  { label: '居中', value: 'center' },
  { label: '下', value: 'flex-end' },
]

export const styleConfig = [
  { desc: '标题颜色', target: 'style', prop: 'color', renderType: 'el-color-picker', },
  { desc: '背景图片', target: 'style', prop: 'background-image', },
  { desc: '背景颜色', target: 'style', prop: 'background-color', renderType: 'el-color-picker', },

  { desc: '外边距', target: 'style', prop: 'margin', },
  { desc: '内边距', target: 'style', prop: 'padding', },

  { desc: '水平对齐', target: 'style', prop: 'justify-content', renderType: 'radio-button', options: lcrOption },
  { desc: '垂直对齐', target: 'style', prop: 'align-items', renderType: 'radio-button', options: tcbOption },
]

export const bindConfig = [
  { desc: '图片地址', target: 'bind', prop: 'src', },
]