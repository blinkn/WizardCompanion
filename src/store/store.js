import {createStore} from 'redux';
import {gameReducer} from "./reducers/GameReducer";

export default createStore(gameReducer);