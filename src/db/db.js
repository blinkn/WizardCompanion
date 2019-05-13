import AsyncStorage from '@react-native-community/async-storage';

export default class db {

    static async createNewGame(clearDb = false) {
        if(clearDb) {
            await AsyncStorage.clear();
        }
        const GameInstance = {
            rodada: 1,
            actualScreen: '',
            players: [],
            rodadaDetails: []
        };
        await db._setGameInstance(GameInstance);
    }

    static async _getGameInstance() {
        try {
            const rawJson = await AsyncStorage.getItem('gameInstance');
            return JSON.parse(rawJson);
        }catch(e) {
            console.log('Erro 1 _getGameInstance()');
            console.log(e);
            return {};
        }
    }

    static async _setGameInstance(GameInstance) {
        console.log('UPDATE GAME', GameInstance)
        try {
            await AsyncStorage.setItem('gameInstance', JSON.stringify(GameInstance));
        }catch(e) {
            console.log('Erro 4 _setGameInstance()');
            console.log(e);
        }
    }

    static async savePlayers(players) {
        try{
            const GameInstance = await db._getGameInstance();
            GameInstance.players = players;
            db._setGameInstance(GameInstance);
        } catch (e) {
            console.log('Erro 2 savePlayers()');
            console.log(e);
        }
    }

    static async getAllPlayers() {
        console.warn('pegou players do storage');
        try {
            const GameInstance = await db._getGameInstance();
            return GameInstance.players;
        } catch (e) {
            console.log('Erro 3 getAllPlayers()');
            console.log(e);
            return [];
        }

    }

    static async getRodada() {
        console.warn('pegou rodada do storage');
        try {
            const GameInstance = await db._getGameInstance();
            return GameInstance.rodada;
        } catch (e) {
            console.log('Erro getRodada()');
            console.warn(e);
            return 1;
        }
    }

    static async setActualScreen(screen) {
        const GameInstance = await db._getGameInstance();
        GameInstance.actualScreen = screen;
        await db._setGameInstance(GameInstance);
    }


    static async registerRodadaDetail(RodadaDetail) {
        console.log('registerRodadaDetail before', RodadaDetail);
        const GameInstance = await db._getGameInstance();
        GameInstance.rodadaDetails = [...GameInstance.rodadaDetails, RodadaDetail];
        GameInstance.rodada += 1;
        console.log('registerRodadaDetail after', GameInstance.rodadaDetails);
        await db._setGameInstance(GameInstance);
    }

    static async getAllRodadaDetails() {
        try {
            const GameInstance = await db._getGameInstance();
            return GameInstance.rodadaDetails;
        } catch (e) {
            console.log('Erro getAllRodadaDetails()');
            console.log(e);
            return [];
        }

    }

}