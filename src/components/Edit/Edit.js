import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

const mapReduxStateToProps = reduxState => ({
    reduxState,
});

class Edit extends Component { 
    handleCancelClick = () => {
        this.props.history.push('/details')
    }
  render() {
    return (
      <div>
          <button onClick={this.handleCancelClick}>Cancel</button>
          <button>Save</button>
          <p>edit {this.props.reduxState.singleMovie.title}</p>
      </div>
    );
  }
}

export default withRouter(connect(mapReduxStateToProps)(Edit));
