import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyBz--9uYGw-ZGyB6v_5I95xxS9xUWOZywI",
    authDomain: "onuapp-84f8c.firebaseapp.com",
    databaseURL: "https://onuapp-84f8c-default-rtdb.firebaseio.com",
    projectId: "onuapp-84f8c",
    storageBucket: "onuapp-84f8c.appspot.com",
    messagingSenderId: "248491480504",
  };


  if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig)
  }

  export default firebase;