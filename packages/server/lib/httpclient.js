const _request = require('request');

module.exports = class HttpClient {
  constructor(app) {
    this.app = app;
  }

  request(options, callback) {
    options = Object.assign({ headers: this.app.customHeaders }, this.app.config.httpclient, options || {});
    return new Promise((resolve, reject) => {
      try {
        const reqId = this.app.utils.CryptoRandomString(6);
        if (this.app.config.showReqLog) {
          let bodyLog = options.body;
          if (options.qs) {
            bodyLog = options.qs;
          }
          // ----- 日志输出 -----
          console.log({
            http: {
              url: {
                path: `【${options.url}】`
              },
              request: {
                id: `【${reqId}】`,
                method: options.method,
                header: options.headers,
                body: {
                  content: JSON.stringify(bodyLog)
                }
              }
            },
            labels: '【httpclient】'
          })
        }
        _request(options, (error, response, body) => {
          try {
            if (this.app.config.showReqLog) {
              if (error) {
                // ----- 日志输出 -----
                console.log({
                  http: {
                    url: {
                      path: `【${options.url}】`
                    },
                    response: {
                      id: `【${reqId}】`,
                      method: options.method,
                      header: response && response.headers,
                      error: error && (error.message || error.stack)
                    }
                  },
                  labels: '【httpclient】'
                })
              } else {
                let bodyLog = '';
                let bodyStr = (body && JSON.stringify(body)) || '';
                if (bodyStr && bodyStr.length > 800) {
                  bodyLog = bodyStr.toString().substring(0, 800) + '...';
                } else {
                  bodyLog = bodyStr.toString();
                }
                // ----- 日志输出 -----
                console.log({
                  http: {
                    url: {
                      path: `【${options.url}】`
                    },
                    response: {
                      id: `【${reqId}】`,
                      method: options.method,
                      header: response && response.headers,
                      body: {
                        content: bodyLog
                      }
                    }
                  },
                  labels: '【httpclient】'
                });
              }
            }
            if (error) {
              reject({ ret: -1, data: null, error: { msg: error && (error.message || error.stack) } });
            } else {
              if (callback) {
                callback(body);
              }
              resolve(body);
            }
          } catch (e) {
            console.error('【YKOA】【httpclient】', e);
            reject({ ret: -1, data: null, error: { msg: e && (e.message || e.stack) } });
          }
        });
      } catch (err) {
        console.error('【YKOA】【httpclient】', err);
        reject({ ret: -1, data: null, error: { msg: err && (err.message || err.stack) } });
      }
    });
  }

  curl(options, callback) {
    return this.request(options, callback);
  }
}