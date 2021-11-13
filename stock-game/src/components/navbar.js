import './navbar.css'
import {Link} from "react-router-dom"
import Login from "./login.js"
import Profile from "./profile.js"
import PostRequest from '../PostRequest'

/*
  Navbar component renders links based on the pages passed as props
*/
function Navbar(props) {
  // Store page links in local variable to return later  
  var pageLinks = props.pages.map((page) => {
    return <Link key={`${page.props.name}-link`} to={`/${page.props.name}`}>{page.props.name}</Link>;
  })

  return(    
    <header>
      <Link to="/">
        <h1>Stock Prediction Game</h1>
      </Link>
      {pageLinks}
    </header>         
  )
}

export default Navbar;
