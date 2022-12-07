import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

import { composeWithDevTools } from 'redux-devtools-extension'
import {
  productListReducer,
  productDetailsReducer,
  productDeleteReducer,
  productCreateReducer,
  productUpdateReducer,
  productImportReducer,
} from './reducers/productReducers'
import { cartReducer } from './reducers/cartReducers'
import {
  userLoginReducer,
} from './reducers/userReducers'


const middleware = [thunk]

const cartPersistConfig = {
  key: 'cartItems',
  storage,
  stateReconciler: autoMergeLevel2
}

const userPersistConfig = {
  key: 'userInfo',
  storage,
  stateReconciler: autoMergeLevel2
}


const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  productDelete: productDeleteReducer,
  productCreate: productCreateReducer,
  productUpdate: productUpdateReducer,
  productImport: productImportReducer,
  cart: persistReducer(cartPersistConfig, cartReducer),
  userLogin: persistReducer(userPersistConfig, userLoginReducer),

})

// export const store = configureStore({
//   reducer: reducer,
//   devTools: process.env.NODE_ENV !== 'production',
//   middleware: [thunk]

// })

// export const persistor = persistStore(store)

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(...middleware))
)
  const persistor = persistStore(store)



export  { store, persistor }