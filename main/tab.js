import React from 'react';
import styled from 'styled-components/native';
import { connect } from 'react-redux';
import { Text, View } from 'react-native';

const Style = styled.View`
    
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
