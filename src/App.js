import Facebook from './components/Facebook'
import Site from './components/Site'
import {
  useHistory,
  withRouter,
} from "react-router-dom";
import React, { useState, useEffect } from 'react';

require('dotenv').config();


function App(props) {
  let history = useHistory();

  var loginResponse_ = "";

  window.FB.getLoginStatus((authResponse) => {
    console.log(authResponse);
    loginResponse_ = authResponse;
  });

  const [loginResponse, setLoginResponse] = useState(loginResponse_);
  
  return (
      <div className="App">
        <Facebook historyA={history}  setLoginResponse={setLoginResponse}/>
        {loginResponse.status === "connected" && <Site loginResponse={loginResponse} />}
      </div>
  );
}

export default withRouter(App);

