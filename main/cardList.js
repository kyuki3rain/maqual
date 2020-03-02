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
    setCard(row,column,width,height){
        let cardList = [];
        for(let i=0;i<row;i++){
            let card = [];
            for(let j=0;j<column;j++){
                card.push(<Card card={this.props.card[j+i*column]} width={width} height={height} key={i*column+j}></Card>);
            }
            cardList.push(<CardRow key={i}>{card}</CardRow>);
        }
        return cardList;
    }
    
    cardArea(){
        
        switch(this.props.game){
            case 1:{
                return (<Style><Body>{this.setCard(2,5,15,22.5)}</Body></Style>);
            }
            case 2:{
                return (
                <Style>
                    <Body>{this.setCard(2,5,15,22.5)}</Body>
                    {/* <CardRow>
                        <Card card={this.props.card[8]} width={15} height={50}></Card>
                    </CardRow> */}
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
    state => ({ card:state.gameStates.card,game:state.game,timeLimit:state.timeLimit,time:state.gameStates.time }),
    { setTime,timeCountDown }
)(Container);
