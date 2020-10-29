const Router = require('koa-router');
const { pool } = require('../database');
const axios = require('axios');

const router = new Router({
    prefix: '/projects'
});

const { setup } = require('axios-cache-adapter');
const github = setup({
    baseURL: 'https://api.github.com',
    cache: {
        maxAge: 2 * 60 * 1000
    }
})

router.get('/', async (ctx, next) => {
    const { rows } = await pool.query('SELECT * FROM projects');

    for (row of rows) {
        var username = row.github_username;
        var repo = row.github_repo;

        // Check if project has github_url
        if (username === null || repo == null) {
            continue;
        }

        var url = `/repos/${username}/${repo}/readme`;
        try {
            var { data: { download_url } } = await github.get(url);
        } catch (err) { }

        var { data } = await axios.get(download_url);

        row.readme = data;
    }

    ctx.body = rows;
});

/* Check if user is authenticated */

router.post('/', async (ctx, next) => {
    const name = ctx.request.body.name;
    const type = ctx.request.body.type;
    const github_username = ctx.request.body.github_username;
    const github_repo = ctx.request.body.github_repo;
    const id = ctx.request.body.id;

    const result = await pool.query('INSERT INTO projects (id, name, type, github_username, github_repo) OVERRIDING SYSTEM VALUE VALUES($1, $2, $3, $4, $5)' +
        'ON CONFLICT (id) DO UPDATE SET name=$2, type=$3, github_username=$4, github_repo=$5;',
        [id, name, type, github_username, github_repo]
    );

    ctx.status = 200;
    ctx.body = 'Query was succesfull.'
});

router.del('/delete/:id', async (ctx, next) => {
    ctx.body = (await pool.query('DELETE FROM projects WHERE id=$1', [ctx.params.id])).rows;
});


module.exports = router;