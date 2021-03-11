import firebase from './firebaseConfig.js'

const postPoem = (title,body,uid)=>{
 return (async (data,context) => {

        //エラー判定
        let err=0;
        const errMsgList ={ 1 : '値が不正です' , 2 : 'データの送信に失敗しました', 3 : 'levelの値が不正です'};


        //性格決定
        const personalityList = ['さみしがり','いじっぱり','やんちゃ','ゆうかん','ずぶとい',
        'わんぱく','のうてんき','のんき','ひかえめ','おっとり','うっかりや','れいせい',
        'おだやか','おとなしい','しんちょう','なまいき','おくびょう','せっかち','ようき',
        'むじゃき','がんばりや','きまぐれ','すなお','てれや','まじめ'];

        const max = personalityList.length;
        let randVal = Math.floor(Math.random() * Math.floor(max));
        let personality = personalityList[randVal];
    
        let name,trainer,level =0;
        //バリバリ
        
        if(data.data.name && data.data.trainer && data.data.level)
        {
            name = data.data.name;
            trainer = data.data.trainer;
            level = parseInt(data.data.level);
             //文字数,数値判定
            if(name.length>6 || trainer.length>6)
            {
                err = 1;
                //レベル範囲
                if(!Number.isInteger(level) || level>100 || level<1)
                {
                    err = 3;
                }
            }
        }

       
        let oppoID='';
        //交換相手ID
        if(!data.data.oppoID)
        {
            err=1;
        }
        else
        {
            //相手が存在しているか
            oppoID = data.data.oppoID;
            let oppoRef = db.collection('dedenne').doc(oppoID);
            let oppoData = oppoRef.get()
            if (!oppoData) 
            {
                err = 1;
            }
        }
        let resData;
        //err<0なら エラーメッセージ送信
        
        if(err>0)
        {
            resData = 
            {
                'err' : errMsgList[err],
            }
            return resData
        }
        else
        {
            //↑バリバリ終わり
           
            //データベーｽｩ

            //バッチ作成
            var batch = db.batch();
            //コレクション指定
            let dedenDocRef = db.collection('dedenne').doc();

            //ドキュメントセット .doc().set(...) = .add(...)
            const setprom =  batch.set(dedenDocRef,
                {
                    name: name,
                    personality: personality,
                    level: level,
                    trainer: trainer
                }
            )

            // 受け取ったポケモンを削除
            
            dedenDocRef = db.collection('dedenne').doc(data.data.oppoID);
            const delprom = batch.delete(dedenDocRef)
            
            const exec1 = await setprom;
            const exec2 = await delprom;
            
            await batch.commit().catch((error)=>{
                return { err : true }
                }
            )

            resData ={err : false};
            //resData = JSON.stringify(resData);
            return resData
            
        }

    })(data,context)
    .catch((error) => {
        //resData ={'err' : errMsgList[2]}
        console.log('kuso')
        console.error(error)
        return {err : true}
    })
})

}

const postEvaluation = (title,body,uid)=>{

}

const postFavorite = (poemid,uid) =>{

}

const getPoemList = (kind,index)=>{

}

const getUserData = (uid)=>{

}