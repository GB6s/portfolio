const Router = require('koa-router');
const { pool } = require('../database');
const RateLimit = require('koa2-ratelimit').RateLimit;

const router = new Router({
    prefix: '/contacts'
});

const postContactLimiter = RateLimit.middleware({
    interval: 5 * 60 * 1000,
    max: 10,
    prefixKey: '/post',
    message: "U kunt maar één bericht per 5 minuten sturen."
});

router.post('/', postContactLimiter, async (ctx, next) => {
    const email = ctx.request.body.email;
    const name = ctx.request.body.name;
    const message = ctx.request.body.message;

    const result = await pool.query('INSERT INTO contact (email, name, message) VALUES($1, $2, $3)', [email, name, message]);

    ctx.status = 200;
    ctx.body = 'Bericht verstuurd! Ik neem zo snel mogelijk met u contact op.'
});

/* Check if user is authenticated */

router.get('/', async (ctx, next) => {
    ctx.body = (await pool.query('SELECT * FROM contact')).rows;
});

router.del('/delete/:id', async (ctx, next) => {
    ctx.body = (await pool.query('DELETE FROM contact WHERE id=$1', [ctx.params.id])).rows;
});

module.exports = router;