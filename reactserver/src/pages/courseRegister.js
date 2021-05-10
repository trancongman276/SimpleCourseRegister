import axios from 'axios';
import React, { useEffect, useState } from 'react'
import './courseRegister.css'

export default function CourseRegister({id}){
    const [course, setCourse] = useState({});

    useEffect(()=>{(async()=>{
        var course_temp = {};
        var courseList = [];
        var StdCourses = [];
        courseList = await axios.post("http://localhost:80/getAllCourse", {withCredentials: true});
        StdCourses = await axios.post("http://localhost:80/getStudentCourse",{"id":id}, {withCredentials: true});
        courseList = courseList.data;
        StdCourses = StdCourses.data;
        courseList.forEach((c)=>{course_temp[c.CourseID]={name: c.CourseName, isChecked: false};});
        StdCourses.forEach((c)=>{course_temp[c.CourseID]={name: c.CourseName, isChecked: true};});
        setCourse(course_temp);
    })()},[id]);
    
    const addCourse = async(courseId)=>{
        await axios.post("http://localhost:80/registerCourse", 
        {"id":id,"courseId":courseId}, {withCredentials: true});
        course[courseId].isChecked = true;
        setCourse(course);
    }

    const dropCourse = async(courseId)=>{
        await axios.post("http://localhost:80/dropCourse", 
        {"id":id,"courseId":courseId}, {withCredentials: true});
        course[courseId].isChecked = false;
        setCourse(course);
    }

    return(<>
        <h1>Course List:</h1>
        <table className="courseList">
            {Object.keys(course).map((k)=>{
                return <tr>
                    <td>
                        <input type="checkbox" 
                        value={k} 
                        onChange={course[k].isChecked ? ()=>dropCourse(k) : ()=>addCourse(k)} 
                        defaultChecked={course[k].isChecked}/>
                    </td>
                    <td>{course[k].name}</td>
                </tr>
            })}
        </table>
        
    </>);
}