import React from 'react';
import styled from 'styled-components/native';
import { connect } from 'react-redux';
import {setGame,selectGame,navigate,selectCard } from "../actions";
import { Dimensions,TouchableHighlight } from 'react-native';
import { Button,Texts } from "./common-styles";
import Icon from 'react-native-vector-icons/MaterialIcons';

const Style = styled.View`
    flex:1;
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
`;

class Container extends React.Component {
    click(num,lev){
        this.props.selectGame(num,lev);
        this.props.navigation.navigate(`Game${num}`);
        this.props.setGame();
        this.props.navigate(this.props.navigation.navigate);
    }
    static navigationOptions =({navigation}) => {
        return {
            headerLeft: () => (
                <TouchableHighlight onPress={() => navigation.navigate("Home")} style={{marginLeft:10}}>
                    <Icon name="arrow-back" size={30}></Icon>
                </TouchableHighlight>
            ),
        }
    }
    render() {
        return (
        <Style>
            <Button onPress={() => this.click(1,0)}>
                <Texts>Level 1</Texts>
            </Button>
            <Button onPress={() => this.click(1,1)}>
                <Texts>Level 2</Texts>
            </Button>
            <Button onPress={() => this.click(1,2)}>
                <Texts>Level 3</Texts>
            </Button>
            <Button onPress={() => this.click(2,2)}>
                <Texts>Extra</Texts>
            </Button>
        </Style>
        );
    }
}

export default connect(
    state => ({game:state.game, }),
    { setGame,selectGame,navigate,selectCard }
)(Container);