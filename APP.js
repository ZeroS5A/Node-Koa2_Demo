const Koa = require('koa')
const router = require('koa-router')()
const bodyParser = require('koa-bodyparser')

const controller = require('./models/controllerScan')

console.clear()

app = new Koa()
app.use(async (ctx,next) => {
  console.log("Token: ", ctx.request.header.token)
  await next()
})

app
  .use(bodyParser())
  .use(controller())
  .listen(3030,'0.0.0.0')


console.log("\033[42;30m ServerRuning \033[0m")


