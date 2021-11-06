/*
This is what I have for the login page so far.
Feel free to make changes on a branch.
-Ben
Testing
*/

import React, {useRef} from 'react'
import './components/StyleSheet.css'

function App() { 

  //Create references in JSX code
  const loginRef = useRef()
  const passRef = useRef()


  /* 
  Function that handles the login button
  */
  function buttonHandler(e){

    //Store values of references
    const loginValue = loginRef.current.value
    const passValue = passRef.current.value

    //If there is no input in the fields, do nothing
    if ( (loginValue === '')||(passValue === '') ){
      return
    }

    //Resets password field to null
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

        {/* Login Button that calls buttonHandler() */}
        <button className='button' onClick={buttonHandler}>Login</button>


      </header>
    </center>

    </>
  )
}

export default App;