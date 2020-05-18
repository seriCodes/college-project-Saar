import React, {useState, useEffect} from 'react'
import Nav from 'react-bootstrap/Nav'
import { Link } from 'react-router-dom';
import  firebase  from "../firebase/config";
import {AuthContext} from "../context/authContext";
import Container from 'react-bootstrap/Container'


// import Navbar from 'react-bootstrap/Navbar'
export const Head = (props) => {
  const [userDBobject,setUser]=useState(null)
  const {authState, dispatchAuth} = React.useContext(AuthContext);
  const [userDBName,setUserName]=useState(null)
  const [userKind,setUserKind]=useState(null)

  useEffect(  ()=>{
    console.log("useEffect head")
  async function fetchData(){
    var user =await firebase.getUserState() 
  //  console.log(user);
   if(user){
    let userObject =await firebase.getUserDBobject(user.uid)
    console.log(user)
    // console.log(userObject);
    setUser(userObject)
    // console.log(userDBobject);
    setUserName(userObject.name)
    setUserKind(userObject.userKind)
    console.log(userDBName);
    // dispatchAuth({
    //   type:'LOGIN',
    //   payload:user
    // })
   }else{
    console.log("useEffect head else");

    console.log(userDBobject);


    setUser(null)
    setUserName(null)
   }
  };
  fetchData()   
},[authState]
)

  const logOutEvent=async ()=>{
    setUser(null)
    await firebase.signout()
    props.history.replace('/login')
    // console.log('LOGOUT event')
    dispatchAuth({
        type:'LOGOUT',
        payload:{}
    })
    console.log(authState)

}
console.log(authState)
// console.log(authState.user)

// console.log(authState.hasOwnProperty('user'))
console.log(Object.keys(authState.user))
// console.log(Object.keys(authState.user).length>1)

// console.log(Object.keys(authState).length === 1)

var headerDisplay;
console.log(userDBobject)

// if(Object.keys(authState.user).length>1){
// if(user){

//       <div class="container d-flex justify-content-between">

  let alternateNavItemAccordingToUserKind;
  let greeting;
  if(userKind=="STUDENT"){ 
    greeting=(<span>Student</span>)
    alternateNavItemAccordingToUserKind=(

      <div className="d-flex justify-content-between">
      <Nav.Item >
      <Nav.Link className="bg-dark navbar-nav" as={Link} to="/CourseRegister" 
      eventKey="/CourseRegister">
      CourseRegister</Nav.Link>
    </Nav.Item>
      <Nav.Item >
      <Nav.Link className="bg-dark navbar-nav mx-auto" as={Link} to="/MyCourses" eventKey="/MyCourses" >
      MyCourses
   </Nav.Link>
    </Nav.Item>
    </div>
    )
  }else{
    greeting=(<span>Lecturer</span>)
    alternateNavItemAccordingToUserKind=(
      <Nav.Item >
    <Nav.Link className="bg-dark" as={Link} to="/MyStudents" eventKey="/MyStudents" >
    MyStudents
 </Nav.Link>
  </Nav.Item>
    )
  }



if(userDBobject){ 
  // {console.log(user)}

  // {console.log(state)}
  // {console.log(state.hasOwnProperty("user"))}

  // {console.log(state.user)}
  // {console.log(state.user.hasOwnProperty("user"))}
  headerDisplay=(
    <div className="head ">
    <div class=" ">

    <Nav className="" variant="pills"  defaultActiveKey={""+props.location.pathname}>

      <Nav.Item className=" ">
        <Nav.Link className=" bg-dark " as={Link} to="/" 
        eventKey="/">          
        Homepage          
        </Nav.Link>
      </Nav.Item>   

    {alternateNavItemAccordingToUserKind}
    </Nav>
    </div>
    <div>


          </div> 
          <h1  className="navbar-nav mx-auto" style={{display:'inline'}}>Hello {greeting} {userDBName}</h1>

          <Nav className = "  navbar-nav mr-auto  "

          variant="pills"  defaultActiveKey={""+props.location.pathname}>
          <Nav.Item className="">
            <Nav.Link onClick={logOutEvent} className=" bg-transparent text-muted" as={Link} 
            >          
            Logout         
            </Nav.Link>
          </Nav.Item>
          </Nav>
          </div>

          
          
  )}else{

    headerDisplay=(
    <div 
    style={{  
      display:'flex',
      alignItems:'center',
      justifyContent: 'center'

    }} 
    className="head">

     <Nav className="bg-dark" variant="pills"  defaultActiveKey={""+props.location.pathname}>
    <Nav.Item >
      <Nav.Link className="bg-dark" as={Link} to="/login" 
      eventKey="/login">          
      Login          
      </Nav.Link>
    </Nav.Item>
    <Nav.Item >
      <Nav.Link className="bg-dark" as={Link} to="/signin" 
      eventKey="/signin">
      Signin</Nav.Link>
    </Nav.Item>
  </Nav>
    </div>
)
}

    return ( 
     
      <div>
      {headerDisplay}  
     
  
          </div>
    )
}

