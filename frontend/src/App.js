// frontend/src/App.js
import React from 'react';
import MovieList from './components/MovieList';
import AddMovieForm from './components/AddMovieForm';
import './App.css';

const App = () => {
  return (
    <div>
      <header className="app-header">
        My Movie App
      </header>
      <div className="container">
        <AddMovieForm />
        <MovieList />
      </div>
    </div>
  );
};

export default App;
