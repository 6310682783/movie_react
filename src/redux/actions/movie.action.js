import {
  MOVIE_FETCHING,
  MOVIE_SUCCESS,
  MOVIE_FAILED,
  server,
  MOVIE_SUCCESS_BY_ID,
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

export const setMovieSuccessByIDToState = (payload) => ({
  type: MOVIE_SUCCESS_BY_ID,
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

export const loadMovieById = (id) => {
  return async (dispatch) => {
    dispatch(setMovieFetchingToState());
    try {
      const res = await httpClient.get(
        `${process.env.REACT_APP_API}/${server.MOVIE_URL}/GetById/${id}`
      );
      dispatch(setMovieSuccessByIDToState(res.data));
    } catch (e) {
      dispatch(setMovieFailedToState(e.message));
    }
  };
};

export const addMovie = (formdata) => {
  console.log(formdata);
  return async (dispatch) => {
    try {
      const res = await httpClient.post(
        `${process.env.REACT_APP_API}/${server.MOVIE_URL}/Add`,
        formdata
      );
      if (res.data.isSuccess) {
        dispatch(setMovieSuccessToState(res.data));
        return res.data;
      } else {
        dispatch(setMovieFailedToState(res.data.message));
      }
    } catch (e) {
      dispatch(setMovieFailedToState(e.message));
    }
  };
};

export const editMovie = (formdata) => {
  console.log(formdata);
  return async (dispatch) => {
    try {
      const res = await httpClient.patch(
        `${process.env.REACT_APP_API}/${server.MOVIE_URL}/Update`,
        formdata
      );
      if (res.data.isSuccess) {
        dispatch(setMovieSuccessToState(res.data));
        return res.data;
      } else {
        dispatch(setMovieFailedToState(res.data.message));
      }
    } catch (e) {
      dispatch(setMovieFailedToState(e.message));
    }
  };
};

export const deleteMovieById = (id) => {
  return async (dispatch) => {
    dispatch(setMovieFetchingToState());
    try {
      const res = await httpClient.delete(
        `${process.env.REACT_APP_API}/${server.MOVIE_URL}/Delete/${id}`
      );
      dispatch(setMovieSuccessByIDToState(res.data));
      return res.data;
    } catch (e) {
      dispatch(setMovieFailedToState(e.message));
    }
  };
};
