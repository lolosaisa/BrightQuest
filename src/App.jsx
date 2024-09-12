import React from 'react';

import {Routes, Route} from 'react-router-dom';
import LandingPage from './components/landing';
import Signup from './components/signup';
const App = () => {
  
  return (
      <Routes>
        <Route path="/" exact element={<LandingPage />} />
        <Route path="/" exact element={<Signup />} />
      </Routes>
  );
};

export default App;