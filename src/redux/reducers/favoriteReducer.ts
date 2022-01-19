/* eslint-disable prettier/prettier */
import { MovieProps } from '../../@types';
import { FavoriteAction } from '../actions/favoriteActions';

type FavoriteState = {
  favorite: Array<MovieProps>;
  errorFavorite?: string | undefined;
};

const initialState: FavoriteState = {
  favorite: [],
  errorFavorite: undefined,
};

const FavoriteReducer = (state: FavoriteState = initialState, action: FavoriteAction) => {
  switch (action.type) {
    case 'ON_SET_FAVORITE_LIST':
      return {
        ...state,
        favorite: action.payload,
      };
    case 'ON_USER_ERROR':
      return {
        ...state,
        errorFavorite: action.payload,
      };
    default:
      return state;
  }
};

export { FavoriteReducer };
