// frontend/src/App.js
import React from 'react';
import MovieList from './components/MovieList';
import AddMovieForm from './components/AddMovieForm';

const App = () => {
  return (
    <div>
      <h1>My Movie App</h1>
      <AddMovieForm />
      <MovieList />
    </div>
  );
};

export default App;
