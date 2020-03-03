import React from 'react';
import styled from 'styled-components/native';
import { connect } from 'react-redux';
import { Text, View,Dimensions } from 'react-native';

import { setTime,timeCountDown } from "../actions";

import Card from "./card";

const Style = styled.View`
    flex:2;
    display:flex;
    flex-direction:row;
    justify-content:center;
    margin:${8*Dimensions.get('screen').height/100}px ${2*Dimensions.get('screen').height/100}px;
    /* box-sizing:border-box; */
    width:90%;
`;

const Body = styled.View`
    flex:4;
    display:flex;
    flex-direction:column;
    justify-content:center;
`;

const CardRow = styled.View`
    /* background-color:grey; */
    flex:1;
    display:flex;
    flex-direction:row;
    justify-content:center;
`;

class Container extends React.Component {
    setCard(column,width,height,k){
        let array = Array.apply(null,new Array(column)).map(function(v,i){ return k + i;});
        return (
            <CardRow>
                {array.map((j)=>{
                    return <Card cardNum={j} width={width} height={height} key={j}></Card>;
                })}
            </CardRow>
        );
    }
    
    cardArea(){
        
        switch(this.props.game){
            case 1:{
                return (<Style><Body>{this.setCard(5,15,22.5,0)}{this.setCard(5,15,22.5,5)}</Body></Style>);
            }
            case 2:{
                return (
                <Style>
                    <Body>{this.setCard(5,14,21,0)}{this.setCard(5,14,21,5)}{this.setCard(2,40,12,10)}</Body>
                </Style>
                );
            }
            default: return null;
        }
    }
    render() {
        return this.cardArea();
    }
}

export default connect(
    state => ({ card:state.gameStates.card,game:state.game,timeLimit:state.timeLimit,time:state.gameStates.time,cardFlag:state.gameStates.cardFlag }),
    { setTime,timeCountDown }
)(Container);
