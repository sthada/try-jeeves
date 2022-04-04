/**
 * Created by Shivam on  -29-Mar-22.
 */
 import { createStore, applyMiddleware, compose } from 'redux'
 import thunk from 'redux-thunk'
 import rootReducer from './reducers'
 
 const middleware = [
   thunk
 ]
 
 const composedEnhancers = compose(
   applyMiddleware(...middleware)
 )
 
 const store = createStore(
   rootReducer,
   composedEnhancers
 )
 
 export default store