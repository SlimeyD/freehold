const t = require('cucumber-assert')

module.exports = function() {

  this.Given(/^I have visited Google$/, function () {
    browser.url('http://google.com')
  })

  this.When(/^I search for "([^"]*)"$/, function (searchTerm) {
    browser.setValue('input[name="q"]', searchTerm);
    browser.keys(['Enter'])
  })

  this.Then(/^I see "([^"]*)"$/, function (link) {
    browser.waitForExist(`a=${link}`, 5000) 
  })
  
  this.Given(/^I am a user$/, function () {

  })

  this.Given(/^I have visited the home page$/, function () {
    browser.url('http://localhost:5050')
  })

  this.When(/^I click on begin$/, function () {
    browser.click('button=Click here to begin')
  })

  this.Then(/^the page changes to mortgage$/, function (cb) {
    const url = browser.getUrl()
    t.equal(url, 'http://localhost:5050/mortgage', cb)
  })
}
