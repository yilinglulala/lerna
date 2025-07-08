// log 相关
const log4js = require('log4js')
const format = require('date-format')
const util = require('util')
const ansiRegex = require('ansi-regex')

log4js.addLayout('json', (config) => {
  return (logEvent) => {
    if (
      Array.isArray(logEvent.data) &&
      logEvent.data[0].constructor === Object
    ) {
      logEvent = {
        '@timestamp': format.asString(),
        log: {
          level: logEvent.level.levelStr,
        },
        ...logEvent.data[0],
      }
    } else {
      logEvent = {
        '@timestamp': format.asString(),
        log: {
          level: logEvent.level.levelStr,
        },
        message: util.format(...logEvent.data),
      }
    }
    return JSON.stringify(logEvent).replace(ansiRegex(), '') + config.separator
  }
})
var logger = log4js.getLogger()
log4js.configure({
  appenders: {
    console: {
      type: 'console',
      layout: {
        type: 'json',
        separator: '',
      },
    },
    file: { type: 'file', filename: 'logs/all-log.log', category: 'normal' },

    // 自定义category为response，记录服务器的响应情况 用户访问服务的情况
    // response: {
    //   type: 'dateFile', // 以日期命名的文件记录日志
    //   filename: 'logs/response.log',
    //   pattern: 'yyyy-MM-dd.log', //日志输出模式
    //   alwaysIncludePattern: true,

    //   // dateFile类型的appender没有这个选项
    //   maxLogSize: 1024 * 1000 * 100,
    //   // dateFile类型的appender没有这个选项
    //   backups: 1,
    // },
  },
  categories: {
    default: { appenders: ['console', 'file'], level: 'INFO' },
  },
})
logger.level = 'debug' // default level is OFF - which means no logs at all.

logger.debug('Some debug messages')
logger.info('Some info messages')
logger.warn('Some warn messages')
logger.error('Some error messages')

// console.log = logger.info.bind(logger)
console.log('log4js.getLogger()', 'aaaaaaaaaaaaaaaaaaaaaaaaa')
// log 相关 end

module.exports = logger
