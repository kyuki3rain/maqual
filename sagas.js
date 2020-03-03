import {call,put,fork,select,takeLatest} from "redux-saga/effects"
import {ActionType} from "./actions"

import setGame01 from "./sagas.01"
import setGame02 from "./sagas.02"
import counter from "./sagas.countDown"

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
}