import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';
import Nav from './components/nav';

import HomePage from "./pages/homepage.js";
import Login from "./pages/login";
import CourseRegister from './pages/courseRegister'
import { useEffect, useState } from 'react';
import axios from 'axios';

import Cookies from 'universal-cookie';
const cookies = new Cookies();

function App() {
  const [Std, setStd] = useState({name: "", id: ""});
  console.log(cookies.get("id"))
  useEffect(()=>{
    (async()=>{
      const res = await axios({
        method: 'post',
        url: 'http://localhost:80/user',
        headers: {
          withCredentials: true
        },
        data:{
          "id": cookies.get("id")
        }
      });
      console.log(res.data);
      if (res.data !== "Error") setStd({name: res.data, id: cookies.get("id")});
    })();
  },[]);

  return (
    <div className="App">
      <BrowserRouter>
        <Nav name={Std.name} setStd={setStd} ck={cookies}/>
        
        <Route path="/" exact>
          <HomePage Std={Std}/>
        </Route>
        
        <Route path="/login">
          <Login setStd={setStd}/>
        </Route>
        
        <Route path="/registerCourse">
          <CourseRegister id={Std.id}/>
        </Route>

      </BrowserRouter>
    </div>
  );
}

export default App;
