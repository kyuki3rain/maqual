import React from 'react';
import styled from 'styled-components/native';
import { connect } from 'react-redux';
import { Text, View,Dimensions } from 'react-native';

import { selectCard } from "../../actions";

const Style = styled.View`
    flex:1;
    /* margin:1vh; */
    /* box-sizing:border-box; */
    height: 100%;
    width:100%;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Card = styled.TouchableOpacity`
    position: relative;
    width: ${props => (props.width*Dimensions.get('screen').width/100)};
    height: ${props => (props.height*Dimensions.get('screen').width/100)};
    background-color:${props =>((props.color)?"#21bbb8":"gray")};
    border-radius:${2*Dimensions.get('screen').width/100};
`;

const Texts = styled.Text`
    color:#fffffe;
    text-align:center;
    font-size:${props => (props.height/4.5*Dimensions.get('screen').height/100)};
    line-height:${props => (props.height*Dimensions.get('screen').width/100)};
`;

class Container extends React.Component {
    click(){
        if(this.props.cardFlag[this.props.cardNum]){
            this.props.selectCard(this.props.cardNum);
        }
    }
    render() {
        return (
        <Style>
            <Card onPress={()=>this.click()} width={this.props.width} height={this.props.height} color={this.props.cardFlag[this.props.cardNum]}>
                <Texts height={this.props.height}>{this.props.card[this.props.cardNum]}</Texts>
            </Card>
        </Style>
        );
    }
}

export default connect(
    state => ({ card:state.gameStates.card,cardFlag:state.gameStates.cardFlag.slice() }),
    { selectCard }
)(Container);
