import './App.css'
import Signin from './components/auth-reg/Signin'
import Signup from './components/auth-reg/Signup'
import { AuthContext, UserContext } from './components/auth-reg/auth-context'
import { useState,useEffect } from 'react'
import Homepage from './pages/Homepage'
import { Route,BrowserRouter,Routes } from 'react-router-dom';
import BlogPage from './pages/Blogpage'
import DietPlanner from './pages/DietPlanner'
import GrievanceForm from './GrievanceForm'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user,setUser]=useState('');
  useEffect(() => {
    // check for user and expiration date in local storage
    const storedUser = JSON.parse(localStorage.getItem('user'));
    const expirationDate = localStorage.getItem('expirationDate');
    if (storedUser && expirationDate) {
      const now = new Date();
      if (now.getTime() < new Date(expirationDate).getTime()) {
        setUser(storedUser);
        setIsLoggedIn(true);
      } else {
        localStorage.removeItem('user');
        localStorage.removeItem('expirationDate');
        setIsLoggedIn(false);
        setUser(null)
      }
    }
  }, []);
  const handleLogin = (user) => {
    setIsLoggedIn(true);
    setUser(user)
    const expirationDate = new Date(new Date().getTime() + 2*60*60* 1000);
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('expirationDate', expirationDate.toISOString());
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null)
    localStorage.removeItem('user');
    localStorage.removeItem('expirationDate');
  };

 

  return (
    <BrowserRouter>
    <AuthContext.Provider value={{isLoggedIn,login:handleLogin,logout:handleLogout}}>
    <UserContext.Provider value={user}>
    <div className="App">

      {/*<Signup/>
      <Signin history={history}/>*/}
      <Routes>
      <Route exact path="/" element={<Homepage/>} />
      <Route path="/homepage" element={<Homepage/>} />
      <Route path="/signup" element={<Signup/>} />
      <Route path="/signin" element={<Signin/>} />
      <Route path="/blog-page" element={<BlogPage/>} />
      <Route path="/diet-plan" element={<DietPlanner/>} />
      <Route path="/grievance" element={<GrievanceForm/>}/>
      
      </Routes>
    {/* 
  <Homepage/>*/}

    </div>
    </UserContext.Provider>
    </AuthContext.Provider>
    </BrowserRouter>
  )
}

export default App
