import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.js'
import './fonts/InriaSerif-Regular.ttf';
import './fonts/InriaSerif-Bold.ttf';
import './fonts/InriaSerif-Light.ttf';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <div style={{width:"100%", height:"100%", display:"flex", justifyContent:"center", alignContent:"center"}}>
    <App />
  </div>,
)