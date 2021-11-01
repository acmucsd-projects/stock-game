import {useRef, useEffect} from 'react';
import './login.css';

function Login(props) {
  // Create references in JSX code
  const loginRef = useRef()
  const passRef = useRef()

  // Focus on username input
  useEffect(() => {
    document.body.classList.add("no-scroll")
  }, [])

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
    <div className="login-container">    
      <input ref={loginRef} placeholder="Username" type="text"/>
      <input ref={passRef} placeholder="Password" type="password"/>

      {/* Login Button that calls buttonHandler() */}
      <button className='button' onClick={buttonHandler}>Login</button>
    </div>
  )
}

export default Login;