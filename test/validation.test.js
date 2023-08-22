const { Builder, By, Select, until } = require("selenium-webdriver");
const VozniParkPage = require('../pages/VozniParkPage');
require("dotenv").config();
const locator = require("../utils/locators.json");
const data = require("../utils/data.json");
const assert = require("assert");
const path = require("path");
// selenium can't open relative path, and we must find absolute path
const relativePath = "../index.html";
const absoluteFilePath = path.resolve(__dirname, relativePath);
const fileUrl = `file://${absoluteFilePath}`;

describe('Test my Vozni park', async function () {
    let driver;
    let validation;
    beforeEach("Open Vozni park", async function () {
        driver = new Builder().forBrowser(process.env.USE_BROWSER).build();
        validation = new VozniParkPage(driver);
        await validation.visit(fileUrl);
        await validation.maximizeWindow();
    })
    afterEach('Close browser', function () {
        driver.quit(); // unlike driver.close(), driver.quit() closes all windows surely
    })

    it('Open page', async function () {
        await validation.sleep(2);
    })
    it('Correct validation one car', async function () {
        await validation.addCar(locator.tablica, data.test1.tablica, locator.marka, data.test1.marka, 
            locator.godiste, data.test1.godina, locator.kilometraza, data.test1.kilometraza, locator.dugme);
        await validation.sleep(4);
        const rowCount = await validation.numberOfRowsTr(locator.tabela3);
        assert.equal(rowCount, 1);
    })
    it('Add cars to each table', async function () {
        await validation.addCar(locator.tablica, data.test2.tablica1, locator.marka, data.test2.marka1, 
            locator.godiste, data.test2.godina1, locator.kilometraza, data.test2.kilometraza1, locator.dugme);
        await validation.addCar(locator.tablica, data.test2.tablica2, locator.marka, data.test2.marka2, 
            locator.godiste, data.test2.godina2, locator.kilometraza, data.test2.kilometraza2, locator.dugme);
        await validation.addCar(locator.tablica, data.test2.tablica3, locator.marka, data.test2.marka3, 
            locator.godiste, data.test2.godina3, locator.kilometraza, data.test2.kilometraza3, locator.dugme);
        await validation.sleep(4);
        const rowCount1 = await validation.numberOfRowsTr(locator.tabela1);
        const rowCount2 = await validation.numberOfRowsTr(locator.tabela2);
        const rowCount3 = await validation.numberOfRowsTr(locator.tabela3);
        assert.equal(rowCount1, 1);
        assert.equal(rowCount2, 1);
        assert.equal(rowCount3, 1);
    })
    it('All fields must be filled', async function () { // We can test different combinations of empty fields...
        await validation.findAndSendKeys(locator.tablica, data.test3.tablica);
        await validation.findAndSendKeys(locator.marka, data.test3.marka);
        await validation.findAndSendKeys(locator.godiste, data.test3.godina);
        await validation.findAndClick(locator.dugme);
        await validation.sleep(4);
        // await driver.wait(until.alertIsPresent()); // wait alert, this line is unnecessary
        const alert = await driver.switchTo().alert(); // go to alert
        const alertText = await alert.getText();
        assert.equal(data.test3.alertMessageEmptyFields, alertText);
    })
    it('Add one car after alert', async function () {
        await validation.findAndClick(locator.dugme);
        await validation.sleep(2);
        const alert = await driver.switchTo().alert();
        await alert.accept(); // close alert
        await validation.sleep(2);
        await validation.addCar(locator.tablica, data.test4.tablica, locator.marka, data.test4.marka, 
            locator.godiste, data.test4.godina, locator.kilometraza, data.test4.kilometraza, locator.dugme);
        await validation.sleep(2);
        const rowCount = await validation.numberOfRowsTr(locator.tabela2);
        assert.equal(rowCount, 1);
    })
    it('Two cars with same license plate', async function () {
        await validation.addCar(locator.tablica, data.test5.tablica1, locator.marka, data.test5.marka1, 
            locator.godiste, data.test5.godina1, locator.kilometraza, data.test5.kilometraza1, locator.dugme);
        await validation.addCar(locator.tablica, data.test5.tablica2, locator.marka, data.test5.marka2, 
            locator.godiste, data.test5.godina2, locator.kilometraza, data.test5.kilometraza2, locator.dugme);
        await validation.sleep(2);
        const alert = await driver.switchTo().alert();
        const alertText = await alert.getText();
        assert.equal(data.test5.alertSameLicensePlate, alertText);
    })
    it('Two same cars', async function () {
        await validation.addCar(locator.tablica, data.test6.tablica, locator.marka, data.test6.marka, 
            locator.godiste, data.test6.godina, locator.kilometraza, data.test6.kilometraza, locator.dugme);
        await validation.addCar(locator.tablica, data.test6.tablica, locator.marka, data.test6.marka, 
            locator.godiste, data.test6.godina, locator.kilometraza, data.test6.kilometraza, locator.dugme);
        await validation.sleep(3);
        const alert = await driver.switchTo().alert(); // go to alert
        const alertText = await alert.getText();
        assert.equal(data.test6.alertSameCars, alertText);
    })
    it('Car with wrong license plate', async function () {
        await validation.addCar(locator.tablica, data.test7.tablica, locator.marka, data.test7.marka, 
            locator.godiste, data.test7.godina, locator.kilometraza, data.test7.kilometraza, locator.dugme);
        await validation.sleep(3);
        const alert = await driver.switchTo().alert();
        const alertText = await alert.getText();
        assert.equal(data.test7.alertWrongLicensePlate, alertText);
    })
    it('Mileage is less than zero', async function () {
        await validation.addCar(locator.tablica, data.test8.tablica, locator.marka, data.test8.marka, 
            locator.godiste, data.test8.godina, locator.kilometraza, data.test8.kilometraza, locator.dugme);
        await validation.sleep(3);
        const alert = await driver.switchTo().alert();
        const alertText = await alert.getText();
        assert.equal(data.test8.alertMileageLessThanZero, alertText);
    })
    it('Wrong year of the car', async function () {
        await validation.addCar(locator.tablica, data.test9.tablica, locator.marka, data.test9.marka, 
            locator.godiste, data.test9.godina, locator.kilometraza, data.test9.kilometraza, locator.dugme);
        await validation.sleep(3);
        const alert = await driver.switchTo().alert();
        const alertText = await alert.getText();
        assert.equal(data.test9.alertWrongYear, alertText);
    })
    it('Together: wrong licence plate, wrong year of the car, mileage is less than zero, all fields must be filled', async function () {
        await validation.findAndSendKeys(locator.tablica, data.test10.tablica);
        await validation.findAndSendKeys(locator.godiste, data.test10.godina);
        await validation.findAndSendKeys(locator.kilometraza, data.test10.kilometraza);
        await validation.findAndClick(locator.dugme);
        await validation.sleep(2);
        const alert1 = await driver.switchTo().alert();
        const alertText1 = await alert1.getText();
        assert.equal(data.test10.alertWrongLicensePlate, alertText1);
        await alert1.accept();
        await validation.sleep(2);
        const alert2 = await driver.switchTo().alert();
        const alertText2 = await alert2.getText();
        assert.equal(data.test10.alertWrongYear, alertText2);
        await alert2.accept();
        await validation.sleep(2);
        const alert3 = await driver.switchTo().alert();
        const alertText3 = await alert3.getText();
        assert.equal(data.test10.alertMileageLessThanZero, alertText3);
        await alert1.accept();
        await validation.sleep(2);
        const alert4 = await driver.switchTo().alert();
        const alertText4 = await alert4.getText();
        assert.equal(data.test10.alertMessageEmptyFields, alertText4);
        await alert4.accept();
    })
    it('Delete the second car in the third table where are three cars', async function () {
        await validation.addCar(locator.tablica, data.test11.tablica1, locator.marka, data.test11.marka1, 
            locator.godiste, data.test11.godina1, locator.kilometraza, data.test11.kilometraza1, locator.dugme);
        await validation.addCar(locator.tablica, data.test11.tablica2, locator.marka, data.test11.marka2, 
            locator.godiste, data.test11.godina2, locator.kilometraza, data.test11.kilometraza2, locator.dugme);
        await validation.addCar(locator.tablica, data.test11.tablica3, locator.marka, data.test11.marka3, 
             locator.godiste, data.test11.godina3, locator.kilometraza, data.test11.kilometraza3, locator.dugme);
        await validation.sleep(4);
        const rowCount = await validation.numberOfRowsTr(locator.tabela3);
        assert.equal(rowCount, 3);
        const textInTable3 = await validation.getText(locator.tabela3);
        assert.equal(await textInTable3.includes('NS-123-FF'), true);
        assert.equal(await textInTable3.includes('Fiat'), true);
        assert.equal(await textInTable3.includes('1975'), true);
        assert.equal(await textInTable3.includes('90000'), true);
        await validation.findAndClick(locator.theSecondCar);
        await validation.sleep(3);
        const textInTable3_AfterDelete = await validation.getText(locator.tabela3);
        assert.equal(await textInTable3_AfterDelete.includes('NS-123-FF'), false);
        assert.equal(await textInTable3_AfterDelete.includes('Fiat'), false);
        assert.equal(await textInTable3_AfterDelete.includes('1975'), false);
        assert.equal(await textInTable3_AfterDelete.includes('90000'), false);
        const rowCountAfterDelete = await validation.numberOfRowsTr(locator.tabela3);
        assert.equal(rowCountAfterDelete, 2);
    })
})
