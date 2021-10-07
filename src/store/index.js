import {createStore, applyMiddleware, combineReducers, compose} from 'redux'
import thunk from 'redux-thunk'
import {persistReducer, persistStore} from 'redux-persist'
import AsyncStorage from '@react-native-async-storage/async-storage';

import authReducer from './reducers/auth'
import stageReducer from './reducers/stage'

//import ApiMiddleware from './middleware/api'

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: ['ui', 'error', 'blog'],
}

const rootReducer = combineReducers({
  auth: authReducer,
  stage: stageReducer
})

let composeEnhancers = compose

if (__DEV__) {
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
}

const middlewares = [thunk]
const store = createStore(
  persistReducer(persistConfig, rootReducer),
  composeEnhancers(applyMiddleware(...middlewares)),
)

/* const persistor = callback => {
  return persistStore(store, null, callback)
} */
let persistor = persistStore(store)

export {store, persistor}
