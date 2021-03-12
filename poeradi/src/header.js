import React,{useState,useContext,useEffect} from 'react';
import ReactDOM from 'react-dom';
import {Link} from 'react-router-dom';

import {authSignOut} from './authModules.js'
import {UserContext} from './index.js'

import './css/common.css';

export const Header = (props)=>{

    let [hamburgerClassName,setHamburgerClassName]= useState("")
    let navAuthElements=[]
    
    const userData = useContext(UserContext)
    console.log(userData)

    const hamburgerToggle = () => {
        
        if (hamburgerClassName==="menu_active") {
            //メニュー隠す
            setHamburgerClassName("");
            
        } else {
            //メニュー表示
            setHamburgerClassName("menu_active");
        }
    }

    const menuHide = () => {
        if (hamburgerClassName==="menu_active") {
            setHamburgerClassName("");
        }
    }

    const signOutHandle = ()=> {
        authSignOut()
        props.history.push("/")
        props.history.go(0)
    }
    
    if(userData.uid===null){
        console.log(userData.uid)
        navAuthElements.push(
        <>
            <li className="nav_contents"><Link to="/login">ログイン</Link></li>
            <li className="nav_contents"><Link to="/regist">会員登録</Link></li>
        </>
        )
        console.log(navAuthElements)
    }else{
        navAuthElements.push(
        <>
            <li className="nav_contents" onClick={()=>{signOutHandle()}}><a>ログアウト</a></li>
            <li className="nav_contents"><Link to="/mypage">マイページ</Link></li>
        </>
        )
    }
        

    window.addEventListener(
        "resize",
        () => {
            //ハンバーガーメニュー隠す
            setHamburgerClassName("");
        },
        false
    );
    return(
        <div>
            <nav className={"hamburger " + hamburgerClassName} onClick={()=>{menuHide()}}>
                    <ul className="nav_list">
                        <li className="nav_contents"><Link to="/">トップ</Link></li>
                        <li className="nav_contents"><Link to="/list">ポエムを読む</Link></li>
                        <li className="nav_contents"><Link to="/post">投稿する</Link></li>
                        { navAuthElements }
                    </ul>
            </nav>
            <div className="hamburger_padding"></div>
            <header className="header">
                <div className="nav_container">
                    <h1><Link to="/">
                        <img src={`${process.env.PUBLIC_URL}/images/logo.png`}/>
                    </Link></h1>
                    <nav className="nav_bar pc">
                        <ul className="nav_list">
                            <li className="nav_contents"><Link to="/list">ポエムを読む</Link></li>
                            <li className="nav_contents"><Link to="/post">投稿する</Link></li>
                            { navAuthElements }
                        </ul> 
                    </nav>
                    <button className={hamburgerClassName+" hamburger_button"} onClick={()=>{hamburgerToggle()}}>
						<div className="hamburger_menu_line line_top"></div>
						<div className="hamburger_menu_line line_middle"></div>
						<div className="hamburger_menu_line line_bottom"></div>
					</button>
                </div>
            </header>
        </div>
    )
}

export const Footer = (props)=>{
    return(
        <footer className="footer">
            <small className="copyright">Copyright © PoeRadi All Rights Reserved.</small>
        </footer>
    )
}
