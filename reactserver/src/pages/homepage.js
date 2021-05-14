import axios from 'axios'
import {useEffect} from 'react'

export default function HomePage({Std, tempSCL, setTempSCL}){
    
    useEffect(()=>{(async()=>{
        if(Object.keys(tempSCL).length !== 0) // Check if the student course list is already existed
            return;

        if((Std.id === undefined) | (Std.id === ""))
            return;

        const res = await axios.post("http://localhost:80/getStudentCourse",{"id": Std.id})
        if (res.data !== "Error")
            setTempSCL(res.data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    })()},[]);
    return(
        <div className="Home">
            {(Std.name !== undefined) && (Std.name !== "") ? 
                <>
                    <h1>Welcome {Std.name}</h1>
                    {Object.keys(tempSCL).length === 0 ? 
                        <h5>You haven't registered any course!</h5>
                    :
                    <>
                        <h5>Registerd Courses:</h5>
                        <ul style={{listStyleType: 'none', padding:0}}>
                            {Object.keys(tempSCL).map((c,i)=>{
                                return <li key={i}>{tempSCL[c].CourseName}</li>
                            })}
                        </ul>
                    </>}
                </>
                : 
                <h1>Please login to continue!</h1>}
        </div>
    )
}