import React,{useState} from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route,Link} from 'react-router-dom';
import { useForm } from "react-hook-form";


import { Header,Footer } from "./header.js";
import './css/login.css';

export const Login = (props)=>{
    const { register, handleSubmit,watch, reset, errors, getValues } = useForm();
    const onSubmit = data => console.log(data);
    const email = watch('email');
    const password = watch('password');

    return(
        <>
        <Header/>
        <section className="regist_login_sec">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="input_box">
                    <label>メールアドレス</label><br/>
                    <input type="text"
                        className={errors.email && "error_input"} maxLength="255" name="email"
                        ref={register({required: true, maxLength: 255 , pattern: /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]{1,}\.[A-Za-z0-9]{1,}$/i })}
                    />
                    <span className="error">{errors.email && "メールアドレスを正しく入力してください"}</span>
                </div>
                <div className="input_box">
                    <label>パスワード</label><br/>
                    <input type="text"
                        className={errors.password && "error_input"} name="password" 
                        ref={register({required: true, maxLength: 20 ,minLength: 8, pattern: /^[a-z\d]{8,20}$/i })}
                    />
                    <span className="error">{errors.password && "半角英数字8～20文字で入力してください"}</span>
                </div>
                <button className="button_login" type="submit">ログイン</button>
                <Link to="regist"><p className="lead_text">会員登録はこちら</p></Link>
                
            </form>
            {/* <div className="google_box">
                <h3>Googleアカウントで登録</h3>
            </div> */}
        </section>
        <Footer/>
        </>
    )
}
