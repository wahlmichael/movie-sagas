import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App.js';
import registerServiceWorker from './registerServiceWorker';
import { createStore, combineReducers, applyMiddleware } from 'redux';
// Provider allows us to use redux within our react app
import { Provider } from 'react-redux';
import logger from 'redux-logger';
// Import saga middleware
import createSagaMiddleware from 'redux-saga';
import { takeEvery, put } from 'redux-saga/effects'; 
import axios from 'axios';


// Create the rootSaga generator function
function* rootSaga() {
    yield takeEvery('GET_MOVIES', movieSaga)
    yield takeEvery('SET_SINGLE_MOVIE', singleMovieSaga)
    yield takeEvery('EDIT_MOVIE', editMovieSaga)
}

function* editMovieSaga(action) { 
    try {
        // console.log(action.payload)
        axios({
            method: 'PUT',
            url: '/movies',
            data: {
                title: action.payload.title,
                description: action.payload.description,
                id: action.payload.id,
            }
        })
        const movieResponse = yield axios.get('/movies');
        yield put ({ type: 'SET_MOVIE', payload: movieResponse.data[action.payload.id - 1]})
    } catch(error) {
        console.log('error editing movie', error)
    }
  }

function* singleMovieSaga(action) { // sets state to the information of the movie that was clicked
    try {
        const movieResponse = yield axios.get('/movies');
        yield put ({ type: 'SET_MOVIE', payload: movieResponse.data[action.payload - 1]})
    } catch(error) {
        console.log('error fetching movies', error)
    }
  }

function* movieSaga() { // sets state to all movies
    try {
        const movieResponse = yield axios.get('/movies');
        yield put ({ type: 'SET_MOVIES', payload: movieResponse.data})
    } catch(error) {
        console.log('error fetching movies', error)
    }
  }

// Create sagaMiddleware
const sagaMiddleware = createSagaMiddleware();

// Used to store movies returned from the server
const movies = (state = [], action) => {
    switch (action.type) {
        case 'SET_MOVIES':
            return action.payload;
        default:
            return state;
    }
}

// Used to store the movie genres
const genres = (state = [], action) => {
    switch (action.type) {
        case 'SET_GENRES':
            return action.payload;
        default:
            return state;
    }
}

const singleMovie = (state = {}, action) => { // 
    switch(action.type){
        case 'SET_MOVIE':
            return action.payload;
        default:
            return state;
    }
}

// Create one store that all components can use
const storeInstance = createStore(
    combineReducers({
        movies,
        genres,
        singleMovie,
    }),
    // Add sagaMiddleware to our store
    applyMiddleware(sagaMiddleware, logger),
);

// Pass rootSaga into our sagaMiddleware
sagaMiddleware.run(rootSaga);

ReactDOM.render(<Provider store={storeInstance}><App /></Provider>, 
    document.getElementById('root'));
registerServiceWorker();
