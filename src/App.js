import './App.less';
import React from 'react';
import Navbar from './components/Navbar/Navbar.jsx';
import { BrowserRouter } from 'react-router-dom';
import Routes from './Paths/Routes';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes />
      </BrowserRouter>
    </div>
  );
}

export default App;
