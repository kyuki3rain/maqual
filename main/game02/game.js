import React from 'react';
import styled from 'styled-components/native';
import { Dimensions } from 'react-native';
import { connect } from 'react-redux';
import { setGame } from "../../actions";

import Formula from "./formula";
import CardList from "./cardList02";

const Body = styled.View`
    flex:1;
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
`;



class Container extends React.Component {
    render() {
        return (
            <Body>
                <Formula></Formula>
                <CardList></CardList>
            </Body>
        );
    }
}

export default connect(
    state => ({ }),
    {  }
)(Container);