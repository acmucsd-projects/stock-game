import Dashboard from './Dashboard';
import './App.css';
import Navbar from './Components/Navbar';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

function App() {
  return (
    <Router>
      <Navbar/>
      <Switch>
        <Route path="/" exact component={Dashboard} />
        {/* <Route path="/logout" component={Logout}/>
        <Route path="/leaderboard" component={Leaderboard}/>
        <Route path="/profile" component={Profile}/> */}
      </Switch>
    </Router>
  );
}

export default App;
