
export const ActionType ={
    TEST : "test",
    
    SET_GAME : "setGame",
    TIME_COUNT_DOWN : "timeCountDown",
    SET_TIME : "setTime",
    SELECT_GAME : "selectGame",
    

    SET_ANSWER: "setAnswer",
    SET_FORMULA : "setFormula",
    SET_CARD : "setCard",
    SELECT_CARD : "selectCard",
    FINISH_GAME : "finishGame",
    MAKE_HOME : "makeHome",
    ADD_ORDER : "addOrder",
    DEL_ORDER : "delOrder",
    REF_ANSWER : "refAnswer",
    START_TIME : "startTime",
    PUSH_SCORE : "pushScore",

    ADD_VALUE : "addValue",
};

export const CounterAction = {
    UPDATE_COUNTER : 'UPDATE_COUNTER',
    START_COUNTER : 'START_COUNTER',
    COUNTER_STARTED : 'COUNTER_STARTED',
    PAUSE_COUNTER : 'PAUSE_COUNTER',
    COUNTER_PAUSED : 'COUNTER_PAUSED',
    RESUME_COUNTER : 'RESUME_COUNTER',
    COUNT_OVER : 'COUNT_OVER',
};



export const addValue = amount => ({type:ActionType.ADD_VALUE, payload:amount});
export const setGame = () => ({type:ActionType.SET_GAME})
export const selectCard = (value) => ({type:ActionType.SELECT_CARD,payload:value});
export const finishGame = () => ({type:ActionType.FINISH_GAME})
export const timeCountDown = () => ({type:ActionType.TIME_COUNT_DOWN});
export const backHome = () => ({type:ActionType.MAKE_HOME});
export const setTime = () => ({type:ActionType.SET_TIME});
export const selectGame = (gameNum) => ({type:ActionType.SELECT_GAME,payload:gameNum})

// export const setAnswer = (answer,question,questionArray) => ({type:ActionType.SET_ANSWER,answer,question,questionArray});
// export const setFormula = (res,order) => ({type:ActionType.SET_FORMULA,payload:res,order});
// export const setCard = (card) => ({type:ActionType.SET_CARD,payload:card});