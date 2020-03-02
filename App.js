import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import styled from 'styled-components/native';
import { Provider } from 'react-redux';
import Main from "./main/main";

import { applyMiddleware,createStore } from "redux";
import createSagaMiddleware from 'redux-saga';
import { createLogger } from 'redux-logger';
import sagas from "./sagas";
import reducer from "./reducer";

const sagaMiddleware = createSagaMiddleware();
// export const store = createStore(reducer,applyMiddleware(sagaMiddleware, createLogger()));
export const store = createStore(reducer,applyMiddleware(sagaMiddleware));
sagaMiddleware.run(sagas);

export default class Container extends React.Component{
    render(){
        return(
          <Provider store={store}>
              <Main></Main>
          </Provider>
        );
    };
}