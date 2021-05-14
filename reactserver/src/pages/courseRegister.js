import axios from 'axios';
import {Redirect} from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import './courseRegister.css'

export default function CourseRegister({id, tempSCL, setTempSCL, tempACL, setTempACL}){
    const [course, setCourse] = useState({});
    const [redirect, setRedirect] = useState(false);
    const [isLoad, setLoad] = React.useState(false);
    
    useEffect(()=>{(async()=>{
        if((id === undefined) | (id === "")){ //Redirect if user hasn't logged in
            setRedirect(true);
            return;
        }

        var courseList = tempACL;
        var StdCourses = tempSCL;
        if (Object.keys(tempACL).length === 0){
            courseList = await axios.post("http://localhost:80/getAllCourse");
            courseList = courseList.data;
            
        }

        if (Object.keys(tempSCL).length === 0){
            StdCourses = await axios.post("http://localhost:80/getStudentCourse",{"id":id});
            StdCourses = StdCourses.data;
            if (StdCourses === "Error")
                return;
        }

        var course_temp = {};
        Object.keys(courseList).forEach((c)=>{course_temp[c]={name: courseList[c].CourseName, isChecked: false};});
        Object.keys(StdCourses).forEach((c)=>{course_temp[c]={name: StdCourses[c].CourseName, isChecked: true};});
        setCourse(course_temp);
        setTempACL(courseList);
        setTempSCL(StdCourses);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    })()},[id])

    if(redirect) return <Redirect to='/'/>

    const addCourse = async(courseId)=>{
        setLoad(true);
        await axios.post("http://localhost:80/registerCourse", 
        {"id":id,"courseId":courseId}, {withCredentials: true});
        course[courseId].isChecked = true;
        tempSCL[courseId] = {"CourseName": course[courseId].name};
        setCourse(course);
        setTempSCL(tempSCL);
        setLoad(false);
    }

    const dropCourse = async(courseId)=>{
        setLoad(true);
        await axios.post("http://localhost:80/dropCourse", 
        {"id":id,"courseId":courseId}, {withCredentials: true});
        course[courseId].isChecked = false;
        delete tempSCL[courseId];
        setCourse(course);
        setTempSCL(tempSCL);
        setLoad(false);
    }

    return(<>
        <h1>Course List:</h1>
        <table className="courseList">
            <tbody>
                {Object.keys(course).map((k,i)=>{
                    return <tr key={i}>
                        <td>
                            <input type="checkbox" 
                            disabled={isLoad}
                            value={k} 
                            onChange={course[k].isChecked ? ()=>dropCourse(k) : ()=>addCourse(k)} 
                            defaultChecked={course[k].isChecked}/>
                        </td>
                        <td>{course[k].name}</td>
                    </tr>
                })}
            </tbody>
        </table>
    </>);
}