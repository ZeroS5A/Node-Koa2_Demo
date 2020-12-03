const coverDB = (users) => {
  const fs = require('fs')
  fs.writeFileSync('./data/data.json', JSON.stringify(users));
};

const readDB = (dbName) =>{
  return require(`../data/${dbName}.json`)
}

module.exports = {
  coverDB,readDB
}