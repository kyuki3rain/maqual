import React from 'react';
import styled from 'styled-components/native';
import { connect } from 'react-redux';
import { Text, View,Dimensions } from 'react-native';

const Style = styled.View`
    height:${10*Dimensions.get('screen').height/100};
    background-color:#29b6ec;
`;


class Container extends React.Component {
    render() {
        return (
            <Style>
                
            </Style>
        );
    }
}

export default connect(
    state => ({  }),
    {  }
)(Container);
