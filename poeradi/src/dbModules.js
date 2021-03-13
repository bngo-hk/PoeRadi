import firebase from './firebaseConfig.js'

const db = firebase.firestore();

export const postPoem = async(data,uid)=>{
    //データベーｽｩ

    //コレクション指定
    let poemRef = db.collection('poems').doc();
    let queryData = {
        body: data.post_body,
        title: data.post_title,
        genre: "なし",
        release: data.post_release === "1",
        good: 0,
        hurt: 0,
        uid: uid,
        posttime: firebase.firestore.FieldValue.serverTimestamp(),
    }

    // ドキュメントセット .doc().set(...) = .add(...)
    const ret =  await poemRef.set(
            queryData
    ).then( ()=>{
        return false
    }).catch( (error)=>{
        return error
    })

    // 受け取ったポケモンを削除        
    return ret
}

export const createUserData = (uid,email)=>{
    let userRef = db.collection('users').doc(uid)
    userRef.set({
            email: email,
            name: "名も無き者",
        }
    ).then(()=>{
        return false
    }).catch((error)=>{
        return error
    })
}

const postEvaluation = (title,body,uid)=>{

}

const postFavorite = (poemid,uid) =>{

}

const getPoemList = (kind,index,number)=>{

}

const getUserData = (uid)=>{

}