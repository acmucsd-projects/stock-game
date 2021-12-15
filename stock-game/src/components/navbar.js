import './navbar.css'
import {Link} from "react-router-dom"
import { useState, useEffect } from 'react';
import bars from '../images/bars.svg'

function Navbar(props) {
  const [isDesktop, setDesktop] = useState(window.innerWidth > 890);
  const [showNav, setShowNav] = useState(false);
  const toggleNav = () => {setShowNav(!showNav)}

  useEffect(() => {
    window.addEventListener("resize", () => setDesktop(window.innerWidth > 890));
    return () => window.removeEventListener("resize", () => setDesktop(window.innerWidth > 890));
  });

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
          <div onClick={() => window.open("http://localhost:5000/api/auth/google")}>
          <button className="button">
           Sign Up
          </button>
          </div>
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
            <button className="button">
              <Link to="/">Sign Up</Link>
            </button>
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