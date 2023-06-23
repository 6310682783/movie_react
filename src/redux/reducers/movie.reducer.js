import {
  MOVIE_FETCHING,
  MOVIE_SUCCESS,
  MOVIE_FAILED,
  MOVIE_SUCCESS_BY_ID,
} from "../../constants";

const initialState = {
  result: null,
  isFetching: false,
  isError: false,
  data: null,
};

const Movie = (state = initialState, { type, payload }) => {
  switch (type) {
    case MOVIE_FETCHING:
      return {
        ...state,
        isFetching: true,
        isError: false,
        result: null,
        data: null,
      };
    case MOVIE_SUCCESS:
      return {
        ...state,
        isFetching: false,
        isError: false,
        result: payload,
        data: null,
      };
    case MOVIE_FAILED:
      return {
        ...state,
        isFetching: false,
        isError: true,
        result: payload,
        data: null,
      };
    case MOVIE_SUCCESS_BY_ID:
      return {
        ...state,
        isFetching: false,
        isError: false,
        result: null,
        data: payload,
      };
    default:
      return state;
  }
};

export default Movie;
