import React, { Component } from 'react';
import { Text,View } from 'react-native';
import styled from 'styled-components/native';

UnderBar = styled.View`
    border-bottom-width:3px;
    border-bottom-Color:black;
    width:120;
    height:100%;
`;
 
export default class Blink extends Component {
  constructor(props) {
    super(props);
    this.state = { isShowingText: true };
    setInterval(() => {
      this.setState(previousState => {
        return { isShowingText: !previousState.isShowingText };
      });
    }, props.duration);
  }
 
  render() {
    const display = this.state.isShowingText ? <UnderBar></UnderBar> : "";
    return (
      <Text>{display}</Text>
    );
  }
}