import React, {Component} from 'react';
import {StatusBar} from 'react-native';
import InicialScreen from './src/pages/InicialScreen';
import ConfigPlayersScreen from './src/pages/ConfigPlayersScreen';
import PalpitesScreen from './src/pages/PalpitesScreen';
import GameScreen from './src/pages/GameScreen';
import FinalScreen from "./src/pages/FinalScreen";
import {createAppContainer, createStackNavigator} from 'react-navigation';
import {Provider} from 'react-redux';
import store from './src/store/store'

const MainNavigator = createStackNavigator({
    InicialScreen: {screen: InicialScreen},
    ConfigPlayersScreen: {screen: ConfigPlayersScreen},
    PalpitesScreen: {screen: PalpitesScreen},
    GameScreen: {screen: GameScreen},
    FinalScreen: {screen: FinalScreen}
});


const Stack = createAppContainer(MainNavigator);

export default class App extends Component {
    render() {
        return (
            <>
                <Provider store={store}>
                    <StatusBar translucent={true} backgroundColor="rgba(0,0,0,.2)" barStyle="light-content"/>
                    <Stack persistencKey={"screen"}/>
                </Provider>
            </>
        )
    }
}
