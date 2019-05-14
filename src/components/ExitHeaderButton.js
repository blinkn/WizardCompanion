import Icon from 'react-native-vector-icons/FontAwesome';
import React from 'react';
import {TouchableOpacity} from 'react-native';
import styled from 'styled-components/native';
import { withNavigation } from 'react-navigation';

function ExitHeaderButton(props) {
    console.log('Props: ', props);
    return (
        <HeaderButton>
            <TouchableOpacity onPress={() => props.navigation.popToTop()}>
                <Icon name="sign-out" size={ 26} color={"white"}/>
            </TouchableOpacity>
        </HeaderButton>
    );
}

export default withNavigation(ExitHeaderButton);

const HeaderButton = styled.View`
  margin-right: 16px;
`;