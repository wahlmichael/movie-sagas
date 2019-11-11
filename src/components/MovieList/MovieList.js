import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import MovieItem from '../MovieItem/MovieItem';

const mapReduxStateToProps = reduxState => ({
    reduxState,
});



class MovieList extends Component {
    componentDidMount() {
        this.getMovies();
        // use component did mount to dispatch an action to request the plantList from the API
    }
    
    getMovies(){
        console.log('hello from get movies in movie list');
        this.props.dispatch({ type: 'GET_MOVIES' })
    }
  render() {
    return (
      <div>
        {this.props.reduxState.movies.map(movie => {
            return <MovieItem
                id={movie.id}
                title={movie.title}
                poster={movie.poster}
                description={movie.description}
                movie={movie}
            />
        })}
        {/* <pre>{JSON.stringify(this.props.reduxState.movies)}</pre> */}
      </div>
    );
  }
}

export default connect(mapReduxStateToProps)(MovieList);
