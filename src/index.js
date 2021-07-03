import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter as Router} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

(function (d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) { return; }
  js = d.createElement(s); js.id = id;
  js.src = "https://connect.facebook.net/en_US/sdk.js";
  fjs.parentNode.insertBefore(js, fjs);
  console.log("finished loading fb sdk");
}(document, 'script', 'facebook-jssdk'));  


window.fbAsyncInit = function () {
  window.FB.init({
      appId: "56833887771",
      cookie: true,
      xfbml: true,
      version: 'v11.0'
  });
  console.log("finished FB.init");

  ReactDOM.render(
    <React.StrictMode>
      <Router> 
        <App />
      </Router> 
    </React.StrictMode>,
    document.getElementById('root')
  )
};


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
