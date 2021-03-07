import React from 'react';
import ReactDOM from 'react-dom';
import {Link} from 'react-router-dom';

import './css/card.css';

export const Card = (props)=>{
    const rank=0;
    return(
        <div className="card_container">
            {/* <img className="card_rank" {`${process.env.PUBLIC_URL}/images/rank${rank}.png`}> */}
            <p className="card_body">
                ポエム<br/>
            </p>
            <div className="link_button_conttainer">
                <Link to="/detail"><p className="card_link_detail">全文を読む</p></Link>
                <ul>
                    <li><button className="good_button"><img src={`${process.env.PUBLIC_URL}/images/good.png`}/></button></li>
                    <li><button className="hurt_button"><img src={`${process.env.PUBLIC_URL}/images/hurt.png`}/></button></li>
                </ul>
            </div>
        </div>
    )
}
