const assert      = require('cucumber-assert')
const Url         = require('url')
const { proxy }   = require('../../config') 

const url = Url.format(proxy)

module.exports = function() {

  this.Given('I am on the "$string" page', pathname => {
    browser.url(`${url}${pathname}`)
  })

  this.When('I click on begin', () => {
    browser.click('button=Click here to begin')
  })

  this.Then('the page changes to "$string"', (pathname, cb) => {
    assert.equal(browser.getUrl(), `${url}${pathname}`, cb)
  })
}
