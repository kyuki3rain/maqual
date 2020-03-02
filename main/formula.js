import React from 'react';
import styled from 'styled-components/native';
import { connect } from 'react-redux';
import { Text, View,Dimensions } from 'react-native';

const Style = styled.View`
    flex:2;
    display:flex;
    align-items:center;
    justify-content:center;
`;

class Container extends React.Component {
    render() {
        return (
        <Style>
            <Text>{this.props.time}</Text>
            {this.props.formula}
        </Style>
        );
    }
}

export default connect(
    state => ({ formula:state.gameStates.formula,time:state.secs }),
    {  }
)(Container);
