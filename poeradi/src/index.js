import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route} from 'react-router-dom';


import './css/sanitize.css';
import './css/index.css';
import './css/common.css';

import postPoem from './dbController.js'

import {List} from './list.js';
import {Top} from './top.js';
import {Post} from './post.js';
import {Mypage} from './mypage.js';
import {Regist} from './regist.js';
import {Login} from './login.js';
import {Header} from './header.js';
import {Card} from './card.js';
import {Detail} from './detail.js';



ReactDOM.render(
<BrowserRouter>
  <div>
    <Route exact path="/" component={Top} />
    <Route exact path="/post" component={Post} />
    <Route exact path="/regist" component={Regist} />
    <Route exact path="/login" component={Login} />
    <Route exact path="/mypage" component={Mypage} />
    <Route exact path="/list" component={List} />
    <Route exact path="/header" component={Header} />
    <Route exact path="/card" component={Card} />
    <Route exact path="/detail" component={Detail} />
  </div>
</BrowserRouter>, document.getElementById('root'));