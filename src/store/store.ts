import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE, persistStore } from 'redux-persist'; // persistReducer
// import storage from 'redux-persist/lib/storage';
import rejectedErrorsQueueReducer from './slices/rejectedErrorsQueue';

const reducer = combineReducers({
	rejectedErrorsQueue: rejectedErrorsQueueReducer,
});

const store = configureStore({
	devTools: process.env.NODE_ENV !== 'production',
	reducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
			},
		}),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
