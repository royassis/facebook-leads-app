import Facebook from './components/Facebook'
import Site from './components/Site'
import {
  useHistory,
  withRouter,
  Route,
  Redirect
} from "react-router-dom";
import React, { useState } from 'react';

function App() {
  let history = useHistory();
  const [accessToken, setAccessToken] = useState("");

  return (
    <div>
      <Route exact path="/">
        <Redirect to="/login" />
      </Route>

      <Route exact path="/login">
        <div className="App">
          <Facebook historyA={history} setAccessToken={setAccessToken} />
        </div>
      </Route>

      <Route exact path="/site" >
        <Site accessToken={accessToken} setAccessToken={setAccessToken} />
      </Route>
    </div >
  );
}

export default withRouter(App);

