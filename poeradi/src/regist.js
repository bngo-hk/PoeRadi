import React,{useState,useContext,useEffect} from 'react';
import {Link} from 'react-router-dom';
import { useForm } from "react-hook-form";

import { Header,Footer } from "./header.js";
import {authCreate,authGoogleSignIn ,authDelete} from "./authModules.js"
import {createUserData} from "./dbModules.js"
import { UserContext } from "./index.js";
import firebase from './firebaseConfig.js'

import './css/login.css';

export const Regist = (props)=>{
    const { register, handleSubmit,watch, errors} = useForm();
    let [submitError,setSubmitError]=useState("");
    let [submitDisabled,setSubmitDisabled] = useState(false)
    let userData = useContext(UserContext)
    const onSubmit = async function(data)  {
        setSubmitDisabled(true)
        let errCode = await authCreate(data.email,data.password);
        // console.log(errCode)
        if(errCode){
            //登録エラー
            setSubmitError("error")
            setSubmitDisabled(false)
        }
        else{
            //登録成功                
            //データベース登録
            const user = firebase.auth().currentUser;
            const createUserError = await createUserData(user.uid,user.email)
            if(!createUserError){
                //データベース登録成功
                // console.log(createUserError,'auth')
                props.history.push("/")
                props.history.go(0)
            }
            else{
                //データベース登録エラー
                setSubmitError("error")
                await authDelete(user)
                setSubmitDisabled(false)
            }
        }
    }
    const email = watch('email');
    const password = watch('password');

    useEffect(() => {
        if(userData.uid!==null){
            props.history.push("/")
            return false
        }
    },
    []);

    return(
        <>
        <Header history={props.history}/>
            <section className="regist_login_sec">
                <p className="testaccount">テストアカウント:<br/>
                example1@example.com<br/>
                example2@example.com<br/>
                example3@example.com<br/>
                パスワード:password
                </p>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="input_box">
                        <label>メールアドレス</label><br/>
                        <input type="text" className={errors.email && "error_input"} maxLength="255" name="email" ref={register({required: true, maxLength: 255 , pattern: /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]{1,}\.[A-Za-z0-9]{1,}$/i })}/>
                        <span className="error">{errors.email && "メールアドレスを正しく入力してください"}</span>
                    </div>
                    <div className="input_box">
                        <label>パスワード</label><br/>
                        <input type="text" className={errors.password && "error_input"} name="password" ref={register({required: true, maxLength: 20 ,minLength: 8, pattern: /^[a-z\d]{8,20}$/i })}/>
                        <span className="error">{errors.password && "半角英数字8文字以上20文字以内で入力してください"}</span>
                    </div>
                    <button className="button_regist" type="submit" disabled={submitDisabled}>会員登録</button>
                    <span className="submitError">{submitError && "登録に失敗しました"}</span>
                    <Link to="login"><p className="lead_text">ログインはこちら</p></Link>
                </form>
                {/* <div className="google_box">
                    <h3>Googleアカウントで登録</h3>
                </div> */}
            </section>
        <Footer/>
        </>
    )
}
