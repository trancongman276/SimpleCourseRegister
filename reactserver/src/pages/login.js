import React, { useCallback } from 'react'
import axios from 'axios'
import {Redirect} from 'react-router-dom'

export default function Login({setStd}){

    const [us, setUs] = React.useState('');
    const [pw, setPw] = React.useState('');
    const [showErr, setShowErr] = React.useState('none');
    const [redirect, setRedirect] = React.useState(false);

    const checkLogin = useCallback(async(e)=>{
        e.preventDefault();
        if (us === pw){
            const res = await axios.post("http://localhost:80/login",{"id":us},{withCredentials: true});
            
            console.log(res.data)
            if(res.data.length!==0){
                setStd({name: res.data, id: us});
                setRedirect(true);
            }else
                setShowErr('block');
        }else
        setShowErr('block');
    },[pw, setStd, us]);

    if(redirect) return <Redirect to='/'/>

    return(<div className="LoginForm">
        <form method="POST" onSubmit={checkLogin}>
            <label>Username</label><input type="text" onChange={(e)=>setUs(e.target.value)}/>
            <label>Password</label><input type="password" onChange={(e)=>setPw(e.target.value)}/>
            <input type="submit" value="Login"/>
            <label style={{display: showErr}}>Login Error. Please check you username/password again.</label>
        </form>
    </div>);
}