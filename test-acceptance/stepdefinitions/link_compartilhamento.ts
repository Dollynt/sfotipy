import { defineSupportCode } from 'cucumber';
import { browser, element, by, protractor } from 'protractor';
let chai = require('chai').use(require('chai-as-promised'));
let expect = chai.expect;

async function goTo(page: string) {
    await browser.driver.get(`http://localhost:4200/${page}`);
}

async function checkPlaylistName(playlistName: string) {    
    const EC = protractor.ExpectedConditions;
    const playlist = await element(by.className("playlist_name"));
    await browser.wait(EC.visibilityOf(playlist), 5000, "Element not visible");
    expect(await playlist.getText()).to.equal(playlistName);
}

async function checkAvailability(availabity:string) {
    const EC = protractor.ExpectedConditions;
    const playlist_avalibility = await element(by.id('playlist_availability'))
    await browser.wait(EC.visibilityOf(playlist_avalibility), 5000, "Element not visible");
    expect(await playlist_avalibility.getText()).to.equal(availabity);
}

defineSupportCode(function ({ Given, When, Then }) {

    Given(/^estou na playlist "([^\"]*)" que é "([^\"]*)" com id "(\d*)"$/, async (playlistName, availabity, id) => {
        await goTo("playlist/" + id);
        checkPlaylistName(playlistName.toString());
        checkAvailability(availabity.toString());
    });

    When(/^seleciono a opção de compartilhar$/, async () => {
        const share = await element(by.css("i"));
        share.click();
    });

    Then(/^o link "([^\"]*)" é gerado$/, async (lk) => {
        const EC = protractor.ExpectedConditions;
        const shareLink = await element(by.tagName("app-compartilhamento"));
        await browser.wait(EC.visibilityOf(shareLink), 5000, "Element not visible");
        const link = await shareLink.element(by.id("playlist-link"));
        expect(await link.getText()).to.equal(lk);
    });

    Then(/^uma opção "([^\"]*)" é mostrada.$/, async (copyLabel) => {
        const copy = await element(by.id("copy-button"));
        expect(await copy.getText()).to.equal(copyLabel);
    });

    Then(/^posso copiar o link "([^\"]*)"$/, async (link) => {
        const copy = await element(by.id("copy-button"));
        await copy.click();
        const EC = protractor.ExpectedConditions;
        await browser.wait(EC.alertIsPresent(), 5000, "Alert not present");
        const alert = await browser.switchTo().alert();
        await alert.accept();
    });

    When(/^entro na página da playlist "([^\"]*)" com id "(\d*)"$/, async (playlistName, id) => {
        goTo("playlist/" + id);
        const EC = protractor.ExpectedConditions;
        const name = await element(by.css(".playlist_name"));
        await browser.wait(EC.visibilityOf(name), 5000, "Element not visible");
        expect(await name.getText()).to.equal(playlistName);
    });

    When(/^a playlist "([^\"]*)" é "([^\"]*)"$/, async (playlistName, availabity) => {
        checkPlaylistName(playlistName.toString());
        checkAvailability(availabity.toString());
    });

    Then(/^a opção de compartilhar playlist não aparece na tela$/, async () => {
        const notExistingElement = await element(by.tagName("app-compartilhamento"));
        expect(await notExistingElement.isPresent()).to.be.false;
    });

});
