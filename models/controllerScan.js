const fs = require('fs');

function addMapping(router, mapping) {
    for (var url in mapping) {
      // if (url.startsWith('GET ')) {
      //     var path = url.substring(4);
      //     router.get(path, mapping[url]);
      //     console.log(`register URL mapping: GET ${path}`);
      // } else if (url.startsWith('POST ')) {
      //     var path = url.substring(5);
      //     router.post(path, mapping[url]);
      //     console.log(`register URL mapping: POST ${path}`);
      // } else {
      //     console.log(`invalid URL: ${url}`);
      // }
      const urlMod = url.split(" ")
      if (urlMod[0] === "GET" || urlMod[0] === "POST" || urlMod[0] === "PUT" || urlMod[0] === "DELETE") {
        router[urlMod[0].toLowerCase()](urlMod[1], mapping[url])
        console.log(`${urlMod[0]} mapping URL: ${url}`);
      }
      else {
        console.log('\033[40;31m ERROR '+ url +' \033[0m')
      }
    }
}

function addControllers(router) {
    var files = fs.readdirSync('./controllers');
    var js_files = files.filter((f) => {
        return f.endsWith('.js');
    });

    for (var f of js_files) {
        console.log('process controller: \033[40;34m'+f+'\33[0m... ');
        let mapping = require('../controllers/' + f);
        addMapping(router, mapping);
    }
}

module.exports = function (dir = "controller") {
    let
        controllers_dir = dir
        router = require('koa-router')();
    addControllers(router, controllers_dir);
    return router.routes();
};