import React, {Component} from 'react';
import {ScrollView, TouchableOpacity} from 'react-native';
import styled from 'styled-components/native/dist/styled-components.native.esm'
import * as gs from './globalStyles';
import Icon from 'react-native-vector-icons/FontAwesome';
import prompt from 'react-native-prompt-android';
import db from '../db/db'

export default class ConfigPlayersScreen extends Component {

    static navigationOptions = {
        header: null,
    };

    state = {
        players: []
    };

    componentDidMount() {
        db.setActualScreen('ConfigPlayersScreen');
    }

    render() {
        return (
            <gs.MainContainer>
                <ScrollView>
                    <InstructionText>
                        Número mínimo de jogadores: 3
                    </InstructionText>
                    <gs.FlexWrapCenter>

                        {this.state.players.map((player) =>

                            <gs.PlayerBox key={player.index}>
                                <Icon name={"user"} size={28} color={"#999"}/>
                                <gs.Text color={"black"} fs={14}>{player.name}</gs.Text>
                            </gs.PlayerBox>
                        )}
                        {this.state.players.length < 6 &&
                        <TouchableOpacity onPress={this.addNewPlayer}>
                            <gs.PlayerBox>
                                <Icon name={"plus"} size={28} color={"#999"}/>
                                <gs.Text center>Adicionar Jogador</gs.Text>
                            </gs.PlayerBox>
                        </TouchableOpacity>
                        }
                    </gs.FlexWrapCenter>

                </ScrollView>
                <gs.Button disabled={this.state.players.length < 3} onPress={this.configureAndStartGame}>
                    <gs.ButtonText color={"#050"}>Iniciar Jogo</gs.ButtonText>
                </gs.Button>
            </gs.MainContainer>
        );
    }


    addNewPlayer = async () => {
        try {
            let name = await new Promise((resolve, reject) => {
                prompt(
                    "Informe o nome",
                    'Informe o nome do novo jogador:',
                    [
                        {text: 'Cancel', onPress: reject, style: 'cancel'},
                        {text: 'OK', onPress: text => resolve(text)},
                    ],
                    {
                        type: 'plain-text',
                        cancelable: false,
                        defaultValue: '',
                        placeholder: 'Nome do Jogador'
                    }
                );

            });
            if (name.length > 0) {
                const player = {
                    index   : 0,
                    name    : '',
                    palpite : 0,
                    vazas   : 0,
                    score   : 0,
                };
                player.index = this.state.players.length + 1;
                if (name.toUpperCase().indexOf('KLEY') > -1)  {
                    name = 'Bixona';
                }
                player.name = name;

                const {players} = this.state;
                players.push(player);
                this.setState({players});
            }

        } catch (e) {

        }
    };

    configureAndStartGame = () => {
        let {players} = this.state;
        db.savePlayers(players);
        this.props.navigation.navigate('PalpitesScreen', {players, rodada: 1});
    };

}

const InstructionText = styled.Text`
    color: white;
    font-size: 14px;
    text-align: center;
    padding: 16px;
    margin: 25px 0;
`;