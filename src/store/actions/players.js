export function addNewPlayer(player) {
    return {
        type: 'ADD_NEW_PLAYER',
        player
    }
}

export function setPlayer(players) {
    return {
        type: 'SET_PLAYERS',
        players
    }
}