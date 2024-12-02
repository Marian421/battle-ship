import { Gameboard } from "./gameboard";


class Player {
    constructor(name) {
        this.name = name;
        this.score = 0;
        this.gameboard = Gameboard();
        this.shipsCount = 5;
    }

    shipDestroyed() {
        this.shipsCount = this.shipsCount - 1;;
    }
}

export {Player};