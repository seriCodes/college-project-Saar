import React, {useState,  useEffect}  from 'react'
import  firebase  from "../firebase/config";
import  Button  from "react-bootstrap/Button";
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

export  const  SingleStudent =  ({studentDBkey, updateMarkCapabilityNeeded}) => {
    console.log(studentDBkey);

    const [markInput,setMarkInput]=useState("")
        
    const [studentDBobject,setStudent]=useState({})
    const [studenMark,setStudentMark]=useState("Wasn't given")

    let specificStudent;

    useEffect(  ()=>{
        async function fetchData(){
            console.log(studentDBobject);
            specificStudent =await firebase.getSingleCourseOrStudent(studentDBkey) 
         console.log(specificStudent);
         setStudent(specificStudent)
          console.log(specificStudent)
          var user =await firebase.getUserState()
          var userCourseKey =await firebase.getUserKey(user.uid)
          
          let mark;
          for (const coursePropertyOfKey in specificStudent.courses){
            console.log(coursePropertyOfKey)
            console.log(specificStudent.courses[""+coursePropertyOfKey].courseDBkey)

            if(specificStudent.courses[""+coursePropertyOfKey].courseDBkey==userCourseKey){
                mark=specificStudent.courses[""+coursePropertyOfKey].courseMark
                console.log(mark)
                setStudentMark(mark)
                break
            }
          }

        };
        fetchData()        
      },[]
      )
      console.log(specificStudent);
      console.log(studentDBobject);
 
      const [studenMarkToSendDB,setStudentMarkDB]=useState("Wasn't given")
  
      const updateMark= async (e)=>{
          e.preventDefault()

          console.log("updateMark")
          console.log(studenMarkToSendDB)

          console.log(e)
        console.log(studenMark)
        var user =await firebase.getUserState()
        var userCourseKey =await firebase.getUserKey(user.uid)

        await firebase.updateStudentMark(studentDBkey,userCourseKey,studenMarkToSendDB)
        setStudentMark(studenMarkToSendDB)
        // console.log(e.name)

    }
    
  let updateMarkInput;
if(updateMarkCapabilityNeeded){
    
    updateMarkInput=(
        <div>
    <Form onSubmit={updateMark}>
    <Form.Group as={Row} controlId="formPlaintextEmail">
      <Form.Label column  sm="2">
      <span className="h5 ">New mark</span>  
     
        <Form.Control type="number" min="0" max="100" className="bg-light w-100 border form-control mt-3 " plaintext onChange={ (e)=> setStudentMarkDB(e.target.value)} />
        
   </Form.Label>
    </Form.Group>
    <input className="btn btn-secondary"type='submit' value='Update mark'/>

    </Form>
    </div>
    )


}

    let studentDispaly;
    if( Object.keys(studentDBobject).length===0 ){      
        console.log("empty")
        studentDispaly="no course"
    }else{
        console.log("full")
        studentDispaly=(
            <div>
                       <br/>
                  <div className="card mb-3">
                  <h5 className="card-header h3"> {studentDBobject.name}</h5>
                  <div className="card-body">
                      <h5 className="card-title h4">{studentDBobject.email}</h5>
                      <p className="card-text h5">{studentDBobject.personalID}</p>
                      <p className="card-text h5"> Mark is:{studenMark}</p>
                      {updateMarkInput}
                  </div>
              </div>
              <br/>
          
            </div>
        )
    }
    
    return (
        <div>
        {studentDispaly}<br/>


      </div>
    )
}
