import './navbar.css'
import {Link} from "react-router-dom"
import { useState, useEffect, useContext } from 'react';
import bars from '../images/bars.svg'
import axios from 'axios'; 
import {OnProfile} from '../helper/context'

function Navbar(props) {
  const [isDesktop, setDesktop] = useState(window.innerWidth > 890);
  const [showNav, setShowNav] = useState(false);
  const [user, setUser] = useState(null);
  const toggleNav = () => {setShowNav(!showNav)}
  const {ProfilePage, setProfilePage} = useContext(OnProfile)

  useEffect(() => {
    window.addEventListener("resize", () => setDesktop(window.innerWidth > 890));
    return () => window.removeEventListener("resize", () => setDesktop(window.innerWidth > 890));
  });


  // makes a GET request to /user on app load
  useEffect(() => {
     axios.get('http://localhost:5000/api/user', { withCredentials: true })
    .then(response => setUser(response.data.user));
  }, []);


  // function that conditionally shows the signup button or user profile info
  function userLogin() {
    console.log(user);
    // if user is logged in, show user profile info
    if (user != null) {
      return (
        <h2>{"Hi, " + user.name + "!"}</h2 >
      )
    }

    return (
      // else show button to sign up
      <div onClick={() => window.open("http://localhost:5000/api/auth/google", "_self")}>
      <button className="button">
      Sign Up
      </button>
      </div>
    )

  }

  if(isDesktop) {
    return(   
      <header>
        <Link to="/">
          <h1>Stock Game</h1>
        </Link>
        <div className="nav-links">
          <Link to="/login">Login</Link>
          <Link to="/profile">Profile</Link>
          <Link to="/">Leaderboard</Link>
        </div>
        <div className="nav-btns">
          {userLogin()}
          {/*setProfilePage(true)*/}
        </div>
      </header>             
    )
  }
  else {
    return(
      <header>
        <div className="nav-top">
          <Link to="/">
            <h1>Stock Game</h1>
          </Link>               
          <div className="nav-btns">
            {userLogin()}
            {/*setProfilePage(true)*/}
            <a onClick={toggleNav} className="nav-toggle">
              <img src={bars}></img>
            </a>              
          </div>
        </div> 
        {showNav ? (
          <div className="nav-links">
            <Link to="/login">Login</Link>
            <Link to="/profile">Profile</Link>
            <Link to="/">Leaderboard</Link>
          </div>
        ) : (<></>)
        }       
        
      </header>             
    )
  }  
}

export default Navbar;