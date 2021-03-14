import React,{useState,useContext,useEffect} from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Link} from 'react-router-dom';
import {Header,Footer} from './header.js'
import {Card} from './card.js'
import {getPoemList} from './dbModules.js'
import {ListContext,PoemsContext} from './index.js'

 import './css/list.css';


export const List = (props)=>{
    
    let [selected,setSelected] = useContext(ListContext)
    let [poemsDataList,setPoemsDataList] = useContext(PoemsContext)
    let [errflg,seterrflg] = useState(false)

    let headerNamesList = {
        new:"新着",
        good:"いいねランキング",
        hurt:"痛いねランキング",
        favorite:"お気に入り",
    }
    let [headerName,setHeaderName] = useState(headerNamesList[selected.kind])

    
    let workArray = {new:"",good:"",hurt:"",favorite:"",}
    workArray[selected.kind]="selected";
    let [listClassNames,setListClassNames] = useState(workArray)

 

    const constructor = async()=>{
        seterrflg(true)
        let kind= "new"
        console.log(props.location.state)
        if(props.location.state){
            kind=props.location.state
        }
        const datas = await getPoemList(kind,0,100);
        //コンテキストセット
        setPoemsDataList(datas);
    }

    const listAddClassName= (key)=>{
        workArray = {new:"",good:"",hurt:"",favorite:"",}
        workArray[key]="selected"
        setListClassNames(workArray);   
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
        datas.slice(index*10, ( index*10 + 9 ) )
            .forEach(data => {
                poemListWork.push(
                    <li>
                        <Card data={data}/>
                    </li>
                )
            });
        

        return poemListWork
    }
    
    const changeTab = async(kind)=>{
        const datas = await getPoemList(kind,0,1000);
        //コンテキストセット
        setSelected({kind:kind,index:0,});
        setPoemsDataList(datas);
    }
    
    const changeList=(kind,index)=>{
        
        //タブ選択
        listAddClassName(kind);
        setPoemListCards( writePoemListCards(poemsDataList,index) );

        const indexLast = Math.floor( poemsDataList.length / 10 )
        setIndexDom( writeIndexDom(kind,index,indexLast) )
    }

    useEffect(() => {
        if(props.location.state){
            setSelected({kind:props.location.state,index:0})
            props.location.state=false
        }
        changeList(selected.kind,selected.index)
    },
    [poemsDataList]);
        useEffect(() => {
        changeList(selected.kind,selected.index)
    },
    [selected]);
    


    let [indexDom,setIndexDom] = useState([])
    let [poemListCards,setPoemListCards]= useState(writePoemListCards(poemsDataList,selected.index))



    if(poemsDataList.length===0 && !errflg){
        constructor()
    }


    return(
            <div className="wrap">
            <Header history={props.history}/>
                <main>
                    <section className="poem_list_sec">
                        <div className="head_container">
                            <h2>ポエムを読もう！</h2>
                        </div>
                        <div className="tab_container">
                            <ul>
                                <li className={"list0 " + listClassNames["new"]} onClick={()=>{changeTab("new")}}>新着</li>
                                <li className={"list1 " + listClassNames["good"]} onClick={()=>{changeTab("good");}}>いいね</li>
                                <li className={"list2 " + listClassNames["hurt"]} onClick={()=>{changeTab("hurt");}}>痛いね</li>
                                <li className={"list3 " + listClassNames["favorite"]} onClick={()=>{changeTab("favorite");}}>お気に入り</li>
                            </ul>
                        </div>
                        <div className="poem_list_container">
                            <div className="poem_list_inner">
                            <h2>{headerNamesList[selected.kind]}</h2>
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
