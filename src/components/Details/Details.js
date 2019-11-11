import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

const mapReduxStateToProps = reduxState => ({
    reduxState,
});

class Details extends Component { 
  render() {
    return (
      <div>
          <p>Details</p>
          <h1>{this.props.reduxState.singleMovie.title}</h1>
      </div>
    );
  }
}

export default withRouter(connect(mapReduxStateToProps)(Details));