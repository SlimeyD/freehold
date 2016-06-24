// components
const Main = require('./main')
const Register = require('./register')

module.exports = {
  "/": () => Main,
  "/register": Register
}
