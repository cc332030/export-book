/**
 * <p>
 *   Description: index
 * </p>
 * @author c332030
 * @since 2024/4/26
 */
const fs = require('fs');
const {Builder, Browser, By} = require("selenium-webdriver");

async function main() {

    const {Builder, Browser} = require('selenium-webdriver');

    const driver = await new Builder().forBrowser(Browser.CHROME).build();
    await driver.get('https://www.hetushu.com/book/115/84227.html');

    let header = await driver.findElement(By.id('content'));
    // Captures the element screenshot
    let encodedString = await header.takeScreenshot(true);
    // save screenshot as below
    await fs.writeFileSync('./image.png', encodedString, 'base64');

    // let text = await driver.findElement(By.id('content')).getText();
    // console.log('text', text);

    await driver.quit();

}

main()
