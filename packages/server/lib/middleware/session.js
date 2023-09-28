module.exports = opts => {
  const { key = 'KSESSIONID' } = opts;
  const extendTime = 1000 * 60 * 60;
  if (!('maxAge' in opts)) opts.maxAge = 1000 * 60 * 60 * 5;

  return async (ctx, next) => {
    const store = ctx.sessionStore;
    let id = ctx.cookies.get(key, opts);

    if (!id) {
      ctx.session = {};
    } else {
      ctx.session = await store.get(id, ctx);
      if (typeof ctx.session !== 'object' || ctx.session == null) {
        ctx.session = {};
      } else {
        ctx.cookies.set(key, id, opts);
      }
    }

    const old = JSON.stringify(ctx.session);

    ctx.session.refresh = (nid) => {
      return new Promise(resolve => {
        id = nid;
        ctx.cookies.set(key, id, opts);
        resolve()
      })
    }

    await next();

    if (ctx.session && 'refresh' in ctx.session) {
      delete ctx.session.refresh
    }

    const sess = JSON.stringify(ctx.session);
    const now = new Date().getTime();
    let lastTime = 0;
    if ('lastTime' in ctx.session) {
      lastTime = ctx.session.lastTime;
    }

    let refreshCookie = true;
    if (old == sess) {
      if (old == '{}') {
        return;
      } else {
        if (lastTime) {
          if ((now - lastTime) > extendTime) {
            ctx.session = await store.get(id, ctx);
            refreshCookie = false;
          } else {
            return;
          }
        } else {
          await store.expire(id, opts.maxAge + extendTime);
          return;
        }
      }
    }

    if (sess == '{}') {
      ctx.session = null;
    } else {
      if (ctx.session) {
        ctx.session.lastTime = now;
      }
    }

    if (id && !ctx.session) {
      await store.destroy(id, ctx);
      ctx.cookies.set(key, null);
      return;
    }

    const sid = await store.set(ctx.session, Object.assign({}, opts, { sid: id, maxAge: opts.maxAge + extendTime }), ctx);
    if (refreshCookie) ctx.cookies.set(key, sid, opts);
  }
}