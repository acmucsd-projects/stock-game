import React from 'react';
import './Leaderboard.css';
import LeaderboardTable from './LeaderboardTable';

const Leaderboard = () => {
    return ( 
        <div className='wrapper'>
            <h1 className="name">Leaderboard</h1>
            <div className="Scoreboard">
                <div className="data">
                    <LeaderboardTable />
                </div>
            </div>
        </div>
     );
}
 
export default Leaderboard;