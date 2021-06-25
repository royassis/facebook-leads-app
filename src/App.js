import Facebook from './components/Facebook'
import {
  useHistory,
  withRouter,
  BrowserRouter as Router,
  Route,
  Redirect
} from "react-router-dom";

function App() {
  let history = useHistory();
  return (
    <div>
      <Route exact path="/">
        <Redirect to="/login" />
      </Route>

      <Route exact path="/login">
        <div className="App">
          {<Facebook historyA={history} />}
        </div>
      </Route>

      <Route exact path="/about">
        <h1>About</h1>
      </Route>
    </div >
  );
}

export default withRouter(App);

