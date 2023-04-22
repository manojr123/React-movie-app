import React from 'react'
import {data} from '../data'
import Navbar from './Navbar'
import MovieCard from './MovieCard'
import {addMovies} from '../actions'

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



  render() {
    const {list,favourites } = this.props.store.getState(); // {list : [], favourites []}
    console.log('RENDER');
    console.log('list' , list);
    console.log('favourites' , favourites);
    

    return (
      <div className="App">
        <Navbar />
        <div className="main">
          <div className="tabs">
            <div className="tab"> Movies</div>
            <div className="tab"> Favourties</div>
          </div>
          <div className="list">
            {list.map((movie, index) => (
              <MovieCard 
              movie={movie}
              key={movie.imdbID}
              dispatch = {this.props.store.dispatch}
              isMovieFavourite = {this.isMovieFavourite(movie)}
              />
            ))}
          </div>
        </div>
      </div>
    );
  
  }
}

export default App;
