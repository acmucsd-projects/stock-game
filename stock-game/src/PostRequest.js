//This is backend team trying to experiment with POST Request but we need to create a front end 
//file to do so.
import React, {useRef} from 'react'
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
        fetch('/createuser', {
            method: "post", 
            headers: {
                "Content-Type": "application/json"
            },
            // for req.body
            body: JSON.stringify({
                nameValue,
                bioValue
            })
        })
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