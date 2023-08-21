class BasePage {
    constructor(driver) { // in this case we can call it by any name
        this.driver = driver
    }
    async visit(url) {
        await this.driver.get(url);
    }
    async maximizeWindow() {
        await this.driver.manage().window().maximize()
    }
    async sleep(seconds) {
        await this.driver.sleep(seconds * 1000);
      }
    async find(locator) {
        return this.driver.findElement(locator)
    }
    async findAndSendKeys(locator, text) {
        await (await this.find(locator)).sendKeys(text)
    }
    async findClearAndSendKeys(locator, text) {
        const element = await this.find(locator)
        await element.clear()
        await element.sendKeys(text)
    }
    async selectDropdownByVisibleText(locator, text) {
        const dropdownElement = await this.find(locator)
        const select = new Select(dropdownElement)
        await select.selectByVisibleText(text)

    }

    async findAndClick(locator) {
        await (await this.find(locator)).click()
    }

    async getText(locator) {
        return await (await this.find(locator)).getText()
    }

    async falseAssert(locator, text) {
        assert.equal(await (await this.getText(locator)).includes(text), false)

    }

    async trueAssert(locator, text) {
        assert.equal(await (await this.getText(locator)).includes(text), true)

    }
};

module.exports = BasePage