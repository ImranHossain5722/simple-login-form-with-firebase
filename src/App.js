import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword ,sendEmailVerification} from "firebase/auth";
import app from "./_firebase.init"
import React, { useState } from 'react'


const auth = getAuth(app);

function App() {
  
  const [registerd, setRegisterd]= useState(false)
  const [email ,setEmail ] = useState('')
  const [password, setPassword] = useState('')

const handleResiteredChange = event => {

  setRegisterd(event.target.checked)
  console.log(event.target.checked)

}

  // form input handel
  const handlemailBlur = event=>{
    setEmail(event.target.value)
  }

// form input handel
  const handlpasswordBlur = event=>{
    setPassword(event.target.value);
  }
  //form data submit 
  const handelFormSubmit =event=>{
      if (registerd){
        signInWithEmailAndPassword(auth, email, password)

          .then(result =>{

            const user = result.user
            console.log(user) 
          })
          .catch((error=>{
            console.log(error);
          }))
      }else{
        createUserWithEmailAndPassword(auth, email,password)
        .then(result =>{
    
          const user =result.user
          console.log(user)
          setEmail('')
          setPassword('')
          verifyEmail()
        })
        .catch((error=>{
          console.log(error);
        }))
            
      }
      event.preventDefault()
  }
  const verifyEmail =()=> {

    sendEmailVerification(auth.currentUser)
    .then(()=>{
          console.log("email verify");

    })
  }


  return (
    <div className="">
        <div className='register w-50 mx-auto mt-4'>
          <h2 className="text-primary text-align-center"> Please{registerd ? 'Login!!':'Register!!' }</h2>
        <Form onSubmit={handelFormSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control onBlur={handlemailBlur} type="email" placeholder="Enter email" required />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>  
        <Form.Control onBlur={handlpasswordBlur} type="password" placeholder="Password" required />
         </Form.Group>
        
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check onChange= { handleResiteredChange} type="checkbox" label="Already Registered" />
         </Form.Group>
      
        <Button variant="primary" type="submit">
          {registerd ? 'Login': 'Register' }
        </Button>
      </Form> 

        </div>
    </div>
  );
}

export default App;
