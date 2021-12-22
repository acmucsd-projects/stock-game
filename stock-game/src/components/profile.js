import '../index.css'
import './profile.css'
import React, {useState, useEffect, useRef} from "react"
import axios from 'axios'
import Predictions from './dashboard/predictions'

function Profile() {
<<<<<<< HEAD
  const [listOfPrices, setListOfPrices] = useState([]);
  const stockTicker = useRef()
  const predictionLength = useRef()
  const predictionPrice = useRef()
  async function buttonHandler(){
    var initialPrice = 0
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
    console.log(initialPrice)
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
                    time
                })
            }).then(res => res.text()).then(text => console.log(text))
    }
  
  
  

=======
>>>>>>> be427a855dd2483c44089603ae7bb397e8191ccf
  return(
    <div className="page"> 
      <div className="box">
        <h1>Profile Overview</h1>
        <br/>
        <p>Account Value:</p>
        <p>Today's Change:</p>
        <p>Standing:</p>
      </div>
      <Predictions/>     
    </div>        
  )
}

export default Profile;