import db from '../../db/db';

const INITIAL_STATE = {
    players: [],
    rodada: 0,
    rodadaDetails: [],
    etapa: ''
};

export function gameReducer(state = INITIAL_STATE, action) {
    const newState = {...state};

    switch(action.type) {
        case 'ADD_RODADA':
            newState.rodada += 1;
            db.saveState(newState);
            break;
        case 'ADD_NEW_PLAYER':
            newState.players.push(action.player);
            db.saveState(newState);
            break;
        case 'UPDATE_PLAYER':
            newState.players = newState.players.map(p => {
               return p.index === action.player.index ? action.player : p;
            });
            db.saveState(newState);
            break;
        case 'FINALIZAR_RODADA':
            const rodadaDetail = {
                rodada: newState.rodada,
                details: []
            };
            newState.players = newState.players.map(player => {
                if (player.palpite === player.vazas) {
                    player.score += 20 + (player.vazas * 10)
                } else {
                    player.score -= 10 * (Math.abs(player.palpite - player.vazas));
                    if (player.score < 0)
                        player.score = 0;
                }
                rodadaDetail.details.push({...player});
                player.vazas   = 0;
                player.palpite = 0;
                return player;
            });
            newState.rodadaDetails = [...newState.rodadaDetails, rodadaDetail];
            newState.rodada += 1;
            newState.etapa = 'Palpite'; // Sempre que finaliza uma rodada a etapa volta para os palpites
            db.saveState(newState);
            break;
        case 'SET_ETAPA':
            newState.etapa = action.etapa;
            db.saveState(newState);
            break;
        case 'SET_STATE':
            return action.state;
    }

    return newState;
}