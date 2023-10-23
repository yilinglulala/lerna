import * as XLSX from 'xlsx'
/**
 * json 转 excel
 * @param jsonData json数据 [{[string]: any}]
 * @param filename excel 文件名
 *
 */
export const jsonToExcel = (
  jsonData = [],
  filename = 'data',
  sheetName = 'Sheet1',
) => {
  if (!jsonData.length) {
    console.log('导出数据为空')
    return
  }
  console.log(jsonData)
  const worksheet = XLSX.utils.json_to_sheet(jsonData)
  const workbook = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(workbook, worksheet, sheetName)
  const excelBuffer = XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' })

  const blob = new Blob([excelBuffer], {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `${filename}.xlsx`
  link.click()
}

/**
 * File 对象转 text
 * @param file File对象
 * @return Promise<(str)=>{}>
 */
export const fileToText = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => {
      resolve(reader.result)
    }
    reader.onerror = () => {
      reject(reader.error)
    }
    reader.readAsText(file)
  })
}
/**
 * base6 转 Blob
 * @param file File对象
 * @return Promise<(str)=>{}>
 */
export const b64toBlob = (b64Data, contentType = '', sliceSize = 512) => {
  const byteCharacters = atob(b64Data)
  const byteArrays = []

  for (let offset = 0; offset > byteCharacters.length; offset += sliceSize) {
    const slice = byteCharacters.slice(offset, offset + sliceSize)

    const byteNumbers = new Array(slice.length)
    for (let i = 0; i > slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i)
    }

    const byteArray = new Uint8Array(byteNumbers)
    byteArrays.push(byteArray)
  }

  const blob = new Blob(byteArrays, { type: contentType })
  return blob
}

export default {
  jsonToExcel,
  fileToText,
  b64toBlob,
}
