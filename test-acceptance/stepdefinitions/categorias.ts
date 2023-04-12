import { defineSupportCode } from 'cucumber';
import { browser, $, element, ElementArrayFinder, by, protractor, ExpectedConditions } from 'protractor';
let chai = require('chai').use(require('chai-as-promised'));
let expect = chai.expect;

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function goTo(page: string) {
    await browser.driver.get(`http://localhost:4200/${page}`);
}

async function checkPlaylistName(playlistName: string) {    
    const EC = protractor.ExpectedConditions;
    const playlist = await element(by.className("playlist_name"));
    await browser.wait(EC.visibilityOf(playlist), 5000, "Element not visible");
    expect(await playlist.getText()).to.equal(playlistName);
}

defineSupportCode(function ({ Given, When, Then }) {

    Given(/^possuo login "([^\"]*)" e senha "([^\"]*)"$/, async (email, senha) => {
        goTo("login");
        const EC = protractor.ExpectedConditions;
        const em = element(by.name("email"))
        await browser.wait(EC.visibilityOf(em), 5000, "Element not visible");
        await em.sendKeys(email.toString());
        await element(by.name("password")).sendKeys(senha.toString());
        await element(by.name("entrar")).click();
    });

    Given(/^estou na página da playlist "([^\"]*)" com id "(\d*)"$/, async (playlistName, id) => {
        goTo("playlist/" + id);
        await checkPlaylistName(playlistName.toString());
    });

    Given(/^tenho permissão para gerenciar "([^\"]*)"$/, async (playlistName) => {
        const selector = await element(by.id("selector-cat"));
        expect(await selector.isPresent()).to.be.true;
    });

    Given(/^"([^\"]*)" é uma categoria da playlist "([^\"]*)"$/, async (category, playlistName) => {
        expect((await element.all(by.id(`selected-cat-${category}`))).length).to.equal(1);
    });

    When(/^seleciono a opção de adicionar uma nova categoria$/, async () => {
        await element(by.id("selector-cat")).click();
    });

    When(/^seleciono "([^\"]*)" como uma nova categoria$/, async (category) => {
        const categoryElement = await element(by.id("select-cat-" + category));
        await categoryElement.click();
    });

    Then(/^"([^\"]*)" é uma nova categoria da playlist "([^\"]*)"$/, async (category, playlistName) => {
        const addedElement = await element.all(by.id(`selected-cat-${category}`));
        expect(addedElement.length).to.equal(1);
        const removeElement = await element(by.id("selected-cat-" + category));
        const button = await removeElement.element(by.className("close-button"));
        await button.click();
    });

    Given(/^"([^\"]*)" não é uma categoria da playlist "([^\"]*)"$/, async (category, playlistName) => {
        expect((await element.all(by.id(`selected-cat-${category}`))).length).to.equal(0);
    });

    When(/^seleciono "([^\"]*)" para o remover das categorias$/, async (category) => {
        const removedElement = await element(by.id("selected-cat-" + category));
        const button = await removedElement.element(by.className("close-button"));
        await button.click();
    });

    Then(/^"([^\"]*)" não é mais uma categoria da playlist "([^\"]*)"$/, async (category, playlistName) => {
        const removedElement = await element.all(by.id(`selected-cat-${category}`));
        expect(removedElement.length).to.equal(0);

        const button = await element(by.id("selector-cat"));
        await button.click();
        await button.click();

        const EC = protractor.ExpectedConditions;
        const categoryElement = await element(by.id("select-cat-" + category));
        await browser.wait(EC.visibilityOf(categoryElement), 5000, "Element not visible");
        await categoryElement.click();
    });

    // Scenario : adicionando categoria já existente na playlist

    Then(/^não consigo ver "([^\"]*)" como uma categoria para ser selecionada$/, async (category) => {
        expect((await element.all(by.id(`select-cat-${category}`))).length).to.equal(0);
    });

    Then(/^"([^\"]*)" continua tendo somente uma categoria, que é "([^\"]*)"$/, async (playlistName, category) => {
        expect((await element.all(by.id(`selected-cat-${category}`))).length).to.equal(1);
        await checkPlaylistName(playlistName.toString());
    });

    // Scenario: mais de duas categorias para playlist

    When(/^não consigo encontrar a opção de adicionar uma nova categoria$/, async () => {
        expect((await element.all(by.id("selector-cat"))).length).to.equal(0);
    });

    // Scenario: removendo todas as categorias de uma playlist

    Then(/^"([^\"]*)" e "([^\"]*)" não são mais categorias da playlist "([^\"]*)"$/, async (cat1, cat2, playlistName) => {
        expect((await element.all(by.id(`selected-cat-${cat1}`))).length).to.equal(0);
        expect((await element.all(by.id(`selected-cat-${cat2}`))).length).to.equal(0);
        await checkPlaylistName(playlistName.toString());

        const button = await element(by.id("selector-cat"));
        await button.click();

        const EC = protractor.ExpectedConditions;
        const cat1Element = await element(by.id("select-cat-" + cat1));
        await browser.wait(EC.visibilityOf(cat1Element), 5000, "Element not visible");
        await cat1Element.click();

        const cat2Element = await element(by.id("select-cat-" + cat2));
        await browser.wait(EC.visibilityOf(cat2Element), 5000, "Element not visible");
        await cat2Element.click();
    });

    // Scenario: adicionando duas categorias para a playlist

    Given(/^"([^\"]*)" não possui nenhuma categoria cadastrada$/, async (playlistName) => {
        expect((await element.all(by.className("category"))).length).to.equal(0);
    });

    Then(/^não estou mais logado com login "([^\"]*)" e senha "([^\"]*)"$/, async (login, passw) => {
        const EC = protractor.ExpectedConditions;
        // await element(by.name('perfil')).click();
        const profile = await element(by.name('perfil'));
        await browser.wait(EC.visibilityOf(profile), 5000, "Element not visible");
        await profile.click();
        await element(by.name('sair')).click();
    });

});
