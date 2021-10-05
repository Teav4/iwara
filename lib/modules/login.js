const request = require('request')
const { defaultHeaders, LOGIN_URL } = require('../const/global.config')

module.exports = function login(username, password) {
  const loginData = {
    name: username,
    pass: password,
    form_build_id: 'form-53GDARDWdDQSU9Y0ExW4MTS-Zm2fQyEMw86k0oEME1c',
    form_id: 'user_login',
    antibot_key: '13ac4273dc853636a2413f2d70b438ff',
    op: 'ログイン'
  }

  const requestOtps = {
    headers: defaultHeaders,
    method: 'POST',
    formData: loginData,
  }

  return new Promise((resolve) => {
    const handleCallback = (error, response, body) => {
      let cookie = response.headers['set-cookie'][0].split("; ")[0]

      resolve(cookie + "; has_js=1; show_adult=1")
    }
  
    request(LOGIN_URL, requestOtps, handleCallback)
  })
}
