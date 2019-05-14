import React, {Component} from 'react';
import {StyleSheet, ActivityIndicator, Modal, View, TouchableHighlight, Alert} from 'react-native';
import {MainContainer, Button, ButtonText, Group, Text} from "./globalStyles";
import styled from 'styled-components/native/dist/styled-components.native.esm'
import db from "../db/db";
import * as GameActions from "../store/actions/GameActions";
import {connect} from "react-redux";


class InicialScreen extends Component {
    static navigationOptions = {
        // headerTitle instead of title
        header: null,
    };

    state = {
        loadingState: false,
        continuarJogoVisible: false
    };

    render() {
        return (
            <MainContainer>
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={this.state.loadingState}>
                    <AtividadeContainer>
                        <ActivityIndicator color="white" size="large"/>
                        <Text>Carregando Jogo Anterior...</Text>
                    </AtividadeContainer>
                </Modal>
                <Titulo style={styles.shadow}>
                    Wizard Companion
                </Titulo>
                <Group vertical>
                    <Button
                        onPress={() => this.createNewGame()}>
                        <ButtonText color="#050">Criar Novo Jogo</ButtonText>
                    </Button>
                    {
                        this.state.continuarJogoVisible &&
                        <Button onPress={() => this.continueGame()}>
                            <ButtonText color="blue">Continuar Jogo</ButtonText>
                        </Button>
                    }
                </Group>
            </MainContainer>
        );
    }

    async componentWillMount() {
        const state = await db.loadState();
        this.setState({continuarJogoVisible: state !== undefined});
    }

    askIfSureNewGame = () => {
        return new Promise((resolve, reject) => {
            Alert.alert(
                'Iniciar um novo jogo',
                'Você possui um jogo em andamento, deseja iniciar um novo jogo mesmo assim?',
                [
                    {
                        text: 'Não',
                        onPress: reject,
                        style: 'cancel',
                    },
                    {text: 'Sim', onPress: resolve},
                ]
            );
        });
    };

    createNewGame = async () => {
        try{
            if(this.state.continuarJogoVisible) {
                await this.askIfSureNewGame();
            }
            db.clearDb();
            this.props.navigation.navigate('ConfigPlayersScreen');
        } catch (e) {}
    };

    continueGame = async () => {
        let loadingState = true;
        this.setState({loadingState});
        const state = await db.loadState();
        if(state === undefined) return;

        this.props.dispatch(GameActions.setState(state));
        let screen = 'ConfigPlayersScreen';
        switch(state.etapa) {
            case 'Palpite':
                screen = 'PalpitesScreen';
                break;
            case 'Game':
                screen = 'GameScreen';
                break;
        }

        loadingState = false;
        this.setState({loadingState});
        this.props.navigation.navigate(screen);
    };
}

export default connect()(InicialScreen);


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
    text-align: center;
    flex: 1;
`;


const AtividadeContainer = styled.View`
  flex: 1;
  background-color: rgba(0,0,0,.8);
  align-items: center;
  justify-content: center;
`;