const assert = require('cucumber-assert')
const Url = require('url')
const { proxy } = require('../../config')

const url = Url.format(proxy)

module.exports = function () {
  this.Given('I am on the "$string" page', pathname => {
    browser.url(`${url}${pathname}`)
  })

  this.When('I click on begin', () => {
    browser.click('button=Click here to begin')

  })

  this.When('I enter my email: "$string"', email => {
    browser.setValue('input[type="email"]', email)
  })

  this.When('I click "$string"', text => {
    browser.click(`=${text}`)
  })

  this.Then('the page changes to "$string"', (pathname, cb) => {
    assert.equal(browser.getUrl(), `${url}${pathname}`, cb)
  })

  this.Then(
    'I see a notification telling me: "$string"', (message, cb) => {
      const notification = browser.element('.notification')
      notification.waitForExist(5000)
      assert.equal(notification.getText(), message, cb)
    })
}
