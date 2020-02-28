import {call,put,fork,select,take} from "redux-saga/effects"
import {ActionType} from "./actions"
import React from 'react';
import styled from 'styled-components/native';
import { Text, View,Dimensions } from 'react-native';
// import React from 'react';

// import Blink from "./main/blink";

const Texts = styled.Text`
    margin-top:100;
    text-align:center;
    font-size:${10*Dimensions.get('screen').height/100};
    /* font-family:monospace; */
`;

// const Under_bar = styled.Text`
//     animation: flash 1s linear infinite;
//     @keyframes flash {
//     0%,100% {
//         opacity: 1;
//     }

//     50% {
//         opacity: 0;
//     }
//     }
// `;

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
    let card = ["0","1","2","3","4","5","6","7","8","9","+","-","×","÷","="];
    yield put({type:ActionType.SET_CARD,card});
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
        const value = action.value;
        let order = yield select(state => state.gameStates.order);
        const answer = yield select(state => state.gameStates.answer);
        const questionArray = yield select(state => state.gameStates.questionArray);
        if(answer[questionArray[order]]==value){
            if(questionArray.length===order+1){
                const maxStage = yield select(state => state.maxStage);
                const stage = yield select(state => state.gameStates.stage);
                if(stage==maxStage){
                    yield put({type:ActionType.FINISH_GAME});
                    break;
                }
                else{
                    const prevTime = yield select(state => state.gameStates.time);
                    const nowTime = new Date();
                    yield put({type:ActionType.PUSH_SCORE,payload:100000/(nowTime-prevTime)})
                    yield setAnswer();
                    break;
                }
            }
            else{
                yield put({type:ActionType.ADD_ORDER});
                yield setFormula();
                break;
            }
        }
    }while(true);
}

// function* judge2(){
//     do{
//         const action = yield take(ActionType.SELECT_CARD);
//         const value = action.value;
//         let order = yield select(state => state.gameStates.order);
//         const answer = yield select(state => state.gameStates.answer);
//         const questionArray = yield select(state => state.gameStates.questionArray);
//         if(questionArray.length===order+1){
//             if(answer[questionArray[order]]==value){
//             }
//             const maxStage = yield select(state => state.gameStates.maxStage);
//             const stage = yield select(state => state.gameStates.stage);
//             if(stage==maxStage){
//                 yield put({type:ActionType.FINISH_GAME});
//                 console.log("a")
//                 break;
//             }
//             else{
//                 yield setAnswer();
//                 console.log("b")
//                 break;
//             }
//         }
//         else{
//             yield put({type:ActionType.ADD_ORDER});
//             yield setFormula();
//             console.log("c")
//             break;
//         }
//         console.log(answer[questionArray[order]],value,answer[questionArray[order]]==value);
//     }while(true);
// }

function* setGame(){
    do{
        yield take(ActionType.SET_GAME);
        yield setAnswer();
    }while(true);
}

export default function* root() {
    yield fork(setGame);
}