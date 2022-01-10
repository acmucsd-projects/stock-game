import axios from 'axios';
import React, {useState, useEffect} from 'react';
import styles from './LeaderboardTable.css'





const LeaderboardTable = () => {

    const [scores, setScores] = useState(null);

    var heading = ['Rank', 'Name', 'Score'];

    useEffect(() => {
        axios.get('http://localhost:5000/api/scores', { withCredentials: true })
        .then(res => setScores(res.data.scores))
      }, []);

    return ( 
        <>
            <table style={styles.table} className="table">
                <thead style={{backgroundColor: "#76BE80"}}>
                    <tr>
                        {heading.map((head, i) => {
                            return <th key={i}>{head}</th>
                        })}
                    </tr>
                </thead>
                <tbody style={{textAlign: 'center'}} className="tbody">
                    {scores ? scores.map((score, i) => {
                        return (
                            <tr key={i} style={{lineHeight: "20px"}}>
                                <td style={{fontWeight: "bold", color: "rgb(82, 183, 126)"}}>{i + 1}</td>
                                <td>{score.username}</td>
                                <td>{Math.round(score.score * 10) / 10}</td>
                            </tr>
                        )
                    }): <></>}
                </tbody>
            </table>
        </>
     );
}
 
export default LeaderboardTable;