import React from 'react';
import styled from 'styled-components/native';
import { Dimensions,TouchableHighlight,View,Text,BackHandler } from 'react-native';
import { connect } from 'react-redux';
import { setGame,pause } from "../../actions";
import Icon from 'react-native-vector-icons/MaterialIcons';
import Modal from "react-native-modal";

import Child from "../modal";

import Formula from "./formula";
import CardList from "./cardList";

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
            title:`Level ${navigation.getParam("lev")+1}`,
            headerLeft: () => (
                <TouchableHighlight onPress={navigation.getParam("pause")} style={{marginLeft:10}}>
                    <Icon name="menu" size={36}></Icon>
                </TouchableHighlight>
            ),
            gestureEnabled: false,
        }
    }
    onPressAndroidBack = () => {
        return true;
    };
    handleAndroidBack = () => (
        BackHandler.addEventListener('hardwareBackPress', this.onPressAndroidBack)
    );
    unhandleAndroidBack = () => (
        this.handleAndroidBack().remove()
    );
    componentDidMount() {
        this.props.navigation.setParams({ pause: this._pause.bind(this),lev:this.props.lev });
        this.handleAndroidBack();
    }
    componentWillUnmount(){
        this.unhandleAndroidBack();
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
                animationIn="fadeIn" animationOut="fadeOut"
                backdropTransitionOutTiming={0}>
                    <Child nav={this}/>
                </Modal>
            </Body>
        );
    }
}

export default connect(
    state => ({ lev:state.level }),
    { pause }
)(Container);