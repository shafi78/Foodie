import firebase from 'firebase/compat/app';
import auth from'firebase/compat/auth';
import 'firebase/compat/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyAQc6MEb9W53AhPmHuZsZFK9NVU0lA2uEE",
  authDomain: "foodapp-469e9.firebaseapp.com",
  projectId: "foodapp-469e9",
  storageBucket: "foodapp-469e9.appspot.com",
  messagingSenderId: "155588882253",
  appId: "1:155588882253:web:06b52fab9f15997a0ed104"
};


if (!firebase.apps.length){
  firebase.initializeApp(firebaseConfig);
}

export {firebase,auth} ;