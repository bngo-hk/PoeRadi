import React,{useState, createContext, useContext, useEffect} from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter,Switch, Route} from 'react-router-dom';


import './css/sanitize.css';
import './css/index.css';
import './css/common.css';

import firebase from './firebaseConfig.js'

// import postPoem from './dbModules.js'

import {List} from './list.js';
import {Top} from './top.js';
import {Post} from './post.js';
import {Mypage} from './mypage.js';
import {Regist} from './regist.js';
import {Login} from './login.js';
import {Header} from './header.js';
import {Card} from './card.js';
import {Detail} from './detail.js';



const UserProvider= (props)=>{
  let [userContextVal,setUserContextVal] = useState({uid:"a",email:null});
   
  let UserContext = createContext()
  // let userData={uid:null,email:null}

  useEffect(() => {
    firebase.auth().onAuthStateChanged(function(user) {
      if(user){
        // User is signed in.
        setUserContextVal({
          uid:  user.uid,
          email:  user.email,
        })
        
      }
    });
    },
  []);
  useEffect(() => {
    console.log(userContextVal.uid)
    },
  [userContextVal.uid]);
  return(
    <UserContext.Provider value={userContextVal}>
      {props.children}
    </UserContext.Provider>
  )
}
const App = ()=>{

  return(
    <BrowserRouter>
        <div>
          <Route exact path="/" component={Top} />
          <Route exact path="/post" component={Post} />
          <Route exact path="/regist" component={Regist} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/mypage" component={Mypage} />
          <Route exact path="/list" component={List} />
          <Route exact path="/detail" component={Detail} />
        </div>
    </BrowserRouter>
  )
}


ReactDOM.render(
  <>
  <UserProvider>
    <App/>
  </UserProvider>
  </>
 ,document.getElementById('root'));