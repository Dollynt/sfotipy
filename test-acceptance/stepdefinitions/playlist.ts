const { Given, When, Then } = require('cucumber');
import { browser, $, element, ElementArrayFinder, by, protractor, ExpectedConditions, ElementFinder, By, Key } from 'protractor';
const { expect } = require('chai');
const {setDefaultTimeout} = require('cucumber');
setDefaultTimeout(10000)

Given(/^I am logged in with "([^"]*)" and "([^"]*)"$/, async (email, password) => {
    await browser.get(`http://localhost:4200/login`);
    const user_input = element(by.css('.email_input'))
    const password_input = element(by.css('.password_input'))
    const login = element(by.css('.login_input_button'))
    await ExpectedConditions.visibilityOf(user_input)
    await user_input.click()
    await user_input.sendKeys(email)
    await password_input.click()
    await password_input.sendKeys(password)
    await login.click()
    
})

Given(/^I am at the "([^"]*)" page$/, async function (page) {
    const playlists = element(by.name('playlists'))
    await playlists.click()
    const addplaylist = element(by.css('.addPlaylist'))
    await ExpectedConditions.visibilityOf(addplaylist)
    await addplaylist.click()
  //await browser.get(`http://localhost:4200/${page}`);
});

When(/^I insert the playlist name "([^"]*)" with the music "([^"]*)"$/, async function (playlistName,musicName) {
  const inputPlaylistName = element(by.css('.playlist_input_name'));
  const searchMusic = element(by.css('.input_musica'));
  const music = element(by.css('.'+musicName))
  await browser.wait(ExpectedConditions.visibilityOf(inputPlaylistName));
  await inputPlaylistName.sendKeys(playlistName);
  await searchMusic.click();
  await searchMusic.sendKeys(musicName);
  await browser.wait(ExpectedConditions.visibilityOf(music))
  await music.click();
});

When('I create the playlist', async function () {
  const createButton = element(by.css('.submit'));
  await createButton.click();
});

Then(/^I can see a confirmation message "([^"]*)"$/, async function (message) {
    const alertIsPresent = protractor.ExpectedConditions.alertIsPresent();
    await browser.wait(alertIsPresent, 5000, "Alert was not found");
  
    const alert = await browser.switchTo().alert();
    const alertText = await alert.getText();
    expect(alertText).contain(message);
  });

Then(/^I am redirected to the "([^"]*)" page$/, async (page) => {
    const alert = await browser.switchTo().alert();
    await alert.accept();
    
})

Then(/^I can see the "([^"]*)" playlist$/,async (playlistName) => {
    const playlists = element.all(by.css('.'+playlistName+'DIV'));
    const count = await playlists.count();
    expect(count).equal(1);
})

/*
Given(/^I have a playlist registered as "([^"]*)"$/, async function (playlistName) {
    const playlists = element.all(by.className(playlistName));
    const count = await playlists.count();
    expect(count).equal(1);
});

/*
When(/^I insert the playlist name "([^"]*)"$/, async function (playlistName) {
const inputPlaylistName = element(by.css('.playlist_input_name'));
await browser.wait(ExpectedConditions.visibilityOf(inputPlaylistName));
await inputPlaylistName.sendKeys(playlistName);
});

When(/^I insert the music "([^"]*)"$/, async function (musicName) {
const searchMusic = element(by.css('.input_musica'));
const music = element(by.css('.'+musicName))
await searchMusic.click();
await searchMusic.sendKeys(musicName);
await browser.wait(ExpectedConditions.visibilityOf(music))
await music.click();
});

When('I create the playlist', async function () {
const createButton = element(by.css('.submit'));
await createButton.click();
});

Then(/^I can see an error message "([^"]*)"$/, async function (message) {
    const alertIsPresent = protractor.ExpectedConditions.alertIsPresent();
    await browser.wait(alertIsPresent, 5000, "Alert was not found");

    const alert = await browser.switchTo().alert();
    const alertText = await alert.getText();
    expect(alertText).contain(message);
});

Then(/^I return to the "([^"]*)" page$/, async function (page) {
    const alert = await browser.switchTo().alert();
    await alert.accept()
})

Given(/^I am at the "([^"]*)" page$/, async function (page) {
    await browser.get(`http://localhost:4200/${page}`);
});

Given(/^I dont have any playlist registered as "([^"]*)"$/, async function (playlistName) {
    const playlists = element.all(by.className(playlistName));
    const count = await playlists.count();
    expect(count).equal(0);
});

When(/^I go to the "([^"]*)" page$/,async (page) => {
    await browser.get(`http://localhost:4200/${page}`);
})

When(/^I insert the playlist name "([^"]*)"$/, async function (playlistName) {
const inputPlaylistName = element(by.css('.playlist_input_name'));
await browser.wait(ExpectedConditions.visibilityOf(inputPlaylistName));
await inputPlaylistName.sendKeys(playlistName);
});

When('I create the playlist', async function () {
const createButton = element(by.css('.submit'));
await createButton.click();
});

Then(/^I can see a confirmation message "([^"]*)"$/, async function (message) {
    const alertIsPresent = protractor.ExpectedConditions.alertIsPresent();
    await browser.wait(alertIsPresent, 5000, "Alert was not found");

    const alert = await browser.switchTo().alert();
    const alertText = await alert.getText();
    expect(alertText).contain(message);
});

Then(/^I return to the "([^"]*)" page$/,async (page) => {
    const alert = await browser.switchTo().alert();
    await alert.accept();
    
})
  
  Then(/^I can see the playlist registered as "([^"]*)"$/,async (playlistName) => {
      const playlists = element.all(by.className(playlistName));
      browser.wait(ExpectedConditions.visibilityOf(playlists.first()), 5000, 'Playlist not found')
  })

Given(/^I am at the "([^"]*)" page$/, async function (page) {
    await browser.get(`http://localhost:4200/${page}`);
  });
  
Given(/^I dont have any playlist registered as "([^"]*)"$/, async function (playlistName) {
    const playlists = element.all(by.className(playlistName));
    const count = await playlists.count();
    expect(count).equal(0);
});

When(/^I go to the "([^"]*)" page$/,async (page) => {
    await browser.get(`http://localhost:4200/${page}`);
})

When(/^I insert the playlist name "([^"]*)"$/, async function (playlistName) {
const inputPlaylistName = element(by.css('.playlist_input_name'));
await browser.wait(ExpectedConditions.visibilityOf(inputPlaylistName));
await inputPlaylistName.sendKeys(playlistName);
});

When(/^I insert the music "([^"]*)"$/, async function (musicName) {
const searchMusic = element(by.css('.input_musica'));
const music = element(by.css('.'+musicName))
await searchMusic.click();
await searchMusic.sendKeys(musicName);
await browser.wait(ExpectedConditions.visibilityOf(music))
await music.click();
});

When('I create the playlist', async function () {
const createButton = element(by.css('.submit'));
await createButton.click();
});

Then(/^I can see an error message "([^"]*)"$/, async function (message) {
    const alertIsPresent = protractor.ExpectedConditions.alertIsPresent();
    await browser.wait(alertIsPresent, 5000, "Alert was not found");

    const alert = await browser.switchTo().alert();
    const alertText = await alert.getText();
    expect(alertText).contain(message);
});

Then(/^I return to the "([^"]*)" page$/, async function (page) {
    const alert = await browser.switchTo().alert();
    await alert.accept()
})

Given(/^I am at the "([^"]*)" page$/, async function (page) {
    await browser.get(`http://localhost:4200/${page}`);
  });
  
Given(/^I see a playlist registered as "([^"]*)"$/, async function (playlistName) {
    const playlists = element.all(by.className(playlistName));
    const count = await playlists.count();
    expect(count).equal(1);
});

When(/^I go to the "([^"]*)" playlist page$/, async function (playlistName) {
    const playlist = element(by.css('.'+playlistName+'DIV'))
    //await browser.executeScript('arguments[0].scrollIntoView()', playlist.getWebElement());
    browser.wait(ExpectedConditions.elementToBeClickable(playlist), 5000)
    await playlist.click()
})

When('I go to the add music option', async function () {
    const button = element(by.css('.addmusicbutton'))
    browser.wait(ExpectedConditions.elementToBeClickable(button), 5000)
    await button.click()
})

When(/^I add the music "([^"]*)"$/, async function (musicName) {
    const searchMusic = element(by.css('.input_musica'));
    const music = element(by.css('.'+musicName))
    const addButton = element(by.css('.addMusicButton'))
    await searchMusic.click();
    await searchMusic.sendKeys(musicName);
    await browser.wait(ExpectedConditions.visibilityOf(music))
    await music.click();
    await browser.wait(ExpectedConditions.visibilityOf(addButton))
    
    });


Then(/^I can see a confirmation message "([^"]*)"$/, async function (message) {
    
});


/*
When('I select the playlist {string}', async function (playlistName) {
  const playlistList = element.all(by.css('.playlist-list .playlist-item'));
  await playlistList.filter(async function (playlistItem) {
    const title = await playlistItem.element(by.css('.title')).getText();
    return title === playlistName;
  }).then(async function (filteredPlaylists) {
    expect(await filteredPlaylists.length).toEqual(1);
    await filteredPlaylists[0].click();
  });
});

When('I update the playlist name as {string}', async function (newPlaylistName) {
  const inputPlaylistName = element(by.css('#playlist-name'));
  await inputPlaylistName.clear();
  await inputPlaylistName.sendKeys(newPlaylistName);
  const updateButton = element(by.css('#update-button'));
  await updateButton.click();
});

When('I select the option {string}', async function (option) {
  const optionButton = element(by.css(`#${option}-button`));
  await optionButton.click();
});

When('I search for the playlist {string}', async function (playlistName) {
  const searchInput = element(by.css('#search-input'));
  await searchInput.sendKeys(playlistName);
  const searchButton = element(by.css('#search-button'));
  await searchButton.click();
});
*/

