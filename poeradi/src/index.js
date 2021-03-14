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

import ScrollToTop from './scrollToTop.js';

export const UserContext = createContext()
export const ListContext = createContext([{index:0,kind:"new"},()=>{}])
export const PoemsContext = createContext([[],()=>{}])
export const TopContext = createContext([{pickup:[],good:[],hurt:[]},()=>{}])

const UserProvider= (props)=>{
  let [userContextVal,setUserContextVal] = useState({uid:null,email:null});
   
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
      else{
        setUserContextVal({
          uid:  null,
          email:  null,
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

const ListProvider= (props)=>{
  let [listContextVal,setListContextVal] = useState({index:0,kind:"new"});
  let [poemsContextVal,setPoemsContextVal] = useState([]);
  return(
    <ListContext.Provider value={[listContextVal,setListContextVal]}>
      <PoemsContext.Provider value={[poemsContextVal,setPoemsContextVal]}>
        <Route exact path="/list" component={List} />
      </PoemsContext.Provider>
    </ListContext.Provider>
  )
}

const TopProvider= (props)=>{
  let [poemsContextVal,setPoemsContextVal] = useState({pickup:[],good:[],hurt:[]});
  return(
      <TopContext.Provider value={[poemsContextVal,setPoemsContextVal]}>
        <Route exact path="/" component={Top} />
      </TopContext.Provider>
  )
}

const App = ()=>{

  return(
    <BrowserRouter>
        <ScrollToTop>
          <div>
            
            <Route exact path="/post" component={Post} />
            <Route exact path="/regist" component={Regist} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/mypage" component={Mypage} />
            <Route exact path="/detail" component={Detail} />
            <ListProvider/>
            <TopProvider/>
          </div>
        </ScrollToTop>
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