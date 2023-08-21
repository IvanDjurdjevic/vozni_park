const BasePage = require('./BasePage');
const {By} = require('selenium-webdriver');

class VozniParkPage extends BasePage {
    constructor(driver){
        super(driver)
    }

    async numberOfRowsTr(locator) {
        const tbodyElement = await this.find(locator);
        const rows = await tbodyElement.findElements(By.css('tr'));
        const rowCount = await rows.length;

        return rowCount
    }
}

module.exports = VozniParkPage 
