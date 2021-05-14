import React, { useEffect } from 'react'
import axios from 'axios'
import {Redirect} from 'react-router-dom'
import './login.css'

export default function Login({name,setStd}){

    const [us, setUs] = React.useState('');
    const [pw, setPw] = React.useState('');
    const [err, setErr] = React.useState('');
    const [isLoad, setLoad] = React.useState(false);
    const [showErr, setShowErr] = React.useState('none');
    const [redirect, setRedirect] = React.useState(false);

    useEffect(()=>{ // Check if student already logged in
        if((name !== undefined) && (name !== "")){
            setRedirect(true);
        }
    }, [name])

    const checkLogin = (async(e)=>{
        e.preventDefault();
        if (us === pw){
            setLoad(true);
            try{
                const res = await axios.post("http://localhost:80/login",{"id":us},{withCredentials: true});
                if(res.data.length!==0){
                    setStd({name: res.data, id: us});
                    setShowErr('none');
                    setLoad(false);
                }else
                {
                    setShowErr('block');
                    setLoad(false);
                }
            }catch(e){
                console.log(e)
                setErr('Server is not online. Please try again later.');
                setLoad(false);
            }
        }else
        {
            setErr('Login Error. Please check you username/password again.');
            setShowErr('block');
        }
    });

    if(redirect) return <Redirect to='/'/>

    return(<div className="LoginForm">
        <form method="POST" onSubmit={checkLogin}>
            <label>Username</label>
            <input type="text" disabled={isLoad} onChange={(e)=>setUs(e.target.value)} required/>
            <label>Password</label>
            <input type="password" disabled={isLoad} onChange={(e)=>setPw(e.target.value)} required/>
            <input type="submit" disabled={isLoad} value="Login"/>
        </form>
        <label style={{display: showErr}}>{err}</label>
    </div>);
}