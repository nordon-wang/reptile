/*
 * @Author: nordon-wang
 * @Date: 2019-08-11 20:58:07
 * @Description: 
 *    目标是希望将来写爬虫的时候，来一个类继承祖宗类
 *    然后在子类中处理得到的结果即可
 * @使用:
 *    创建爬虫对象，传入URL即可
 * @Email: nordon-wang
 */
// 使用 command + shift + b 将ts编译成js
const http = require('http')
import SpiderOptions from './interfaces/SpiderOptions'


class Spider {
  // 定义成员
  options: SpiderOptions

  // 使用接口定义options的成员
  constructor(options: SpiderOptions = { url:'', method: 'get' }) {
    // 初始化
    this.options = options
    
    this.start()
  }

  // 开始爬虫
  start(){
    // 创建请求对象
    const req = http.request(this.options.url, {
      method: this.options.method,
      headers: this.options.headers
    }, (res: any) => {
      let chunks: any[] = []

      res.on('data', (chunk: any) => chunks.push(chunk))

      res.on('end', () => {
        const result = Buffer.concat(chunks).toString('utf-8')
        console.log(result);
        
      })
    })

    // 发送请求
    req.end()
  }

}

export default Spider

