import './login.css';
import '../index.css';
import {useRef, useEffect} from 'react';

function Login(props) {
  // Create references in JSX code
  const loginRef = useRef()
  const passRef = useRef()

  /* 
    Function that handles the login button
  */
  function buttonHandler(e){

    // Store values of references
    const loginValue = loginRef.current.value
    const passValue = passRef.current.value

    // If there is no input in the fields, do nothing
    if ( (loginValue === '') || (passValue === '') ){
      return
    }

    // Resets password field to null
    passRef.current.value = null
  }

  return (
    <div className="page">
      <div className="login-container"> 
      <h1 className="page-title">Login</h1>   
        <input ref={loginRef} placeholder="Username" type="text"/>
        <input ref={passRef} placeholder="Password" type="password"/>

        {/* Login Button that calls buttonHandler() */}
        <button className='button' onClick={buttonHandler}>Login</button>
      </div>
    </div>    
  )
  
}

export default Login;