'use strict';
import fs from 'fs';
import Koa from 'koa';
import http from 'http';
import https from 'https';
import logger from 'koa-logger';
import convert from 'koa-convert'

import config from './config';

const app = new Koa();
const router = require('./routers');

app.use(router.routes());
app.use(router.allowedMethods());
app.use(convert(logger('dev')));
http.createServer(app.callback()).listen(config.httpPort, () => {
  console.log(`Server running at http://127.0.0.1:${config.httpPort}.`);
});

https.createServer({
  key: fs.readFileSync('pem/privatekey.pem'),
  cert: fs.readFileSync('pem/certificate.pem')
}, app.callback()).listen(config.httpsPort, () => {
  console.log(`Server running at http://127.0.0.1:${config.httpsPort}.`);
});
