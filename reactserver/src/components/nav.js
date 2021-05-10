import axios from 'axios'
import React, {useCallback} from 'react'
import {Link} from 'react-router-dom'
import "./nav.css"

export default function Nav({name, setStd, ck}) {

    const logout = useCallback(async() => {
        await axios.post("http://localhost:80/logout", {withCredentials: true});
        ck.remove('id');
        setStd({name: "", id: ""});
    }, [ck, setStd]);

    return (
        <nav className="navbar">
            <div className="containter">
                <div className="options">
                    <ul>
                        <li>
                            <Link to='/' className="nav-home">Home</Link>
                        </li>

                        <li className="rightCmp">
                            {(name !== '') & (name !== undefined)
                                ? <>
                                    <Link to="/registerCourse">Register Course</Link>
                                    <Link to="/Login" onClick={logout}>Logout</Link>
                                </>
                                : <Link to="/login">Login</Link>}
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}