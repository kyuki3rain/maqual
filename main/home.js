import React from 'react';
import styled from 'styled-components/native';
import { connect } from 'react-redux';
import {setGame,selectGame,navigate } from "../actions";
import { Dimensions } from 'react-native';
import { Button } from "./common-styles";

const Body = styled.View`
    flex:1;
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
`;

const Logo = styled.View`
    background-color:#E63586;
    width:70%;
    height:40%;

`;

const Texts = styled.Text`
    color:#fffffe;
    text-align:center;
    font-size:${4*Dimensions.get('screen').height/100};
`;

const Menu = styled.View`
    width:100%;
    height:50%;
    display: flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
`;

class Container extends React.Component {
    click(num){
        this.props.selectGame(num);
        this.props.navigation.navigate(`Game${num}`);
        this.props.setGame();
        this.props.navigate(this.props.navigation.navigate);
    }
    render() {
        return (
        <Body>
            <Logo></Logo>
            <Menu>
                {/* <Button onPress={() => this.props.setGame()}>
                    <Texts>start</Texts>
                </Button> */}
                <Button onPress={() => this.click(1)}>
                    <Texts>game1</Texts>
                </Button>
                <Button onPress={() => this.click(2)}>
                    <Texts>game2</Texts>
                </Button>
            </Menu>
        </Body>
        );
    }
}

export default connect(
    state => ({  }),
    { setGame,selectGame,navigate }
)(Container);
