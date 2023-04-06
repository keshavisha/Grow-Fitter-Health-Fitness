import React, { useContext } from 'react';
import FormComponent from '../components/auth-reg/FormComponent';
import Navbar from '../components/auth-reg/Navbar';
import axios from 'axios';
import { useState,useEffect } from 'react';
import Card from '../components/Card';
import './Blogpage.css'
import { UserContext } from '../components/auth-reg/auth-context';
import TitleCard from '../components/TitleCard';
import {AuthContext} from '../components/auth-reg/auth-context';
const BlogPage = () => {
  const auth=useContext(AuthContext);
  const [latestPostsMain, setLatestPosts] = useState([]);
  const [userPostsMain,setUserPosts]=useState([]);
   const userContext=useContext(UserContext)
    useEffect(() => {
      const fetchLatestPosts = async () => {
        try {
          const response = await axios.get('http://localhost:9012/api/12-latest-posts');
          const latestPosts = response.data.data.slice(0, 12).map(post => {
            return { user: post.user, title: post.title, text: post.text ,id:post._id};
          });
          setLatestPosts(latestPosts);
        } catch (error) {
          console.log(error);
        }
      };
      const intervalId = setInterval(() => {
        fetchLatestPosts();
      }, 1*1000);
    
      return () => clearInterval(intervalId);
    }, []);
   useEffect(() => {
      const uri = `http://localhost:9012/api/5-latest-user/${userContext}`;
      const fetchUserPosts = async () => {
        try {
          const response = await axios.get(uri);
          const userPosts = response.data.data.slice(0, 5).map(post => {
            return { user: post.user, title: post.title, text: post.text ,id:post._id};
          });
          setUserPosts(userPosts);
        } catch (error) {
          console.log(error);
        }
      };
    
      fetchUserPosts();

      const intervalId = setInterval(() => {
        if(auth.isLoggedIn){
        fetchUserPosts();
        }
      }, 1000);
    
      return () => clearInterval(intervalId);
    }, [userContext]);
  return (
    <>
    <Navbar textColor="black"/>
    <div className="blog-post">
     
     
      <div  className="display-panel" >
        <div className="display-panel-inner">
        {
        latestPostsMain.map(post => (
              <Card key={post.id} text={post.text} name={post.user} title={post.title}  />
        ))}
        </div>
      </div>

      
      <FormComponent />

      <div className="side-div" >
      
      {auth.isLoggedIn&&
        userPostsMain.map(post => (
             <TitleCard key={post._id} title={post.title}/>
        ))}
        {
          !auth.isLoggedIn&&<p className='not-logged'>You might not have Logged In!</p>
        }
      </div>
    </div>
    </>
  );
};

export default BlogPage;
