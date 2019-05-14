const INITIAL_STATE = {
    players: [],
    rodada: 0
};

export function gameReducer(state = INITIAL_STATE, action) {
    const newState = {...state};

    switch(action.type) {
        case 'ADD_RODADA':
            newState.rodada += 1;
            return newState;
        case 'ADD_NEW_PLAYER':
            newState.players.push(action.player);
            return newState;
        case 'UPDATE_PLAYER':
            console.log('Updating player to ', action.player);
            newState.players = newState.players.map(p => {
               return p.index === action.player.index ? action.player : p;
            });
            return newState;

    }
    return newState;
}