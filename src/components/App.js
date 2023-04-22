import React from 'react'
import {data} from '../data'
import Navbar from './Navbar'
import MovieCard from './MovieCard'
import {addMovies, setShowFavourites} from '../actions'

class App extends React.Component {

  componentDidMount () {
    const {store } = this.props;

    store.subscribe(() => {
      this.forceUpdate();

      console.log('UPDATED');
    });
    
    // make api call
    // Dispatch action
    store.dispatch(addMovies(data));

    console.log('AFTER STATE', store.getState());

  }

  isMovieFavourite = (movie) => {
    const {favourites } = this.props.store.getState();
    const index = favourites.indexOf(movie);

    if ( index !== -1) {
      //found the movie
      return true;
    }
    return false;
  }

  onChangeTab = (val) => {
    this.props.store.dispatch(setShowFavourites(val));
  }

  render() {
    const {list,favourites, showFavourites } = this.props.store.getState(); // {list : [], favourites []}
    console.log('RENDER');
    console.log('list' , list);
    console.log('favourites' , favourites);
    
    const displayMovies = showFavourites ? favourites : list;

    return (
      <div className="App">
        <Navbar />
        <div className="main">
          <div className="tabs">
            <div className={`tab ${showFavourites?'': 'active-tabs'}`} onClick ={() => this.onChangeTab(false)}> Movies</div>
            <div className={`tab ${showFavourites?'active-tabs': ''}`} onClick ={() => this.onChangeTab(true)}> Favourties</div>
          </div>
          <div className="list">
            {displayMovies.map((movie, index) => (
              <MovieCard 
              movie={movie}
              key={movie.imdbID}
              dispatch = {this.props.store.dispatch}
              isMovieFavourite = {this.isMovieFavourite(movie)}
              />
            ))}
          </div>
          {displayMovies.length === 0 ? <div className="no-movies"> No Movies to display! </div>:null}
        </div>
      </div>
    );
  
  }
}

export default App;
