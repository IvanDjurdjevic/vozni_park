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

    async addCar(lTable, dTable, lMark, dMark, lAge, dAge, lMileage, dMileage, button) {
        await this.findAndSendKeys(lTable, dTable);
        await this.findAndSendKeys(lMark, dMark);
        await this.findAndSendKeys(lAge, dAge);
        await this.findAndSendKeys(lMileage, dMileage);
        await this.findAndClick(button);
    }
}

module.exports = VozniParkPage 
