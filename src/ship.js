const Ship = ((size) => {

    const ship = {
        length : size,
        hits : 0,
        sunk: false
    }

    const hit = () => {
        if (ship.sunk) return;

        ship.hits = ship.hits + 1;

        if (isSunk()) ship.sunk = true;
    }

    const isSunk = () => {
        return (ship.hits === ship.length);
    }

    const shipSize = () => ship.length;

    return {hit, isSunk, shipSize};

});

export {Ship};