import {createStore, combineReducers} from 'redux';
import {players} from './reducers/players';
import {rodada} from './reducers/rodada';

const reducers = combineReducers({
    players,
    rodada
});

console.log('reducers', reducers);

export default createStore(reducers);