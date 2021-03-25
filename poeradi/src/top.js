import React,{useContext,useEffect,useState} from 'react';
import { Link} from 'react-router-dom';
import {Header,Footer} from './header.js'
import {Card} from './card.js'
import {TopContext,UserContext} from './index.js'
import {getPoemList} from './dbModules.js'

import './css/top.css';
import './css/common.css';

// import './css/index.css';




export const Top = (props)=>{

    let [poemsDataList,setPoemsDataList] = useContext(TopContext)
    let [poemList,setPoemList] = useState({pickup:[],good:[],hurt:[]})
    let [errflg,seterrflg] = useState(false)
    const userData = useContext(UserContext)
    let [startButtonUrl,setStartButtonUrl] = useState("regist")


    const constructor = async()=>{
        seterrflg(true)
        let datas = {}
        datas.pickup = await getPoemList("pickup",5,2);
        datas.good = await getPoemList("good",0,3);
        datas.hurt = await getPoemList("hurt",0,3);

        //コンテキストセット
        setPoemsDataList(datas);
    }



    useEffect(() => {
        let pickup_list=[]
        let good_list=[]
        let hurt_list=[]
        if(poemsDataList.pickup.length===2)
        {
            pickup_list=[
                <ul>
                    <li>
                        <Card data={poemsDataList.pickup[0]}/>
                    </li>
                    <li>
                        <Card  data={poemsDataList.pickup[1]}/>
                    </li>
                </ul>
            ]
        }
        if(poemsDataList.good.length===3 && poemsDataList.hurt.length===3){
            
            for(let i=0;i<3;i++){
                
                good_list.push(
                    <li>
                        <Card data={poemsDataList.good[i]}/>
                    </li>
                )
                hurt_list.push(
                    <li>
                        <Card data={poemsDataList.hurt[i]}/>
                    </li>
                )
            }
            good_list.push(
                <li>
                    <Link to={{pathname:"/list",state:"good",}} >
                        <div className="link_card">
                            <p>4位以下を見る　≫</p>
                        </div>
                    </Link>
                </li>
            )

            hurt_list.push(
                <li>
                    <Link to={{pathname:"/list",state:"hurt",}}>
                        <div className="link_card">
                            <p>4位以下を見る　≫</p>
                        </div>
                    </Link>
                </li>
            )
        }
        setPoemList({
            pickup:pickup_list,
            good:good_list,
            hurt:hurt_list,
        })

        //ログイン判定 始めるボタンのリンクを変更
        if(userData.uid!==null){
            setStartButtonUrl("post")
        }
    },
    [poemsDataList]);

    if(poemsDataList.pickup.length===0 && !errflg){
        constructor()
    }
    

    return(
        <div className="wrap">
            <Header history={props.history}/>
                <main>
                    <div className="mainVisual_container">
                        <img src={`${process.env.PUBLIC_URL}/images/mainvisual.png`}/>
                    </div>
                    <div className="start_button_container">
                        <Link to={startButtonUrl}><button>会員登録して始める</button></Link>
                    </div>
                    <section className="pickup_sec">
                        <div className="pickup_container">
                        <h2>今日のピックアップ</h2>
                            {poemList.pickup}
                        </div>
                    </section>
                    <section className="good_rank_sec">
                        <div className="good_rank_container">
                            <h2>いいねランキング</h2>
                            <ul>
                                {poemList.good}
                            </ul>
                        </div>
                    </section>
                    <section className="hurt_rank_sec">
                        <div className="hurt_rank_container">
                            <h2>痛いねランキング</h2>
                            <ul>
                                {poemList.hurt}
                            </ul>
                        </div>
                    </section>
                </main>
            <Footer/>
        </div>
    )
}
