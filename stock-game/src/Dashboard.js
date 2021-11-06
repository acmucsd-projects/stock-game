import React from 'react';
import {Scoreboard, Score, Predictions, Screener,UpperDiv} from './DashboardElements';
class Dashboard extends React.Component {
    render() { 
        return (
            <div className="dashboard">
                <UpperDiv>
                <Scoreboard>
                <span>Your Total Score is</span>
                <Score>
                <div style={{fontWeight:"bold", fontSize:"3rem", paddingTop:"5vh"}}>90,000</div>
                </Score>
                </Scoreboard>
                <Predictions>
                <div>2</div>
                </Predictions>
                </UpperDiv>
                <Screener>
                <div>3</div>
                </Screener>
            </div>
        );
    }
}
 
export default Dashboard;