const pg = require('pg');
const { Pool } = require('pg')

const pool = new Pool({
    user: 'root',
    password: 'changeme',
    database: 'portfolio'
});

exports.pool = pool;