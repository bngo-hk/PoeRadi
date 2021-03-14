import React,{useState} from 'react';
import ReactDOM from 'react-dom';
import {Link} from 'react-router-dom';
import img_good from './images/good.png';
import img_good_a from './images/good_active.png';
import img_hurt from './images/hurt.png';
import img_hurt_a from './images/hurt_active.png';
import img_favo from './images/favo.png';
import img_favo_a from './images/favo_active.png';
import firebase from './firebaseConfig.js'

import './css/card.css';

const images={
    good:[img_good,img_good_a],
    hurt:[img_hurt,img_hurt_a],
    favo:[img_favo,img_favo_a],
}


export const Button = (props)=>{
    const name = props.button
    let [buttonClass,setButtonClass] = useState(name +"_button") 
    let [buttonUrl,setButtonUrl] = useState(images[name][0])
    let [buttonActiveFlg,setButtonActiveFlg]= useState(false)

    const buttonRef = React.createRef();
    const buttonToggle= ()=> {
        if(buttonActiveFlg){
            setButtonActiveFlg(false)
            setButtonClass(name +"_button" )
            setButtonUrl(images[name][0])
        }
        else{
            setButtonActiveFlg(true)
            setButtonClass(name +"_button_active" )
            setButtonUrl(images[name][1])
        }
    }
    return(
        <li>
            <button className={buttonClass} ref={buttonRef} onClick={(e)=>{buttonToggle(); buttonRef.current.blur();}}>
                <img src={buttonUrl} />
            </button>
        </li>
    )
}

export const Card = (props)=>{
    
    const rank=0;
    return(
        
        <div className="card_container">
            {/* <img className="card_rank" {`${process.env.PUBLIC_URL}/images/rank${rank}.png`}> */}
            <p className="card_body">
                {props.data.body}<br/>
            </p>
            <div className="link_button_conttainer">
                <Link to={{pathname:"/detail", state: props.data }}><p className="card_link_detail">全文を読む</p></Link>
                <ul>
                    <Button button="good"/>
                    <Button button="hurt"/>
                </ul>
            </div>
            <Link to="/detail"  data={props.data}>
                <div className="card_link">
                </div>
            </Link>
        </div>
        
    )
}
