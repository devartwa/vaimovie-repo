import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { FavoriteReducer } from './favoriteReducer';

const persistFavoriteConfig = {
  key: 'persistFavorite',
  storage: AsyncStorage,
  whitelist: ['favorite'],
};

const rootReducer = combineReducers({
  // Add reducers here
  favoriteReducer: persistReducer(persistFavoriteConfig, FavoriteReducer),
});

export type ApplicationState = ReturnType<typeof rootReducer>;

export { rootReducer };
