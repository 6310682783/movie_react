import { combineReducers } from "redux";
import MovieReducer from "../reducers/movie.reducer"

const rootReducer = combineReducers({
    movieReducer: MovieReducer,
})

export default rootReducer;