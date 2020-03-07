import React from 'react';
import styled from 'styled-components/native';
import { connect } from 'react-redux';
import { Text, View,Dimensions } from 'react-native';
import { pause,start,pauseGame,setGame } from "../actions";

import {Button,Texts} from "./common-styles";

const Style = styled.View`
    width:${70*Dimensions.get('screen').width/100};
    margin:0 auto;
    height:${40*Dimensions.get('screen').height/100};
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
    background-color:white;
`;

class Container extends React.Component {
    render() {
      return (
        <Style>
          <Button onPress={() => {this.props.nav.setState({isModalVisible:false});this.props.start(this.props.secs);}}>
            <Texts>resume</Texts>
          </Button>
          <Button onPress={() => {this.props.nav.setState({isModalVisible:false});this.props.setGame();}}>
            <Texts>restart</Texts>
          </Button>
          <Button onPress={() => {this.props.nav.setState({isModalVisible:false});this.props.pauseGame();this.props.nav.props.navigation.navigate("Select");}}>
            <Texts>Select</Texts>
          </Button>
        </Style>
      );
    }
  }


  export default connect(
    state => ({ secs:state.secs }),
    { start,pauseGame,setGame }
)(Container);