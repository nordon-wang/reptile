/*
 * @Author: nordon-wang
 * @Date: 2019-08-11 18:57:18
 * @Description: 爬取网站图片
 * @Email: nordon-wang
 */
// const http = require('http')
const http = require('http')
const fs = require('fs')
const cheerio = require('cheerio')
const download = require('download')

const targetUrl = 'http://web.itheima.com/teacher.html#ajavaee'
// const targetUrl = 'https://ttpms.oyohotels.cn/#/login'

let req = http.request(targetUrl, res => {
  let chunks = []
  res.on('data', chunk => {
    chunks.push(chunk)
  })

  res.on('end', () => {
    // utf8 也可以
    const html = Buffer.concat(chunks).toString('utf8')
    
    // 使用 cheerio 解析html
    const HOST = 'http://web.itheima.com/'
    const $ = cheerio.load(html)
    const _img = $('.tea_main .tea_con .li_img img')
    let imgArr = Array.prototype.map.call(_img, ele => `${HOST}${encodeURI($(ele).attr('src'))}`)
    // console.log(imgArr);

    // 使用 download 下载图片
    Promise.all(imgArr.map(x => download(x, 'dist'))).then(() => {
      console.log('files downloaded!');
    });
    
  })
})

// 需要增加 end 才能将请求发送
req.end()