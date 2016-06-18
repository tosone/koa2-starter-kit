'use strict';
import swig from 'swig';
import mongoose from 'mongoose';

const router = require('.');

router.get('/user', async(ctx, next) => {
    await Promise.resolve();
    ctx.body = swig.renderFile('public/index.html', {
        pagename: 'awesome people',
        authors: ['Paul', 'Jim', 'Jane']
    });
});

module.exports = router;