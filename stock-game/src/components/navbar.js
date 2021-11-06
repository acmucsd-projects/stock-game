import './navbar.css'
import '../index.css';
import { useState } from 'react';

function Navbar(props) {
  // Store page links in local variable to return later  
  var pageLinks = props.pages.map((page) => {
    return <a key={`${page.props.name}-link`}>{page.props.name}</a>;
  })
  // For some reason the console says that each element in 
  // the pageLinks must have a unique key attribute

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
