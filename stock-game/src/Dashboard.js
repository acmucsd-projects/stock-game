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
                <table>
                    <tr style={{fontSize:'1rem'}}>
                        <th style={{border:'1px solid black'}}>Name</th>
                        <th>Prediction Date</th>
                        <th>Price</th>
                        <th>Points</th>
                    </tr>
                </table>
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