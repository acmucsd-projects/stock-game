import './dashboard.css';
import '../index.css';
import Scoreboard from "./dashboard/scoreboard"
import Predictions from "./dashboard/predictions"
import Screener from "./dashboard/screener"
import {useRef, useEffect} from 'react';

function Dashboard(props) {
  return(
    <div className="page">
      <Scoreboard/>
      <Predictions/>
      <Screener/>
    </div>
  )
}

export default Dashboard