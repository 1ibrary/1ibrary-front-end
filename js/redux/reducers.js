import { combineReducers } from 'redux'
import userReducer from './modules/user'
import subscribeReducer from './modules/subscribe';

const rootReducer = combineReducers({
  user: userReducer,
  subscribe: subscribeReducer
})

export default rootReducer
