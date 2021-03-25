import React,{useState,useContext} from 'react';
import {Link} from 'react-router-dom';
import img_good from './images/good.png';
import img_good_a from './images/good_active.png';
import img_hurt from './images/hurt.png';
import img_hurt_a from './images/hurt_active.png';
import img_favo from './images/favo.png';
import img_favo_a from './images/favo_active.png';
import {postEvaluation,postFavorite,deleteFavorite} from './dbModules.js'

import {UserContext} from './index.js'

import './css/card.css';

const images={
    good:[img_good,img_good_a],
    hurt:[img_hurt,img_hurt_a],
    favo:[img_favo,img_favo_a],
}


export const Button = (props)=>{
    const name = props.button
    const poemId = props.data.poemId
    let [buttonClass,setButtonClass] = useState(name +"_button") 
    let [buttonUrl,setButtonUrl] = useState(images[name][0])
    let [buttonPushedFlg,setButtonPushedFlg]= useState(false)
    let [submitDisabled,setSubmitDisabled]=useState(false);
    

    
    const pushButton = async function(data)  {
        setSubmitDisabled(true)
        let errCode = await postEvaluation(poemId,name,buttonPushedFlg);
        if(errCode){
            //登録エラー
            // console.log(errCode)
            setSubmitDisabled(false)
        }
        else{
            //データベース登録成功 
            buttonViewToggle()
            setSubmitDisabled(false)
        }
    }

    const buttonRef = React.createRef();

    const buttonViewToggle= ()=> {
        if(buttonPushedFlg){
            setButtonPushedFlg(false)
            setButtonClass(name +"_button" )
            setButtonUrl(images[name][0])
            props.data[name]-=1
        }
        else{
            setButtonPushedFlg(true)
            setButtonClass(name +"_button_active" )
            setButtonUrl(images[name][1])
            props.data[name]+=1
        }
        
    }
    return(
        <li>
            <button className={buttonClass} ref={buttonRef} disabled={submitDisabled} onClick={(e)=>{pushButton(); buttonRef.current.blur();}}>
                <img src={buttonUrl} />
            </button>
            <span className="currentVal">{props.data[name]}</span>
        </li>
    )
}

export const FavoButton = (props)=>{
    const name = props.button
    const poemId = props.data.poemId
    const userData = useContext(UserContext)
    let [buttonClass,setButtonClass] = useState(name +"_button") 
    let [buttonUrl,setButtonUrl] = useState(images[name][0])
    let [buttonPushedFlg,setButtonPushedFlg]= useState(false)
    let [submitDisabled,setSubmitDisabled]=useState(false);
    
    // props.data.body = 
    
    const pushButton = async function(data)  {
        //ボタン押下時ログインチェック
        if(userData.uid===null){
            props.history.push("/login")
        }
        //連打防止
        setSubmitDisabled(true)
        let errCode = false
        if(buttonPushedFlg){
            //押下済 true
            errCode = await deleteFavorite(poemId,userData.uid);
        }
        else{
            //未押下
            errCode = await postFavorite(poemId,userData.uid);
        }

        if(errCode){
            //登録エラー
            // console.log(errCode)
            setSubmitDisabled(false)
        }
        else{
            //データベース登録成功 
            buttonViewToggle()
            setSubmitDisabled(false)
        }
    }

    const buttonRef = React.createRef();

    const buttonViewToggle= ()=> {
        if(buttonPushedFlg){
            setButtonPushedFlg(false)
            setButtonClass(name +"_button" )
            setButtonUrl(images[name][0])
        }
        else{
            setButtonPushedFlg(true)
            setButtonClass(name +"_button_active" )
            setButtonUrl(images[name][1])
        }
        
    }
    return(
        <li>
            <button className={buttonClass} ref={buttonRef} disabled={submitDisabled} onClick={(e)=>{pushButton(); buttonRef.current.blur();}}>
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
                    <Button button="good" data={props.data}/>
                    <Button button="hurt" data={props.data}/>
                </ul>
            </div>
            <Link to={{pathname:"/detail", state: props.data }}>
                <div className="card_link">
                </div>
            </Link>
        </div>
        
    )
}
