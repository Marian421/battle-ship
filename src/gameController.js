import { Player } from "./player";
import { Gameboard } from "./gameboard";
import { Ship } from "./ship";

const game = (first = "Player One", second = "Computer") => {

    const firstPlayer = new Player(first);
    const secondPlayer = new Player(second);

    const players = [firstPlayer, secondPlayer];

    let receiverOfAttack = players[1];

    const switchReceiver = () => {
        receiverOfAttack = receiverOfAttack === players[0] ? players[1] : players[0];
    }

    const getReceiver = () => receiverOfAttack;

    const playGame = () => {
        
    }

    return {getReceiver}
}

export {game};