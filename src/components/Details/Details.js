import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

const mapReduxStateToProps = reduxState => ({
    reduxState,
});

class Details extends Component { 
    handleBackClick = () => {
        this.props.history.push('/')
    }

    handleEditClick = () => {
        this.props.history.push('/edit')
    }
  render() {
    return (
      <div>
          <button onClick={this.handleBackClick}>Back to list</button>
          <button onClick={this.handleEditClick}>Edit</button>
          <h1>{this.props.reduxState.singleMovie.title}</h1>
          <p>{this.props.reduxState.singleMovie.description}</p>
          <p>{this.props.reduxState.singleMovie.genre_array}</p>
          <pre>{JSON.stringify(this.props.reduxState.singleMovie.genre_array)}</pre>
      </div>
    );
  }
}

export default withRouter(connect(mapReduxStateToProps)(Details));