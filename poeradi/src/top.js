import React from 'react';
import ReactDOM from 'react-dom';
import { Link} from 'react-router-dom';
import {Header,Footer} from './header.js'
import {Card} from './card.js'

import './css/top.css';
import './css/common.css';

// import './css/index.css';



export const Top = (props)=>{
    const pickup_list =(
        <ul>
            <li>
                <Card/>
            </li>
            <li>
                <Card/>
            </li>
        </ul>
        );

    let good_list=[]
    let hurt_list=[]
    for(let i=0;i<3;i++){
        good_list.push(
            <li>
                <Card/>
            </li>
        )
        hurt_list.push(
            <li>
                <Card/>
            </li>
        )
    }
    
    good_list.push(
        <li>
            <Link to="/list">
                <div className="link_card">
                    <p>4位以下を見る　≫</p>
                </div>
            </Link>
        </li>
    )

    hurt_list.push(
        <li>
            <Link to="/list">
                <div className="link_card">
                    <p>4位以下を見る　≫</p>
                </div>
            </Link>
        </li>
    )
    

    return(
        <div className="wrap">
            <Header history={props.history}/>
                <main>
                    <div className="mainVisual_container">
                        <img src={`${process.env.PUBLIC_URL}/images/mainvisual.png`}/>
                    </div>
                    <div className="start_button_container">
                        <Link to="regist"><button>会員登録して始める</button></Link>
                    </div>
                    <section className="pickup_sec">
                        <div className="pickup_container">
                        <h2>今日のピックアップ</h2>
                            {pickup_list}
                        </div>
                    </section>
                    <section className="good_rank_sec">
                        <div className="good_rank_container">
                            <h2>いいねランキング</h2>
                            <ul>
                                {good_list}
                            </ul>
                        </div>
                    </section>
                    <section className="hurt_rank_sec">
                        <div className="hurt_rank_container">
                            <h2>痛いねランキング</h2>
                            <ul>
                                {hurt_list}
                            </ul>
                        </div>
                    </section>
                </main>
            <Footer/>
        </div>
    )
}
