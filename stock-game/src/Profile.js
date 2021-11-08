import React from "react";
import './components/StyleSheet.css'

function Profile() {
    return(
        <>

        <header className="App-header">
            <div style={{float: 'right'}}> 
            <section className="box">
                <div className="font-xl"><u>Overview</u></div>
                <br/>
                <div className="font-l">Account Value:</div>
                <div className="font-l">Today's Change:</div>
                <div className="font-l">Standing:</div>
            </section>
            </div>

            


        </header>
        </>
    )
}

export default Profile;