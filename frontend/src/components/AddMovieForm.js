// frontend/src/components/AddMovieForm.js
import React, { useState } from 'react';
import axios from 'axios';

const AddMovieForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    protagonist: '',
    features: '',
    movieURL: '',
    imageURL: '',
    category: ''
  });

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    axios.post('http://localhost:5000/movies', formData)
      .then(response => {
        console.log('Movie added:', response.data);
        // Clear form data after successful submission
        setFormData({
          title: '',
          protagonist: '',
          features: '',
          movieURL: '',
          imageURL: '',
          category: ''
        });
      })
      .catch(error => {
        console.error('Error adding movie:', error);
      });
  };

  return (
    <div>
      <h2>Agregar Película</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="title" placeholder="Título" value={formData.title} onChange={handleChange} />
        <input type="text" name="protagonist" placeholder="Protagonista" value={formData.protagonist} onChange={handleChange} />
        <input type="text" name="features" placeholder="Características" value={formData.features} onChange={handleChange} />
        <input type="text" name="movieURL" placeholder="URL de la Película" value={formData.movieURL} onChange={handleChange} />
        <input type="text" name="imageURL" placeholder="URL de la Imagen" value={formData.imageURL} onChange={handleChange} />
        <input type="text" name="category" placeholder="Categoría" value={formData.category} onChange={handleChange} />
        <button type="submit">Agregar Película</button>
      </form>
    </div>
  );
};

export default AddMovieForm;
