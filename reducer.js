
import {ActionType,CounterAction} from "./actions.js";



const initialStates = {
    value:0,
    gameStates:{
        formula:null,
        value:0,
        order:0,
        stage:0,
        answer:null,
        question:null,
        card:new Array(10).fill(""),
        time:0,
        score:0,
        cardFlag:new Array(10).fill(true),
        worldScore:"--",
        mybestScore:"--",
    },
    selectGame:1,
    level:1,
    game:0,
    secs: 0,
    paused: true,
    navigate:null,
    adCount:0,
};

export default (state = initialStates, action) => {
    switch(action.type){
        case ActionType.TEST: return {...state,gameStates:{...state.gameStates,}};

        case ActionType.SET_GAME: return {...state,game:state.selectGame,gameStates:initialStates.gameStates};
        case ActionType.MAKE_HOME: return {...state,gameStates:{...state.gameStates},game:0};
        case ActionType.TIME_COUNT_DOWN: return {...state,gameStates:{...state.gameStates,time:state.gameStates.time-1}};
        case ActionType.SET_TIME: return {...state,gameStates:{...state.gameStates,time:state.timeLimit}};
        case ActionType.SELECT_GAME: return {...state,selectGame:action.payload.game,level:action.payload.lev};
        case ActionType.TURN_FLAG: return {...state,gameStates:{...state.gameStates,cardFlag:action.payload}};

        case ActionType.SET_ANSWER: return {...state,gameStates:{...state.gameStates,stage:state.gameStates.stage+1,answer:action.answer,question:action.question,order:0,questionArray:action.questionArray}};
        case ActionType.SET_FORMULA: return {...state,gameStates:{...state.gameStates,formula:action.payload,order:action.order}};
        case ActionType.SET_CARD: return {...state,gameStates:{...state.gameStates,card:action.payload}};
        case ActionType.SELECT_CARD: return {...state,gameStates:{...state.gameStates,value:action.payload}};
        case ActionType.FINISH_GAME: return {...state,gameStates:{...state.gameStates},game:-1};
        case ActionType.ADD_ORDER: return {...state,gameStates:{...state.gameStates,order:state.gameStates.order+1}}
        case ActionType.DEL_ORDER: return {...state,gameStates:{...state.gameStates,order:0}}
        case ActionType.START_TIME: return {...state,gameStates:{...state.gameStates,time:action.payload}};
        case ActionType.PUSH_SCORE: return {...state,gameStates:{...state.gameStates,score:state.gameStates.stage}};
        
        case ActionType.ADD_SCORE: return {...state,gameStates:{...state.gameStates,score:state.gameStates.score + action.payload}};
        case ActionType.ADD_VALUE: return {...state,gameStates:{...state.gameStates,question:action.payload}}
        case ActionType.ADD_ADCOUNT: return {...state,adCount:state.adCount+1};
        case ActionType.RESET_ADCOUNT: return {...state,adCount:0};

        case CounterAction.START_COUNTER:return {...state,secs: action.payload.secs};
        case CounterAction.UPDATE_COUNTER:return {...state, secs: action.payload};
        case CounterAction.COUNTER_STARTED:return {...state,paused: false};
        case CounterAction.COUNTER_PAUSED:return {...state,paused: true};
        case CounterAction.COUNT_OVER:return {...state,paused: true,secs: initialStates.secs};

        case ActionType.NAVIGATE : return {...state,navigate:action.payload};
        case ActionType.PAUSE_GAME : return {...state,game:0};

        case ActionType.PUSH_WORLD_SCORE: return {...state,gameStates:{...state.gameStates,worldScore:action.payload}};
        case ActionType.PUSH_MYBEST_SCORE: return {...state,gameStates:{...state.gameStates,mybestScore:action.payload}};

        default:return state;
    }
}