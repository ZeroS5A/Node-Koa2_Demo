let hello = async (ctx, next) => {
  ctx.response.body = {message:'hello!'}
}

let helloName = async (ctx, next) => {
  var name = ctx.params.name;
  ctx.response.body = `<h1>Hello, ${name}!</h1>`;
};

module.exports = {
  'GET /' : hello,
  'GET /hello/:name' : helloName
}