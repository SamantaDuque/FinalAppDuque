// src/app/store.jsx 
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistReducer, persistStore } from 'redux-persist';



import productsReducer from '../store/productsSlice';
import cartReducer from '../store/cartSlice';
import authReducer from '../store/authSlice';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['cart', 'auth'], 
};

const rootReducer = combineReducers({
   products: productsReducer,
  cart: cartReducer,
  auth: authReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);


export const store = configureStore({
  reducer: persistedReducer,

  middleware: (getDefaultMiddleware) =>
   getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [
          'persist/PERSIST',
          'persist/REHYDRATE',
          'persist/PAUSE',
          'persist/FLUSH',
          'persist/PURGE',
          'persist/REGISTER',
     ],
 },
 }), 
});

export const persistor = persistStore(store);
export default store; 