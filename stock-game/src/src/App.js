import React, {useRef} from 'react'
import Stylesheet from './components/Stylesheet'
import './components/myStyles.css'
import Inline from './components/Inline'
import './components/appStyles.css'
import styles from './components/appStyles.module.css'


function App() { 

  const loginRef = useRef()
  const passRef = useRef()

  function buttonHandler(e){

    const loginValue = loginRef.current.value
    const passValue = passRef.current.value

    const heading = {
      fontSize: '72px',
      color: 'green'
  }

    if ( (loginValue === '')||(passValue === '') ){
      return
    }

    console.log(loginValue)
    console.log(passValue)

    passRef.current.value = null

  }
  
  return (
    <>


    <center>
      <header className="App-header">
        <h1 className='font-xl'>Stock Prediction Game</h1>
        <div>Username: <input ref={loginRef} type="text"/> </div>
        <br></br>
        <div>Password:  <input ref={passRef} type="text"/> </div> 

        <br></br>
        <br></br>
        <br></br>

        <button className='button' onClick={buttonHandler}>Login</button>


      </header>
    </center>



    </>
  )
}

export default App;
