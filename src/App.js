import Facebook from './components/Facebook'
import Site from './components/Site'
import {
  useHistory,
  withRouter,
} from "react-router-dom";
import React, { useState, useEffect } from 'react';
import {initFacebookSdk} from './helpers/helpers'

require('dotenv').config();

initFacebookSdk().then(App);

function App() {
  let history = useHistory();
  const [loginResponse, setLoginResponse] = useState("");
  
  return (
      <div className="App">
        <Facebook historyA={history}  setLoginResponse={setLoginResponse}/>
        {/* {loginResponse.status === "connected" && <Site loginResponse={loginResponse} />} */}
      </div>
  );
}

export default withRouter(App);

