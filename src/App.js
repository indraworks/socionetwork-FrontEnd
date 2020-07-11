import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import MainRouter from './MainRouter';
//diisni kita akan wraper Mainrouter yg isinya router2
const App = () => (
  <BrowserRouter>
    <MainRouter />
  </BrowserRouter>
);

export default App;
//jangan paka i => {} sebab functionnya di kmbalikan => ()
