<!-- 公式编辑 -->
<template>
  <Dialog v-model="visible" title="公式编辑">
    <div class="editor">
      <div class="var">
        字段变量
        <div class="border wrapper">
          <div v-for="item in data" :key="item.key">
            {{ item.key }}
          </div>
        </div>
      </div>
      <div class="middle">
        <span>在左侧选择字段变量或右侧选择函数，且在英文输入法下编辑</span>
        <div class="border wrapper">
          <main>
            <pre contenteditable="true" id="pre">{{ content }}</pre>
          </main>
          <footer class="b-t">
            <p v-for="p in tip" :key="p">
              {{ p }}
            </p>
          </footer>
        </div>
      </div>
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

/********** 编辑 **********/

const content = ref('')
const tip = ref([
  `请从左侧面板选择字段或选项`,
  `支持英文模式下运算符(+、-、*、/、>、<、==、!=、<=、>=)及函数`,
])

// 函数
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
function setFocusFun(ele: any, len: number) {
  var element: any = document.getElementById('pre')
  var range = document.createRange()
  var selection: any = window.getSelection()
  // var offset = selection.focusOffset;
  lastCursorIndex.value = len
  range.setStart(element.firstChild, len)
  range.collapse(true)

  selection.removeAllRanges()
  selection.addRange(range)
}
const lastCursorIndex = ref(0)
const selectFunc = (func) => {
  const txt = `${func.label}()`
  const old = content.value
  tip.value = func.tip
  content.value += txt
  let ele = document.getElementById('pre')
  if (ele) {
    ele?.focus()
    nextTick(() => {
      var selection: any = window.getSelection()
      var range = selection.getRangeAt(0)
      let lastIndex = range.startOffset
      content.value = `${old.slice(
        0,
        lastIndex,
      )}${txt}${old.slice(lastIndex)}`
      setFocusFun(ele, lastIndex + txt.length - 1)
    })
  }
}
</script>

<style lang="scss" scoped>
.editor {
  position: relative;
  display: flex;
  gap: 16px;
  height: 368px;
  > div > div {
    height: 368px;
  }
}
.var {
  width: 192px;
}
.middle {
  width: 496px;
  main {
    height: 240px;
    pre {
      outline: none;
    }
  }
  footer {
    height: 128px;
    overflow: auto;
  }
}
.function {
  width: 192px;
  line-height: 32px;
  details {
    ul {
      margin-left: 16px;
    }
  }
}
</style>
