import React, {Component} from 'react';
import {ScrollView, TouchableOpacity} from 'react-native';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import prompt from 'react-native-prompt-android';
import {connect} from 'react-redux';
import * as GameActions from '../store/actions/GameActions';
import {Button, ButtonText, FlexWrapCenter, MainContainer, PlayerBox, Text} from './globalStyles';
import {capitalizeFirstLetter} from '../utils';

class ConfigPlayersScreen extends Component {
    static navigationOptions = {
        header: null,
    };

    askPlayerName = async () => new Promise((resolve, reject) => {
        prompt(
            'Informe o nome',
            'Informe o nome do novo jogador:',
            [
                {text: 'Cancel', onPress: reject, style: 'cancel'},
                {text: 'OK', onPress: text => resolve(capitalizeFirstLetter(text))},
            ],
            {
                type: 'plain-text',
                cancelable: false,
                defaultValue: '',
                placeholder: 'Nome do Jogador',
            },
        );
    });

    addNewPlayer = async () => {
        const {game, dispatch} = this.props;
        let name = await this.askPlayerName();
        if (name.length > 0) {
            const player = {
                index: 0,
                name: '',
                palpite: 0,
                vazas: 0,
                score: 0,
            };
            player.index = game.players.length + 1;
            if (name.toUpperCase().indexOf('KLEY') > -1) {
                name = 'Bixona';
            }
            player.name = name;

            //	Redux
            dispatch(GameActions.addNewPlayer(player));
        }
    };

    configureAndStartGame = () => {
        const {navigation} = this.props;
        navigation.navigate('PalpitesScreen');
    };

    render() {
        const {players} = this.props.game;

        return (
            <MainContainer>
                <ScrollView>
                    <InstructionText>
                        Número mínimo de jogadores: 3
                    </InstructionText>
                    <FlexWrapCenter>
                        {players.map(player =>
                            <PlayerBox key={player.index}>
                                <Icon name="user" size={28} color="#999"/>
                                <Text color="black" fs={14}>{player.name}</Text>
                            </PlayerBox>
                        )}
                        {players.length < 6 &&
                        <TouchableOpacity onPress={this.addNewPlayer}>
                            <PlayerBox>
                                <Icon name="plus" size={28} color="#999"/>
                                <Text center>Adicionar Jogador</Text>
                            </PlayerBox>
                        </TouchableOpacity>
                        }
                    </FlexWrapCenter>

                </ScrollView>
                <Button disabled={players.length < 3} onPress={this.configureAndStartGame}>
                    <ButtonText color="#050">Iniciar Jogo</ButtonText>
                </Button>
            </MainContainer>
        );
    }
}

const mapStateToProps = state => ({game: state});
export default connect(mapStateToProps)(ConfigPlayersScreen);
const InstructionText = styled.Text`
    color: white;
    font-size: 14px;
    text-align: center;
    padding: 16px;
    margin: 25px 0;
`;