import React,{useState,useRef} from 'react';

import {words,tweet} from "./words.js"
import './css/hint.css';


export const Hint = (props)=>{
    const introTexts=[]
    introTexts.push(
        <>
            こんにちは、私はヒュー・キライヤ！<br/>
            調子はどうかな？
        </>
    )
    introTexts.push(
        <>
            「何を書いていいか分からない！」というみんなのために、私が思いついた単語を教えてあげるよ。
        </>
    )
    introTexts.push(
        <>
            ジャンルを選んで、ボタンを押してね！
        </>
    )
        
    const introTextsLength=introTexts.length
    // console.log(introTextsLength)
    
    let [chatText,setChatText]=useState(introTexts[0]);
    let [hintClassNameToggle,setHintClassNameToggle] = useState("")
    let selectedGenre=useRef("apparel")
    let chatIndex=useRef(0)
    let [submitDisabled,setSubmitDisabled] = useState(false)
    
    const pushText=()=>{
        if(chatIndex.current < introTextsLength-1){
            chatIndex.current=chatIndex.current+1
            // console.log(chatIndex.current)
        }
        setChatText(introTexts[chatIndex.current])
    }

    const hintToggle=()=>{
        if(hintClassNameToggle==="hint_active"){
            setHintClassNameToggle("")
        }
        else{
            setHintClassNameToggle("hint_active")
        }
    }

    const getHint=()=>{
        setSubmitDisabled(true)
        let selectedWord=""
        if(typeof (selectedGenre.current) == "string" || selectedGenre.current instanceof String){
            if(words[selectedGenre.current]!==undefined){
                const wordsList = words[selectedGenre.current]
                const rand = Math.floor(Math.random() * Math.floor(wordsList.length));
                selectedWord = wordsList[rand]
                console.log(wordsList[rand])
            }
            else{
                setSubmitDisabled(false)
                return false
            }
        }
        else{
            setSubmitDisabled(false)
            return false
        }
        setChatText("「 " + selectedWord + " 」ってのはどうかな")
        setSubmitDisabled(false)
    }

    const chat= ()=>{
        const rand= Math.floor(Math.random() * Math.floor(tweet.length))
        setChatText(tweet[rand])
    }

    return(
        <>
            <section className={"hint_sec " + hintClassNameToggle}>
                <button className={"button_open " + hintClassNameToggle} onClick={()=>{hintToggle()}}></button>
                <div className="hint_content">
                    <div className="character_area" onClick={()=>{pushText()}}>
                        <div className="character_container"></div>
                        <p className="fukidashi">{chatText}</p>
                    </div>
                    <div className="select_container">
                        <select name="wordGenre" onChange={(e)=>{selectedGenre.current=e.target.value;}}>
                            <option value="apparel">衣服・アパレル</option>
                            <option value="color">色</option>
                            <option value="sweet">お菓子</option>
                            <option value="music">音楽</option>
                            <option value="instrument">楽器</option>
                            <option value="appliance">家電</option>
                            <option value="fruit">果物</option>
                            <option value="fish">魚</option>
                            <option value="work">仕事・職業</option>
                            <option value="death">死語</option>
                            <option value="nature">自然</option>
                            <option value="new">新語・流行語</option>
                            <option value="sport">スポーツ</option>
                            <option value="food">食べ物</option>
                            <option value="weather">天気</option>
                            <option value="space">天体</option>
                            <option value="animal">動物</option>
                            <option value="vehicle">乗り物</option>
                            <option value="flower">花</option>
                            <option value="insect">虫</option>
                            <option value="vegetable">野菜</option>
                            <option value="bngo">よくわからない</option>
                        </select>
                        <button className="button_hint" disabled={submitDisabled} onClick={()=>{getHint()}} >単語を教えて</button>
                    </div>
                    <button className="button_chat" onClick={()=>{chat()}}>なんか言って</button>
                </div>
            </section>
        </>
    )
}
