import FacebookLoginButton from './components/FacebookLoginButton'
import Site from './components/Site'
import {withRouter,} from "react-router-dom";
import React, { useState, useEffect } from 'react';
import { Button } from 'bootstrap';

require('dotenv').config();


function App(props) {

  const facebookAppId = process.env.REACT_APP_FACEBOOK_APP_ID;
  const [loginResponse, setLoginResponse] = useState("");
  const [fbSdkStatus, setFbSdkStatus] = useState(0);
  const [logoutStatus, setLogoutStatus] = useState(0);
  
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
        appId: facebookAppId,
        cookie: true,
        xfbml: true,
        version: 'v11.0',
        status: false
    });
    
    setFbSdkStatus(1);

    window.FB.getLoginStatus((authResponse) => {
      console.log(authResponse);
      setLoginResponse(authResponse);
    });

  }

  return (
      <div className="App">
        <FacebookLoginButton setLoginResponse={setLoginResponse} fbSdkStatus={fbSdkStatus}/>
        {loginResponse.status === "connected" && <Site loginResponse={loginResponse} />}
      </div>
  );
}

export default withRouter(App);

