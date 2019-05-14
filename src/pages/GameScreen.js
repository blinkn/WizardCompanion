import React, {Component} from 'react';
import {Alert, Dimensions, ScrollView, StatusBar, TouchableOpacity, View} from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import Carousel from "react-native-snap-carousel";
import ScoreBoardScreen from './ScoreBoardScreen';
import {Button, Card, Group, MainContainer, Text} from "./globalStyles";
import {connect} from "react-redux";
import * as GameActions from "../store/actions/GameActions";
import store from "../store/store";

class GameScreen extends Component {

    static navigationOptions = {
        title: 'Fase de Jogo',
        headerStyle: {
            backgroundColor: 'rgb(58, 50, 111)'
        },
        headerTintColor: '#fff'
    };

    state = {
        screens: ['GAME_SCREEN', 'SCORE_SCREEN'],
        vazasAtribuidas: 0
    };

    addVaza = (player, amount) => {
        if (player.vazas === 0 && amount === -1) return;
        let {vazasAtribuidas} = this.state;
        vazasAtribuidas += amount;
        if (vazasAtribuidas > this.props.game.rodada)
            return;
        player.vazas += amount;
        this.props.dispatch(GameActions.updatePlayer(player));
        this.setState({vazasAtribuidas});
    };

    confirmFinalizarRodada() {
        return new Promise((resolve, reject) => {
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
                ]
            );
        });
    }

    finalizaRodada = async () => {
        await this.confirmFinalizarRodada();
        const {game: {players}, dispatch, rodada} = this.props;
        dispatch(GameActions.finalizarRodada());
        //if (rodada === 3) {
        if (rodada * players.length > 60) {
            this.props.navigation.navigate('FinalScreen');
        } else {
            this.props.navigation.navigate('PalpitesScreen');
        }

    };

    renderGameScreen = () => {
        const {game: {players, rodada}} = this.props;
        return (
            <>
                <Text bold color="white" style={{marginTop: 4}}>
                    Rodada: {rodada}
                </Text>
                <Text bold color="white" style={{marginBottom: 16}}>
                    Defina o número de vazas que cada jogador fez
                </Text>
                <ScrollView>
                    {
                        players.map(player =>
                            <View key={player.index}>
                                <Group style={{justifyContent: 'space-between', alignItems: 'flex-end'}}>
                                    <Text fs={18} color="white">Jogador {player.index}</Text>
                                    <Text fs={12} color="white">Palpite: {player.palpite}</Text>
                                </Group>
                                <Card color="#fffbd8">
                                    <Group style={{justifyContent: 'space-between', alignItems: 'center'}}>
                                        <Text fs={14} color={'#555'}>
                                            {player.name}
                                        </Text>
                                        <Group style={{width: 100, justifyContent: 'center', alignItems: 'center'}}>
                                            <TouchableOpacity onPress={() => this.addVaza(player, -1)}>
                                                <Icon name="minus" size={24} color="#e74c3c"/>
                                            </TouchableOpacity>
                                            <Text fs={18} color="black" center
                                                  style={{marginLeft: 16, marginRight: 16}}>
                                                {player.vazas}
                                            </Text>
                                            <TouchableOpacity onPress={() => this.addVaza(player, 1)}>
                                                <Icon name="plus" size={24} color="#2ecc71"/>
                                            </TouchableOpacity>
                                        </Group>
                                    </Group>
                                </Card>
                            </View>
                        )
                    }
                </ScrollView>
                <Button onPress={() => this.finalizaRodada()}>
                    <Text color="#050" bold fs={14}>FINALIZAR RODADA</Text>
                </Button>
                <Button onPress={() => console.log(store.getState())}>
                    <Text color="#050" bold fs={14}>STORE</Text>
                </Button>
            </>
        )
    };

    _renderItem = ({item, index}) => {
        if (item === 'GAME_SCREEN')
            return this.renderGameScreen();
        return <ScoreBoardScreen/>;
    };

    render() {
        return (
            <MainContainer>
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
            </MainContainer>
        );
    }
}

const mapStateToProps = (state) => ({
    game: state
});
export default connect(mapStateToProps)(GameScreen);