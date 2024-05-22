//Need to add this because acts like a layout wrapper for our application
//Includes navbar to navigate throughout other components. 
import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from '../components/NavBar/NavBar';

const Main = () => {
  return (
    <div>
      <NavBar />
      <Outlet />
    </div>
  );
};

export default Main;
