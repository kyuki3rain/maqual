import React from 'react';
import styled from 'styled-components/native';
import { connect } from 'react-redux';
import { Text, View,Dimensions } from 'react-native';
import { pause,start,pauseGame,setGame,addAdCount,resetAdCount  } from "../actions";

import {Button,Texts} from "./common-styles";
import { AdMobBanner,PublisherBanner, AdMobInterstitial, AdMobRewarded } from "expo-ads-admob";

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

const WhiteBack = styled.View`
  background-color:white;
  display:flex;
  flex-direction:column;
  justify-content:center;
  align-items:center;
`;

class Container extends React.Component {
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
    async resume(){
      await this.admo();
      this.props.nav.setState({isModalVisible:false});
      if(this.props.count===0){
        setTimeout(()=>{this.props.start(this.props.secs)},500);
      }
      else{
        this.props.start(this.props.secs);
      }
    }
    async restart(){
      await this.admo();
      this.props.nav.setState({isModalVisible:false});
      if(this.props.count===0){
        setTimeout(this.props.setGame,500);
      }
      else{
        this.props.setGame();
      }
    }
    async select(){
        await this.admo();
        this.props.nav.setState({isModalVisible:false});
        this.props.pauseGame();
        this.props.nav.props.navigation.navigate("Select");
    }
    render() {
      return (
        <Style>
          <WhiteBack>
            <Button onPress={() => {this.resume()}}>
              <Texts>resume</Texts>
            </Button>
            <Button onPress={() => {this.restart()}}>
              <Texts>restart</Texts>
            </Button>
            <Button onPress={() => {this.select()}}>
              <Texts>Select</Texts>
            </Button>
          </WhiteBack>
        </Style>
      );
    }
  }


  export default connect(
    state => ({ secs:state.secs,count:state.adCount }),
    { start,pauseGame,setGame,addAdCount,resetAdCount  }
)(Container);