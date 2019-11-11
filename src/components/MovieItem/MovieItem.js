import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

const mapReduxStateToProps = reduxState => ({
    reduxState,
});

class MovieItem extends Component { 
  render() {
    return (
      <div className="movieCard">
          <img src={this.props.poster}></img>
          <div>
              <h2>{this.props.title}</h2>
              <p>{this.props.description}</p>
          </div>
      </div>
    );
  }
}

export default MovieItem;
