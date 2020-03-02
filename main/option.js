import React from 'react';
import styled from 'styled-components/native';
import { connect } from 'react-redux';
import {setGame,backHome} from "../actions";
import { Dimensions } from 'react-native';
import {Button} from "./common-styles";

const Body = styled.View`
    flex:1;
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
`;

const Texts = styled.Text`
    color:#fffffe;
    text-align:center;
    font-size:${4*Dimensions.get('screen').height/100};
`;
const ScoreTexts = styled.Text`
    /* color:#fffffe; */
    text-align:center;
    font-size:${8*Dimensions.get('screen').height/100};
`;

const Logo = styled.View`
    width:100%;
    height:40%;
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
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
    render() {
        return (
        <Body>
            <Logo><ScoreTexts>score : {Math.floor(this.props.score)}</ScoreTexts></Logo>
            <Menu>
                <Button onPress={() => this.props.setGame()}>
                    <Texts>restart</Texts>
                </Button>
                <Button onPress={() => this.props.backHome()}>
                    <Texts>back</Texts>
                </Button>
            </Menu>
        </Body>
        );
    }
}

export default connect(
    state => ({ score:state.gameStates.score }),
    { setGame,backHome }
)(Container);
