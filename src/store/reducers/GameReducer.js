const INITIAL_STATE = {
    players: [],
    rodada: 0
};

export function gameReducer(state = INITIAL_STATE, action) {
    const newState = {...state};

    switch(action.type) {
        case 'ADD_NEW_PLAYER':
            newState.players.push(action.player);
            return newState;

    }
    return newState;
}