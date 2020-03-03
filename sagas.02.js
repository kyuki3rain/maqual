import {call,put,fork,select,take} from "redux-saga/effects"
import {ActionType,CounterAction} from "./actions"
import React from 'react';
import styled from 'styled-components/native';
import { Text, View,Dimensions } from 'react-native';

const Texts = styled.Text`
    margin-top:100;
    text-align:center;
    font-size:${10*Dimensions.get('screen').height/100};
`;

function* setAnswer(){
    let a;
    let b;
    let d,ans;
    do{
        a = Math.floor(Math.random() * 99)+1;
        b = Math.floor(Math.random() * 99)+1;
        switch(Math.floor(Math.random() * 4)){
            case 0: d="+";ans=a+b;break;
            case 1: d="-";ans=a-b;break;
            case 2: d="×";ans=a*b;break;
            case 3: d="÷";ans=(Math.floor(a/b)==a/b)?Math.floor(a/b):-1;break;
        }
    }while(ans<0||ans>100);
    let answer = a.toString() + d + b.toString() + "=" + ans.toString();
    yield put({type:ActionType.SET_ANSWER,answer,question:"",questionArray:[]});
    yield setCard();
    yield setFormula();
}

function* setCard(){
    let card = yield select(state => state.gameStates.answer);
    // console.log(card);
    card = card.split("");
    let d;
    if(card.length<10){
        for(let i=0;i<2;i++){
            switch(Math.floor(Math.random() * 4)){
                case 0: d="+";break;
                case 1: d="-";break;
                case 2: d="×";break;
                case 3: d="÷";break;
            }
            card.push(d);
        }
    }
    for(let i=card.length;i<10;i++){
        card.push((Math.floor(Math.random()*9)+1).toString());
    }
    for(let i = card.length - 1; i > 0; i--){
        let r = Math.floor(Math.random() * (i + 1));
        let tmp = card[i];
        card[i] = card[r];
        card[r] = tmp;
    }
    card.push("reset");
    card.push("enter");
    // console.log(card);
    yield put({type:ActionType.SET_CARD,payload:card});
    yield put({type:ActionType.TURN_FLAG,payload:new Array(card.length).fill(true)});
}

function* setFormula(){
    let order = yield select(state => state.gameStates.order);
    const question = yield select(state => state.gameStates.question);
    const res = <Texts>{question}<Text>_</Text></Texts>;
    yield put({type:ActionType.SET_FORMULA,payload:res,order});
    yield judge();
}

function* judge(){
    do{
        const action = yield take(ActionType.SELECT_CARD);
        let question = yield select(state => state.gameStates.question);
        const card = yield select(state => state.gameStates.card);
        const cardNum = action.payload;
        if(card[cardNum]==="enter"){
            let f=true;
            try{
                f = new Function("return ("+question.replace("=","===").replace("×","*").replace("÷","/")+")")();
            }
            catch{
                f=false;
            }
            // console.log(f);
            if(f===true){
                yield put({type:ActionType.ADD_SCORE,payload:question.length});
                yield setAnswer();
                break;
            }
        }
        else if(card[cardNum]==="reset"){
            yield put({type:ActionType.ADD_VALUE,payload:""});
            yield put({type:ActionType.TURN_FLAG,payload:new Array(card.length).fill(true)})
            yield put({type:ActionType.DEL_ORDER});
            yield setFormula();
        }
        else{
            let cardFlag = yield select(state => state.gameStates.cardFlag);
            cardFlag[cardNum] = false;
            yield put({type:ActionType.TURN_FLAG,payload:cardFlag})
            yield put({type:ActionType.ADD_VALUE,payload:question + card[cardNum]});
            yield put({type:ActionType.ADD_ORDER});
            yield setFormula();
        }
    }while(true);
}

export default function* setGame(){
    yield put({type:CounterAction.START_COUNTER,payload:{secs:30}});
    const task = yield fork(setAnswer);
    const { type } = yield take([ActionType.FINISH_GAME,ActionType.SET_GAME]);
    if(type === ActionType.SET_GAME){
        yield cancel(task);
    }
}