import { configureStore  } from "@reduxjs/toolkit";
import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";
import storage from 'redux-persist/lib/storage'
import useReducer from './reducer/user'

const config = {
    key: 'tickitz',
    version: 1,
    storage
}

const reducers = combineReducers({
    users: useReducer
})

const persistedReducer = persistReducer(config,reducers)

export default configureStore({
    reducer: persistedReducer,
    middleware: (defaultMiddleware) => 
    defaultMiddleware({
        serializableCheck :{
            ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
        }
    })
})