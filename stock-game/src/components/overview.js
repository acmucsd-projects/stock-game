import '../index.css'
import './overview.css'
import React, {useState, useEffect} from "react"
import axios from 'axios'

function Overview() {
  const [predictions, setPredictions] = useState([{'ticker_d': 'No Predictions', 'predictedPrice_d':'N/A', 'time_d':0, 'length_d':''}])
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5000/api/user', { withCredentials: true })
    .then(response => setUser(response.data.user));

    axios.get('http://localhost:5000/api/user/predictions', { withCredentials: true })
    .then(res => {
      // If predictions array for this user is not empty, else use the default state
      if(res['data']['predictions'].length > 0) setPredictions(res['data']['predictions'])
    })
    .catch(error => console.log(error))
  }, []);
     
  // Adds length of prediction (length_d) to time when prediction was made (time_d).
  function addDays(date, days) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }
  
  // Calculates how many days/hours are left on a given prediction
  function findTimeLeft(database_time, database_length){
    // console.log((database_time))
    // console.log(typeof(database_time))
    if (database_time == 0){
      return ''
    }
    else{
      database_time = database_time + database_length*86400000
      let currentTime = new Date();
      if((database_time - currentTime.getTime())<0){
        //Get final price of stock at end of prediction period
        //calculate score
        //POST that score to user collection on mongodb
        //delete the prediction
        return('Finished')
      }
      else if((database_time - currentTime.getTime())>86400000){
        // console.log(database_time, currentTime.getTime(), database_length)
        //right now the days and hours are rounding up. would rounding be better?
        return(Math.round((database_time - currentTime.getTime())/86400000) + " Days")
      }
      else if((database_time - currentTime.getTime())>3600000){
        // console.log(database_time, currentTime.getTime(), database_time - currentTime.getTime())
        return(Math.round((database_time - currentTime.getTime())/3600000) + " Hours")
      }
      else{
        return('Less than one hour remaining')
      }
    }  
  }

  // Gets current price of a stock when provided ticker
  async function getPrice(ticker) {
    let price = 0
    await axios.get('https://api.tdameritrade.com/v1/marketdata/quotes?apikey=LMDASP6A1ADRYUA6YMIEWWCI7GEFTOFL&symbol=' + ticker)
    .then(response => {
      price = response['data'][ticker]['regularMarketLastPrice']
    })
    .catch(error => console.log(error))
  }

  return(
    <div>
      <h2>Predictions</h2>
      <table className="overview-table">
        <tbody>
          <tr>              
            <td><h3>Ticker</h3></td>
            <td><h3>Prediction</h3></td>
            {/* <td><h3>Current</h3></td> */}
            <td><h3>Remaining Time</h3></td>
          </tr>
          {predictions.map((prediction) => 
            <>            
              <tr>
                <td style={{color: "var(--yellow)"}}>{JSON.parse(JSON.stringify(prediction['ticker_d']))}</td>
                <td>{JSON.parse(JSON.stringify(prediction['predictedPrice_d']))}</td>
                {/* TD Ameritrade is giving me an error (400) when I make a request from getPrice()? */}
                {/* <td>{getPrice(JSON.stringify(prediction['ticker_d']))}</td> */}
                <td>{findTimeLeft(prediction['time_d'], JSON.parse(JSON.stringify(prediction['length_d'])))}</td>
              </tr>
            </>
          )}
        </tbody>        
      </table>      
    </div>
  )
}

export default Overview;