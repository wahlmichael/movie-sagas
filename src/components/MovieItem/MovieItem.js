import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

const mapReduxStateToProps = reduxState => ({
    reduxState,
});

class MovieItem extends Component { 
    handleClick(movie){
        console.log('movie clicked at id', movie.id)
        this.props.dispatch({ type: 'SET_SINGLE_MOVIE', payload: this.props.movie.id })
        this.props.history.push(`/details`)
    }

  render() {
    return (
      <div onClick={() => this.handleClick(this.props.movie)} className="movieCard">
          <img src={this.props.poster}></img>
          <div>
              <h2>{this.props.title}</h2>
              <p>{this.props.description}</p>
          </div>
      </div>
    );
  }
}

export default withRouter(connect(mapReduxStateToProps)(MovieItem));
