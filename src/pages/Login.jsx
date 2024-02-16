import React ,{useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {useFirebase} from '../context/Firebase';

const LoginPage = () => {
    const firebase = useFirebase();
    const navigate= useNavigate();
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [error, setError] = useState(null); // State variable for holding error message


    useEffect(()=>{
      if(firebase.isLoggedIn) {
      //navigate to home
        navigate("/");
      }
    },[firebase,navigate]);

    const handleSubmit = async (e) => {
      e.preventDefault();
      console.log("Logging in");
      
      try {
          const result = await firebase.signinUserWithEmailAndPass(email, password);
          console.log("Successfully logged in");
          window.alert("Login successful!");
          console.log(result);
      } catch (error) {
          console.error("Login failed:", error.message);
          window.alert("Login failed: " + error.message);
      }
  };
        console.log(firebase);
  return (
    <div className="container mt-5">

<Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control  
        onChange= {e=>setEmail(e.target.value)}
        value={email}
        type="email"
         placeholder="Enter email" 
         />
        
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control 
        onChange= {e=>setPassword(e.target.value)}
        value={password}
        
        
        type="password" placeholder="Password" />
      </Form.Group>
      
      <Button variant="primary" type="submit">
        Log In
      </Button>
    </Form>
    <h1 className='mt-5 mb-5'>OR</h1>
    <Button
    onClick={firebase.signinWithGoogle} 
    variant="danger">Sign In With Google</Button> 
   

    </div>
  )
}

export default LoginPage;