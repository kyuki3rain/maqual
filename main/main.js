import React from 'react';
import styled from 'styled-components/native';
import { Text, View,Dimensions } from 'react-native';
import { connect } from 'react-redux';
import { setGame } from "../actions";
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
// import { createDrawerNavigator } from 'react-navigation-drawer';

import Formula from "./game01/formula";
import CardList from "./game01/cardList01";
import Header from "./header";
import Tab from "./tab";
import Home from "./home";
import Finish from "./finish";
import Game01 from "./game01/game";
import Game02 from "./game02/game";


const Style = styled.View`
    display:flex;
    flex-direction:column;
    justify-content:center;
    flex:1;
    width:${Dimensions.get('screen').width};
    height:${Dimensions.get('screen').height};
    margin:0 auto;
    background-color:#fffffe;
    border:1px solid black;
`;

const RootStack = createStackNavigator(
    {
        Home:{
            screen: Home,
            navigationOptions: {
                header:() => <Header></Header>,
            },
        },
        Finish:{
            screen: Finish,
            navigationOptions: {
                header:() => <Header></Header>,
            },
        },
        Game1:{
            screen: Game01,
            navigationOptions: {
                header:() => <Header></Header>,
            },
        },
        Game2:{
            screen: Game02,
            navigationOptions: {
                header:() => <Header></Header>,
            },
        },
    },
    {
        initialRouteName:"Home",
    }
);

const AppContainer = createAppContainer(RootStack);

class Container extends React.Component {
    componentWillUnmount(){

    }
    setBody(){
        switch(this.props.game){
            case 0: return(
                <Home></Home>
                // <Text>0</Text>
                );
                
            case -1: return(
                    // <Text>2</Text>
                    <Finish></Finish>
                );

            case 1:return(
                <Game01></Game01>
            )
                    
            case 2:return(
                <Game02></Game02>
            )
                    
            default: return(
                <Text>Error</Text>
            );  
        }
    }
    render() {
        return (
        <Style>
            {/* <Header></Header> */}
            {/* {this.setBody()} */}
            <AppContainer></AppContainer>
        </Style>
        );
    }
}

export default connect(
    state => ({game:state.game, }),
    { setGame }
)(Container);