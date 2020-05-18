import React, {useState,  useEffect}  from 'react'
import  firebase  from "../firebase/config";
import  Button  from "react-bootstrap/Button";
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

export  const  SingleCourse =  ({courseDBkey, registrationNeeded, removeRegistration}) => {
    console.log(courseDBkey);
    const [courseRegister,setCourseRegister]=useState("")
    useEffect(  ()=>{
            if(courseRegister){
                    console.log("object")
                    async function updateUsercourses(){
                        console.log(courseDBkey);
                        // specificCourse =
                        let user= await firebase.getUserState()
                        console.log(user.uid)
                        let courseDBkeyArray= await firebase.getUserCoursesKeys(user.uid)
                        console.log(courseDBkeyArray) 
                            if( courseDBkeyArray.includes(courseDBkey)){
                                alert("you are already registered to this course")

                        }else{
                            let userKey= await firebase.getUserKey(user.uid)
                            console.log(userKey);
                             await firebase.addCourse(courseDBkey,userKey,user.uid)

                        }
                    };
                    updateUsercourses()   
            }

          
      },[courseRegister]
      )

    const [courseDBobject,setCourse]=useState({})
    let specificCourse;
    useEffect(  ()=>{
        async function fetchData(){
            console.log(courseDBkey);
            specificCourse =await firebase.getSingleCourseOrStudent(courseDBkey) 
         console.log(specificCourse);
         setCourse(specificCourse)
          console.log(specificCourse)
        };
        fetchData()        
      },[]
      )
      console.log(specificCourse);
      console.log(courseDBobject);

      const registerCourse=(e)=>{
          e.preventDefault()
        console.log(e)
        console.log(e.target.value)
    }

    
  let registrationButton;
if(registrationNeeded){

    registrationButton=(    <div>
        <Button type="submit" name="sussssbject"  value={courseDBobject.name} variant="success" onClick={(e)=>setCourseRegister(e.target.value)}>Register course</Button>{' '}
        </div>
        )

}

const removeRegistrationFunction=async (e)=>{
    e.preventDefault()
    console.log("removeRegistration")
    
    console.log(courseDBobject.email)
    let user= await firebase.getUserState()
    console.log(user.uid)
    let userKey= await firebase.getUserKey(user.uid)
    console.log(userKey)
    let courseKey= await firebase.getCourseKeyByEmail(courseDBobject.email)
    console.log(courseKey)
    await firebase.removeStudentFromCourseAndTheOpposite(userKey,courseKey,'students','userKey')
    await firebase.removeStudentFromCourseAndTheOpposite(courseKey,userKey,'courses','courseDBkey')
    window.location.reload();//for un-render the removed courses- maybe later i'll find a better solution

}

let removeRegistrationForm;
if(removeRegistration){

    removeRegistrationForm=(
        <div>
    <Form onSubmit={removeRegistrationFunction}>
    <Form.Group as={Row}>
      <Form.Label column sm="2">
      
            </Form.Label>    
    </Form.Group>
    <input className="btn btn-danger" type='submit' value='remove Registration'/>

    </Form>
    </div>
    )

}

let courseDispaly;
    if( Object.keys(courseDBobject).length===0 ){      
        console.log("empty")
        courseDispaly="no course"
    }else{
        console.log("full")
        courseDispaly=(
            <div>
               <div class="card mb-3 text-center">
            <div class="card-header">
            {courseDBobject.name}
                        </div>
            <div class="card-body">
                <h5 class="card-title">{courseDBobject.email}</h5>
                <p class="card-text">
                {courseDBobject.courseDaysList[0]}&nbsp;
            {courseDBobject.courseDaysList[1]}&nbsp;
            {courseDBobject.courseDaysList[2]}&nbsp;
            {courseDBobject.courseDaysList[3]}&nbsp;
            {courseDBobject.courseDaysList[4]}&nbsp;
            {courseDBobject.courseDaysList[5]}&nbsp;
            {courseDBobject.courseDaysList[6]}&nbsp;
                
                </p>
            </div>
            <div class="card-footer text-muted">
            {removeRegistrationForm}         {registrationButton}

            </div>
        </div>
            </div>
        )
    }

    
    return (
        <div>
        
        {courseDispaly}


      </div>
    )
}
