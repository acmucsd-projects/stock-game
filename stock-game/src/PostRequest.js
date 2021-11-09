//This is backend team trying to experiment with POST Request but we need to create a front end 
//file to do so.
import React, {useEffect, useRef} from 'react'
function PostRequest() {
    const nameRef = useRef()
    const bioRef = useRef()
    function buttonHandler(){
        
        //Store values of references
        const nameValue = nameRef.current.value
        const bioValue = bioRef.current.value

        //If there is no input in the fields, do nothing
        if ( (nameValue === '')||(bioValue === '') ){
            return
        }
        console.log('WORKING');
        
        //fetch is the req
        //res is the result of the post
        // fetch('/api/createuser', {
        //     method: "post", 
        //     headers: {
        //         "Content-Type": "application/json"
        //     },
        //     // for req.body
        //     body: JSON.stringify({
        //         nameValue,
        //         bioValue
        //     })
        // }).then(res => res.json()).then(data => {
        //    console.log(data)
        // }).catch(err => console.log(err))
            fetch('http://localhost:5000/api/createuser', {
                method: "post", 
                headers: {
                    "Content-Type": "application/json"
                },
                // for req.body
                body: JSON.stringify({
                    nameValue,
                    bioValue
                })
            }).then(res => res.json()).then(text => console.log(text))
    }

    return (
    <>
        {/* Login Button that calls buttonHandler() */}
        <div>Name: <input ref={nameRef} type="text"/> </div>
        <div>Bio: <input ref={bioRef} type="text"/> </div>
        <button onClick={buttonHandler}>Test</button>
    </>
    )
}

export default PostRequest;