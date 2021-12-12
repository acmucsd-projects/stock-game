import '../index.css'
import './profile.css'
import React, {useState, useEffect, useRef} from "react"
import axios from 'axios'


function Profile() {
  const [listOfPrices, setListOfPrices] = useState([]);
  const stockTicker = useRef()
  function buttonHandler(){
    //Store values of references
    const ticker = stockTicker.current.value   
    axios.get('https://api.tdameritrade.com/v1/marketdata/quotes?apikey=LMDASP6A1ADRYUA6YMIEWWCI7GEFTOFL&symbol=' + ticker)
    .then(response => {
      //console.log(response['data'][ticker]['regularMarketLastPrice'])
      setListOfPrices(listOfPrices => [...listOfPrices, response['data'][ticker]['regularMarketLastPrice']]) 
      //setListOfPrices({listOfPrices: listOfPrices.concat([response['data'][ticker]['regularMarketLastPrice']])})
    })
    .catch(error => {
      console.log(error)
    })
  }
  //console.log(listOfPrices[0]) Doesn't work, returns undefined
  console.log(listOfPrices) //returns listOfPrices: [179.45]

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
        <div>Stock Ticker: <input ref={stockTicker} type="text"/> </div>
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