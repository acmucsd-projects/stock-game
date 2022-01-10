import '../index.css'
import './overview.css'
import React, {useState, useEffect} from "react"
import axios from 'axios'

function Overview() {
  const [predictions, setPredictions] = useState([{'ticker_d': 'No Predictions', 'predictedPrice_d':'N/A', 'time_d':0, 'length_d':''}])
  const [user, setUser] = useState(null);
  const [endPrice, setEndPrice] = useState(0);

  function addDays(date, days) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }

  async function getEndPrice(database_time_msec, ticker){
    /* If prediction has ended, calculate the price of the stock
      at the end of the day when the prediction ended.*/
      var database_time = new Date(database_time_msec);
      var endPrice = 0
      var response = await axios.get('https://api.tdameritrade.com/v1/marketdata/' + ticker + '/pricehistory?apikey=LMDASP6A1ADRYUA6YMIEWWCI7GEFTOFL&periodType=year&period=1&frequencyType=daily&frequency=1')
      
      var candidate_endPrices = response['data']['candles']
      for(let i=candidate_endPrices.length-1;i>=0;i--){
          var candidate_endPrice = new Date(candidate_endPrices[i]['datetime'])
          // correct weekend days to friday closing price
          if (database_time.getUTCDay() == 6) {
            database_time = addDays(database_time, -1)
          }
          if (database_time.getUTCDay() == 0) {
            addDays(database_time, -2)
          }

          var database_time_words = database_time.toUTCString()

          if (candidate_endPrice.toUTCString().slice(0,16)==database_time_words.slice(0,16)){
              console.log(candidate_endPrice.toUTCString(), database_time_words)
              endPrice = candidate_endPrices[i]['close']
              console.log('PRINT' + endPrice + typeof(endPrice))
              return endPrice
          }
      }

      // .catch(error => {
      //     console.log(error)
      // })
      
  }

  function updateUserscore(length,predictedPrice,initialPrice,googleId,endPrice){
    fetch('http://localhost:5000/api/update_userscore', {
          method: "post", 
          headers: {
              "Content-Type": "application/json"
          },
          // for req.body
          body: JSON.stringify({
              length,
              predictedPrice,
              initialPrice,
              googleId,
              endPrice
              })
          })
          .then(res => {      
          if(res.ok) {        
              return res.text()
          } 
          })
          .then(text => console.log("Posted JSON: " + text))
          .catch(error => console.log(error))
  }

  function deleteFinishedPrediction(ticker,length,predictedPrice,initialPrice,googleId,time){
    console.log("DELETE")  
    fetch('http://localhost:5000/api/remove_prediction', {
          method: "post", 
          headers: {
              "Content-Type": "application/json"
          },
          // for req.body
          body: JSON.stringify({
              ticker,
              length,
              predictedPrice,
              initialPrice,
              googleId,
              time
              })
          })
          .then(res => {      
          if(res.ok) {        
              return res.text()
          } 
          })
          .then(text => console.log("Posted JSON: " + text))
          .catch(error => console.log(error))
  }

  async function getPredictions(){
    var res = await axios.get('http://localhost:5000/api/user/predictions', { withCredentials: true })
    // If predictions array for this user is not empty, else use the default state
    console.log("Frontend call for predictions ", res)
    if(res['data']['predictions'].length > 0) {
      setPredictions(res['data']['predictions'])
      return res['data']['predictions']
    }
  }

  useEffect(() => {

    console.log("Use Effect Has Run ")


    axios.get('http://localhost:5000/api/user', { withCredentials: true })
    .then(response => setUser(response.data.user));

    getPredictions()
      .then(localPredictions => {
        console.log(localPredictions)
        if (localPredictions) {
          localPredictions.forEach(async (prediction) => { 
          
            // create local variables for each prediction key
            var ticker = prediction['ticker_d']
            var predictedPrice = prediction['predictedPrice_d']
            var time = prediction['time_d']
            var length = prediction['length_d']
            var initialPrice = prediction['initialPrice_d']
            var googleId = prediction['googleId_d']
            let currentTime = new Date();
            console.log(ticker, length, predictedPrice, initialPrice, googleId)
            // exact time when prediction ends in miliseconds
            var database_time_msec = time + length*86400000
      
            // if prediction has ended, calculate the price of the stock
            if((database_time_msec - currentTime.getTime())<0){
      
              //POST that score to user collection on mongodb
              //delete the prediction
              var endPrice = await getEndPrice(database_time_msec, ticker)
              //.then(res => console.log('ENDPRICE ' + res))
              console.log('ENDPRICE ' + endPrice)
      
              await updateUserscore(length,predictedPrice,initialPrice,googleId,endPrice)
              deleteFinishedPrediction(ticker,length,predictedPrice,initialPrice,googleId,time)
            }
      
          }) 
        }
    })

  }, []);

  // Adds length of prediction (length_d) to time when prediction was made (time_d).
  function addDays(date, days) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }
  
  

  // Calculates how many days/hours are left on a given prediction
  function findTimeLeft(database_time, database_length, ticker, length, predictedPrice, initialPrice, googleId, time){
    //console.log('run')
    // console.log((database_time))
    // console.log(typeof(database_time))
    

    if (database_time == 0){
      return ''
    }
    var endPrice = 0
    var database_time_msec = database_time + database_length*86400000 //in milliseconds since epoch
    let currentTime = new Date();
    if((database_time_msec - currentTime.getTime())<0){
        //Get final price of stock at end of prediction period
        //calculate score
        //POST that score to user collection on mongodb
        //delete the prediction
        // getEndPrice(database_time_msec, ticker)
        // updateUserscore(length,predictedPrice,initialPrice,googleId,endPrice)
        // deleteFinishedPrediction(ticker,length,predictedPrice,initialPrice,googleId,time)
        return('Finished')
    }
    else if((database_time_msec - currentTime.getTime())>86400000){
        // console.log(database_time, currentTime.getTime(), database_length)
        //right now the days and hours are rounding up. would rounding be better?
        return(Math.round((database_time_msec - currentTime.getTime())/86400000) + " Days")
    }
    else if((database_time_msec - currentTime.getTime())>3600000){
        // console.log(database_time, currentTime.getTime(), database_time - currentTime.getTime())
        return(Math.round((database_time_msec - currentTime.getTime())/3600000) + " Hours")
    }
    else{
        return('Less than one hour remaining')
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
                <td key={prediction} style={{color: "var(--yellow)"}}>{JSON.parse(JSON.stringify(prediction['ticker_d']))}</td>
                <td>{JSON.parse(JSON.stringify(prediction['predictedPrice_d']))}</td>
                {/* TD Ameritrade is giving me an error (400) when I make a request from getPrice()? */}
                {/* <td>{getPrice(JSON.stringify(prediction['ticker_d']))}</td> */}
                <td>{findTimeLeft(prediction['time_d'], JSON.parse(JSON.stringify(prediction['length_d'])), 
                prediction['ticker_d'], prediction['length_d'], prediction['predictedPrice_d'], prediction['initialPrice_d']
                ,prediction['googleId_d'],prediction['time_d'])}</td>
              </tr>
            </>
          )}
        </tbody>        
      </table>      
    </div>
  )
}

export default Overview;