import React, {Component} from 'react';
import {View, Text} from 'react-native';
import * as gs from './globalStyles';


class FinalScreen extends Component {

    static navigationOptions = {
        title: 'Fim de Jogo',
        headerStyle: {
            backgroundColor: 'rgb(58, 50, 111)'
        },
        headerTintColor: '#fff'
    };


    state = {
        score: []
    };

    componentWillMount() {
        const {navigation} = this.props;
        const score = navigation.getParam('scores');
        this.setState({score});
    }

    render() {
        return (
            <gs.MainContainer>
                <gs.Text fs={24} color={"white"} center>
                    FIM DE JOGO!
                </gs.Text>
                {
                    this.state.score.map(s =>
                        <View key={s.index}>
                            <gs.Text>
                                {s.name} : {s.score}
                            </gs.Text>
                        </View>
                    )
                }
            </gs.MainContainer>
        );
    }
}

export default FinalScreen;