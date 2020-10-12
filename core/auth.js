const pg = require('pg');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Router = require('koa-router');
const { Pool } = require('pg')

const pool = new Pool({
    user: 'root',
    password: 'changeme',
    database: 'portfolio'
});

const router = new Router({
    prefix: '/auth'
});

router.post('/login', (ctx, next) => {
});

router.post('/logout', (ctx, next) => {

});

router.get('/user', async (ctx, next) => {
    const { rows } = await pool.query('SELECT * FROM users where username=$1', ['admin']);
    ctx.body = rows;
});

module.exports = router;