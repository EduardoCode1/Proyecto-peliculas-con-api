import React, { useState } from 'react';
import axios from 'axios';
import './MovieItem.css';

const MovieItem = ({ movie }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedMovie, setEditedMovie] = useState({
    title: movie.title,
    protagonist: movie.protagonist,
    features: movie.features,
    movieURL: movie.movieURL,
    imageURL: movie.imageURL,
    category: movie.category
  });

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    axios.put(`http://localhost:5000/movies/${movie._id}`, editedMovie)
      .then(response => {
        console.log(response.data.message);
        setIsEditing(false);
        window.location.reload();
      })
      .catch(error => {
        console.error('Error editing movie:', error);
      });
  };

  const handleDelete = () => {
    if (window.confirm('¿Estás seguro de que quieres eliminar esta película?')) {
      axios.delete(`http://localhost:5000/movies/${movie._id}`)
        .then(response => {
          console.log(response.data.message);
          window.location.reload();
        })
        .catch(error => {
          console.error('Error deleting movie:', error);
        });
    }
  };

  const handleChange = e => {
    setEditedMovie({ ...editedMovie, [e.target.name]: e.target.value });
  };

  return (
    <div className="movie-item">
      {isEditing ? (
        <div>
          <input type="text" name="title" value={editedMovie.title} onChange={handleChange} />
          <input type="text" name="protagonist" value={editedMovie.protagonist} onChange={handleChange} />
          <input type="text" name="features" value={editedMovie.features} onChange={handleChange} />
          <input type="text" name="movieURL" value={editedMovie.movieURL} onChange={handleChange} />
          <input type="text" name="imageURL" value={editedMovie.imageURL} onChange={handleChange} />
          <input type="text" name="category" value={editedMovie.category} onChange={handleChange} />
          <button className="save-button" onClick={handleSave}>Guardar</button>
        </div>
      ) : (
        <div>
          <h3>{movie.title}</h3>
          <p><strong>Protagonista:</strong> {movie.protagonist}</p>
          <p><strong>Características:</strong> {movie.features}</p>
          <p><strong>Categoría:</strong> {movie.category}</p>
          <a href={movie.movieURL}><strong>Ver Película</strong></a>
          <br />
          <img src={movie.imageURL} alt={movie.title} />
          <br />
          <button className="edit-button" onClick={handleEdit}>Editar</button>
          <button className="delete-button" onClick={handleDelete}>Eliminar</button>
        </div>
      )}
    </div>
  );
};

export default MovieItem;
