import React, {Component} from 'react';
import {ScrollView, TouchableOpacity} from 'react-native';
import styled from 'styled-components/native/dist/styled-components.native.esm'
import * as gs from './globalStyles';
import Icon from 'react-native-vector-icons/FontAwesome';
import prompt from 'react-native-prompt-android';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as playerActions from './../store/actions/players';

class ConfigPlayersScreen extends Component {

    static navigationOptions = {
        header: null,
    };

    render() {
        return (
            <gs.MainContainer>
                <ScrollView>
                    <InstructionText>
                        Número mínimo de jogadores: 3
                    </InstructionText>
                    <gs.FlexWrapCenter>

                        {this.props.players.map((player) =>

                            <gs.PlayerBox key={player.index}>
                                <Icon name={"user"} size={28} color={"#999"}/>
                                <gs.Text color={"black"} fs={14}>{player.name}</gs.Text>
                            </gs.PlayerBox>
                        )}
                        {this.props.players.length < 6 &&
                        <TouchableOpacity onPress={this.addNewPlayer}>
                            <gs.PlayerBox>
                                <Icon name={"plus"} size={28} color={"#999"}/>
                                <gs.Text center>Adicionar Jogador</gs.Text>
                            </gs.PlayerBox>
                        </TouchableOpacity>
                        }
                    </gs.FlexWrapCenter>

                </ScrollView>
                <gs.Button disabled={this.props.players.length < 3} onPress={this.configureAndStartGame}>
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
                        placeholder: 'Nome do Jogador',
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
                player.index = this.props.players.length + 1;
                if (name.toUpperCase().indexOf('KLEY') > -1)  {
                    name = 'Bixona';
                }
                player.name = capitalizeFirstLetter(name);

                //Redux
                this.props.addNewPlayer(player);
            }

        } catch (e) {

        }
    };

    configureAndStartGame = () => {
        this.props.navigation.navigate('PalpitesScreen');
    };

}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}


const mapStateToProps = (state) => {
    return {
        players: state.players
    }
};

const mapDispatchToProps = dispatch => bindActionCreators(playerActions, dispatch);


export default connect(mapStateToProps, mapDispatchToProps)(ConfigPlayersScreen)


const InstructionText = styled.Text`
    color: white;
    font-size: 14px;
    text-align: center;
    padding: 16px;
    margin: 25px 0;
`;