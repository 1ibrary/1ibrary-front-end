import { combineReducers } from 'redux'
import userReducer from './modules/user'
import subscribeReducer from './modules/subscribe'
import rentReducer from './modules/rent'

const rootReducer = combineReducers({
  user: userReducer,
  subscribe: subscribeReducer,
  rent: rentReducer
})

export default rootReducer
