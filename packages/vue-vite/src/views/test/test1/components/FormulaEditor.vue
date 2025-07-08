<!-- 公式编辑 -->
<template>
  <Dialog v-model="visible" title="公式编辑" class="formula-editor-container">
    <div class="editor">
      <div class="var">
        字段变量
        <div class="border wrapper">
          <div v-for="item in data" :key="item.key" @click="selectVar(item)">
            {{ item.key }}
          </div>
        </div>
      </div>
      <div class="middle">
        <span>在左侧选择字段变量或右侧选择函数，且在英文输入法下编辑</span>
        <div class="border wrapper">
          <main>
            <pre contenteditable="true" id="pre" @click="contentChanged"></pre>
          </main>
          <footer class="b-t">
            <p v-for="p in tip" :key="p">
              {{ p }}
            </p>
          </footer>
        </div>
      </div>
      <!-- 函数 -->
      <div class="function">
        <span>函数</span>
        <div class="border wrapper">
          <details v-for="item in funcs" :key="item.key" open>
            <summary>{{ item.title }}</summary>
            <ul>
              <li
                v-for="func in item.func"
                :key="func.label"
                @click="selectFunc(func)"
              >
                {{ func.label }}
              </li>
            </ul>
          </details>
        </div>
      </div>
    </div>
  </Dialog>
</template>

<script setup lang="ts">
import { computed, nextTick, ref } from 'vue'
import Dialog from './Dialog.vue'
const props = defineProps(['visible', 'data'])
const emits = defineEmits(['update:visible'])
const visible = computed({
  get() {
    return props.visible
  },
  set(v) {
    emits('update:visible', v)
  },
})

/********** 变量 **********/

const data = computed(() => props.data)
const selectVar = (item) => {
  const span = document.createElement('span')
  span.textContent = item.key
  setContent1(span)
  // setContent(`<span class="is-var">${item.key}</span>`, true)
}

/********** 编辑 **********/
const lastCursorIndex = ref(0)
const lastStrIndex = ref(0)
const content = ref('')
const tip = ref([
  `请从左侧面板选择字段或选项`,
  `支持英文模式下运算符(+、-、*、/、>、<、==、!=、<=、>=)及函数`,
])
const setContent1 = (ele: any) => {
  const pre: any = document.getElementById('pre')
  if (pre) {
    pre?.focus()
    nextTick(() => {
      var selection: any = window.getSelection()
      if (pre.childNodes.length > 0) {
        for (let i = 0; i < pre.childNodes.length; i++) {
          if (i == selection.anchorOffset) {
            pre.insertBefore(ele, pre.childNodes[i])
          }
        }
      } else {
        // 否则直接插入一个元素
        pre.appendChild(ele)
      }
    })
  }
}
// 设置编辑区内容
const setContent = (txt: string, isVar = true) => {
  const lastIndex = lastCursorIndex.value
  const old = content.value
  content.value = `${old.slice(0, lastStrIndex.value)}${txt}${old.slice(
    lastStrIndex.value,
  )}`

  let ele = document.getElementById('pre')
  if (ele) {
    ele?.focus()
    nextTick(() => {
      lastStrIndex.value += isVar ? txt.length : txt.length - 1
      setFocusFun(ele, lastIndex + (isVar ? 1 : txt.length - 1))
      // setFocusFun(ele, lastIndex + txt.length + len)
    })
  }
}
/********** 函数 **********/
const funcs = [
  {
    title: '集合函数',
    key: 'jh',
    func: [
      {
        label: 'BASE64',
        tip: [
          'BASE64(text,byteTransferWay,charSet) 对一段文本进行 BASE64 加密，默认结果是基于64个可打印字符来表示。其中byteTransferWay为：hexDecode、newString,若byteTransferWay为newString则charSet可填写为：UTF-8、UTF-16、ISO-8859-1等',
          `示例：BASE64('test') 的结果是 dGVzdA==。如果想要大写16进制的话可以使用 UPPER(BASE64('test')), 它的结果是 DGVZDA==。BASE64('test','newString','UTF-8') 的结果是 dGVzdA==。`,
        ],
      },
      { label: 'ENCRYPT' },
      { label: 'DECRYPT' },
    ],
  },
  {
    title: '字符串函数',
    key: 'string',
    func: [{ label: 'CONCATENATE' }, { label: 'GETUUID' }, { label: 'LEN' }],
  },
]
// 设置光标位置
function setFocusFun(ele: any, len: number) {
  var element: any = document.getElementById('pre')
  var selection: any = window.getSelection()
  var range = document.createRange()
  lastCursorIndex.value = len
  console.log('lastCursorIndex.value>> ', lastCursorIndex.value)
  range.setStart(element, len)
  range.collapse(true)

  selection.removeAllRanges()
  selection.addRange(range)
}

// 选择函数回调
const selectFunc = (func) => {
  const txt = `${func.label}()`
  tip.value = func.tip
  setContent(txt, false)
}
// 手动点击时记录光标位置
const contentChanged = () => {
  var selection: any = window.getSelection()
  var range = selection.getRangeAt(0)
  let lastIndex = range.startOffset
  lastCursorIndex.value = lastIndex
  console.log('手动点击时记录', lastIndex)
  // lastStrIndex.value =
}
</script>

<style lang="scss">
.formula-editor-container {
  .editor {
    position: relative;
    display: flex;
    gap: 16px;
    height: 368px;
    line-height: 32px;
    > div > div {
      padding: 0 16px;
      height: 368px;
      overflow: auto;
    }
  }
  .is-var {
    background: pink;
    border: 1px solid;
  }
  .var {
    width: 192px;
  }
  .middle {
    width: 496px;

    main {
      height: 240px;
      overflow: auto;
      pre {
        outline: none;
      }
    }
    footer {
      height: 125px;
      line-height: 1.6;
      overflow: auto;
    }
  }
  .function {
    width: 192px;

    details {
      ul {
        margin-left: 16px;
      }
    }
  }
}
</style>
