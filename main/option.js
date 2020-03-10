import React from 'react';
import styled from 'styled-components/native';
import { connect } from 'react-redux';
import {setGame,backHome} from "../actions";
import { Dimensions,TouchableHighlight } from 'react-native';
import {Button} from "./common-styles";

const Body = styled.View`
    flex:1;
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
`;

const Texts = styled.Text`
    /* color:#fffffe; */
    text-align:center;
    margin-right:${5*Dimensions.get('screen').width/100};
    font-size:${3*Dimensions.get('screen').height/100};
`;
const MenuTexts = styled.Text`
    color:#fffffe;
    text-align:center;
    font-size:${4*Dimensions.get('screen').height/100};
`;

const Logo = styled.View`
    width:100%;
    height:40%;
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
`;

const Menu = styled.View`
    width:100%;
    height:50%;
    display: flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
`;

class Container extends React.Component {
    static navigationOptions =({navigation}) => {
        return {
            title:"Option",
            headerRight: () => (
                <TouchableHighlight onPress={() => navigation.navigate("PrivacyPolicy")} style={{marginLeft:20}}>
                    <Texts>privacy policy</Texts>
                </TouchableHighlight>
            ),
            gestureEnabled: false,
        }
    }
    render() {
        return (
        <Body>
            <Menu>
                <Button onPress={() => this.props.navigation.navigate("Select")}>
                    <MenuTexts>back</MenuTexts>
                </Button>
            </Menu>
        </Body>
        );
    }
}

export default connect(
    state => ({ score:state.gameStates.score }),
    { setGame,backHome }
)(Container);
