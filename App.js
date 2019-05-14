import React, {Component} from 'react';
import {StatusBar} from 'react-native';
import {createAppContainer, createStackNavigator} from 'react-navigation';
import {Provider} from 'react-redux';
import store from './src/store/store'
import ExitHeaderButton from './src/components/ExitHeaderButton';
import {routes} from "./src/routes/routes";


const MainNavigator = createStackNavigator(
    routes,
    {
        /* The header config from HomeScreen is now here */
        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor: 'rgb(58,50,111)',
            },
            headerTintColor: '#fff',
            headerLeft: null,
            headerRight: <ExitHeaderButton name="sign-out" />
        },
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
