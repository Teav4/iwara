const login = require('./modules/login')
const search = require('./modules/search')
const videoInfo = require('./modules/videoInfo')

class IwaraAPI {
  cookie = null
  
  async login(username, password) {
    this.cookie = await login(username, password)
  }

  async search(keyword, page = 0) {
    return await search(keyword, this.cookie, page)
  }

  async getVideoURL(videoID) {
    return await videoInfo(videoID, this.cookie)
  }

}

module.exports = new IwaraAPI()
