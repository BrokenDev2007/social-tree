import React from 'react';
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import Home from './pages/Home';
import YourFamily from './pages/Yourfamily';
import Profile from './pages/Profile';
import Invite from './pages/Invite'

import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Header from './components/nav/Header';




const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Header />}>
      <Route index element={<Login />} />
      <Route path="home" element={<Home />} />
      <Route path="your-family" element={<YourFamily />} />
      <Route path="profile" element={<Profile />} />
      <Route path="invite/:inviteString" element={<Invite />} />
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
    </Route>
  )
)

function App({routes}) {

  return (
    <>
      <RouterProvider router={router}/>
    </>
  );
}

export default App;