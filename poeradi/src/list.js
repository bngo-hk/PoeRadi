import React,{useState} from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Link} from 'react-router-dom';
import {Header,Footer} from './header.js'
import {Card} from './card.js'

 import './css/list.css';


export const List = (props)=>{
  
    let [headerName,setHeaderName] = useState("新着")
    let [selected,setSelected] = useState({kind:"new",index:0,})
   
    let indexLast = 9;


    
    let workArray = Array(4).fill("");
    workArray[0]="selected"
    let [listClassNames,setListClassNames] = useState(workArray)

    const listAddClassName= (num)=>{
        workArray = Array(4).fill("");
        workArray[num]="selected"
        setListClassNames(workArray);
    }

    const writeIndexDom =(kind,index)=>{
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
    

    const changeList=(kind,index)=>{
        setSelected({kind:kind,index:index,});
        setPoemList( getPoemList(kind,index) );
        setIndexDom( writeIndexDom(kind,index) )
    }
    
    const getPoemList = (kind,index)=>{
        let poemListWork=[];
        
        for(let i=0;i<10;i++){
            poemListWork.push(
                <li>
                    <Card/>
                </li>
            )
        }

        return poemListWork
    }

    let [indexDom,setIndexDom] = useState( [writeIndexDom("new",0)] )
    let [poemList,setPoemList]= useState([getPoemList("new",0)])


    return(
            <div className="wrap">
            <Header/>
                <main>
                    <section className="poem_list_sec">
                        <div className="head_container">
                            <h2>ポエムを読もう！</h2>
                        </div>
                        <div className="tab_container">
                            <ul>
                                <li className={"list0 " + listClassNames[0]} onClick={()=>{changeList("new",0); setHeaderName("新着");listAddClassName(0)}}>新着</li>
                                <li className={"list1 " + listClassNames[1]} onClick={()=>{changeList("good",0); setHeaderName("いいねランキング");listAddClassName(1)}}>いいね</li>
                                <li className={"list2 " + listClassNames[2]} onClick={()=>{changeList("hurt",0); setHeaderName("痛いねランキング");listAddClassName(2)}}>痛いね</li>
                                <li className={"list3 " + listClassNames[3]} onClick={()=>{changeList("favorite",0); setHeaderName("お気に入り");listAddClassName(3)}}>お気に入り</li>
                            </ul>
                        </div>
                        <div className="poem_list_container">
                            <div className="poem_list_inner">
                            <h2>{headerName}</h2>
                            <ul className="poem_list_ul">
                                {poemList}
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
