var string = ["hello amazing season", "new hero will be made"]
var res = []
res = string.map(item=>{
  let temp = []

  item.split(" ").map(i=>{
    temp.unshift(stingPush(i))
  })
  return temp.join(" ")
})

console.log(res)

function stingPush(str) {
  let ress = '';

  for (let j=str.length-1;j>=0;j--){
    ress=ress.concat(str[j])
  }
  return ress
}