import './navbar.css'
import '../index.css';
import { useState } from 'react';

function Navbar(props) {
  // By default, state variable pageShown is first element in props pages (an array)
  const [pageShown, setPageShown] = useState(props.pages[0]);

  // Store page links in local variable to return later  
  var pageLinks = props.pages.map((page) => {
    return <a key={`${page.props.name}-link`} onClick={navHandler}>{page.props.name}</a>;
  })
  // For some reason the console says that each element in 
  // the pageLinks must have a unique key attribute

  /*
    Handles click on nav links
  */
  function navHandler(e) {
    props.pages.forEach(page => {
      if(page.showPage) page.setShowPage(false);
      else page.setShowPage(true);
    });
  }

  return(
    <header>
      <a href="/">
        <h1>Stock Prediction Game</h1>
      </a>
      {pageLinks}
    </header>
  )
}

export default Navbar;