import React from 'react'
import './Signin.css'
import myvideo from './video.mp4'
import { useState,useContext } from 'react'
import { AuthContext, UserContext } from './auth-context'
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database';
import { useNavigate } from 'react-router-dom';
const Signin = () => {
  const navigate = useNavigate();
  const [reset,setreset]=useState('');
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('')
  const [error,setError]=useState('');
  const auth=useContext(AuthContext);
  const handleFirebaseLogin=async(email,password)=>{
   try{
     const userCredential=await firebase.auth().signInWithEmailAndPassword(email,password);
     const userDataSnapshot = await firebase.database().ref(`users/${userCredential.user.uid}`).once('value');
     const userData = userDataSnapshot.val();
     return { userCredential, userData };
   }catch(error){
     const errorMessage=error.message;
     throw errorMessage;
   }
  }
  const handleSubmit=async(e)=>{
   setreset('');
   e.preventDefault();
   try {
     const {userCredential}=await handleFirebaseLogin(email, password);
     const userDataSnapshot = await firebase.database().ref(`users/${userCredential.user.uid}`).once('value');
     const userData = userDataSnapshot.val();
     if(userCredential){
     const {name}=userData
     auth.login(name);
     setError('');
     navigate('/homepage')
     }else{
     setError('Invalid username or password1');
     }
   } catch (error) {
    console.log(error)
     setError('Invalid username or password2');
   }
  }
  const handleForgotPassword=(e)=>{
   e.preventDefault();
   firebase.auth()
   .sendPasswordResetEmail(email).then(()=>{
    setError("");
    setreset('Email has been sent! please check your registered email address!');
   }).catch((error)=>{
     setError(error.message);
   })
  }
  return (
    <div className='Signin-root'>
     <div className="video">
     <video src={myvideo} autoPlay muted loop playsInline>
      </video>
     </div>
     <div className="frm">
      <div className="form_outer">
        <div className="signin">
          <p className="heading">Login/SignIn</p>
          {error&&<p className="error">{error}</p>}
          {reset&&<p className="reset">{reset}</p>}
          <form onSubmit={handleSubmit}>
          <input type="text" className="email" htmlFor='email' placeholder='Email' value={email} onChange={e=>setEmail(e.target.value)} style={{ marginBottom:'5%', width:'50%',
    height:'6%', borderRadius:'20px'}} />
          <input type="password" className="password" htmlFor='password' placeholder='PASSWORD' value={password} onChange={e=>setPassword(e.target.value)}/>
          <label htmlFor="password" className='passLabel'><a href="#" className="frgt" onClick={handleForgotPassword}>forgot password?</a></label>
          <button className="submit" type='submit' onClick={()=>{
          }}>LOGIN</button>
            </form>
        </div>
      </div>
     </div>
    </div>
  )
}

export default Signin