import '../index.css'
import './profile.css'
import React, {useState, useEffect, useRef, useContext} from "react"
import axios from 'axios'
import Predictions from './dashboard/predictions'
import {OnProfile} from '../helper/context'

function Profile() {
  const [listOfPrices, setListOfPrices] = useState([]);
  const [predictions, setPredictions] = useState([{'ticker_d': 'No Predictions', 'predictedPrice_d':'N/A', 'time_d':0, 'length_d':''}])
  const [user, setUser] = useState(null);
  const {ProfilePage, setProfilePage} = useContext(OnProfile)
  
  async function getPredictions(){
    axios.get('http://localhost:5000/api/user', { withCredentials: true })
    .then(response => setUser(response.data.user));
    if (user != null){
      await axios.get('http://localhost:5000/api/user_predictions', { withCredentials: true })
      .then(res => 
        setPredictions(res['data']['predictions'])
      )
    }
    //setProfilePage(false)
  }

  useEffect(() => {
    getPredictions();
  }, []);
  
  console.log(predictions)
  const stockTicker = useRef()
  const predictionLength = useRef()
  const predictionPrice = useRef()
  async function buttonHandler(){
    var initialPrice = 0
    var googleId = 'test'
    //Store values of references
    const ticker = stockTicker.current.value 
    const length = predictionLength.current.value
    var time = new Date() 
    const predictedPrice = predictionPrice.current.value
    await axios.get('https://api.tdameritrade.com/v1/marketdata/quotes?apikey=LMDASP6A1ADRYUA6YMIEWWCI7GEFTOFL&symbol=' + ticker)
    .then(response => {
      initialPrice = response['data'][ticker]['regularMarketLastPrice']
      //setListOfPrices(listOfPrices => [...listOfPrices, response['data'][ticker]['regularMarketLastPrice']]) 
    })
    .catch(error => {
      console.log(error)
    }) 
    await axios.get('http://localhost:5000/api/user').then(response => {
        //console.log(response)
        googleId = response['user']['googleId']
        //console.log(googleId)
    })
    console.log('outpuT')
    console.log(googleId)
    //console.log(initialPrice)
    fetch('http://localhost:5000/api/predictions', {
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
                    time,
                    googleId
                })
            }).then(res => res.text()).then(text => console.log(text))
    }
  
  //need this function to add length of prediction(length_d) to time when prediction was made(time_d).
  function addDays(date, days) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }
  
  //this function calculates how many days/hours are left on a given prediction
  function findTimeLeft(database_time, database_length){
    console.log((database_time))
    console.log(typeof(database_time))
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
        console.log(database_time, currentTime.getTime(), database_length)
        //right now the days and hours are rounding up. would rounding be better?
        return(Math.round((database_time - currentTime.getTime())/86400000) + " Days Remaining")
      }
      else if((database_time - currentTime.getTime())>3600000){
        console.log(database_time, currentTime.getTime(), database_time - currentTime.getTime())
        return(Math.round((database_time - currentTime.getTime())/3600000) + " Hours Remaining")
      }
      else{
        return('Less than one hour remaining')
      }
    }  
  }

  
//{predictions.map(prediction => <div>{prediction}</div>)}
  return(
    <div className="page"> 
      <div className="box">
        <h1>Profile Overview</h1>
        <br/>
        <p>Predictions:{predictions.map((prediction) => <p>{JSON.parse(JSON.stringify(prediction['ticker_d']))}: {JSON.parse(JSON.stringify(prediction['predictedPrice_d']))} {findTimeLeft(prediction['time_d'], JSON.parse(JSON.stringify(prediction['length_d'])))}</p>)}</p>
        <p>Today's Change:</p>
        <p>Standing:</p>
        {/*trying global state*/}
        {/*ProfilePage ? getPredictions():null*/}
        {/*ProfilePage ? <h1>Win</h1> : <h1>L</h1>*/}
        <button className="button" style={{margin: "1em 0"}} onClick={getPredictions}>Show Predictions</button>
      </div>
      <Predictions/>     
    </div>        
  )
}

export default Profile;