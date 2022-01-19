/* eslint-disable prettier/prettier */
import { Dispatch } from 'react';
import { MovieProps } from '../../@types';

export interface SetUserFavoriteListAction {
  readonly type: 'ON_SET_FAVORITE_LIST';
  payload: Array<MovieProps>;
}

export interface ErrorActionUser {
  readonly type: 'ON_USER_ERROR';
  payload: any;
}

export type FavoriteAction =
  | SetUserFavoriteListAction
  | ErrorActionUser;

export const setFavoriteList =
  (value: Array<MovieProps>) => async (dispatch: Dispatch<FavoriteAction>) => {
    try {
      dispatch({
        type: 'ON_SET_FAVORITE_LIST',
        payload: value,
      });
    } catch (error) {
      dispatch({
        type: 'ON_USER_ERROR',
        payload: error,
      });
    }
  };
