import React from 'react';
import ReactDOM from 'react-dom';
import {Link} from 'react-router-dom';
import {Header,Footer} from './header.js'

// import './css/index.css';

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
                <p class="poem_body">
                    {body}
                </p>
                <h2 className="poem_title"></h2>
                <ul>
                    <li><button className="good_button"></button></li>
                    <li><button className="hurt_button"></button></li>
                    <li><button className="favo_button"></button></li>
                </ul>
            </div>
            <Link to="/list"><button className="back_button">全文を読む</button></Link>
        </section>
        <Footer/>
        </div>
    )
}
