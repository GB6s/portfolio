const Koa = require('koa');
const router = require('koa-router');
const morgan = require('koa-morgan')
const bodyParser = require('koa-bodyparser');
const auth = require('./auth');
const app = new Koa();

if(process.env.NODE_ENV !== 'production') {
  const cors = require('@koa/cors');
  app.use(cors());
}

app.use(morgan('tiny'));
app.use(bodyParser());

app.use(auth.routes());
app.use(auth.allowedMethods());

var port = process.env.PORT || 4000;
app.listen(port);
console.log(`Listening on ${port}`);