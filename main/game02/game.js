import React from 'react';
import styled from 'styled-components/native';
import { Dimensions,TouchableHighlight,View,Text } from 'react-native';
import { connect } from 'react-redux';
import { setGame,pause } from "../../actions";
import Icon from 'react-native-vector-icons/MaterialIcons';
import Modal from "react-native-modal";

import Child from "../modal";

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
    constructor(props){
        super(props);

    }
    state = {
        isModalVisible:false,
    }
    static navigationOptions =({navigation}) => {
        return {
            title:"Game",
            headerLeft: () => (
                <TouchableHighlight onPress={navigation.getParam("pause")} style={{marginLeft:10}}>
                    <Icon name="arrow-back" size={30}></Icon>
                </TouchableHighlight>
            ),
        }
    }
    componentDidMount() {
        this.props.navigation.setParams({ pause: this._pause.bind(this) });
    }
    _pause(){
        this.props.pause();
        this.setState({isModalVisible:true})
    }
    render() {
        return (
            <Body>
                <Formula></Formula>
                <CardList></CardList>
                <Modal isVisible={this.state.isModalVisible}
                animationType="fade">
                    <Child nav={this}/>
                </Modal>
            </Body>
        );
    }
}

export default connect(
    state => ({ }),
    { pause }
)(Container);