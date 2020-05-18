function getArrayOfStudentsfromCourseObject(courseObject){
    console.log("in getArrayOfStudentsfromCourseObject")   
    let userKeyArray=[];
        for(const property in courseObject.students){
            userKeyArray.push(courseObject.students[""+property].userKey)
        }
        return userKeyArray
}


export {getArrayOfStudentsfromCourseObject}