import React from 'react';
import { Outlet } from 'react-router-dom';
import './App.css';
import NavBar from './features/navbar';

function App() {
  return (
    <div className="App container">
      <NavBar />
      <Outlet />
    </div>
  );
}

export default App;
