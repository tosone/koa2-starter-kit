"use strict";
module.exports = (ctx, next) => {
  const start = new Date();
  return next().then(() => {
    const ms = new Date() - start;
    console.log(`${ctx.method} ${ctx.url} ${ctx.ip} - ${ms}ms`);
  });
}
