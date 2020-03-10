import {call,put,fork,select,takeLatest,cancel} from "redux-saga/effects"
import {ActionType} from "./actions"
import axios from "axios"

import setGame01 from "./sagas.01"
import setGame02 from "./sagas.02"
import counter from "./sagas.countDown"

import { AsyncStorage } from "react-native"

function* setGame(){
    yield takeLatest(ActionType.SET_GAME,switchGame);
}

function* switchGame(){
    const gameNum = yield select(state => state.selectGame);
    switch (gameNum){
        case 1:yield setGame01();
        case 2:yield setGame02();

        default: 0;
    }
}

export default function* root() {
    yield fork(setGame);
    yield fork(counter);
    yield fork(postScore);
}


function* postScore(){
    yield takeLatest(ActionType.FINISH_GAME,yield initProduct);
}

function* initProduct(){
    const score = yield select(state => state.gameStates.score);
    const lev = yield select(state => state.level);
    const {worldScore,error} = yield call(initAjax,score,lev);
    if(worldScore){
        yield put({type:ActionType.PUSH_WORLD_SCORE,payload:worldScore.score});
    }
    else{
        
    }
    const mybest = yield call(AsyncStorage.getItem,`level${lev}BestScore`);
    if(mybest !== null){
        const nextBest = Math.max(mybest,score);
        yield call(AsyncStorage.setItem,`level${lev}BestScore`,nextBest.toString());
        yield put({type:ActionType.PUSH_MYBEST_SCORE,payload:nextBest});
    }else{
        yield call(AsyncStorage.setItem,`level${lev}BestScore`,score.toString());
        yield put({type:ActionType.PUSH_MYBEST_SCORE,payload:score});
    }
}

const  initAjax = (score,lev) => {
    return axios.post("http://maquation.kyuki3rain.com",{score:score,lev:lev})
    .then((res) => {
        const worldScore = res.data;
        return {worldScore};
        
    })
    .catch(error => {
        return {error};
    });
}