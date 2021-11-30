import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './routes/Home';
import { AppContextProvider } from './context/AppContext';
import SliderSizes from './components/Slider';
function App() {
  return (
    <AppContextProvider>
      <div className="container">
        <Router>
            <Routes>
                <Route exact path="/" element={<Home />} />
            </Routes>
        </Router>
      </div>
      <SliderSizes />
    </AppContextProvider>
  );
}

export default App;
