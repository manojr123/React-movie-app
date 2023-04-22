import React from 'react'


class MovieCard extends React.Component {

    render() {
        const {movie} = this.props;

        return (
            <div className="movie-card">
                <div className="left">
                    <img alt="movie-poster" src={movie.Poster} />
                </div>
                <div>
                    <div className="title"> {movie.Title}</div>
                    <div className="plot"> {movie.plot}</div>
                    <div className="footer"> 
                        <div className="rating"> {movie.ibddRating}</div>
                        <button className="favourite-btn"> Favourite</button>                    
                    </div>
                </div>
            </div>
          );
    }
  
}

export default MovieCard;
