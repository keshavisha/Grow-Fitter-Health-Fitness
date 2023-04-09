import React from 'react'
import myvideo from './SIGNUPvideo.mp4'
import './Signup.css'
import { useState } from 'react'
import {auth} from '../../firebase'
import { getDatabase, ref, set } from "firebase/database";
import {BrowserRouter as Router, useNavigate } from 'react-router-dom'
const Signup = () => {
  const [gender,setGender]=useState('not defined');
  const[form,setForm]=useState({
    name:"",
    email:"",
    password:"",
    cpassword:"",
    ph:"",
    gender:"",
    address:"",

  })
  const navigate=useNavigate();
  const handleSubmit=e=>{
    e.preventDefault();
    console.log(JSON.stringify(form));
    auth.createUserWithEmailAndPassword(form.email,form.password).then((userCredential)=>{
     const user=userCredential.user;
     console.log('User created:',user);

     const db=getDatabase()
     console.log(db);
     set(ref(db,`users/${user.uid}`),
     {
      name:form.name,
      email:form.email,
      ph:form.ph,
      gender:form.gender,
      address:form.address,
      age:form.age,

     });
     setForm({
      name: '',
      email: '',
      password: '',
      cpassword: '',
      ph: '',
      gender: '',
      address: '',
      age: '',
     })
    return navigate('/signin')
    }).catch((error) => {
    
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error('Error creating user:', errorMessage,"-",errorCode);
    });
  }
  const onHandleChange=(e)=>{
    const { name, value, type, checked } = e.target;

    const newValue = type === "radio" ? value : value;
  
    setForm((prevForm) => ({
      ...prevForm,
      [name]: newValue,
    }));
  }
  return (
    <div className='Signup-root'>
    <div className="video">
    <video src={myvideo} autoPlay muted loop playsInline>
    </video>
    </div>
    <div className="frm">
      <div className="frm_outer">
      <form className='form_signup' onChange={onHandleChange} onSubmit={handleSubmit}>
        <p className='heading'>SIGNUP</p>
        <label htmlFor="fname">NAME:</label>
        <input name='name' type="text" className="fname sn" placeholder="FULLNAME"  />
        <label htmlFor="email">EMAIL:</label>
        <input name='email' type="text" className="email sn" placeholder="EMAIL" />
        <label htmlFor="pword">PASSWORD:</label>
        <input name='password' type="password" className="pword" placeholder="PASSWORD"/>
        <label htmlFor="cpword">CONFIRM PASSWORD</label>
        <input name='cpassword'type="password" className="cpword" placeholder="CPASSWORD" />
        <label htmlFor="ph">PH.NO:</label>
        <input name='ph' type="tel" className="ph" placeholder="+91xxxxxxxxxx"/>
        <label htmlFor="age">AGE:</label>
        <input name='age' type="number" className="age" placeholder="00" />
        <label htmlFor="gender">Gender
                <div className="gender">
                   Male<input  type="radio" name="gender" value="male" checked={gender==='male'}  onChange={e=>setGender(e.target.value)}required/>
                   
    
                   Female<input  type="radio" name="gender" value="female" onChange={e=>setGender(e.target.value)} checked={gender==='female'} required/>
                   
        
                
                   Other<input  type="radio" name="gender" value="other" onChange={e=>setGender(e.target.value)} checked={gender==='other'} required/>
                   
                   </div>
              </label>
        <label htmlFor="address">FULL ADDRESS:</label>
        <input name='address' type="text" className="address sn" placeholder='enter full address,pincode' />
        <button className="submit-sn" >REGISTER</button>
      </form>
      </div>
    </div>
    
    </div>
  )
}

export default Signup