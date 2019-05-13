import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import * as gs from './globalStyles';
import styled from 'styled-components/native/dist/styled-components.native.esm'
import db from "../db/db";


export default class InicialScreen extends Component {

    static navigationOptions = {
        // headerTitle instead of title
        header: null,
    };

    render() {
        return (
            <gs.MainContainer>

                <Titulo style={styles.shadow}>
                    Wizard Companion
                </Titulo>

                <gs.Group vertical>
                    <gs.Button
                        onPress={() => this.createNewGame()}>
                        <gs.ButtonText color={"#050"}>Criar Novo Jogo</gs.ButtonText>
                    </gs.Button>
                    <gs.Button
                        onPress={() => console.log('pressed')}>
                        <gs.ButtonText color={"blue"}>Continuar Jogo</gs.ButtonText>
                    </gs.Button>
                </gs.Group>
            </gs.MainContainer>
        );

    }

    createNewGame = async () => {
        await db.createNewGame(true);
        this.props.navigation.navigate('ConfigPlayersScreen')
    }
}

const styles = StyleSheet.create({
    shadow: {
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 16,
        textShadowColor: 'rgba(0,0,0,.5)',
    },
});


const Titulo = styled.Text`
    font-size: 50px;
    color: white;
    font-family: 'Satisfy-Regular';
    margin: 100px 0;
    align-self: center;
    flex: 1;
`;
