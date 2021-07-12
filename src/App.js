import FacebookLoginButton from './components/FacebookLoginButton'
import Site from './components/Site'
import {withRouter,} from "react-router-dom";
import React, { useState, useEffect } from 'react';

require('dotenv').config();


function App(props) {

  const [loginResponse, setLoginResponse] = useState("");

  useEffect(() => {
  window.FB.getLoginStatus((authResponse) => {
    console.log(authResponse);
    setLoginResponse(authResponse);
  })}, []);
  
  return (
      <div className="App">
        <FacebookLoginButton setLoginResponse={setLoginResponse}/>
        {loginResponse.status === "connected" && <Site loginResponse={loginResponse} />}
      </div>
  );
}

export default withRouter(App);

