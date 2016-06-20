const createSelector = require('reselect').createSelector


const getRegisterComponent = model => model.registerComponent
const getRegisterComponentId = createSelector(
  getRegisterComponent,
  registerComponent => registerComponent.id
)


