function knightMoves(starting, ending) {
    if (!validateVertices(starting, ending)) throw Error("Out of bounds");
    const knightTraversals = [ 
        [2, 1],
        [1, 2],
        [-1, 2],
        [-2, 1],
        [-2, -1],
        [-1, -2],
        [2, -1],
        [1, -2],
    ];

    (function BFS(queueVisited, currentPos) {
        for (let i = 0; i < knightTraversals.length; i++) {
            const newPosition = [currentPos[0] + knightTraversals[i][0], currentPos[1] + knightTraversals[i][1]];
            if (validatePosition(newPosition) && !(newPosition in queueVisited)) {
                queueVisited.push(newPosition);
                BFS(queueVisited, newPosition);
            }
        }
    })(starting, starting);

    // queueVisited.forEach(function(visitedCoord) {
    //     knightTraversals.forEach(function(movementArr) {
    //         const newPosition = [visitedCoord[0] + movementArr[0], visitedCoord[1] + movementArr[1]];
    //         if (validatePosition(newPosition)) {
    //             queueVisited.push(newPosition);     
    //         }
    //     }) 
    // }) 

}   

function validateVertices(c1, c2) {
    return [c1, c2].every(([x, y]) => x >= 0 && x <= 7 && y >= 0 && y <= 7);
}

function validatePosition(Arr) {
    const [x,y] = Arr;
    if (x < 0 || x > 7 || y < 0 || y > 7) return false;
    return true;
}