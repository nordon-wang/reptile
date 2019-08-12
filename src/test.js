/*
 * @Author: nordon-wang
 * @Date: 2019-08-12 22:48:06
 * @Description: 根据 selenium 的官方demo进行测试
 * @Email: nordon-wang
 */
const {Builder, By, Key, until} = require('selenium-webdriver');
 
(async function example() {
  let driver = await new Builder().forBrowser('chrome').build();
  try {
    // 自动打开百度 并搜索 酒店
    await driver.get('https://www.baidu.com/');
    // Key.RETURN enter回车
    // By.id('id') 百度查询滴输入内容
    // 找到元素 向里面发送一个关键字并按回撤
    await driver.findElement(By.id('kw')).sendKeys('酒店', Key.RETURN);

    // 等1秒之后，验证是否搜索成功
    // await driver.wait(until.titleIs('酒店_百度搜索'), 1000);
  } finally {
    // 退出
    // await driver.quit();
  }
})();