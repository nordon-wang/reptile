/*
 * @Author: nordon-wang
 * @Date: 2019-08-13 11:05:36
 * @Description: 爬取掘金数据
 * @Email: nordon-wang@oyohotels.cn
 */

const { Builder, By, Key, until } = require('selenium-webdriver');
let _result = []; // 用来收集获取的数据

(async function start() {
  let driver = await new Builder().forBrowser('chrome').build();

  try {
    // 自动打开掘金
    await driver.get('https://juejin.im/timeline');

    // 点击小册子的navBar 切换路由到小册
    await driver
      .findElement(By.css('.main-header-box .nav-item:nth-of-type(4)'))
      .click();
    await driver.sleep(1000)

    // 点击二级菜单
    await clickViewNav(driver);
    await driver.sleep(1000)

    // 获取数据
    await getList(driver);

  } catch (error) {
    console.log(error);
  } finally {
    let timer = setTimeout(async () => {
      clearTimeout(timer);
      await driver.quit();
    }, 600000);
  }
})();

// 获取渲染完成的按钮
async function clickViewNav(driver) {
  while (true) {
    let viewNavError = true;
    
    try {
      await driver
        .findElement(By.css('.main-container .view-nav .nav-item:nth-of-type(2)'))
        .click();
    } catch (error) {
      if (error) viewNavError = false;
    } finally {
      if (viewNavError) break;
    }
  }
}

// 获取列表数据
// 页面在渲染完成之前无法获取到页面的元素
async function getList(driver) {
  while (true) {
    let listViewError = true;
    
    try {
      // 获取小册列表
      let _li = await driver.findElements(By.css('.list-wrap .books-list .item'));
      console.log(_li.length);
      
      for (let i = 0, _len = _li.length; i < _len; i++) {
        const itemInfo = _li[i];
        const title = await itemInfo.findElement(By.css('.info .title')).getText()
        const desc = await itemInfo.findElement(By.css('.info .desc')).getText()
        let price = await itemInfo.findElement(By.css('.info .price-text')).getText()

        _result.push({
          title,
          desc,
          price
        })
      }

      console.log('_result',_result);
      
    } catch (error) {
      if (error) listViewError = false;
    } finally {
      if (listViewError) break;
    }
  }
}
