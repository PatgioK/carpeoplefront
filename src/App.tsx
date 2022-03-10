import React from 'react';
import { Outlet } from 'react-router-dom';
import './App.css';
import NavBar from './features/navbar';
import People from './features/people/people';

function App() {
  return (
    <div className="App container">
      <NavBar />
      <Outlet />
      {/* <People /> */}
    </div>
  );
}

export default App;
