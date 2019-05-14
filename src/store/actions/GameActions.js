export function updatePlayer(player) {
    return {
        type: 'UPDATE_PLAYER',
        player
    };
}

export function addNewPlayer(player) {
    return {
        type: 'ADD_NEW_PLAYER',
        player
    }
}

export function addRodada() {
    return {
        type: 'ADD_RODADA',
    }
}

export function finalizarRodada() {
    return {
        type: 'FINALIZAR_RODADA'
    };
}

export function setEtapa(etapa) {
    /**
     * etapa = oneof['ConfigPlayers', 'Palpite', 'Game']
     * */
    return {
        type: 'SET_ETAPA',
        etapa
    };
}

export function setState(state){
    return {
        type: 'SET_STATE',
        state
    }
}