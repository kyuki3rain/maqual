import React, { Component } from 'react';
import { Text,StyleSheet, Platform, UIManager,Animated,Dimensions, } from 'react-native';
import styled from 'styled-components/native';
import { connect } from 'react-redux';
 
if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

const Black = styled.Text`
  color:black;
  font-size:${3.2*Dimensions.get('screen').height/100};
  width:100%;
  text-align:center;
  line-height:${60*Dimensions.get('screen').height/100};
`;

class Container extends Component {
  constructor(props) {
    super(props);
    this.state = { fadeAnim: new Animated.Value(1),isShowingText:true };
    setInterval(()=>{
      if(this.state.isShowingText)Animated.timing(this.state.fadeAnim, { toValue: 0, duration:props.duration }).start();
      else Animated.timing(this.state.fadeAnim, { toValue: 1, duration:props.duration }).start();
      this.setState(previousState => {
        return { isShowingText: !previousState.isShowingText };
      });
    },props.duration);
  }
  render() {
    const animatedViewStyle = StyleSheet.flatten([
      styles.container,
      { opacity: this.state.fadeAnim },
    ]);
    return (
      <Animated.View style={animatedViewStyle}><Black>{this.props.text}</Black></Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width,
    height: 0.4*Dimensions.get('window').height,
  },
});

export default connect(
    state => ({  }),
    {  }
)(Container);
