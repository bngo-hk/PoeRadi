import React,{useState} from 'react';
import ReactDOM from 'react-dom';
import { Link} from 'react-router-dom';

import './css/common.css';

export const Header = (props)=>{
    let [hamburgerClassName,setHamburgerClassName]= useState("")
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
                        <li className="nav_contents"><Link to="/login">ログイン</Link></li> 
                        <li className="nav_contents"><Link to="/regist">会員登録</Link></li>
                        <li className="nav_contents"><Link to="/logout">ログアウト</Link></li>
                        <li className="nav_contents"><Link to="/mypage">マイページ</Link></li>
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
                            <li className="nav_contents"><Link to="/login">ログイン</Link></li>
                            <li className="nav_contents"><Link to="/regist">会員登録</Link></li>
                            {/* <li className="nav_contents"><Link to="/mypage">マイページ</Link></li> */}
                            {/* <li className="nav_contents"><Link to="/logout">ログアウト</Link></li> */}
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
