const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Router = require('koa-router');
const fs = require('fs');
const { pool } = require('../database');

const jwtToken = process.env.JWT_TOKEN;
const privateKey = fs.readFileSync('keys/jwt.key');

const router = new Router({
    prefix: '/auth'
});

router.post('/login', async (ctx, next) => {
    console.log(ctx.request.body);
    console.log('1');
    const username = ctx.request.body.username
    const password = ctx.request.body.password

    console.log('2');

    const { rows } = await pool.query('SELECT * FROM users where username=$1', [username]);

    console.log('3');

    if (rows.length == 0) {
        console.log('unknown username');
        ctx.status = 403;
        ctx.body = {
            type: 'error',
            message: "Username unknown."
        }
        return;
    }

    var user = rows[0];
    var password_hash = user.password_hash;
    var match = await bcrypt.compare(password, password_hash);

    if (!match) {
        console.log('Incorrect password.');
        ctx.status = 403;
        ctx.body = {
            type: 'error',
            message: "Incorrect password."
        }
        return;
    }

    console.log('Success');
    ctx.response.status = 200;
    ctx.body = {
        type: 'success',
        token: jwt.sign({ id: user.id }, privateKey, { expiresIn: '7d' })
    }
});

router.post('/logout', (ctx, next) => {
    ctx.body = 'test';
});

router.get('/user', async (ctx, next) => {
    const { rows } = await pool.query('SELECT * FROM users where username=$1', ['admin']);
    ctx.body = rows;
});

module.exports = router;