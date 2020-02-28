import React from 'react';
import styled from 'styled-components/native';
import { Text, View,Dimensions } from 'react-native';
import { connect } from 'react-redux';
import { setGame } from "../actions";

import Formula from "./formula";
import CardList from "./cardList";
import Header from "./header";
import Tab from "./tab";
import Home from "./home";
import Finish from "./finish";


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

const Body = styled.View`
    flex:1;
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
`;



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
                    
            default: return(
                // <Text>1</Text>
                <Body>
                    <Formula></Formula>
                    <CardList></CardList>
                </Body>
            );  
        }
    }
    render() {
        return (
        <Style>
            <Header></Header>
            {this.setBody()}
            {/* <Tab></Tab> */}
        </Style>
        );
    }
}

export default connect(
    state => ({game:state.game, }),
    { setGame }
)(Container);