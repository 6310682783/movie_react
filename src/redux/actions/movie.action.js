import {
  MOVIE_FETCHING,
  MOVIE_SUCCESS,
  MOVIE_FAILED,
  server,
} from "../../constants/";
import { httpClient } from "../../utils/Api";

export const setMovieFetchingToState = () => ({
  type: MOVIE_FETCHING,
});

export const setMovieSuccessToState = (payload) => ({
  type: MOVIE_SUCCESS,
  payload,
});

export const setMovieFailedToState = (payload) => ({
  type: MOVIE_FAILED,
  payload,
});

export const loadMovieAll = () => {
  return async (dispatch) => {
    dispatch(setMovieFetchingToState());
    try {
      const res = await httpClient.get(
        `${process.env.REACT_APP_API}/${server.MOVIE_URL}/GetAll`
      );
      dispatch(setMovieSuccessToState(res.data));
    } catch (e) {
      dispatch(setMovieFailedToState(e.message));
    }
  };
};
