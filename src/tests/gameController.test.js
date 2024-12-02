import { game } from "../gameController";

describe("gameController tests", () => {
    const Game = game("Marian", "Andrei");
    test ("getActive player function", () => {
        expect(Game.getActivePlayer()).toBe("Marian");
    })
})