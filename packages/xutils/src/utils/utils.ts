/**
 * 复制文本
 * @param text 需要被复制的文本
 */
export const copyText = (text: string): void => {
  if (navigator.clipboard) {
    // clipboard api 复制
    navigator.clipboard.writeText(text)
  } else {
    var textarea = document.createElement('textarea')
    document.body.appendChild(textarea)
    // 隐藏此输入框
    textarea.style.position = 'fixed'
    textarea.style.clip = 'rect(0 0 0 0)'
    textarea.style.top = '10px'
    // 赋值
    textarea.value = text
    // 选中
    textarea.select()
    // 复制
    document.execCommand('copy', true)
    // 移除输入框
    document.body.removeChild(textarea)
  }
}
/**
 * 设置剪切板
 * @param text 复制文本
 * @param success 成功回调
 * @param failure 失败回调
 */
export function setClipboard(text, success?, failure?) {
  const type = "text/plain";
  const blob = new Blob([text], { type });
  const data = [new ClipboardItem({ [type]: blob })];

  navigator.clipboard.write(data).then(() => {
    /* success */
  }, () => {
    /* failure */
  });
}
/**
 * 复制图片
 * @param image 页面中的IMG元素对象
 * @param success 
 * @param failure 
 * @returns 
 */
const doCopyImg2Clipboard = async (image, success = () => { }, failure = () => { }) => {
  if (!image || !image.src) {
    return;
  }

  // 需要复制的图片的地址
  const src = image.src;
  // 请求该地址，返回图片的blob数据
  const response = await fetch(src);

  // 需要是blob数据格式
  const blob = response.blob();

  // 使用剪切板API进行复制
  const data = [new ClipboardItem({
    [blob.type || 'image/' + src.split('.').slice(-1)[0].replace('jpg', 'jpeg')]: blob
  })];

  navigator.clipboard.write(data).then(success, failure);
}