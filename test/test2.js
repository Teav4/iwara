const Iwara = require('../lib')

;(async function() {
  
  let username = ""
  let password = ""

  await Iwara.login(username, password)

  const list = await Iwara.search("kotori")
  console.log(list)

})()
