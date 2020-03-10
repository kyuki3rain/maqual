import {call,put,fork,select,take,cancel} from "redux-saga/effects"
import {ActionType,CounterAction} from "./actions"
import React from 'react';
import styled from 'styled-components/native';
import { Text, View,Dimensions } from 'react-native';

const Texts = styled.Text`
    margin-top:100;
    text-align:center;
    font-size:${props => props.fontSize*Dimensions.get('screen').height/100};
`;

function* setAnswer(){
    let a;
    let b;
    let d,ans;
    let lev = yield select(state => state.level);
    let p= Math.floor(Math.random() * 3);
    if(lev===0){
        lev=1;p=2;
    }
    do{
        a = Math.floor(Math.random() * (10**lev-1))+1;
        b = Math.floor(Math.random() * (10**lev-1))+1;
        switch(Math.floor(Math.random() * 4)){
            case 0: d="+";ans=a+b;break;
            case 1: d="-";ans=a;a=ans+b;break;
            case 2: d="×";ans=a*b;break;
            case 3: d="÷";ans=a;a=ans*b;break;
        }
    }while(ans<0||ans>(10**(lev*2))||a>(10**(lev+1)-1));
    let answer = a.toString() + d + b.toString() + "=" + ans.toString();
    let question;
    switch(p){
        case 0: question = "_".repeat(a.toString().length) + d + b.toString() + "=" + ans.toString();break;
        case 1: question = a.toString() + d + "_".repeat(b.toString().length) + "=" + ans.toString();break;
        case 2: question = a.toString() + d + b.toString() + "=" + "_".repeat(ans.toString().length);break;
        case 3: question = a.toString() + "_".repeat(d.length) + b.toString() + "=" + ans.toString();break;
    }
    let questionArray = [];
    for(let i=0;i<question.length;i++){
        if(question[i]=="_")questionArray.push(i);
    }
    yield put({type:ActionType.SET_ANSWER,answer,question,questionArray});
    yield setCard();
    yield setFormula();
}

function* setCard(){
    let card = ["0","1","2","3","4","5","6","7","8","9","+","-","Ã—","Ã·","="];
    yield put({type:ActionType.SET_CARD,payload:card});
    yield put({type:ActionType.TURN_FLAG,payload:new Array(card.length).fill(true)});
}

function* setFormula(){
    let order = yield select(state => state.gameStates.order);
    const answer = yield select(state => state.gameStates.answer);
    const question = yield select(state => state.gameStates.question);
    const questionArray = yield select(state => state.gameStates.questionArray);
    const res = <Texts fontSize={(question.length<=8)?10:Math.floor(80/question.length)}>{answer.slice(0,questionArray[order])}<Text>_</Text>{question.slice(questionArray[order]+1,question.length)}</Texts>;
    yield put({type:ActionType.SET_FORMULA,payload:res,order});
    try{
        yield judge();
    }
    finally{
    }
}

function* judge(){
    do{
        const action = yield take(ActionType.SELECT_CARD);
        const value = action.payload;
        let order = yield select(state => state.gameStates.order);
        const answer = yield select(state => state.gameStates.answer);
        const questionArray = yield select(state => state.gameStates.questionArray);
        const secs = yield select(state => state.secs);
        let lev = yield select(state => state.level);
        
        if(answer[questionArray[order]]==value){
            if(questionArray.length===order+1){
                yield put({type:ActionType.PUSH_SCORE});
                yield put({type:CounterAction.PAUSE_COUNTER});
                yield put({type:CounterAction.START_COUNTER,payload:{secs:secs+lev}});
                yield setAnswer();
                break;
            }
            else{
                yield put({type:ActionType.ADD_ORDER});
                yield setFormula();
                break;
            }
        }
        else{
            yield put({type:CounterAction.PAUSE_COUNTER});
            if(secs>0){
                yield put({type:CounterAction.START_COUNTER,payload:{secs:secs-1}});
            }
            else{
                yield put({type:ActionType.FINISH_GAME});
            }
        }
        // console.log("これがひとつならいーんだけどね")
    }while(true);
}

export default function* setGame(){
    yield put({type:CounterAction.START_COUNTER,payload:{secs:9}});
    let task = yield fork(setAnswer);
    const { type } = yield take([ActionType.FINISH_GAME,ActionType.PAUSE_GAME]);
    const canc = yield cancel(task);
    if(type === ActionType.FINISH_GAME){
        const navigate = yield select(state => state.navigate);
        yield navigate("Finish");
    }
    yield cancel(canc);
}