import { defineSupportCode } from 'cucumber';
import { browser, $, element, ElementArrayFinder, by, protractor, ExpectedConditions } from 'protractor';
let chai = require('chai').use(require('chai-as-promised'));
let expect = chai.expect;

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function assertIncludesInName(set, name) {
    expect(Promise.resolve(set.getText())).to.eventually.includes(name);
}

defineSupportCode(function ({ Given, When, Then }) {
    Given(/^eu estou na página de "([^\"]*)"$/, async (name) => {
        await browser.get("http://localhost:4200/busca");
        await expect(browser.getTitle()).to.eventually.equal(name);
    })

    /*Given(/^todas as músicas estão visíveis$/, async () => {
        await browser.refresh();
        var isCollapsed = element(by.css('.see-more-music'));
        const button = element(by.css('.see-more-music'));
        await browser.executeScript('arguments[0].click()', button.getWebElement());
        await assertIncludesInName(isCollapsed, "menos");
    })*/

    Given(/^eu posso ver a músicas "([^\"]*)" na lista de músicas$/,
        async (music1) => {
            expect((await element.all(by.id(`music-${music1}`))).length).to.equal(1);
        })

    When(/^eu seleciono a opção de tocar a música "([^\"]*)"$/,
        async (music1) => {
            await element(by.id(`play-${music1}`)).click();
        });

    Then(/^a música "([^\"]*)" começa a tocar$/, async (music1) => {
        const audioPlayer = element(by.css('audio'));
        await browser.wait(ExpectedConditions.presenceOf(audioPlayer), 5000, 'O elemento audio não está visível na página');

        expect(await Promise.resolve(audioPlayer.getAttribute('readyState'))).to.equal('4');
        expect(await Promise.resolve(audioPlayer.getAttribute('paused'))).not.to.equal('true');

        const currentMusicName = await element(by.id('current-music-name')).getText();
        expect(currentMusicName).to.equal(music1);
    });

    When(/^eu seleciono a opção de tocar a playlist "([^\"]*)"$/,
        async (playlist) => {
            const player = element(by.id(`play-playlist-${playlist}`));
            await browser.executeScript('arguments[0].click()', player.getWebElement());
        });

    Then(/^a playlist "([^\"]*)" é definida como a playlist atual$/,
        async (playlist) => {
            const audioPlayer = element(by.css('audio'));
            await browser.wait(ExpectedConditions.presenceOf(audioPlayer), 5000, 'O elemento audio não está visível na página');

            const currentPlaylistName = await element(by.id('current-playlist-name')).getText();
            expect(currentPlaylistName).to.equal(playlist);
        });

    Given(/^eu estou na página da playlist "([^\"]*)" cujo id é (\d+)$/, async (playlist, id) => {
        await browser.get("http://localhost:4200/playlist/" + id);
        await sleep(500);
        await expect(browser.getTitle()).to.eventually.equal(playlist);
    });

    Given(/^eu posso ver músicas na lista de músicas$/,
        async () => {
            expect((await element.all(by.name('music-container'))).length).to.be.above(0);
        });

    Given(/^a playlist "([^\"]*)" está tocando$/,
        async (playlist) => {
            await element(by.id(`play-playlist-${playlist}`)).click();
        });

    When(/^eu seleciono a opção de pausar a playlist "([^\"]*)"$/, async (playlist) => {
        await element(by.id(`pause-playlist-${playlist}`)).click();
    });

    Then(/^a playlist "([^\"]*)" é pausada$/, async (playlist) => {
        const audioPlayer = element(by.css('audio'));
        await browser.wait(ExpectedConditions.presenceOf(audioPlayer), 5000, 'O elemento audio não está visível na página');

        expect(await Promise.resolve(audioPlayer.getAttribute('paused'))).to.equal('true');
        const currentPlaylistName = await element(by.id('current-playlist-name')).getText();
        expect(currentPlaylistName).to.equal(playlist);
    });

    Given(/^eu não posso ver músicas na lista de músicas$/,
        async () => {
            expect((await element.all(by.name('music-container'))).length).to.equal(0);
        });

    Then(/^a playlist "([^\"]*)" está pausada$/, async (playlist) => {
        const audioPlayer = element(by.css('audio'));
        await browser.wait(ExpectedConditions.presenceOf(audioPlayer), 5000, 'O elemento audio não está visível na página');

        expect(await Promise.resolve(audioPlayer.getAttribute('paused'))).to.equal('true');
        const currentPlaylistName = await element(by.id('current-playlist-name')).getText();
        expect(currentPlaylistName).to.equal(playlist);
    });
})