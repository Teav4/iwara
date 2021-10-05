const request = require('request-promise')
const cheerio = require('cheerio')
const { defaultHeaders, SEARCH_URL } = require('../const/global.config')

module.exports = async function search(keyword, cookie, page = 0) {
  
  const response = await request(SEARCH_URL, {
    headers: {
      ...defaultHeaders,
      Cookie: cookie,
    },
    qs: {
      query: encodeURIComponent(keyword),
      page,
    }
  })
  
  const $ = cheerio.load(response)
  const searchResult = $(".node-video")

  let items = []

  searchResult.each((index, e) => {
    const element = $(e)

    let preview = element.find('img').attr() === undefined ? undefined : {
      uri: 'https:' + element.find('img').attr().src,
      width: element.find('img').attr().width,
      height: element.find('img').attr().height,
    }

    items.push({
      id: element.find('.title a')[0].attribs.href.replace("/videos/", ""),
      title: element.find('.title').text().trim(),
      date: element.find('.submitted').contents().filter((index, el) => el.type === 'text')[1].data.trim(),
      author: {
        name: element.find('.submitted').contents().filter((index, el) => el.type === 'text')[0].data.trim(),
        username: element.find('.username').text().trim(),
      },
      views: element.find('.video-info').contents().filter((index, el) => el.type === 'text')[1].data.trim(),
      hearts: element.find('.video-info').contents().filter((index, el) => el.type === 'text')[2].data.trim(),
      preview,
      description: element.find('.field-type-text-with-summary').text(),
    })
  })

  return items
}
