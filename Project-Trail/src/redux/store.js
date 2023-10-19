import { combineReducers, createStore } from "redux";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import UserReducer from "./Reducers/UserReducer";

const appReducer = combineReducers({
    userInfo: UserReducer,
})

const persistConfig = {
    key: 'mecha-user',
    storage
}

const persistedReducer = persistReducer(persistConfig, appReducer);

export const store = createStore(persistedReducer);

export const persistor = persistStore(store);