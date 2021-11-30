import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './routes/Home';
import { AppContextProvider } from './context/AppContext';

import { Container } from 'react-bootstrap';

function App() {
  return (
    <AppContextProvider>
      <Container>
        <Router>
            <Routes>
                <Route exact path="/" element={<Home />} />
            </Routes>
        </Router>
        </Container>
    </AppContextProvider>
  );
}

export default App;
