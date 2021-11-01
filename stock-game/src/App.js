/*
This is what I have for the login page so far.
Feel free to make changes on a branch.
-Ben
*/

import './index.css';
import Login from './components/login.js'

function App() {
  return(
    <>
      <header className="App-header">
        <h1>Stock Prediction Game</h1>
      </header>
      <div className="page">
        <Login />
      </div>
      
    </>
  )   
}

export default App;