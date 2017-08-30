import { AsyncStorage } from 'react-native'
import { createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { autoRehydrate, persistStore } from 'redux-persist'
import rootReducer from './reducers'

const enhancer = composeWithDevTools({})(
  autoRehydrate()
)

const store = createStore(rootReducer, enhancer)

persistStore(store, {
  storage: AsyncStorage,
  blacklist: ['routes']
})

export default store
