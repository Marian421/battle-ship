import { Ship } from "./ship";

const Gameboard = () => {
    const board = [];
    const attacksReceived = [];
    const ship1 = Ship(5);
    const ship2 = Ship(4);
    const ship3 = Ship(3);
    const ship4 = Ship(3);
    const ship5 = Ship(2);

    for (let i = 0; i < 10; i++){
        const temp = [];
        for (let j = 0; j < 10; j++) {
            temp.push(0);
        }
        board.push(temp);
    }

    const getBoard = () => board;

    const placeShip = (ship, position, direction, size) => {

        if (checkShipPlacement(position, direction, size)){
            let {x, y} = position;

            if (direction === 0){
                
                while (size) {
                    board[x][y] = ship;
                    size--;
                    x++;
                }
            } else if (direction === 1) {
                while (size) {
                    board[x][y] = ship;
                    size--;
                    y++;
                }           
            }
            return true;
        } else return false

    }

    const receiveAttack = (position) => {

        const {x, y} = position;

        if (!attacksReceived.includes([x,y])) {
            if (board[x][y] === 0) {
                attacksReceived.push([x,y])
                return [false,false]; // [hitOnShip, shipIsSunk]
            } else {
                board[x][y].hit();
                if (board[x][y].isSunk()){
                    return [true,true]; // ship has been sunk, gg
                }
                return [true,false]; // successfull
            }
        }

    }

    const checkShipPlacement = (position, direction, size) => {
        let {x, y} = position;
        let valid = true;

        if (direction === 0){
            
            while (size) {
                if (!(inBoundary({x: x , y: y}) && !cellHasNeighbour({x: x, y: y}))){
                    valid = false;
                }
                size--;
                x++;
            }
        } else if (direction === 1) {
             while (size) {
                if (!(inBoundary({x: x , y: y}) && !cellHasNeighbour({x: x, y: y}))){
                    valid = false;
                }
                size--;
                y++;
            }           
        }
        

        return valid;
    }

    const inBoundary = (position) => {
        const {x, y} = position;

        return !(x < 0 || x > 9 || y < 0 || y > 9);
    }

    const cellHasNeighbour = (position) => {
        const {x, y} = position;

        const neighbors = [
            {down: {x: x, y: y - 1}},
            {up: {x: x, y: y + 1}},
            {left: {x: x - 1, y: y}},
            {right: {x: x + 1, y: y}},
            {downLeft: {x: x - 1, y: y - 1}},
            {downRight: {x: x + 1, y: y - 1}},
            {upLeft: {x: x - 1, y: y + 1}},
            {upRight: {x: x + 1, y: y + 1}},
        ];

        let hasNeighbour = false;
          
        neighbors.forEach((neighbor) => {
            const [{x, y}] = Object.values(neighbor);
            if (inBoundary({x: x, y: y})){
                if (board[x][y] !== 0) hasNeighbour = true;    
            }
        })

        return hasNeighbour;

    }

    const setCell = (position, value) => {
        const {x, y} = position;
        board[x][y] = value;
    }

    const getCell = (position) => {
        const {x, y} = position;
        return board[x][y];
    }
    
    return {getBoard, setCell, getCell, placeShip, receiveAttack}
}

export {Gameboard};