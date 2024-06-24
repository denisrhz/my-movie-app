import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Home from './components/Home';
import Movies from './components/Movies';
import Movie from './components/Movie';
import { I18nextProvider } from 'react-i18next';
import i18n from './utils/i18n';

const App = () => {
  return (
    <I18nextProvider i18n={i18n}>
    <Router>
      <Routes>
        <Route path="/" element={<Movies />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/movies/:movieId" element={<Movie />} />
      </Routes>
    </Router>
    </I18nextProvider>
  );
}

export default App;