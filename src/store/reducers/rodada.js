const INITIAL_STATE = 0;

export function rodada(state = INITIAL_STATE, action) {
    switch(action.type) {
        case 'ADD_RODADA':
            return state +1;
        case 'SET_RODADA':
            return action.rodada;
    }
    return state;
}