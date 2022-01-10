import './predictions.css'
import '../../index.css'
import {useState, useRef} from 'react'
import axios from 'axios';

function Predictions(props) {
  // const [listOfPrices, setListOfPrices] = useState([]);
  const [postMessage, setPostMessage] = useState("");
  const [predictionSuccess, setPredictionSuccess] = useState(false);
  const stockTicker = useRef()
  const predictionLength = useRef()
  const predictionPrice = useRef()

  async function postPrediction(){
    var initialPrice = 0
    var googleId = ""
    // Store form input values when submit btn clicked
    const ticker = stockTicker.current.value 
    const length = predictionLength.current.value
    var time = new Date().getTime() 
    const predictedPrice = predictionPrice.current.value

    // Get and store current stock price (with TD Ameritrade API)
    await axios.get('https://api.tdameritrade.com/v1/marketdata/quotes?apikey=LMDASP6A1ADRYUA6YMIEWWCI7GEFTOFL&symbol=' + ticker)
    .then(response => {
      initialPrice = response['data'][ticker]['regularMarketLastPrice']
      //setListOfPrices(listOfPrices => [...listOfPrices, response['data'][ticker]['regularMarketLastPrice']]) 
    })
    .catch(error => {
      console.log(error)
    }) 
    // console.log("initialPrice: " + initialPrice)

    await axios.get('http://localhost:5000/api/user', { withCredentials: true })
    .then(response => {
        googleId = response.data['user']['googleId']
    })
    console.log('Google ID for logged in user is: ' + googleId)

    // Post form input to the backend (with our API)
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
    })
    .then(res => {      
      if(res.ok) {        
        setPostMessage("Success") 
        setPredictionSuccess(true)
        return res.text()
      } else {
          setPredictionSuccess(false)
          console.log("STATUS: " + res.status)
          if(res.status === 406) {
            setPostMessage("Invalid Stock Symbol")
          } else {
            setPostMessage("Error")
          }
        return res.text()
      }
    })
    .then(text => console.log("Posted JSON: " + text))
    .catch(error => {
      setPredictionSuccess(false)
      setPostMessage("Error")
      console.log(error)
    })
  }

  return(
    <div className="dashboard-component predictions"> 
      <h1>Make a Prediction</h1>
      <h3>Stock Symbol</h3>
      <input ref={stockTicker} type="text"/>
      <h3>Prediction Length (days)</h3>
      <input ref={predictionLength} type="number"/>
      <h3>Predicted Stock Price (USD)</h3>
      <input ref={predictionPrice} type="number"/>
      <button className="button" style={{margin: "1em 0"}} onClick={postPrediction}>Submit</button>
        <h3 className={predictionSuccess ? "success-msg" : "error-msg"}>{postMessage}</h3>     
      {/* <p>{listOfPrices}</p> */}
    </div>
  )
}

export default Predictions