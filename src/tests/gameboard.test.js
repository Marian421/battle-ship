import { Gameboard } from "../gameboard";

describe("intialization", () => {
    test("test gameboard intialization", () => {
        const board = Gameboard().getBoard();
    
        expect(board.length).toBe(10);
        for(let i = 0; i < 10; i++){
            expect(board[i].length).toBe(10)
        }
    })
});

describe("Placement of ship", () => {
    const board = Gameboard();
    test("placement of the ship", () => {
        board.placeShip("ship", {x:0, y:2}, "y", 4);
        const coordonates = [[0, 2], [0, 3], [0, 4], [0, 5]];

        coordonates.forEach((position) => {
            expect(board.getCell({x:position[0], y:position[1]})).toBe("ship");
        })
    })
})

describe("Receiving the attacks", () => {

})
