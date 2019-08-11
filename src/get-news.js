/*
 * @Author: nordon-wang
 * @Date: 2019-08-11 19:55:23
 * @Description: 爬取新闻信息
 * @Email: nordon-wang@oyohotels.cn
 */

const http = require('http')

const HOST = 'http://www.itcast.cn/news/json/f1f5ccee-1158-49a6-b7c4-f0bf40d5161a.json'

const req = http.request(HOST,{
  method: 'post',
  headers:{ // 将请求头的信息复制过来
    Accept: '*/*'
  }
}, (res) => {
  let chunks = []

  res.on('data', chunk => chunks.push(chunk))

  res.on('end', () => {
    // result 拿到数据 进行个性化处理
    const result = Buffer.concat(chunks).toString('utf8')
    console.log(JSON.parse(result));
    
  })
})

req.end()