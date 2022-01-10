import './dashboard.css';
import '../index.css';
import Scoreboard from "./dashboard/scoreboard"
import Predictions from "./dashboard/predictions"
import Screener from "./dashboard/screener"
import {useRef, useEffect} from 'react';
import UserContext from './UserContext/UserContext';
function Dashboard(props) {
  return(
    <div className="page">
      <UserContext.Consumer>
        {user => (<Scoreboard user={user} />)}
      </UserContext.Consumer>
      <Predictions/>
      {/* <Screener/> */}
    </div>
  )
}

export default Dashboard