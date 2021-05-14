import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import Nav from './components/nav';

import HomePage from "./pages/homepage.js";
import Login from "./pages/login";
import CourseRegister from './pages/courseRegister'
import { useEffect, useState } from 'react';
import axios from 'axios';

import Cookies from 'universal-cookie';
import Page404 from './pages/Page404';
const cookies = new Cookies();

function App() {
  const [Std, setStd] = useState({name: "", id: ""});
  const [tempStdCourse, setTempStdCourse] = useState({});
  const [tempAllCourse, setTempAllCourse] = useState({});

  useEffect(()=>{
    (async()=>{
      const res = await axios({
        method: 'post',
        url: 'http://localhost:80/user',
        data:{
          "id": cookies.get("id")
        }
      });
      if (res.data !== "Error") setStd({name: res.data, id: cookies.get("id")});
    })();
  },[]);

  return (
    <div className="App">
      
      <BrowserRouter>
        <Nav name={Std.name} setStd={setStd} ck={cookies}
          setTempSCL={setTempStdCourse} setTempACL={setTempAllCourse}
        />
        <Switch>
          <Route path="/" exact>
            <HomePage Std={Std} 
            tempSCL={tempStdCourse} setTempSCL={setTempStdCourse}/>
          </Route>
          
          <Route path="/login" exact>
            <Login name={Std.name} setStd={setStd}/>
          </Route>
          
          <Route path="/registerCourse">
            <CourseRegister id={Std.id} 
                tempSCL={tempStdCourse} setTempSCL={setTempStdCourse}
                tempACL={tempAllCourse} setTempACL={setTempAllCourse}
              />
          </Route>
          
          <Route path="*">
            <Page404/>
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
