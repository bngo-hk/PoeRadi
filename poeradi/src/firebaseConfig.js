import firebase from "firebase/app";
import "firebase/analytics";
import "firebase/auth";
import "firebase/firestore";
  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyBF79u6-orpZDzm4zXJMVZRRs94v10AICs",
    authDomain: "poeradi-bngo.firebaseapp.com",
    projectId: "poeradi-bngo",
    storageBucket: "poeradi-bngo.appspot.com",
    messagingSenderId: "643074331454",
    appId: "1:643074331454:web:c5717de6b24fd559d5526f"
  };
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);

  export default firebase