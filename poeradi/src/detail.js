import React from 'react';
import ReactDOM from 'react-dom';
import {Link} from 'react-router-dom';
import {Header,Footer} from './header.js'
import {Button,FavoButton} from './card.js'

import './css/detail.css';

export const Detail = (props)=>{
    if(props.location.state===undefined)
    {
        props.location.state=[]
        props.history.push('/')
    }
    return(
        <div>
            <Header history={props.history}/>
            <section className="detail_sec">
                <div className="detail_container">
                    <p className="poem_body">
                        {props.location.state.body}
                    </p>
                    <h2 className="poem_title">{props.location.state.title}</h2>
                    <ul className="button_list">
                        <Button button="good" data={props.location.state}/>
                        <Button button="hurt" data={props.location.state}/>
                        <FavoButton button="favo" data={props.location.state}/>
                    </ul>
                </div>
                <div className="back_button_container"><button className="back_button" onClick={()=>{props.history.goBack()}}>戻る</button></div>
            </section>
            <Footer/>
        </div>
    )
}
