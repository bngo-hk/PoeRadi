import React from 'react';
import ReactDOM from 'react-dom';
import {Link} from 'react-router-dom';
import {Header,Footer} from './header.js'
import {Button} from './card.js'

import './css/detail.css';

export const Detail = (props)=>{
    const rank=0;
    const title="タイトル";
    const body="ポエム"
    
    return(
        <div>
        <Header/>
        <section className="detail_sec">
            <div className="detail_container">
                {/* <img className="card_rank" {`${process.env.PUBLIC_URL}/images/rank${rank}.png`}> */}
                <p className="poem_body">
                    {body}
                </p>
                <h2 className="poem_title">{title}</h2>
                <ul className="button_list">
                    <Button button="good"/>
                    <Button button="hurt"/>
                    <Button button="favo"/>
                </ul>
            </div>
            <div className="back_button_container"><button className="back_button" onClick={()=>{props.history.goBack()}}>戻る</button></div>
        </section>
        <Footer/>
        </div>
    )
}
