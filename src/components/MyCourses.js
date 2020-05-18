import React, {useState, useEffect} from 'react'
import  firebase  from "../firebase/config";
import  {SingleCourse}  from "./SingleCourse";
import  {Redirect}  from "react-router-dom";

export const MyCourses = () => {
    const [coursesDBkeys,setCoursesDBArray]=useState([])
    const [userKind,setUserKind]=useState("STUDENT")

    let redirectComponent;

    useEffect(  ()=>{
        console.log("useEffect MyCourses")
      async function fetchData(){
        var user =await firebase.getUserState() 
       console.log(user);
       if(user){
        let courseDBkeyArray
        courseDBkeyArray =await firebase.getUserCoursesKeys(user.uid)
        console.log(courseDBkeyArray)
        setCoursesDBArray(courseDBkeyArray)
        
        let userObject =await firebase.getUserDBobject(user.uid)
        console.log(userObject.userKind);
        setUserKind(userObject.userKind)

       }else{
        console.log("MyCourses head else");
    
       }
      };
      fetchData()   
    },[]
    )

    if(userKind!="STUDENT"){
        console.log("redirect from MyCourses" )
        redirectComponent=(<Redirect to="/"/>)
    }

    
    return (
        <div>
        <div class="aw-highlight mb-2 d-flex justify-content-center">
        <div className="h1 display-1 justify-content-center"><u>My  Courses
        </u></div>        </div>
            {
                coursesDBkeys.length !==0?(coursesDBkeys.map((coursekey)=>{
                   return <SingleCourse courseDBkey={coursekey} registrationNeeded={false} removeRegistration={true}></SingleCourse>
            
                })):(<div>No courses</div>)
            }
{redirectComponent}
        </div>
    )
}
