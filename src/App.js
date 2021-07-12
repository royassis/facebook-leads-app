import FacebookLoginButton from './components/FacebookLoginButton'
import Site from './components/Site'
import {withRouter,} from "react-router-dom";
import React, { useState } from 'react';

require('dotenv').config();


function App(props) {

  var loginResponse_ = "";

  window.FB.getLoginStatus((authResponse) => {
    console.log(authResponse);
    loginResponse_ = authResponse;
  });

  const [loginResponse, setLoginResponse] = useState(loginResponse_);
  
  return (
      <div className="App">
        <FacebookLoginButton setLoginResponse={setLoginResponse}/>
        {loginResponse.status === "connected" && <Site loginResponse={loginResponse} />}
      </div>
  );
}

export default withRouter(App);

