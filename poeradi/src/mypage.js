import React,{useState,useContext,useEffect} from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Link} from 'react-router-dom';

import firebase from './firebaseConfig.js'
import 'firebase/functions';

import {Header,Footer} from './header.js'
import {Card} from './card.js'
import {getPoemList,getFavoriteList} from './dbModules.js'
import {ListContext,PoemsContext,UserContext} from './index.js'


 import './css/list.css';


export const Mypage  = (props)=>{
    let userData = useContext(UserContext)
    let [poemsDataList,setPoemsDataList] = useState([])
    let [selectedIndex,setSelectedIndex] = useState(0)

    let [errflg,seterrflg] = useState(false)
 
    let datas =[]
    const constructor = async()=>{
        seterrflg(true)
        let kind= "posts"

        if(userData.uid===null){
            props.history.push('login')
            return false
        }
        datas = await getPoemList(kind,0,100,userData.uid);
        //コンテキストセット
        
        changeList(kind,0,datas);
    }


    const writeIndexDom =(kind,index,indexLast)=>{
        let indexDomWork=[];
        let indexArray=[index-1,index-2,index-1,index,index+1,index+2,index+1]
        let letterArray=["＜",index-1,index-0,index+1,index+2,index+3,"＞"]
        if(index!==0){
            indexDomWork.push(
                <li onClick={()=>{changeList(kind,0)}}>
                    ≪
                </li>
            )
        }
        indexArray.forEach((current,key) => {
            if(current>=0 && current<=indexLast){
                indexDomWork.push(
                    <li onClick={()=>{changeList(kind,current)}}>
                        {letterArray[key]}
                    </li>
                )
            }
        })
        if(index < indexLast){
            indexDomWork.push(
                <li onClick={()=>{changeList(kind,indexLast)}}>
                    ≫
                </li>
            )
        }
        return indexDomWork;
    }
    
    const writePoemListCards = (datas,index)=>{
        let poemListWork=[];
        datas.slice(index*10, ( index*10 + 10 ) )
            .forEach(data => {
                poemListWork.push(
                    <li>
                        <Card data={data}/>
                    </li>
                )
            });
        
        return poemListWork
    }
    
    
    const changeList= (kind,index)=>{
        //タブ選択
        
        
        console.log(datas)
        const indexLast = Math.floor( (datas.length-1) / 10 )
        setIndexDom( writeIndexDom(kind,index,indexLast) )
        setPoemListCards(writePoemListCards(datas,index))
    }

    useEffect(() => {
        if(userData.uid===null){
            props.history.push('login')
            return false
        }
    },
    []);
    // useEffect(() => {
    //     changeList(selected.kind,selected.index)
    // },
    // [selected]);
  


    let [indexDom,setIndexDom] = useState([])
    let [poemListCards,setPoemListCards]= useState(writePoemListCards(poemsDataList,selectedIndex))


    if(!errflg){
        constructor()
    }


    return(
            <div className="wrap">
            <Header history={props.history}/>
                <main>
                    <section className="poem_list_sec">
                        <div className="poem_list_container">
                            <div className="poem_list_inner">
                            <h2>投稿したポエムたち</h2>
                            <ul className="poem_list_ul">
                                {poemListCards}
                            </ul>
                            <ul className="index_ul">
                                {indexDom}
                            </ul>
                            </div>
                        </div>
                    </section>
                </main>
            <Footer/>
        </div>
    )
}

