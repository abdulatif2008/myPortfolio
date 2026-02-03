import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import About from './components/Home/home';

function App() {
  const location = useLocation();

  return (
    <div className="bg-black min-h-screen">
  
      
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<About />} />
        
        </Routes>
      </AnimatePresence>
    </div>
  );
}

export default App;