const t = require('tcomb')

const RegisterComponent = t.struct({
  id: t.String,
  input: t.struct({
    id: t.String,
    focused: t.Boolean
  })
})

module.exports = RegisterComponent
