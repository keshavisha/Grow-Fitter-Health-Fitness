import React from 'react';
import {Tilt} from 'react-tilt';
import './GrievanceForm.css'
import Navbar from './components/auth-reg/Navbar';
import { useState } from 'react';
import axios from 'axios'
const GrievanceForm=()=>{
    const [name,setName]=useState('');
    const [email,setEmail]=useState('');
    const [grievance,setGrievance]=useState('');
   

    const handleSubmit=async e=>{
        e.preventDefault();
        const data={name,email,grievance};
       await axios.post('http://34.131.54.222:9012/api/grievances',data).then(
        console.log('sent Sucessfully!')
       ).catch((error)=>{
        console.log(error);
       })
    }
  return (
    <>
    <Navbar textColor='white'/>
    <div className="container">
       
      <div className="field">
        <p>Developed by: Team Grow Fitter</p>
        <p>Parthib Goswami</p>
        <p>Rahul Kumar</p>
        <p>Isha Keshav</p>
        <p>Subham Maji</p>
        <p>Email: grow.fitter01@gmail.com</p>
      </div>
      <Tilt className="tilt-container">
        <div className="glassmorphic-form">
          <h2>Grievance Form</h2>
          <form className="gr-form"onSubmit={handleSubmit}>
            <div className="form-input">
              <label>Name:</label>
              <input className='gr-in' type="text" onChange={(e)=>{
                setName(e.target.value)
              }} />
            </div>
            <div className="form-input">
              <label>Email:</label>
              <input className="gr-in"type="email" onChange={(e)=>{
                setEmail(e.target.value)
              }} />
            </div>
            <div className="form-input">
              <label>Grievance:</label>
              <textarea rows="5" onChange={(e)=>{
                setGrievance(e.target.value)
              }}></textarea>
            </div>
            <button type="submit" className="gr-submit">Submit</button>
          </form>
        </div>
      </Tilt>
    </div>
    </>
  );
}

export default GrievanceForm;
