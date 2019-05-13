const INITIAL_STATE = [];

export function players(state = INITIAL_STATE, action) {
    switch(action.type) {
        case 'ADD_NEW_PLAYER':
            return [...state, action.player];
        case 'SET_PLAYERS':
            return action.players;
    }
    return state;
}