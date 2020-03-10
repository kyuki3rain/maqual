import React from 'react';
import styled from 'styled-components/native';
import { connect } from 'react-redux';
import {setGame,backHome,navigate,addAdCount,resetAdCount } from "../actions";
import { Text, View,Dimensions,TouchableHighlight,BackHandler } from 'react-native';
import {Button} from "./common-styles";
import Icon from 'react-native-vector-icons/MaterialIcons';

import { AdMobBanner,PublisherBanner, AdMobInterstitial, AdMobRewarded } from "expo-ads-admob";

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
    font-size:${10*Dimensions.get('screen').height/100};
`;
const DetailTexts = styled.Text`
    /* color:#fffffe; */
    text-align:center;
    font-size:${4*Dimensions.get('screen').height/100};
`;
const MainTexts = styled.View`
    margin-top:${6*Dimensions.get('screen').height/100};
`;

const Logo = styled.View`
    width:100%;
    height:50%;
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
`


class Container extends React.Component {
    onPressAndroidBack = () => {
        this.props.navigation.navigate("Select");
        return true;
    };
    handleAndroidBack = () => (
        BackHandler.addEventListener('hardwareBackPress', this.onPressAndroidBack)
    );
    unhandleAndroidBack = () => (
        this.handleAndroidBack().remove()
    );
    componentDidMount() {
        this.handleAndroidBack();
    }
    componentWillUnmount(){
        this.unhandleAndroidBack();
    }
    async click(){
        await this.admo();
        this.props.navigation.navigate(`Game${this.props.game}`);
        if(this.props.count===0){
            setTimeout(this.props.setGame,500);
        }
        else{
            this.props.setGame();
        }
    }
    async back(){
        await this.admo();
        this.props.navigation.navigate("Select");
        this.props.backHome();
    }
      async showInterstitial() {
        AdMobInterstitial.setAdUnitID('ca-app-pub-8493044522329514/6796572285') // Test ID, Replace with your-admob-unit-id
        await AdMobInterstitial.requestAdAsync()
        await AdMobInterstitial.showAdAsync()
      }
      async admo(){
          if(this.props.count>3){
              await this.showInterstitial();
              this.props.resetAdCount();
          }
          else{
              this.props.addAdCount();
          }
      }
    static navigationOptions =({navigation}) => {
        return {
            title:"Result",
            headerLeft: () => (
                <TouchableHighlight onPress={() => navigation.navigate("Select")} style={{marginLeft:10}}>
                    <Icon name="arrow-back" size={36}></Icon>
                </TouchableHighlight>
            ),
            gestureEnabled: false,
        }
    }
    render() {
        return (
        <Body>
            <Logo>
                <MainTexts>
                    <DetailTexts><ScoreTexts>{Math.floor(this.props.score)}</ScoreTexts>pt</DetailTexts>
                </MainTexts>
                <MainTexts>
                    <DetailTexts>world best : {Math.floor(this.props.worldScore)}pt</DetailTexts>
                    <DetailTexts>my best : {Math.floor(this.props.mybestScore)}pt</DetailTexts>
                </MainTexts>
            </Logo>
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
    state => ({ score:state.gameStates.score,game:state.selectGame,count:state.adCount,worldScore:state.gameStates.worldScore,mybestScore:state.gameStates.mybestScore }),
    { setGame,backHome,navigate,addAdCount,resetAdCount }
)(Container);
