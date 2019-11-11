import React, { Component } from 'react';
import './App.css';
import MovieList from '../MovieList/MovieList.js'
import Details from '../Details/Details.js'
import { HashRouter as Router, Route} from 'react-router-dom';

class App extends Component {
  // Renders the entire app on the DOM
  render() {
    return (
      <Router >
        <div className="App">
        <Route exact path='/' component={MovieList}/>
        <Route exact path='/details' render = {() => <Details/>} />
        </div>
      </Router>
    );
  }
}

export default App;
