// backend/index.js
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB (replace 'mongodb://localhost/movieDB' with your MongoDB URI)
mongoose.connect('mongodb://localhost/movieDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Define movie schema and model
const movieSchema = new mongoose.Schema({
  title: String,
  protagonist: String,
  features: String,
  movieURL: String,
  imageURL: String,
  category: String
});

const Movie = mongoose.model('Movie', movieSchema);

// Routes
app.get('/movies', async (req, res) => {
  try {
    const movies = await Movie.find();
    res.json(movies);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

app.post('/movies', async (req, res) => {
  const { title, protagonist, features, movieURL, imageURL, category } = req.body;
  try {
    const newMovie = new Movie({ title, protagonist, features, movieURL, imageURL, category });
    await newMovie.save();
    res.status(201).json(newMovie);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: 'Invalid data' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
// Ruta para modificar una película
app.put('/movies/:id', async (req, res) => {
    const { title, protagonist, features, movieURL, imageURL, category } = req.body;
    try {
      const updatedMovie = await Movie.findByIdAndUpdate(req.params.id, { title, protagonist, features, movieURL, imageURL, category }, { new: true });
      res.json(updatedMovie);
    } catch (err) {
      console.error(err);
      res.status(400).json({ error: 'Invalid data' });
    }
  });
  
  // Ruta para eliminar una película
  app.delete('/movies/:id', async (req, res) => {
    try {
      await Movie.findByIdAndDelete(req.params.id);
      res.json({ message: 'Movie deleted successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    }
  });