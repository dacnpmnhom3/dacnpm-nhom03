import React from 'react';
import { Routes as RoutesDom } from 'react-router-dom';
import { RenderRoutes, Routes } from './routes';

function App() {
  const user = {
    userInfo: {
      username: '',
      email: '',
    },
    token: '',
    isAuth: false,
    isAdmin: false,
  };
  return (
    <div className='App'>
      <RoutesDom>{RenderRoutes(Routes, user, location)}</RoutesDom>
    </div>
  );
}

export default App;
