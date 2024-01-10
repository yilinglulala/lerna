
import moment from 'moment'
/**
 * 时间戳转 格式化
 * @param timestamp 
 * @param formate 
 * @param off 时区偏移（单位小时）
 * @returns 
 */
function getTimeStr(timestamp, formate = "YYYY/MM/DD HH:mm:ss", off) {
  return timestamp
    ? moment(timestamp)
      .utcOffset(off * 60)
      .format(formate)
    : "";
}
export default {
  getTimeStr
}