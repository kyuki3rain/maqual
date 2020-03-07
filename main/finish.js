import React from 'react';
import styled from 'styled-components/native';
import { connect } from 'react-redux';
import {setGame,backHome,navigate } from "../actions";
import { Text, View,Dimensions,TouchableHighlight } from 'react-native';
import {Button} from "./common-styles";
import Icon from 'react-native-vector-icons/MaterialIcons';

const Body = styled.View`
    flex:1;
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
`;

// const Button = styled.TouchableOpacity`
//     background-color:#29b6ec;
//     border-radius:${2*Dimensions.get('screen').height/100};
//     width:50%;
//     height:140;
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     margin:${5*Dimensions.get('screen').height/100}px;
// `;

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
    click(){
        this.props.navigation.navigate(`Game${this.props.game}`);
        this.props.setGame();
    }
    back(){
        this.props.navigation.navigate("Select");
        this.props.backHome();
    }
    static navigationOptions =({navigation}) => {
        return {
            headerLeft: () => (
                <TouchableHighlight onPress={() => navigation.navigate("Select")} style={{marginLeft:10}}>
                    <Icon name="arrow-back" size={30}></Icon>
                </TouchableHighlight>
            ),
        }
    }
    render() {
        return (
        <Body>
            <Logo><ScoreTexts>score : {Math.floor(this.props.score)}</ScoreTexts></Logo>
            <Menu>
                <Button onPress={() => this.click()}>
                    <Texts>restart</Texts>
                </Button>
                <Button onPress={() => this.back()}>
                    <Texts>back</Texts>
                </Button>
            </Menu>
        </Body>
        );
    }
}

export default connect(
    state => ({ score:state.gameStates.score,game:state.selectGame }),
    { setGame,backHome,navigate }
)(Container);
