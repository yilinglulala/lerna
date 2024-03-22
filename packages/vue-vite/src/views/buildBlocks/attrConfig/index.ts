// 属性配置项
import Container from '../renders/container.vue'
import nestDraggable from '../renders/nestDraggble.vue'
import img from "@/assets/img/01.png"
import { styleConfig, bindConfig } from "./constant"
import { shallowRef } from 'vue';

// 组件配置接口类型
interface ICompConfig {
  key?: string;
  component?: string | any;
  componentList?: Array<any>;
  text?: string;
  style: Record<string, string>
  containerConfig: Array<any>
  bind?: Record<string, string>
  bindConfig?: Array<any>
  event?: Array<any>
}

const pickFromArr = (targetArr: any[], arr: string[], key = 'prop') => {
  return targetArr.filter(v => arr.includes(v[key]))
}
/********* 控件 *********/
// 标题
export const title: ICompConfig = {
  component: 'h6',
  text: '标题',
  style: {
    color: ''
  },
  containerConfig: [
    {
      desc: '标题大小', prop: 'component', renderType: 'select',
      options: new Array(6).fill(0).map((v, i) => ({ value: `h${i + 1}`, label: `h${i + 1}` }))
    },
    ...pickFromArr(styleConfig, ['color', 'margin', 'padding'])
  ]
}
// 文本
export const text: ICompConfig = {
  component: 'div',
  text: '文本',
  style: {
    display: 'flex'
  },
  containerConfig: [...pickFromArr(styleConfig, ['color', 'margin', 'padding'])],
  event: [],
}

// 图片
export const image: ICompConfig = {
  component: 'img',
  style: {},
  containerConfig: [
    ...pickFromArr(styleConfig, ['margin'])
  ],
  bind: {
    src: img
  },
  bindConfig: [
    ...pickFromArr(bindConfig, ['src'])
  ],
  event: [],
}

/********* 布局 *********/
export const container: ICompConfig = {
  key: 'container',
  component: shallowRef(nestDraggable),
  componentList: [],
  style: {
    width: '100%',
    height: '200px',
    border:'1px dashed'
  },
  containerConfig: [
    ...pickFromArr(styleConfig, ['background-color','background-image','margin', 'padding'])
  ],
}