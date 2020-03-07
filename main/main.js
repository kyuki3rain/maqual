import React from 'react';
import styled from 'styled-components/native';
import { Text, View,Dimensions,TouchableHighlight } from 'react-native';
import { connect } from 'react-redux';
import { setGame,pause } from "../actions";
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createDrawerNavigator } from 'react-navigation-drawer';
import Icon from 'react-native-vector-icons/FontAwesome';

import CardList from "./game01/cardList01";
import Header from "./header";
import Tab from "./tab";
import Home from "./home";
import Finish from "./finish";
import Game01 from "./game01/game";
import Game02 from "./game02/game";
import Select from "./select";

import ModalScreen from "./modal";


const Style = styled.SafeAreaView`
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
                header:() => null,
                
            },
        },
        Finish:{
            screen: Finish,
            navigationOptions: {
                headerStyle:{
                    backgroundColor:"#29b6ec",
                },
            },
        },
        Game1:{
            screen: Game01,
            navigationOptions: {
                headerStyle:{
                    backgroundColor:"#29b6ec",
                },
            },
        },
        Game2:{
            screen: Game02,
            navigationOptions: {
                headerStyle:{
                    backgroundColor:"#29b6ec",
                }
            },
        },
        Select:{
            screen: Select,
            navigationOptions: {
                headerStyle:{
                    backgroundColor:"#29b6ec",
                },
            },
        },
    },
    {
        initialRouteName:"Home",
    }
);

const AppContainer = createAppContainer(RootStack);

class Container extends React.Component {
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
    state => ({game:state.game,secs:state.secs }),
    { setGame,pause }
)(Container);