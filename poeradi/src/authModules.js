import firebase from './firebaseConfig.js'


const authCreate=(email,password)=>
{
    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(function(){
        return false
    })
    .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;

        return errorCode
    });
}

const authSignIn =(email,password)=>
{    
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then(function(){
        return false
    })
    .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;

        return errorCode
    });
}

const authSignOut = ()=>
{
    firebase.auth().signOut().then(()=> {
    // Sign-out successful.
    console.log('logout');
    }).catch(error => {
    // An error happened.
    console.log(error);
    });
}

const authGoogleSignIn=()=>{
    //googleプロバイダオブジェクトのインスタンスを生成する
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithRedirect(provider).then(function(result) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        // ...
    }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
    });
}
