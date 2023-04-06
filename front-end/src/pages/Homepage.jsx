import React, { useContext,useEffect, useState } from 'react'
import './Homepage.css'
import myvideo from '../assets/homepagevideo.mp4'
import Navbar from '../components/auth-reg/Navbar'
import { AuthContext,UserContext } from '../components/auth-reg/auth-context'
import { useNavigate } from 'react-router-dom';
const Homepage = () => {
  const navigate=useNavigate();
  const [welcome,setWelcome]=useState('Welcome to Grow Fitter.')
  const auth=useContext(AuthContext)
  const userC=useContext(UserContext);
  useEffect(() => {
    if(userC){
      setWelcome(`Welcome to Grow Fitter, ${userC}.`)
    }else{
      setWelcome(`Welcome to Grow Fitter.`)
    }
  }, [userC]);
  return (
   
    <div className="homepage-root">
     {auth.isLoggedIn&&<Navbar/>}
       <div className="hp-video">
     <video src={myvideo} autoPlay muted loop playsInline className='hp-video-element'>
      </video>
      <div className='contact-box'>
      <div className="contact-us">
       <button className="contact-us-button" onClick={()=>{
        navigate("/grievance")
       }}>Contact-us</button>
      </div>
      {/*<div className="team">
      <div className="team-box">
       <button className="team-button">Team</button>
      </div>
  </div>*/}
      {!auth.isLoggedIn&&
      <div className="signup-box">
      <div className="signup-box">
       <button className="signup-button" onClick={()=>{
        
          navigate("/signup");
      
      
       }}>Signup</button>
      </div>
      </div>}
      {!auth.isLoggedIn&&
      <div className="signin-box">
      <div className="signin-box">
       <button className="signin-button"onClick={()=>{
        
          navigate("/signin");
      
      
       }}>Signin</button>
      </div>
      </div>}
      {auth.isLoggedIn&&
      <div className="signout-box">
      <div className="signout-box">
       <button className="signout-button" onClick={()=>{
        auth.logout()
       }}>Logout</button>
      </div>
      </div>}


      
    </div>
     </div>
     <div className="text-container">
     <h1 className="text">{welcome}</h1>
     <p className='text p-text'>We offer a range of health services like health blogs, posture detection, and diet plans, all designed to help you achieve a fitter life.</p>
    </div> 
   
    </div>
  )
}

export default Homepage