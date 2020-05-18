import React, {useState, useEffect} from 'react'
import  firebase  from "../firebase/config";
import  {SingleCourse}  from "./SingleCourse";
import  {Redirect}  from "react-router-dom";

export const CourseRegister = () => {
    const [coursesDBkeys,setCoursesDBkeys]=useState([])
    const [userKind,setUserKind]=useState("STUDENT")

    
    // //NOt doing anything - maybe in the future
    // useEffect(  ()=>{
    //     let coursesList=[];
    //     async function fetchData(){
    //      let coursesList =await firebase.getLecturers() 
    //     //  console.log(coursesList);
    //     //  await firebase.eraseDB()
    //     };
    //     fetchData()
        
    //   },[]
    //   )
    ///////////////////////////////////
      useEffect(  ()=>{
        async function fetchData(){
            setCoursesDBkeys(await firebase.getLecturersKeys() )
         console.log(coursesDBkeys);
        };
        fetchData()
        
      },[]
      )


      let redirectComponent;

      useEffect( ()=>{
              console.log("useEffect MyCourses")
            async function fetchData(){
              var user =await firebase.getUserState() 
             console.log(user);
             if(user){
              let userObject =await firebase.getUserDBobject(user.uid)
              setUserKind(userObject.userKind)
 
             }
          }
          fetchData()   
        },[]
          )

          if(userKind!="STUDENT"){
            console.log("redirect from CourseRegister...")

            redirectComponent=(<Redirect to="/"/>)
          }


    return (
        <div>
        <div class="aw-highlight mb-2 d-flex justify-content-center">
        <div className="h1 display-1 justify-content-center  "><u>Course Registration</u></div>        </div>

{
    coursesDBkeys.length !==0?(coursesDBkeys.map((coursekey)=>{
       return <SingleCourse courseDBkey={coursekey} registrationNeeded={true} ></SingleCourse>

    })):(<div>No courses</div>)
}

{redirectComponent}

        </div>
    )
}
