import React, {Component} from 'react';
import {ScrollView, Text, TouchableOpacity, Dimensions, Alert, StatusBar, View} from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import Carousel from "react-native-snap-carousel";
import * as gs from "./globalStyles";
import db from "../db/db";
import styled from 'styled-components/native';

export default class GameScreen extends Component {

    static navigationOptions = {
        title: 'Fase de Jogo',
        headerStyle: {
            backgroundColor: 'rgb(58, 50, 111)'
        },
        headerTintColor: '#fff'
    };

    state = {
        players: [],
        screens: ['GAME_SCREEN', 'SCORE_SCREEN'],
        rodada: 0,
        vazasAtribuidas: 0,
        rodadaDetails: []
    };

    async componentWillMount() {
        db.setActualScreen('GameScreen');
        const {navigation} = this.props;
        const players = navigation.getParam('players', async () => {
            await db.getAllPlayers()
        });
        const rodada = navigation.getParam('rodada', async () => {
            await db.getRodada()
        });
        const rodadaDetails = await db.getAllRodadaDetails();

        this.setState({players, rodada, rodadaDetails});

    }

    renderGameScreen = () => {
        return (
            <>
                <gs.Text bold color={'white'} style={{marginTop: 4}}>
                    Rodada: {this.state.rodada}
                </gs.Text>
                <gs.Text bold color={'white'} style={{marginBottom: 16}}>
                    Defina o número de vazas que cada jogador fez
                </gs.Text>
                <ScrollView>
                    {this.state.players.map(player =>
                        <View key={player.index}>
                            <gs.Group style={{justifyContent: 'space-between', alignItems: 'flex-end'}}>
                                <gs.Text fs={18} color={'white'}>Jogador {player.index}</gs.Text>
                                <gs.Text fs={12} color={'white'}>Palpite: {player.palpite}</gs.Text>
                            </gs.Group>
                            <gs.Card color={'#fffbd8'}>
                                <gs.Group style={{justifyContent: 'space-between', alignItems: 'center'}}>
                                    <gs.Text fs={14} color={'#555'}>
                                        {player.name}
                                    </gs.Text>
                                    <gs.Group style={{width: 100, justifyContent: 'center', alignItems: 'center'}}>
                                        <TouchableOpacity onPress={() => this._addVaza(player, -1)}>
                                            <Icon name={'minus'} size={24} color={'#e74c3c'}/>
                                        </TouchableOpacity>
                                        <gs.Text fs={18} color={'black'} center
                                                 style={{marginLeft: 16, marginRight: 16}}>
                                            {player.vazas}
                                        </gs.Text>
                                        <TouchableOpacity onPress={() => this._addVaza(player, 1)}>
                                            <Icon name={'plus'} size={24} color={'#2ecc71'}/>
                                        </TouchableOpacity>
                                    </gs.Group>
                                </gs.Group>
                            </gs.Card>
                        </View>
                    )
                    }
                </ScrollView>
                <gs.Button onPress={() => this.finalizaRodada()}>
                    <gs.Text color={'#050'} bold fs={14}>FINALIZAR RODADA</gs.Text>
                </gs.Button>
            </>
        )
    };

    renderScoreBoardScreen = () => {
        const containerWidth = (Dimensions.get('window').width - 32) / this.state.players.length; //32 = 16 de padding do gs.MainContainer e +16 do RodadaContainer
        return (
            <ScrollView>
                <ScoreView>
                    <>
                        <gs.Group>
                            <RodadaContainer/>
                            {
                                this.state.players.map((player) =>
                                    <PlayerContainer width={containerWidth} key={player.index}>
                                        <gs.Text center fs={12}>{player.name}</gs.Text>
                                    </PlayerContainer>
                                )
                            }
                        </gs.Group>
                        {
                            this.state.rodadaDetails.map(rodada =>
                                <gs.Group key={rodada.rodada}>
                                    <RodadaContainer>
                                        <gs.Text center>{rodada.rodada}</gs.Text>
                                    </RodadaContainer>
                                    {
                                        rodada.details.map(detail =>
                                            <PlayerContainer width={containerWidth} key={detail.index}>
                                                <gs.Text center fs={12}>{detail.score} | {detail.palpite}</gs.Text>
                                            </PlayerContainer>
                                        )
                                    }
                                </gs.Group>
                            )
                        }

                    </>
                </ScoreView>
            </ScrollView>
        )
    };

    _renderItem = ({item, index}) => {
        if (item === 'GAME_SCREEN')
            return this.renderGameScreen();
        return this.renderScoreBoardScreen();
    };

    render() {
        return (
            <gs.MainContainer>
                <StatusBar translucent={false} backgroundColor='rgb(58,50,111)'/>
                <Carousel
                    ref={(c) => {
                        this._carousel = c;
                    }}
                    data={this.state.screens}
                    renderItem={(item, index) => this._renderItem(item, index)}
                    sliderWidth={Dimensions.get('window').width - 16}
                    itemWidth={Dimensions.get('window').width - 16}

                />
            </gs.MainContainer>
        );
    }

    _addVaza = (player, amount) => {

        if (player.vazas === 0 && amount === -1) return;

        let {vazasAtribuidas} = this.state;
        vazasAtribuidas += amount;
        if(vazasAtribuidas > this.state.rodada)
            return;

        this.setState({vazasAtribuidas});

        let {players} = this.state;
        players = players.map((p) => {
            if (p.index === player.index) {

                p.vazas += amount
            }
            return p;
        });
        this.setState({players})
    };

    finalizaRodada = async () => {
        try {
            await new Promise((resolve, reject) => {
                Alert.alert(
                    'Finalizar Rodada',
                    'Deseja realmente finalizar esta rodada?',
                    [
                        {
                            text: 'Cancel',
                            onPress: reject,
                            style: 'cancel',
                        },
                        {text: 'OK', onPress: resolve},
                    ],
                    {cancelable: false},
                );
            });

            let details = [];

            const players = this.state.players.map((player) => {
                if(player.palpite === player.vazas) {
                    player.score += 20 + (player.vazas * 10)
                } else {
                    player.score -= 10 * (Math.abs(player.palpite - player.vazas));
                    if (player.score < 0)
                        player.score = 0;
                }

                details = [...details, {...player}];

                player.palpite = 0;
                player.vazas   = 0;

                return player;
            });

            const RodadaDetails = {
                rodada: this.state.rodada,
                details
            };

            await db.registerRodadaDetail(RodadaDetails);

            const {rodada} = this.state;

            //if (rodada === 3) {
            if (rodada * players.length > 60) {
                this.props.navigation.navigate('FinalScreen', {scores: details});
            } else {
                this.props.navigation.navigate('PalpitesScreen', {players, rodada: rodada+1});
            }

        } catch(e) {}
    };
}


const ScoreView = styled.View`
    background-color: white;
    border-radius: 4px;
    overflow: hidden;
`;

const RodadaContainer = styled.View`
    width: 16px;
    min-height: 16px;
    border: 1px solid blue;
`;

const PlayerContainer = styled.View`
    width: ${props => props.width || 50};
    border: 1px solid black;
    overflow: hidden;
`;