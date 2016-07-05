const assert = require('cucumber-assert')

module.exports = function() {

  this.Given('I am on the home page', () => {
    browser.url('http://localhost:5050')
  })

  this.When('I click on begin', () => {
    browser.click('button=Click here to begin')
  })

  this.Then('the page changes to "/mortgage"', cb => {
    assert.equal(browser.getUrl(), 'http://localhost:5050/mortgage', cb)
  })
}
