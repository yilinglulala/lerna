const KoaApplication = require('koa');
const { randomBytes } = require('crypto');
const http = require('http');
// const config = require('./config');
// const HttpClient = require('./core/httpclient');
// const Utils = require('./core/utils');

// const logger = require('./middleware/logger');
// const cors = require('koa2-cors');
// const compress = require('koa-compress');
const session = require('./middleware/session');
// const history = require('./middleware/history');
// const proxy = require('./middleware/proxy');
// const koaBody = require('koa-body');
// const koaStatic = require('koa-static');

const HTTPCLIENT = Symbol('YKoa#httpclient');
const UTILS = Symbol('YKoa#utils');

module.exports = class YKoa extends KoaApplication {
  constructor(options = {}) {
    super(options);
    // this.inits = [];
    // this.HttpClient = HttpClient;
    // this.Utils = Utils;
    this.config = options // this.utils.extend(config(), options);
    this.context.sessionStore = new Store();
    // this.proxy = proxy.proxy;
    // this.httpServer = null;

    // 加载默认中间件
    // this.use(cors(this.config.cors));
    // this.use(compress(this.config.compress));
    // this.use(logger(this.utils.extend({ appId: this.config.appId }, this.config.log)));
    // if (this.config.middleware && this.config.middleware.session) {
    //   this.use(this.config.middleware.session(this.config.session));
    // } else {
      this.use(session({
        maxAge: 1000 * 60 * 60 * 5
      }));
      // this.use(session(this.config.session));
    // }
  }

  // get httpclient() {
  //   if (!this[HTTPCLIENT]) {
  //     this[HTTPCLIENT] = new this.HttpClient(this);
  //   }
  //   return this[HTTPCLIENT];
  // }

  // get utils() {
  //   if (!this[UTILS]) {
  //     this[UTILS] = new this.Utils(this);
  //   }
  //   return this[UTILS];
  // }

  // get customHeaders() {
  //   return this.context.customHeaders || {};
  // }

  // curl(opts, callback) {
  //   if(this.app) {
  //     return this.app.httpclient.request(opts, callback).catch(err => { return err });
  //   } else {
  //     return this.httpclient.request(opts, callback).catch(err => { return err });
  //   }
  // }

  // setCustomHeaders(headers) {
  //   if (this.context) {
  //     this.context.customHeaders = this.utils.extend(this.context.customHeaders || {}, headers);
  //   } else if (this.app && this.app.context) {
  //     this.app.context.customHeaders = this.utils.extend(this.app.context.customHeaders || {}, headers);
  //   }
  // }

  // history(opts) {
  //   this.use(history(opts));
  // }

  // body(opts) {
  //   this.use(koaBody(this.utils.extend(this.config.body, opts)));
  // }

  // static(path, opts) {
  //   this.use(koaStatic(path, this.utils.extend(this.config.static, opts)));
  // }

  // proxyTable(table) {
  //   const keys = Object.keys(table);
  //   keys.forEach(key => {
  //     this.use(proxy(key, table[key]));
  //   });
  //   this.context.proxy = (ctx, opts, callback) => {
  //     let target = null;
  //     let headers = null;
  //     keys.some(key => {
  //       if (opts.url.indexOf(key) > -1) {
  //         if (typeof table[key].target == 'function') {
  //           target = table[key].target(ctx);
  //         } else {
  //           target = table[key].target;
  //         }

  //         if (typeof table[key].headers == 'function') {
  //           headers = table[key].headers(ctx);
  //         } else {
  //           headers = table[key].headers || {};
  //         }

  //         if (table[key].rewrite && typeof table[key].rewrite == 'function') {
  //           opts.url = table[key].rewrite(opts.url);
  //         }
  //       }
  //     });
  //     opts.url = target ? target + opts.url : opts.url;
  //     opts.headers = Object.assign({}, ctx.headers, headers, opts.headers);
  //     // 解决请求content变更后，前端ctx.headers里面有content-length字段长度不一致，会导致解析不了问题
  //     if (opts.headers['content-length']) {
  //       delete opts.headers['content-length'];
  //     }

  //     if (opts.method && opts.method.toLocaleLowerCase() === 'get') {
  //       if (opts.useCtxReqBody !== false) {
  //         opts.qs = Object.assign({}, ctx.request.query, opts.body);
  //       } else {
  //         opts.qs = opts.body;
  //       }
  //     } else {
  //       if (Array.isArray(ctx.request.body)) {
  //         opts.body = ctx.request.body;
  //       } else {
  //         if (!Array.isArray(opts.body)) {
  //           if (opts.useCtxReqBody !== false) {
  //             opts.body = Object.assign({}, ctx.request.body, opts.body);
  //           }
  //         }
  //       }
  //     }
      
  //     return this.httpclient.request(opts, callback).catch(err => { return err });
  //   }
  // }

  sessionStore(store) {
    this.context.sessionStore = store;
    console.log(store)
  }

  // init(fn) {
  //   if (typeof fn !== 'function') throw new TypeError('init must be a function!');
  //   this.inits.push(fn);
  //   return this;
  // }

  // createServer() {
  //   this.httpServer = http.createServer(super.callback());
  //   return this.httpServer;
  // }

  // listen(...args) {
  //   const fnInit = () => {
  //     let arr = [];
  //     const run = async () => {
  //       for (let fn of this.inits) {
  //         let rs = await fn(this);
  //         arr.push(rs);
  //       }
  //       return arr;
  //     }
  //     return run();
  //   };
  //   fnInit().then(() => {
  //     this.context.curl = this.curl;
  //     this.context.setCustomHeaders = this.setCustomHeaders;
  //     this.context.utils = this.utils;
  //     this.context.tokenPrefix = this.config.tokenPrefix;
  //     if (this.httpServer) {
  //       this.httpServer.listen(...args);
  //     } else {
  //       super.listen(...args);
  //     }
  //   });
  // }
}

class Store {
  constructor() {
    this.sessions = new Map();
    this.__timer = new Map();
  }

  getID(length) {
    return randomBytes(length).toString('hex');
  }

  get(sid) {
    if (!this.sessions.has(sid)) return undefined;
    return JSON.parse(this.sessions.get(sid));
  }

  set(session, { sid = this.getID(24), maxAge } = {}) {
    this.expire(sid, maxAge);

    try {
      this.sessions.set(sid, JSON.stringify(session));
    } catch (err) {
      console.log(`Set session error: `, err);
    }

    return sid;
  }

  expire(sid, maxAge) {
    if (this.sessions.has(sid) && this.__timer.has(sid)) {
      const __timeout = this.__timer.get(sid);
      if (__timeout) clearTimeout(__timeout);
    }

    if (maxAge) {
      this.__timer.set(sid, setTimeout(() => this.destroy(sid), maxAge));
    }
  }

  destroy(sid) {
    this.sessions.delete(sid);
    this.__timer.delete(sid);
  }
}