import * as XLSX from 'xlsx'
/**
 * json 转 excel
 * @param jsonData json数据 [{[string]: any}]
 * @param filename excel 文件名
 *
 */
const jsonToExcel = (
  jsonData = [],
   filename = 'data', sheetName = 'Sheet1' 
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
const fileToText = (file) => {
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

export default {
  jsonToExcel,
  fileToText,
}