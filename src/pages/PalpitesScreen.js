import React, {Component} from 'react';
import {Dimensions, ScrollView, StatusBar, TouchableOpacity, View} from 'react-native';
import db from '../db/db'
import * as gs from './globalStyles'
import Icon from 'react-native-vector-icons/FontAwesome';
import Carousel from "react-native-snap-carousel";
import styled from "styled-components/native/dist/styled-components.native.esm";

export default class PalpitesScreen extends Component {

    static navigationOptions = {
        // headerTitle instead of title
        title: 'Fase de Palpites',
        headerStyle: {
            backgroundColor: 'rgb(58,50,111)',
        },
        headerTintColor: '#fff'
    };

    state = {
        players: [],
        screens: ['PALPITE_SCREEN', 'SCORE_SCREEN'],
        rodada: 0,
        rodadaDetails: []
    };

    // TODO: quando dá um back na tela de palpites a etapa volta a ser zero, teria que tentar resgatar a rodada na tela de configurar jogadores e enviar como param de navegação
    didBlurSubscription = this.props.navigation.addListener(
        'willFocus',
        async payload => {
            db.setActualScreen('PalpitesScreen');
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
    );

    componentWillUnmount(){
        this.didBlurSubscription.remove();
    }

    renderPalpiteScreen = () => {
        return (
            <>
                <StatusBar translucent={false} backgroundColor='rgb(58,50,111)'/>
                <gs.MainContainer>
                    <gs.Text bold color={'white'} style={{marginTop: 4}}>
                        Rodada: {this.state.rodada}
                    </gs.Text>
                    <gs.Text bold color={'white'} style={{marginBottom: 16}}>
                        Defina o número de vazas que cada jogador acha que irá fazer
                    </gs.Text>
                    <ScrollView>
                        {this.state.players.map(player =>
                            <View key={player.index}>
                                <gs.Text fs={18} color={'white'}>Jogador {player.index}</gs.Text>
                                <gs.Card>
                                    <gs.Group style={{justifyContent: 'space-between', alignItems: 'center'}}>
                                        <gs.Text fs={14} color={'#555'}>
                                            {player.name}
                                        </gs.Text>
                                        <gs.Group style={{width: 100, justifyContent: 'center', alignItems: 'center'}}>
                                            <TouchableOpacity onPress={() => this._addPalpite(player, -1)}>
                                                <Icon name={'minus'} size={24} color={'#e74c3c'}/>
                                            </TouchableOpacity>
                                            <gs.Text fs={18} color={'black'} center
                                                     style={{marginLeft: 16, marginRight: 16}}>
                                                {player.palpite}
                                            </gs.Text>
                                            <TouchableOpacity onPress={() => this._addPalpite(player, 1)}>
                                                <Icon name={'plus'} size={24} color={'#2ecc71'}/>
                                            </TouchableOpacity>
                                        </gs.Group>
                                    </gs.Group>
                                </gs.Card>
                            </View>
                        )
                        }
                    </ScrollView>
                    <gs.Button onPress={() => this.goToGameScreen()}>
                        <gs.Text color={'#050'} bold fs={14}>PROSSEGUIR</gs.Text>
                    </gs.Button>
                </gs.MainContainer>
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
        if (item === 'PALPITE_SCREEN')
            return this.renderPalpiteScreen();
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

    goToGameScreen = () => {
        let {players, rodada} = this.state;
        db.savePlayers(players);
        this.props.navigation.navigate('GameScreen', {players, rodada});
    };


    _addPalpite(player, amount) {

        // Impede que o palpite do player fique abaixo de zero e acima da rodada
        if ((player.palpite === 0 && amount === -1) ||
            (player.palpite+amount > this.state.rodada)
        ) return;

        let {players} = this.state;
        players = players.map((p) => {
            if (p.index === player.index) {
                p.palpite += amount
            }
            return p;
        });
        this.setState({players})
    }


}


const ScoreView = styled.View`
    background-color: white;
    border-radius: 4px;
    overflow: hidden;
`;

const RodadaContainer = styled.View`
    width: 16px;
    min-height: 16px;
`;

const PlayerContainer = styled.View`
    width: ${props => props.width || 50};
    border: 1px solid black;
    overflow: hidden;
`;