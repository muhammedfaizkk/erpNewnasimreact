import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Admin from './routes/Admin';


function App() {
  return (
    <Router>
      <Routes>
        {Admin()}
      </Routes>
    </Router>
  );
}

export default App;
