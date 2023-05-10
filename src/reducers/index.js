import {ADD_MOVIES,ADD_MOVIE_TO_LIST, ADD_TO_FAVOURITE,REMOVE_FROM_FAVOURITE,SET_SHOW_FAVOURITES,ADD_SEARCH_RESULT} from '../actions';
import { combineReducers } from 'redux';

const initialMoviesState = {
    list : [],
    favourites : [],
    showFavourites : false
}
export  function moviesReducer(state=initialMoviesState, action ) {
    // if (action.type === ADD_MOVIES) {
    //     return {
    //         ...state,
    //         list:action.movies,
    //     };
    // }
    // return state;

    console.log('MOVIES REDUCER called ...')
    switch (action.type) {
        case ADD_MOVIES:
            return {
                ...state,
                list : action.movies
            }
        case ADD_TO_FAVOURITE:
            return {
                ...state,
                favourites : [action.movie, ...state.favourites]
            }
        case REMOVE_FROM_FAVOURITE:
            const filteredArray = state.favourites.filter(
                movie => movie.Title !== action.movie.Title
            );
            return {
                ...state,
                favourites : filteredArray
            }
        case SET_SHOW_FAVOURITES:
            return {
                ...state,
                showFavourites : action.val
            }


        default :
        return state;
            
    }
}

const initialSearchState = {
    result: {},
    showSearchResults: false,
}

export function searchReducer (state = initialSearchState, action ) {
    console.log('SEARCH REDUCER called ...')

  //ADD_SEARCH_RESULT;
  switch (action.type) {
    case ADD_SEARCH_RESULT:
      return {
        ...state,
        result: action.movie,
        showSearchResults: true,
      };
    case ADD_MOVIE_TO_LIST:
      return {
        showSearchResults: false,
      };
    default:
      return state;
  }
}


const initialRootState = {
    movies : initialMoviesState,
    search : initialSearchState
}

// export default function rootReducer (state = initialRootState, action ) {
//     return {
//         movies : movies(state.movies, action),
//         search : search(state.search, action)
//     }
// }

export default combineReducers( {
    movies : moviesReducer , 
    search : searchReducer
})