import React from 'react';
import styled from 'styled-components/native';
import { Text, View , Dimensions, TouchableOpacity } from 'react-native';


export const Button = styled.TouchableOpacity`
    background-color:#29b6ec;
    border-radius:${Dimensions.get('screen').height/100};
    width:${30*Dimensions.get('screen').height/100};
    height:${6*Dimensions.get('screen').height/100};
    display: flex;
    justify-content: center;
    align-items: center;
    margin:${2*Dimensions.get('screen').height/100}px;
`;