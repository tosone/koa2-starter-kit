'use strict';
import fs from 'fs';
import Koa from 'koa';
import path from 'path';
import http from 'http';
import https from 'https';
import convert from 'koa-convert';
import staticCache from 'koa-static-cache';

import models from './models';
import config from './config';

const app = new Koa();
const router = require('./routers');

app.use(convert(staticCache(path.join(__dirname, 'public'), {
    maxAge: 24 * 60 * 60 * 30,
    gzip: true
})));
app.use(require('./logger'));
app.use(router.routes());
app.use(router.allowedMethods());

http.createServer(app.callback()).listen(config.httpPort, () => {
    console.log(`Server running at http://127.0.0.1:${config.httpPort}.`);
});

https.createServer({
    key: fs.readFileSync('pem/privatekey.pem'),
    cert: fs.readFileSync('pem/certificate.pem')
}, app.callback()).listen(config.httpsPort, () => {
    console.log(`Server running at http://127.0.0.1:${config.httpsPort}.`);
});