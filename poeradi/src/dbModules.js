import firebase from './firebaseConfig.js'
import querystring from 'querystring'

const db = firebase.firestore();
let source= "server"
db.enablePersistence()
  .catch((err) => {
      source= "server"
  });

export const postPoem = async(data,uid)=>{
    //データベーｽｩ

    //コレクション指定
    const poemRef = db.collection('poems').doc();
    const poemGetRef = db.collection('poems');

    const ret =await db.runTransaction(async(transaction)=> {
        // 最新のポエムを1件のみ取得
        const querySnapshot = await db.collection('poems').orderBy("poemid", "desc").limit(1).get()
        let poemid = 0;
        // countアップさせる
        await Promise.all(querySnapshot.docs.map(async (poemDoc) => {
            const poem = await poemDoc.data()
            // 新しいnewTodoIdを作る
            poemid =  await poem.poemid + 1
        }))

        // データを上書きする

        let queryData = {
            body: data.post_body,
            title: data.post_title,
            genre: "なし",
            release: data.post_release === "1",
            good: 0,
            hurt: 0,
            uid: uid,
            poemid: poemid,
            posttime: firebase.firestore.FieldValue.serverTimestamp(),
        }

        // ドキュメントセット 
        const errCode =  await transaction.set(
            poemRef,queryData
        )

    }).then( ()=>{
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

export const getPoemList = async(kind,index,number)=>{
    //クエリセット
    const query = setQuery(kind,index,number);
    
    let querySnapShot = await query.get({ source: source })
        .catch(()=>{ return [] })
    console.log(querySnapShot.docs.length,source)
    // if(querySnapShot.docs.length === 0 && source==='cache'){
    //     querySnapShot = await query.get()
    // }  

    const datas = querySnapShot.docs.map(doc => {
            const docData = doc.data()
            const docId = doc.id
        return {
            title:docData.title,
            body:docData.body,
            good:docData.good,
            hurt:docData.hurt,
            poemId:docId
        }
    })
    return datas
}

const setQuery =(kind,index,number)=>{
    //コレクション指定
    let poemRef = db.collection('poems');
    let query

    switch (kind) {
        //新着
        case "new":
            query = poemRef.where("release", "==", true).orderBy("poemid","desc").limit(number)
            break;
        //いいね順
        case "good":
            query = poemRef.where("release", "==", true).orderBy("good", "desc").orderBy("posttime", "desc").limit(number)
            break;
        //痛いね順
        case "hurt":
            query = poemRef.where("release", "==", true).orderBy("hurt", "desc").orderBy("posttime", "desc").limit(number)
            break;
        //ピックアップ順
        case "pickup":
            query = poemRef.where("release", "==", true).orderBy("poemid","desc").startAt(index).limit(number)
            break;
        default:
            query = poemRef.where("release", "==", true).orderBy("poemid", "desc").limit(number)
            break;
    }
    return query;
}

const getUserData = (uid)=>{

}