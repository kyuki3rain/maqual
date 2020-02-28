
export const ActionType ={
    ADD_VALUE : "ADD_VALUE",
    SET_ANSWER: "setAnswer",
    SET_GAME : "setGame",
    SET_FORMULA : "setFormula",
    SET_CARD : "setCard",
    SELECT_CARD : "selectCard",
    FINISH_GAME : "finishGame",
    MAKE_HOME : "makeHome",
    ADD_ORDER : "addOrder",
    REF_ANSWER : "refAnswer",
    START_TIME : "startTime",
    PUSH_SCORE : "pushScore",
};



export const addValue = amount => ({type:ActionType.ADD_VALUE, payload:amount});
export const setGame = () => ({type:ActionType.SET_GAME})
export const selectCard = (value) => ({type:ActionType.SELECT_CARD,value});
export const finishGame = () => ({type:ActionType.FINISH_GAME})
export const setAnswer = (answer,question,questionArray) => ({type:ActionType.SET_ANSWER,answer,question,questionArray});
export const setFormula = (res,order) => ({type:ActionType.SET_FORMULA,payload:res,order});
export const setCard = (card) => ({type:ActionType.SET_CARD,card});
export const backHome = () => ({type:ActionType.MAKE_HOME});