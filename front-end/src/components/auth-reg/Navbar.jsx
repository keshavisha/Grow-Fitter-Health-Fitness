import React from 'react'
import './Navbar.css'
import {Link} from 'react-router-dom'
import logo from '../../assets/logo.jpg'
const Navbar = (props) => {
  const textColor=props.textColor||'white'
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <img src={logo} alt="Company Logo" className='logo-cp' />
      </div>
      <ul className="navbar-nav">
        <li className="nav-item"><Link to='/homepage' style={{color:textColor}}>Home</Link></li>
        <li className="nav-item"><Link to='/blog-page' style={{color:textColor}}>Blogs</Link></li>
        <li className="nav-item"><Link to='/diet-plan' style={{color:textColor}}>Diet Planner</Link></li>
        <li className="nav-item"><a href="#" style={{color:textColor}}>Posture Detector</a></li>
      </ul>
    </nav>
  )
}

export default Navbar