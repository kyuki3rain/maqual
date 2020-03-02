import {call,put,fork,select,take,cancel} from "redux-saga/effects"
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
        a = Math.floor(Math.random() * 9)+1;
        b = Math.floor(Math.random() * 9)+1;
        switch(Math.floor(Math.random() * 4)){
            case 0: d="+";ans=a+b;break;
            case 1: d="-";ans=a-b;break;
            case 2: d="×";ans=a*b;break;
            case 3: d="÷";ans=(Math.floor(a/b)==a/b)?Math.floor(a/b):-1;break;
        }
    }while(ans<0||ans>100);
    let answer = a.toString() + d + b.toString() + "=" + ans.toString();
    let question;
    switch(Math.floor(Math.random() * 3)){
        case 0: question = "?".repeat(a.toString().length) + d + b.toString() + "=" + ans.toString();break;
        case 1: question = a.toString() + d + "?".repeat(b.toString().length) + "=" + ans.toString();break;
        case 2: question = a.toString() + d + b.toString() + "=" + "?".repeat(ans.toString().length);break;
        case 3: question = a.toString() + "?".repeat(d.length) + b.toString() + "=" + ans.toString();break;
    }
    let questionArray = [];
    for(let i=0;i<question.length;i++){
        if(question[i]=="?")questionArray.push(i);
    }
    yield put({type:ActionType.SET_ANSWER,answer,question,questionArray});
    yield put({type:ActionType.START_TIME,payload:new Date()});
    yield setCard();
    yield setFormula();
}

function* setCard(){
    let card = ["0","1","2","3","4","5","6","7","8","9","+","-","Ã—","Ã·","="];
    yield put({type:ActionType.SET_CARD,payload:card});
}

function* setFormula(){
    let order = yield select(state => state.gameStates.order);
    const answer = yield select(state => state.gameStates.answer);
    const question = yield select(state => state.gameStates.question);
    const questionArray = yield select(state => state.gameStates.questionArray);
    const res = <Texts>{answer.slice(0,questionArray[order])}<Text>_</Text>{question.slice(questionArray[order]+1,question.length)}</Texts>;
    yield put({type:ActionType.SET_FORMULA,payload:res,order});
    yield judge();
}

function* judge(){
    do{
        const action = yield take(ActionType.SELECT_CARD);
        const value = action.payload;
        let order = yield select(state => state.gameStates.order);
        const answer = yield select(state => state.gameStates.answer);
        const questionArray = yield select(state => state.gameStates.questionArray);
        if(answer[questionArray[order]]==value){
            if(questionArray.length===order+1){
                yield setAnswer();
                break;
            }
            else{
                yield put({type:ActionType.ADD_ORDER});
                yield setFormula();
                break;
            }
        }
        // console.log("これがひとつならいーんだけどね")
    }while(true);
}

function* cancelGame(task){
    yield take(ActionType.SET_GAME);
    yield cancel(task);
}

export default function* setGame(){
    yield put({type:CounterAction.START_COUNTER,payload:{secs:10}});
    const task = yield fork(setAnswer);
    const { type } = yield take([ActionType.FINISH_GAME,ActionType.SET_GAME]);
    if(type === ActionType.SET_GAME){
        yield cancel(task);
    }
}