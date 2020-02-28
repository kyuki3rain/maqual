import React from 'react';
import styled from 'styled-components/native';
import { connect } from 'react-redux';
import { Text, View,Dimensions } from 'react-native';

import { selectCard } from "../actions";

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
    width: ${15*Dimensions.get('screen').width/100};
    height: ${22.5*Dimensions.get('screen').width/100};
    background-color:#29b6ec;
    border-radius:${2*Dimensions.get('screen').width/100};
`;

const Texts = styled.Text`
    color:#fffffe;
    text-align:center;
    font-size:${5*Dimensions.get('screen').height/100};
    line-height:${22.5*Dimensions.get('screen').width/100};
`;

class Container extends React.Component {
    click(){
        this.props.selectCard(this.props.card)
        // console.log("0k");
    }
    render() {
        return (
        <Style>
            <Card onPress={()=>this.click()}>
                {/* <CardText> */}
                    <Texts>{this.props.card}</Texts>
                {/* </CardText> */}
            </Card>
        </Style>
        );
    }
}

export default connect(
    state => ({ order:state.order,answer:state.answer,question:state.question,questionArray:state.questionArray }),
    { selectCard }
)(Container);
