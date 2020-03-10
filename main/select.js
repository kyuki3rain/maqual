import React from 'react';
import styled from 'styled-components/native';
import { connect } from 'react-redux';
import {setGame,selectGame,navigate,selectCard,addAdCount,resetAdCount } from "../actions";
import { Dimensions,TouchableHighlight } from 'react-native';
import { Button,Texts } from "./common-styles";
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icons from 'react-native-vector-icons/FontAwesome';

import { AdMobBanner,PublisherBanner, AdMobInterstitial, AdMobRewarded } from "expo-ads-admob";

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
            title:"Select Game",
            headerLeft: () => (
                <TouchableHighlight onPress={() => navigation.navigate("Home")} style={{marginLeft:10}}>
                    <Icon name="arrow-back" size={36}></Icon>
                </TouchableHighlight>
            ),
            headerRight: () => (
                <TouchableHighlight onPress={() => navigation.navigate("Option")} style={{marginRight:10}}>
                    <Icons name="gear" size={36}></Icons>
                </TouchableHighlight>
            ),
        }
    }
    async showInterstitial() {
        AdMobInterstitial.setAdUnitID('ca-app-pub-8493044522329514/6796572285') // Test ID, Replace with your-admob-unit-id
        await AdMobInterstitial.requestAdAsync()
        await AdMobInterstitial.showAdAsync()
    }
    count = 0;
    returnSelect(){
        this.props.navigation.navigate('Select');
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
            <Button onPress={() => this.click(2,3)}>
                <Texts>Extra</Texts>
            </Button>
            {/* <Button onPress={() => this.props.selectCard()}>
                <Texts>debug</Texts>
            </Button> */}
        </Style>
        );
    }
}

export default connect(
    state => ({game:state.game, }),
    { setGame,selectGame,navigate,selectCard,addAdCount,resetAdCount }
)(Container);