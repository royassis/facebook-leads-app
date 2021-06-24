import Facebook from './components/Facebook'
import {
  useHistory, 
  withRouter
} from "react-router-dom";

function App() {
  let history = useHistory();
  return (
      <div className="App">
        {<Facebook historyA = {history}/>}
      </div>
  );
}

export default withRouter(App);
