const request = require('request-promise')
const { defaultHeaders } = require('../const/global.config')

module.exports = async function getVideoInfo(videoID, cookie) {

  const videoURL = `https://ecchi.iwara.tv/api/video/${videoID}`
  const response = await request(videoURL, {
    headers: {
      ...defaultHeaders,
      Cookie: cookie,
    },
  })

  const videoList = JSON.parse(response).map(item => ({
    resolution: item.resolution,
    uri: "https:" + item.uri,
    file_extension: item.mime,
  }))

  return videoList
}
