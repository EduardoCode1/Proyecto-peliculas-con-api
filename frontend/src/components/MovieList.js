// frontend/src/components/MovieList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MovieItem from './MovieItem';
import './MovieList.css';

const MovieList = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/movies')
      .then(response => {
        setMovies(response.data);
      })
      .catch(error => {
        console.error('Error fetching movies:', error);
      });
  }, []);

  return (
    <div className="container">
      <h2>Lista de Películas</h2>
      <div className="movie-list">
        {movies.map(movie => (
          <MovieItem key={movie._id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default MovieList;
