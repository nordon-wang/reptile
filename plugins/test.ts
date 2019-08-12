/*
 * @Author: nordon-wang
 * @Date: 2019-08-11 22:52:17
 * @Description: 测试爬虫类
 * @Email: nordon-wang
 */
import Spider from './Spider'

// const url = 'http://web.itheima.com/teacher.html#ajavaee'
const url = 'http://www.itcast.cn/news/json/f1f5ccee-1158-49a6-b7c4-f0bf40d5161a.json'

const spider = new Spider({
  url
})