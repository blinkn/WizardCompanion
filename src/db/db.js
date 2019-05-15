import AsyncStorage from '@react-native-community/async-storage';

export default class db {

    static saveState(newState) {
        AsyncStorage.setItem('state', JSON.stringify(newState));
    }

    static async loadState() {
        try {
            const state = await AsyncStorage.getItem('state');
            return JSON.parse(state);
        } catch (e) {
            return null;
        }
    }

    static clearDb() {
        AsyncStorage.clear();
    }

}