import { MOVIE_FETCHING, MOVIE_SUCCESS, MOVIE_FAILED } from "../../constants";

const initialState = {
  result: null,
  isFetching: false,
  isError: false,
};

const Movie = (state = initialState, { type, payload }) => {
  switch (type) {
    case MOVIE_FETCHING:
      return { ...state, isFetching: true, isError: false, result: null };
    case MOVIE_SUCCESS:
      return { ...state, isFetching: false, isError: false, result: payload };
    case MOVIE_FAILED:
      return { ...state, isFetching: false, isError: true, result: payload };
    default:
      return state;
  }
};

export default Movie;
