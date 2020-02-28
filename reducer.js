
import {ActionType} from "./actions.js";



const initialStates = {
    value:0,
    gameStates:{
        formula:null,
        value:0,
        order:0,
        stage:0,
        answer:null,
        question:null,
        card:[],
        time:0,
        score:0,
    },
    maxStage:10,
    game:0,
};

export default (state = initialStates, action) => {
    switch(action.type){
        case ActionType.ADDVALUE: return {...state,gameStates:{...state.gameStates,}};
        case ActionType.SET_GAME: return {...state,game:1,gameStates:initialStates.gameStates};
        case ActionType.SET_ANSWER: return {...state,gameStates:{...state.gameStates,stage:state.gameStates.stage+1,answer:action.answer,question:action.question,order:0,questionArray:action.questionArray}};
        case ActionType.SET_FORMULA: return {...state,gameStates:{...state.gameStates,formula:action.payload,order:action.order}};
        case ActionType.SET_CARD: return {...state,gameStates:{...state.gameStates,card:action.card}};
        case ActionType.SELECT_CARD: return {...state,gameStates:{...state.gameStates,value:action.value}};
        case ActionType.FINISH_GAME: return {...state,gameStates:{...state.gameStates},game:-1};
        case ActionType.MAKE_HOME: return {...state,gameStates:{...state.gameStates},game:0};
        case ActionType.ADD_ORDER: return {...state,gameStates:{...state.gameStates,order:state.gameStates.order+1}}
        case ActionType.START_TIME: return {...state,gameStates:{...state.gameStates,time:action.payload}};
        case ActionType.PUSH_SCORE: return {...state,gameStates:{...state.gameStates,score:action.payload}};

        default:return state;
    }
}