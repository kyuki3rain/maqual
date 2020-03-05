import React from 'react';
import styled from 'styled-components/native';
import { connect } from 'react-redux';
import {  Dimensions } from 'react-native';

const Style = styled.View`
    flex:2;
    display:flex;
    align-items:center;
    justify-content:center;
    position:relative;
    width:100%;
`;

const TimeView = styled.View`
    position:absolute;
    right:${7.5*Dimensions.get('screen').width/100};;
    bottom:${-5*Dimensions.get('screen').height/100};
`;
const ScoreView = styled.View`
    position:absolute;
    left:${7.5*Dimensions.get('screen').width/100};
    bottom:${-5*Dimensions.get('screen').height/100};
`;

const Text = styled.Text`
    font-size:${4*Dimensions.get('screen').height/100};
`;

class Container extends React.Component {
    render() {
        return (
        <Style>
            {this.props.formula}
            <TimeView><Text>残り{this.props.time+1}秒</Text></TimeView><ScoreView><Text>{this.props.score}</Text></ScoreView>
        </Style>
        );
    }
}

export default connect(
    state => ({ formula:state.gameStates.formula,time:state.secs,score:state.gameStates.score }),
    {  }
)(Container);
