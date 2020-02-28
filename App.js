// import React, { Component } from 'react';
// import { Text, View } from 'react-native';

// export default class HelloWorldApp extends Component {
//   render() {
//     return (
//       <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//         <Text>Hello, world!</Text>
//       </View>
//     );
//   }
// }


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
export const store = createStore(reducer,applyMiddleware(sagaMiddleware));
sagaMiddleware.run(sagas);

export default class Container extends React.Component{
    render(){
        return(
          <Provider store={store}>
              <Main></Main>
          </Provider>
            // <View style={styles.container}>
            // </View>
        );
    };
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#fff',
    alignItems:"center",
    justifyContent:"center",
  }
})