import './index.css';
import Login from './components/login.js';
import Navbar from './components/navbar.js'

function App() {
  // Local var to store navbar, which has a prop pages (an array, might be helpful for multiple pages)
  var navbar = <Navbar pages={[<Login name="login" key="login-page"/>]} />;
  var pages = navbar.props.pages.map((page) => { 
    return page; 
  })

  return(
    <>
      {navbar}
      {pages} 
    </>
  )   
}

export default App;