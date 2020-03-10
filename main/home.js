import React from 'react';
import styled from 'styled-components/native';
import { connect } from 'react-redux';
import {setGame,selectGame,navigate } from "../actions";
import { Dimensions } from 'react-native';
import { Button } from "./common-styles";
import Blink from "./blink";

const Body = styled.View`
    flex:1;
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
    position:relative;
`;

const Logo = styled.Image`
    /* background-color:#E63586; */
    margin-top:${5*Dimensions.get('screen').height/100};
    width:80%;
    height:30%;
`;

const Texts = styled.Text`
    color:#000000;
    text-align:center;
    font-size:${4*Dimensions.get('screen').height/100};
`;

const Menu = styled.View`
    width:100%;
    height:40%;
    display: flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
`;

const Buttons = styled.TouchableOpacity`
    border-radius:${Dimensions.get('screen').height/100};
    width:100%;
    height:100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin:${2*Dimensions.get('screen').height/100}px;
`;

class Container extends React.Component {
    render() {
        return (
        <Body>
            <Logo source={require("../assets/logo1.png")} resizeMode="contain"></Logo>
            <Menu>
                {/* <Button onPress={() => this.props.setGame()}>
                    <Texts>start</Texts>
                </Button> */}
                <Buttons onPress={() => this.props.navigation.navigate("Select")}>
                    <Blink text={"Tap To Start"} duration={1000}></Blink>
                </Buttons>
            </Menu>
        </Body>
        );
    }
}

export default connect(
    state => ({  }),
    { setGame }
)(Container);
