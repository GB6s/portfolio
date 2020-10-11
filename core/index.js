const Koa = require('koa');
const router = require('koa-router');
const morgan = require('koa-morgan')
const cors = require('@koa/cors');
const bodyParser = require('koa-bodyparser');
const app = new Koa();

app.use(cors());
app.use(morgan('tiny'));
app.use(bodyParser());

var _ = router({
  prefix: '/api/auth'
});

_.post('/login', (ctx, next) => {
  console.log(ctx.request.body);
  ctx.body = 'test';
})

_.post('/logout', (ctx, next) => {
  ctx.body = 'test';
})

_.get('/user', (ctx, next) => {
  ctx.body = 'test';
})

app
  .use(_.routes())
  .use(_.allowedMethods());

app.listen(4000);