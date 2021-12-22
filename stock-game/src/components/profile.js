import '../index.css'
import './profile.css'
import React, {useState, useEffect, useRef} from "react"
import axios from 'axios'


function Profile() {
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
  
  
  

  return(
    <div className="page" style={{float: 'right'}}> 
      <section className="box">
        <p><u>Overview</u></p>
        <br/>
        <p>Account Value:</p>
        <p>Today's Change:</p>
        <p>Standing:</p>
      </section>
      <section className="box">
        <div>Stock Ticker for Prediction: <input ref={stockTicker} type="text"/> </div>
        <div>Length for Prediction: <input ref={predictionLength} type="text"/> </div>
        <div>Predicted Stock Price: <input ref={predictionPrice} type="text"/> </div>
        <button onClick={buttonHandler}>Submit</button>
        <p>{listOfPrices}</p>
      </section>
      
    </div>        
  )
}

export default Profile;
/*
import '../index.css'
import './profile.css'
import React, {useEffect, useRef} from "react"
import axios from 'axios'


class Profile extends React.Component() {
  constructor(props){
    super(props);
    this.state = {price : null};
  }
  stockTicker = useRef()
  buttonHandler(){
    //Store values of references
    const ticker = stockTicker.current.value   
    axios.get('https://api.tdameritrade.com/v1/marketdata/quotes?apikey=LMDASP6A1ADRYUA6YMIEWWCI7GEFTOFL&symbol=' + ticker)
    .then(response => console.log(response['data'][ticker]['regularMarketLastPrice']))
    .catch(error => {
      console.log(error)
    })
  }

  render() {
  return(
    <div className="page" style={{float: 'right'}}> 
      <section className="box">
        <p><u>Overview</u></p>
        <br/>
        <p>Account Value:</p>
        <p>Todays Change:</p>
        <p>Standing:</p>
      </section>
      <section className="box">
        <div>Stock Ticker: <input ref={stockTicker} type="text"/> </div>
        <button onClick={buttonHandler}>Test</button>
      </section>
      
    </div>        
  )
  }
}

export default Profile;
*/