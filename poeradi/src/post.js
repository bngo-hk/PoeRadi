import React,{useState} from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Link} from 'react-router-dom';
import { useForm } from "react-hook-form";
import { Header,Footer } from "./header.js";

import './css/post.css';
import './css/common.css';

// import './css/index.css';

export const Post = (props)=>{
    const { register, handleSubmit,watch, reset, errors, getValues } = useForm();
    const onSubmit = data => console.log(data);
    let [dialog,setDialog] =useState([])
    const post_body = watch("post_body")
    const post_title = watch("post_title")
   
    const showDialog=()=>{
        setDialog(
            <Link to="/">
                <div className="dialog_area">
                    <div className="dialog_field">
                        <p>ポエムを投稿しました！</p>
                    </div>
                </div>
            </Link>
        )
    }
    return(

        <div className="wrap">
            {dialog}
            <Header history={props.history}/>
                <section className="post_sec">
                    <div className="post_container">
                        <h2 className="post_head">ポエムを書こう！</h2>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="text_field">
                                <textarea name="post_body" className={errors.post_body && "error_border"} rows="20" cols="40" ref={register({required: true, minLength:8, maxLength: 400 ,})}></textarea>
                                <span className="error">
                                    { errors.post_body && (errors.post_body.type==="minLength" || errors.post_body.type==="required") && "8文字以上入力してください"}
                                    { errors.post_body && (errors.post_body.type==="maxLength" ) && "400文字以内で入力してください"}
                                </span>
                            </div>
                            <div className="info_container">
                                <h3>タイトル(20文字まで)</h3>
                                <input type="text" className="input_title" maxLength="20" name="post_title" ref={register({maxLength: 20,})}/>
                                <span>{ errors.post_title && (errors.post_title.type==="maxLength" ) && "20文字以内で入力してください"}</span>
                                <h3>ジャンル</h3>
                                <select name="post_genre">
                                    <option value="0">なし</option>
                                </select>
                                <h3>公開設定</h3>
                                <div className="post_release_box">
                                    <input type="radio" className="post_radio" name="post_release" value="1" defaultChecked/>
                                    <label className="post_label">公開</label>
                                    <input type="radio" className="post_radio" name="post_release" value="0"/>
                                    <label className="post_label">非公開</label>
                                </div>
                                
                                <ul className="post_buttons">
                                    <li><Link to="/"><button className="button_cancel">キャンセル</button></Link></li>
                                    <li><button type="submit" className="button_post" onClick={()=>{ showDialog(); console.log(errors.post_body) }}>投稿する</button></li>
                                </ul>
                            </div>
                        </form>
                    </div>
                    
                </section>
            <Footer/>
        </div>
    )
}
