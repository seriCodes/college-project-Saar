import React, {useState, useEffect} from 'react'
import  firebase  from "../firebase/config";
import  {SingleStudent}  from "./SingleStudent";
import {getArrayOfStudentsfromCourseObject} from '../functions/getFunctions'
import  {Redirect}  from "react-router-dom";

export const MyStudents = () => {
    const [studentDBkeys,setstudentDBkeysArray]=useState([])
    const [userKind,setUserKind]=useState('LECTURER-Course')


    useEffect(  ()=>{
        console.log("useEffect MyStudents")
      async function fetchData(){
        var user =await firebase.getUserState() 
       console.log(user);
       if(user){
        let studentsDBkeyArray
        let courseDBobject
        courseDBobject =await firebase.getUserDBobject(user.uid)
        console.log(courseDBobject) 
        studentsDBkeyArray=getArrayOfStudentsfromCourseObject(courseDBobject)
        console.log(studentsDBkeyArray)

        setUserKind(courseDBobject.userKind)

        setstudentDBkeysArray(studentsDBkeyArray)
             console.log(studentDBkeys)

       }else{
        console.log("MyStudents head else"); 
       }
      };
      fetchData()   
    },[]
    )

    console.log(userKind);

    let redirectComponent;
    if(userKind!="LECTURER-Course"){
        console.log("redirect from MyStudents...")
        redirectComponent=(<Redirect to="/"/>)
    }
        
    return (
        <div>
        <div class="aw-highlight mb-2 d-flex justify-content-center">
        <div className="h1 justify-content-center"><u>My Students</u></div>        </div>

        {
                studentDBkeys.length !==0?(studentDBkeys.map((studentekey)=>{
                   return <SingleStudent studentDBkey={studentekey} updateMarkCapabilityNeeded={true} > </SingleStudent>
            
                })):(<div>No Students</div>)
            }
            {redirectComponent}

        </div>
    )
}
