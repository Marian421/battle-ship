import { Ship } from "../ship";

test("ship initialization", () => {
    const ship = Ship(3);
    expect(ship.isSunk()).toBe(false);
})

test("increment hits, should not be sunk", () => {
    const ship = Ship(3);
    ship.hit();
    ship.hit();
    expect(ship.isSunk()).toBe(false); 
})

test("sinking the ship", () => {
    const ship = Ship(3);
    ship.hit();
    ship.hit();
    ship.hit();
    expect(ship.isSunk()).toBe(true); 
})

test("hit about limit", () => {
    const ship = Ship(3);
    ship.hit();
    ship.hit();
    ship.hit();
    ship.hit();
    expect(ship.isSunk()).toBe(true); 
})