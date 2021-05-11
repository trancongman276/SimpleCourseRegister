import axios from 'axios'
import {useEffect, useState } from 'react'

export default function HomePage({Std}){
    const [course, setCourse] = useState([]);
    
    useEffect(()=>{(async()=>{
        const res = await axios.post("http://localhost:80/getStudentCourse",{"id": Std.id},{withCredentials:true})
        if (res.data !== "Error")
            setCourse(res.data);
    })()},[Std.id]);
    return(
        <div className="Home">
            {(Std.name !== undefined) && (Std.name !== "") ? 
                <>
                    <h1>Welcome {Std.name}</h1>
                    {course.length === 0 ? 
                        <h5>You haven't registered any course!</h5>
                    :
                    <>
                        <h5>Registerd Courses:</h5>
                        <ul style={{listStyleType: 'none', padding:0}}>
                            {course.map((c)=>{
                                return <li>{c.CourseName}</li>
                            })}
                        </ul>
                    </>}
                </>
                : 
                <h1>Please login to continue!</h1>}
        </div>
    )
}