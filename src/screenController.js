import { Gameboard } from "./gameboard";
import { Ship } from "./ship";
import { Player } from "./player";

const ScreenController = (() => {
    const divPlayerGameboard = document.querySelector(".playerGameboard");
    const status = document.querySelector(".status");
    const firstPlayer = new Player("Mihai");
    const secondPlayer = new Player("Remus");
    const divAIGameboard = document.querySelector(".AIGameboard");
    divAIGameboard.classList.add("focused");
    const timeBetweenAttacks = 500;

    const coverBoard = (() => {
        let hidden = divPlayerGameboard;
        let focused;
        
        const hide = () => {
            hidden.style.zIndex = 1;
        }
        
        const unblock = () => {
            focused.style.zIndex = 3; // changing the index before the change
        }

        const changeBoard = () =>{

            focused = hidden;
            
            hidden = hidden === divAIGameboard ? divPlayerGameboard : divAIGameboard;
            
            hide();
        } 
        
        const changeStyle = () => {
            focused.classList.add("focused");
            hidden.classList.remove("focused");
            unblock();
        }

        hide();
        
        return {changeBoard, changeStyle};
    })();
    const setUpShips = (player) => {
        const ships = createShips();
        let x;
        let y;
        let direction;

        ships.forEach(ship => {
            x = getRandomInt(0,9);
            y = getRandomInt(0,9);
            direction = getRandomInt(0,1);
            while (player.placeShip(ship,{x: x, y: y}, direction, ship.shipSize()) === false){
                x = getRandomInt(0,9);
                y = getRandomInt(0,9);
                direction = getRandomInt(0,1);
            }    
        });
        
    }

    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    
    const createShips = () => {
        return [
            Ship(5),
            Ship(4),
            Ship(3),
            Ship(3),
            Ship(2)
        ]
    }

    const generateBoard = (board, receiver) => {
        setUpShips(receiver.gameboard);
        
        for (let i = 0; i < 10; i++){
            const row = document.createElement("div");
            row.classList.add("row");
            for (let j = 0; j < 10; j++) {
                const cell = document.createElement("div");
                cell.classList.add("cell");

                cell.addEventListener("click", () => {
                    
                    const result = receiver.gameboard.receiveAttack({x: i, y: j});
                    status.textContent = `Attacking ${receiver.name}`
                    coverBoard.changeBoard();
                    if (result[0]) {
                        setTimeout((() => {
                            cell.style.backgroundColor = "#81B29A";
                            status.textContent = "Succesful Attack";
                            //handleTimeoutAttack();
                            coverBoard.changeBoard();
                            coverBoard.changeStyle();
                        }), timeBetweenAttacks);
                        if (result[1]){
                            setTimeout((() => {
                                receiver.shipDestroyed();
                                status.textContent = `You have taken down a ship, there are ${receiver.shipsCount} ships left on ${receiver.name}'s board`;
                                if (receiver.shipsCount === 0) {
                                    status.textContent = `${receiver.name} WON`;
                                }
                                handleTimeoutAttack();
                            }), timeBetweenAttacks)
                        }
                    } else {
                        setTimeout((() => {
                            cell.style.backgroundColor = "#E07A5F"
                            status.textContent = "Missed";
                            handleTimeoutAttack();
                        }), timeBetweenAttacks);                       
                    }
                        
                }, {once: true})

                row.appendChild(cell);
            }
            board.appendChild(row);
        }
    }

    const handleTimeoutAttack = () => {
        coverBoard.changeStyle();            
    }

    generateBoard(divPlayerGameboard, firstPlayer);
    generateBoard(divAIGameboard, secondPlayer);

   // setUpShips();

})();

export {ScreenController};