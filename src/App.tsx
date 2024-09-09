import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Articles from './pages/Articles/Articles';
import NotFound from './pages/NotFound';

const App: React.FC = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Articles />} />
      <Route path="/articles" element={<Articles />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </Router>
);

export default App;
