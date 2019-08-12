/*
 * @Author: nordon-wang
 * @Date: 2019-08-13 00:03:03
 * @Description: 爬取拉钩网的信息
 * @Email: nordon-wang
 */

const {Builder, By, Key, until} = require('selenium-webdriver');
let currentPage = 1;
let maxPage;

(async function start() {
  let driver = await new Builder().forBrowser('chrome').build();
  
  try {
    // 自动打开拉勾网
    await driver.get('https://www.lagou.com/');

    // 关闭弹层
    // 直接选择默认的关闭弹层
    await driver.findElement(By.css('#changeCityBox .checkTips .tab.focus')).click()
    // 切换城市 关闭弹层
    // await driver.findElement(By.css('#changeCityBox > ul.clearfix > li:nth-of-type(3')).click()
    // 输入 前端 开始搜索
    await driver.findElement(By.id('search_input')).sendKeys('前端', Key.RETURN);

    // 查找所有的li
    // let _li = await driver.findElements(By.className('con_list_item'))
    let _li = await driver.findElements(By.css('.item_con_list .con_list_item'))
    let _result = []
    // 迭代数组，获取需要的数据
    for (let i = 0, _len = _li.length; i < _len; i++) {
      const item = _li[i];
      // console.log(await item.getText());
      // 获取岗位名称
      const title = await item.findElement(By.css('.p_top h3')).getText()
      // 获取工作地点
      const position = await item.findElement(By.css('.p_top em')).getText()
      // 获取发布时间
      const time = await item.findElement(By.css('.p_top .format-time')).getText()
      // 获取公司名称
      const companyName = await item.findElement(By.css('.company .company_name')).getText()
      // 获取公司所在行业
      const industry = await item.findElement(By.css('.company .industry')).getText()
      // 获取薪资待遇
      const money = await item.findElement(By.css('.p_bot .money')).getText()
      // 获取链接
      const jdLink = await item.findElement(By.css('.p_top .position_link')).getAttribute('href')
      // 获取需求背景
      let background = await item.findElement(By.css('.p_bot .li_b_l')).getText()
      // 处理需求背景, 因为背景没有在标签内，会获取多余的数据，直接replace
      background = background.replace(money, '')
      // console.log(title, position, time, companyName, industry, money, jdLink, background)
      _result.push(
        {title, position, time, companyName, industry, money, jdLink, background}
      )
    }

    console.log(_result);
  } catch (error) {
    console.log(error);
    
  } finally{
    await driver.quit();
  }

})();

