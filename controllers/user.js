const {coverDB,readDB} = require("../tools/tools")

//POST请求
const login =  async (ctx, next) => {
  const
      name = ctx.request.body.name || '',
      password = ctx.request.body.password || '';
  console.log(`signin with name: ${name}, password: ${password}`);
  // 导入用户表
  let users = readDB('data')

  if (users.user[name] && users.user[name].password === password) {
      ctx.response.body = JSON.stringify({msg:'success',userData:users.user[name].userData});
  } else {
      ctx.response.body = JSON.stringify({msg:'error,tryAgain'});
  }
};

const userAdd = async (ctx, next) => {
  const {name,userName,Email,password} = ctx.request.body
  let users = readDB('data')
  if (users.user[name] !== undefined) {
    ctx.response.body = JSON.stringify({msg:'hadUser'});
  } else if (name && userName && Email && password) {
    users.user[name] = {
      "password":password,
      "userData":{
        "userName":userName,
        "Email":Email
      }
    },
    coverDB(users)
    ctx.response.body = JSON.stringify({msg:`userNot,createUser - ${name}`});
  } else {
    ctx.response.body = JSON.stringify({msg:"checkInput"})
  }
}

const userEdit = async (ctx, next) => {
  const {name,userName,Email,password,newPassword} = ctx.request.body
  let users = readDB('data')

  console.log(name,userName,Email,password,newPassword)
  if (users.user[name]){
    if (users.user[name].password === password){
      users.user[name] = {
        "password":newPassword?newPassword:users.user[name].password,
        "userData":{
          "userName":userName?userName:users.user[name].userData.userName,
          "Email":Email?Email:users.user[name].userData.Email,
        }
      }
      coverDB(users)
      ctx.response.body = JSON.stringify({msg:`EditUser - ${name}`,userData:users.user[name]}); 
    }else{
      ctx.response.body = JSON.stringify({msg:'passwordERROR'})
    }

  }else {
    ctx.response.body = JSON.stringify({msg:"userNotFound"});
  }
}

const userDelete = async (ctx, next) => {
  let users = readDB("data")
  const { name, password } = ctx.request.body
  if (users.user[name] && users.user[name].password === password) {
    delete users.user[name]
    coverDB(users)
    ctx.response.body = JSON.stringify({mes:'deleteSuccess'})
  }else{
    ctx.response.body = JSON.stringify({mes:'ERROR'})
  }

}

const userList = async (ctx, next) => {
  ctx.response.body = JSON.stringify(readDB("data").user)
}

module.exports = {
  'POST /userlogin' : login,
  'POST /userAdd' : userAdd,
  'PUT /userEdit' : userEdit,
  'DELETE /userDelete' : userDelete,
  'GET /userList' : userList
}