import * as firebase from "firebase";
import 'firebase/auth';
import 'firebase/firestore'
import 'firebase/storage'

var firebaseConfig = {
    apiKey: "AIzaSyDsHkY3jzh9vhXczOGq0OkTbwuCzsKAAD4",
    authDomain: "college-project-saar.firebaseapp.com",
    databaseURL: "https://college-project-saar.firebaseio.com",
    projectId: "college-project-saar",
    storageBucket: "college-project-saar.appspot.com",
    messagingSenderId: "159417026569",
    appId: "1:159417026569:web:f7633a6dee376cdcbc50d8"
  };
 
class Firebase{
    constructor(){
        firebase.initializeApp(firebaseConfig)
        this.auth=firebase.auth()
        this.db=firebase.database()        
    }
    async login(email,password){
        const user = await firebase.auth().signInWithEmailAndPassword(email,password).catch(err=>{
            console.log(err);
            return err
        })
        return user
    }
    async signIn(email,password, fullName,ID,userKind,courseDaysList)    {

        const user = await firebase.auth().createUserWithEmailAndPassword(email,password).catch(err=>{
            console.log(err);
            alert(err)
            return err;
        })
        if(user instanceof  Error){
            console.log("err");
            return user
        }
        if(!(user instanceof  Error)){
            console.log(user)
            console.log(user.user.uid)
            console.log(user.user.email)
            console.log(userKind)
            console.log(user.userKind)
            console.log(courseDaysList);

            console.log(user)
            let newUser={         
              name: fullName,
              personalID: ID,
              email: ""+ user.user.email,
              userKind,
              AccountID: ''+user.user.uid,
            }
            if(userKind=="LECTURER-Course"){
              newUser['courseDaysList']=courseDaysList              
            }
             let childRefernce= await this.db.ref("Users").push(newUser);
             console.log(childRefernce)

              console.log(user)
        return user
        }

    }
async signout(){
      await firebase.auth().signOut()
  }
  async getUserKey(uid){
    let userKey;
    console.log(uid)
    await this.db.ref('Users')
    .once('value')
    .then((snapshot) => {
        console.log(snapshot)
      snapshot.forEach((childSnapshot) => {

        
        if(childSnapshot.val().AccountID==uid){
            console.log('getuserKey V')
            console.log(childSnapshot.val())
            userKey= childSnapshot.key          
        }

      });

   });

   return userKey

}
  
async getUserCoursesKeys(uid){
          var courseDBkeyArray=[];

  await this.db.ref("Users").once('value')
  .then((snapshot)=>{
    snapshot.forEach((user)=>{
      
      if( user.val().AccountID==uid){
        console.log(user.val().courses)
let specificCourseStudenData;
        for (const coursePropertyOfKey in user.val().courses){
          console.log(coursePropertyOfKey)
          specificCourseStudenData= user.val().courses[""+coursePropertyOfKey]
          console.log(specificCourseStudenData)
          courseDBkeyArray.push(specificCourseStudenData.courseDBkey)
        }
      }
    })
  })
  return courseDBkeyArray
}
async getUserState(){
  return new Promise(resolve=> {
      this.auth.onAuthStateChanged(resolve);
  });
}

  async addCourse(courseDBkey, userKey,uid){
    console.log(courseDBkey);
    console.log(userKey);



      let lecturesKeys=[];

     /////adding course to user
    this.db.ref('Users/'+userKey+'/courses').push({
      courseDBkey,
      courseMark:"n\a"
    })
    ///////adding user to course
    this.db.ref('Users/'+courseDBkey+'/students').push({
      userKey,
      // courseMark:"n\a"////the mark will be only at students location
    })
}



async getSingleCourseOrStudent(key){
    let course;
    console.log(key)
    await this.db.ref('Users')
    .once('value')
    .then((snapshot) => {
        console.log(snapshot)
      snapshot.forEach((childSnapshot) => {

        if(childSnapshot.key==key){
            console.log('getSingleCourseOrStudent V')
            console.log(childSnapshot.val())

            course = childSnapshot.val()
        }

        
      });      
   });

   return course

}
async getLecturersKeys(){
  let coursesDBkeys=[]

  await this.db.ref('Users')
  .once('value')
  .then((snapshot) => {
    snapshot.forEach((childSnapshot) => {
      
      if(childSnapshot.val().userKind=='LECTURER-Course'){

          coursesDBkeys.push(childSnapshot.key)
      }

    });
 });
 return coursesDBkeys
}
async getLecturers(){
    let courses=[]

    await this.db.ref('Users')
    .once('value')
    .then((snapshot) => {
      snapshot.forEach((childSnapshot) => {
        
        if(childSnapshot.val().userKind=='LECTURER-Course'){

            courses.push(childSnapshot.val())
        }

      });

   });

   return courses

}

async getCourseKeyByEmail(email){
let coursesDBkey;
  await this.db.ref('Users')
  .once('value')
  .then((snapshot) => {
    snapshot.forEach((childSnapshot) => {
      
      if(childSnapshot.val().email==email){
          coursesDBkey= childSnapshot.key;
      }

    });
 });
 return coursesDBkey
}

async getUserDBobject(uid){
    let userObject;
    console.log(uid)
    await this.db.ref('Users')
    .once('value')
    .then((snapshot) => {
        console.log(snapshot)

      snapshot.forEach((childSnapshot) => {

        if(childSnapshot.val().AccountID==uid){
            console.log(childSnapshot.val().name)
             userObject= childSnapshot.val()
             return
        }

      });
              console.log('childSnapshot.val().name')

   });
   return userObject

}

async getUserStudentsKeys(uid){

}

async  eraseDB(){
   await this.db.ref('Users')
   .remove()
  .then(() => {
    console.log('Data was removed');
  }).catch((e) => {
    console.log('Did not remove data', e);
  });

}

async updateStudentMark(studentDBkey,userCourseKey,studenMarkToSendDB){
  let childSnapshotKey;

  await this.db.ref('Users/'+studentDBkey+'/courses').once('value')
  .then((snapshot)=>{
    snapshot.forEach((childSnapshot)=>{
      console.log(childSnapshot.key)
      console.log(childSnapshot.val())
      if(childSnapshot.val().courseDBkey==userCourseKey){
        console.log(childSnapshot.key)

        childSnapshotKey= childSnapshot.key   
        }
      })
    })

    this.db.ref('Users/'+studentDBkey+'/courses'+'/'+childSnapshotKey)
    .update({courseMark:studenMarkToSendDB})

  }

  async removeStudentFromCourseAndTheOpposite(removeProperty,removedLocation,studentsOrcourses,lastPropertySearch){
    let keyToRemove;
    let objCheck={}
    console.log(removeProperty)
    console.log(removedLocation)
    console.log(studentsOrcourses)
    console.log(lastPropertySearch)

   await this.db.ref('Users/'+removedLocation+'/'+studentsOrcourses)
   
    .once('value').then((snapshot)=>{
      console.log(snapshot)

      snapshot.forEach((childSnapshot)=>{
        console.log(childSnapshot.val())
        objCheck=childSnapshot.val()
       if( objCheck[""+lastPropertySearch]==removeProperty){
         console.log(childSnapshot.key)
        keyToRemove= childSnapshot.key
       }
      })
    })
    await this.db.ref('Users/'+removedLocation+'/'+studentsOrcourses+'/'+keyToRemove).remove()

  }
   }


  
export default new Firebase();

