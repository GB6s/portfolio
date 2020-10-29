const Koa = require('koa');
const morgan = require('koa-morgan')
const bodyParser = require('koa-bodyparser');
const RateLimit = require('koa2-ratelimit').RateLimit;
const app = new Koa();

app.use(morgan('combined'));


const limiter = RateLimit.middleware({
  interval: { min: 5 }, // 15 minutes = 15*60*1000
  max: 100, // limit each IP to 100 requests per interval
});

//  apply to all requests
app.use(limiter);

app.use(bodyParser());

const auth = require('./routes/auth');
app.use(auth.routes());
app.use(auth.allowedMethods());

const projects = require('./routes/projects');
app.use(projects.routes());
app.use(projects.allowedMethods());

const contact = require('./routes/contact');
app.use(contact.routes());
app.use(contact.allowedMethods());

var port = process.env.PORT || 4000;
app.listen(port);
console.log(`Listening on ${port}`);