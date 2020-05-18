import React from 'react'
import{BrowserRouter,Route, Switch} from 'react-router-dom'

//component
import Main from './components/Main'
import Signin from './components/Signin'
import Login from './components/Login'
import {Head} from './components/Head'
import {CourseRegister} from './components/CourseRegister'
import {SingleCourse} from './components/SingleCourse'
import {MyCourses} from './components/MyCourses'
import {MyStudents} from './components/MyStudents'
import Container from 'react-bootstrap/Container'

const Router = ()=>{

    return (  
      <BrowserRouter> 
  <Route path='/' component={Head} ></Route> 
  <Container >
     
  <Switch>
    <Route exact path='/' component= {Main}></Route>
    <Route exact path='/login' component= {Login}></Route>
    <Route exact path='/signin' component= {Signin}></Route>
    <Route exact path='/CourseRegister' component= {CourseRegister}></Route>
    <Route exact path='/MyCourses' component= {MyCourses} ></Route>
    <Route exact path='/MyStudents' component= {MyStudents}></Route>


    </Switch>
    </Container>

    </BrowserRouter>
        )
}
export default Router

