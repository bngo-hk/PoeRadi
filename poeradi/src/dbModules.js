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
    const userRef = db.collection('users').doc(uid).collection('posts').doc()

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
        await transaction.set(
            poemRef,queryData
        )

    }).then( ()=>{
        return false
    }).catch( (error)=>{
        return error
    })
       
    return ret
}

export const createUserData = async(uid,email)=>{
    let userRef = db.collection('users').doc(uid)
    const errCode = await userRef.set({
            email: email,
            name: "名も無き者",
        }
    ).then(()=>{
        return false
    }).catch((error)=>{
        return error
    })
    return errCode
}

export const postEvaluation = async(poemId,kind,pushed)=>{
    //コレクション指定
    const poemRef = db.collection('poems').doc(poemId);

    const ret = await db.runTransaction(async(transaction)=> {
        // docidでポエム取得
        const poemdoc = await poemRef.get()
        let count=0
        const poem = poemdoc.data()
        // カウントアップ
        const plusVal= pushed ? -1 : 1
        count = poem[kind] + plusVal


        // データを上書きする

        let queryData={}
        queryData[kind]= count
        // console.log(queryData)
        // ドキュメントセット 
        const errCode =  await transaction.update(
            poemRef,queryData
        )
    }).then( ()=>{
        return false
    }).catch( (error)=>{
        return error
    })
       
    return ret
    
}

export const postFavorite = async(poemId,uid) =>{
    //コレクション指定
    const favoRef = db.collection('users').doc(uid).collection('favorites');

    let errCode= false
    const poemdoc = await favoRef.where("favoriteId", "==", poemId).get(
    ).catch((error)=>{
        errCode = error;
        return error
    })

    if(errCode){
        return errCode
    }
    // console.log(poemdoc.docs.length)
    if(poemdoc.docs.length===0){
        errCode = await favoRef.doc().set({
            favoriteId:poemId,
            pushtime: firebase.firestore.FieldValue.serverTimestamp(),
        }
        ).then(()=>{
            return false
        }).catch((error)=>{
            return error
        })
    }
    else if(poemdoc.docs.length===1){
        return false
    }
    return errCode
}
export const deleteFavorite = async(poemId,uid) =>{
    //コレクション指定
    const favoRef = db.collection('users').doc(uid).collection('favorites');
    let errCode= false
    const poemdoc = await favoRef.where("favoriteId", "==", poemId).get(
    ).catch((error)=>{
        errCode = error;
        return error
    })
    if(errCode){
        return errCode
    }

    const gotId = poemdoc.docs[0].id

    // console.log(gotId)

    errCode = await favoRef.doc(gotId).delete().then(()=>{
        return false
    }).catch((error)=>{
        return error
    })

    return errCode
}

export const getPoemList = async(kind,index,number,uid)=>{
    //クエリセット
    const query = setQuery(kind,index,number,uid);
    
    let querySnapShot = await query.get({ source: source })
        .catch((error)=>{ 
            console.error(error)
            return null 
            })
    if(querySnapShot===null){
        return []
    }
    // if(querySnapShot.docs.length === 0 && source==='cache'){
    //     querySnapShot = await query.get()
    // }
    console.log()
    const datas = querySnapShot.docs.map(doc => {
            const docData = doc.data()
            const docId = doc.id
            let docJson={}
            if(docData.title !== undefined){
                docJson ={
                    title:docData.title,
                    body:docData.body,
                    good:docData.good,
                    hurt:docData.hurt,
                    poemId:docId
                }
            }
            else
            {
                docJson={
                    poemId:docData.favoriteId
                    }
            }

        return (
            docJson
        )
    })
    // console.log(datas)
    return datas
}

const setQuery =(kind,index,number,uid)=>{
    //コレクション指定
    let poemRef = db.collection('poems');
    let favoRef = db.collection('users').doc(uid).collection("favorites");
    // let postRef = db.collection('users').doc(uid).collection("favorites");
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
        //ピックアップ
        case "pickup":
            query = poemRef.where("release", "==", true).orderBy("poemid","desc").startAt(index).limit(number)
            break;
        //お気に入り
        case "favorite":
            query = favoRef.orderBy("pushtime","desc").limit(number)
            break;
        //投稿したもの
        case "posts":
            query = poemRef.where("uid", "==", uid).orderBy("posttime","desc").limit(number)
            break;
        default:
            query = poemRef.where("release", "==", true).orderBy("poemid", "desc").limit(number)
            break;
    }
    return query;
}

export const getFavoriteList = async(poemId)=>{
    //クエリセット
    const data = await db.collection('poems').doc(poemId).get()
    // if(querySnapShot.docs.length === 0 && source==='cache'){
    //     querySnapShot = await query.get()
    // }
    
    return data
}

const getUserData = (uid)=>{

}