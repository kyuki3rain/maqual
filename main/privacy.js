import React from 'react';
import styled from 'styled-components/native';
import { connect } from 'react-redux';
import {setGame,backHome} from "../actions";
import { Dimensions } from 'react-native';
import {WebView} from "react-native-webview";
import {Button} from "./common-styles";

class Container extends React.Component {
    render() {
        return (
            <WebView
            source={{uri: 'https://maquation.flycricket.io/privacy.html'}}
            style={{marginTop: 20}}
          />
        );
    }
}

export default connect(
    state => ({ }),
    {  }
)(Container);
