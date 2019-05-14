import React, {Component} from 'react';
import {Dimensions, ScrollView, StatusBar, TouchableOpacity, View} from 'react-native';
import {Button, Card, Group, MainContainer, Text} from './globalStyles'
import Icon from 'react-native-vector-icons/FontAwesome';
import Carousel from "react-native-snap-carousel";
import * as GameActions from '../store/actions/GameActions';
import {connect} from "react-redux";
import ScoreBoardScreen from './ScoreBoardScreen';

class PalpitesScreen extends Component {
    static navigationOptions = {
        title: 'Fase de Palpites',
        headerStyle: {
            backgroundColor: 'rgb(58,50,111)',
        },
        headerTintColor: '#fff'
    };

    state = {
        screens: ['PALPITE_SCREEN', 'SCORE_SCREEN']
    };

    componentDidMount() {
        if(this.props.game.rodada === 0) {
            this.props.dispatch(GameActions.addRodada());
        }
    }

    goToGameScreen = () => {
        this.props.navigation.navigate('GameScreen');
    };

    addPalpite = (rodada, player, amount) => {
        // Impede que o palpite do player fique abaixo de zero e acima da rodada
        if ((player.palpite === 0 && amount === -1) ||
            (player.palpite + amount > rodada)
        ) return;
        player.palpite += amount;
        this.props.dispatch(GameActions.updatePlayer(player));
    };

    renderPalpiteScreen = () => {
        const {game: {players, rodada}} = this.props;
        return (
            <>
                <StatusBar translucent={false} backgroundColor="rgb(58,50,111)"/>
                <MainContainer>
                    <Text bold color="white" style={{marginTop: 4}}>
                        Rodada: {rodada}
                    </Text>
                    <Text bold color="white" style={{marginBottom: 16}}>
                        Defina o número de vazas que cada jogador acha que irá fazer
                    </Text>
                    <ScrollView>
                        {players.map(player =>
                            <View key={player.index}>
                                <Text fs={18} color="white">Jogador {player.index}</Text>
                                <Card>
                                    <Group style={{justifyContent: 'space-between', alignItems: 'center'}}>
                                        <Text fs={14} color="#555">
                                            {player.name}
                                        </Text>
                                        <Group style={{width: 100, justifyContent: 'center', alignItems: 'center'}}>
                                            <TouchableOpacity onPress={() => this.addPalpite(rodada, player, -1)}>
                                                <Icon name="minus" size={24} color="#e74c3c"/>
                                            </TouchableOpacity>
                                            <Text fs={18} color="black" center
                                                     style={{marginLeft: 16, marginRight: 16}}>
                                                {player.palpite}
                                            </Text>
                                            <TouchableOpacity onPress={() => this.addPalpite(rodada, player, 1)}>
                                                <Icon name="plus" size={24} color="#2ecc71"/>
                                            </TouchableOpacity>
                                        </Group>
                                    </Group>
                                </Card>
                            </View>
                        )
                        }
                    </ScrollView>
                    <Button onPress={() => this.goToGameScreen()}>
                        <Text color="#050" bold fs={14}>PROSSEGUIR</Text>
                    </Button>
                </MainContainer>
            </>
        )
    };

    _renderItem = ({item}) => {
        if (item === 'PALPITE_SCREEN')
            return this.renderPalpiteScreen();
        return <ScoreBoardScreen/>;
    };

    render() {
        return (
            <MainContainer>
                <StatusBar translucent={false} backgroundColor="rgb(58,50,111)"/>
                <Carousel
                    ref={(c) => {
                        this._carousel = c;
                    }}
                    data={this.state.screens}
                    renderItem={(item) => this._renderItem(item)}
                    sliderWidth={Dimensions.get('window').width - 16}
                    itemWidth={Dimensions.get('window').width - 16}

                />
            </MainContainer>
        );
    }
}

const mapStateToProps = (state) => ({game: state});
export default connect(mapStateToProps)(PalpitesScreen)
