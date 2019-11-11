import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

const mapReduxStateToProps = reduxState => ({
    reduxState,
});

class Edit extends Component { 
    state = {
        title: '',
        description: '',
        id: this.props.reduxState.singleMovie.id,
    }

    handleTitleChange = (event) => {
        this.setState({
            ...this.state,
            title: event.target.value
        })
    }

    handleDescriptionChange = (event) => {
        this.setState({
            ...this.state,
            description: event.target.value
        })
    }

    handleCancelClick = () => {
        this.props.history.push('/details')
    }

    handleSaveClick = () => {
        this.props.dispatch({ type: 'EDIT_MOVIE', payload: this.state })
        this.props.history.push('/details')
    }
  render() {
    return (
      <div>
          <button onClick={this.handleCancelClick}>Cancel</button>
          <button onClick={this.handleSaveClick}>Save</button>
          <br/>
          <input onChange={this.handleTitleChange}></input>
          <br/>
          <textarea onChange={this.handleDescriptionChange}/>
          <p>edit {this.props.reduxState.singleMovie.title}</p>
          {/* <pre>{JSON.stringify(this.state)}</pre> */}
      </div>
    );
  }
}

export default withRouter(connect(mapReduxStateToProps)(Edit));
