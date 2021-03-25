const functions = require('firebase-functions');
const express = require('express');

// const cors = require('cors');
// cloud functionでfirestoreを使うのに必要な設定は以下の２行
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);
const db = admin.firestore();

//exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
//});

exports.dataInsert = functions.https.onCall((data, context) => {
    return (async (data,context) => {
        const dataList = data.datas
        //エラー判定
        let err=false;
        //コレクション指定
        let docRef = db.collection('poems');


        let ret = await Promise.all(dataList.map(async (obj)=>{
            if(obj.poemId!==undefined){
                if(typeof (obj.poemId) === "string" || obj.poemId instanceof String){
                    const snap = await docRef.doc(obj.poemId).get()
                    let result = snap.data()
                    result.poemId = obj.poemId
                    return result
                }
            }
            throw new Error('型エラー')
        }));

        
        return ret

    })(data,context)
    .catch((error) => {
        console.error(error)
        return []
    })
})

