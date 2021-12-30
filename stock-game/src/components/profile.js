import '../index.css'
import './profile.css'
import React, {useState, useEffect, useRef, useContext} from "react"
import axios from 'axios'
import Predictions from './dashboard/predictions'
import {OnProfile} from '../helper/context'

function Profile() {
  const [listOfPrices, setListOfPrices] = useState([]);
  const [predictions, setPredictions] = useState([{'ticker_d': 'No Predictions', 'predictedPrice_d':'N/A'}])
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
  

  

  
//{predictions.map(prediction => <div>{prediction}</div>)}
  return(
    <div className="page"> 
      <div className="box">
        <h1>Profile Overview</h1>
        <br/>
        <p>Predictions:{predictions.map((prediction) => <p>{JSON.parse(JSON.stringify(prediction['ticker_d']))}: {JSON.parse(JSON.stringify(prediction['predictedPrice_d']))}</p>)}</p>
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