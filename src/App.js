import React from 'react';
import { Routes, Route } from 'react-router-dom'
import { AddTimesheet, Login, NotFound, Register, RateTimesheet } from './components';
import PrivateRouter from './components/PrivateRouter';
import Home from './containers/Home';

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/" element={<PrivateRouter ><Home /></PrivateRouter>}></Route>
        <Route path="/addtimesheet" element={<PrivateRouter ><AddTimesheet /></PrivateRouter>}></Route>
        <Route path="/ratetimesheet/:id" element={<PrivateRouter ><RateTimesheet /></PrivateRouter>}></Route>
        <Route path="*" component={NotFound}></Route>

      </Routes>
    </>

  );
}

export default App;
