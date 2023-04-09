import React, { useState, useContext } from 'react';
import axios from 'axios';
import {UserContext} from './auth-context';
import './FormComponent.css'
import { Await } from 'react-router-dom';
const FormComponent = () => {
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const userContext = useContext(UserContext);
  const [error,setError]=useState(null)
  const handleSubmit = (e) => {
    e.preventDefault();

    // send form data to backend
    const data = { title, text, user: userContext };
    axios.post('http://34.131.54.222:9012/api/blogs', data)
      .then(response => {
        console.log("sent!");
      })
      .catch(error => {
        // handle error
        if(
        error.message==='Request failed with status code 416'){
          setError("This post is not related to fitness!Please contact admin")
        }
        console.log(error)
      });
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <h2 className="form-heading">Contribute a new blog</h2>
      <label htmlFor="title">Title:</label>
      <input className="txt-input" type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
      <label htmlFor="text">Text (minimum 150 characters):</label>
      <textarea id="text" className="txt-blog" value={text} onChange={(e) => setText(e.target.value)} />
      <button type="submit" className="form-button">Send</button>
      {error&&<p className="error">{error}<br/><button onClick={()=>{setError('')}}>❌</button></p>}
          </form>
  );
};

export default FormComponent;
