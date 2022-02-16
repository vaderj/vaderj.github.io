import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
const url = new URL(window.location.href);
const debugCheckString = url.searchParams.get("debug");
const debugCheck =  debugCheckString == "true" ? true : false ;

ReactDOM.render(
  <React.StrictMode>
    <App debug={debugCheck} />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
