function knightMoves(starting, ending) { // Both are arrays.
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

    const queueVisited = new Map([
        [JSON.stringify(starting), null],
    ]);
    
    function calculateShortestPath(map, node, path = [JSON.parse(node)]) {
        let parentNode = map.get(node);
        if (parentNode === null) {
            return path;
        }
        path.push(JSON.parse(parentNode));
        return calculateShortestPath(map, parentNode, path);
    }

    const queueBFS = [...starting];
    return (function BFS(currentPos) {
        for (let i = 0; i < knightTraversals.length; i++) {
            const newPosition = [currentPos[0] + knightTraversals[i][0], currentPos[1] + knightTraversals[i][1]];
            if (validatePosition(newPosition) && !(queueVisited.has(JSON.stringify(newPosition)))) { // Havent visited the queue.
                if (JSON.stringify(newPosition) === JSON.stringify(ending)) { // Found the item
                    queueVisited.set(JSON.stringify(newPosition), JSON.stringify(currentPos));
                    const shortestPath = calculateShortestPath(queueVisited, JSON.stringify(ending));
                    return (function(shortestPath) {
                        shortestPath.reverse();
                        console.log(`You made it in ${shortestPath.length - 1} moves!  Here's your path:`);
                        shortestPath.forEach(element => {
                            console.log(element);
                        });
                    })(shortestPath);
                }   
                queueVisited.set(JSON.stringify(newPosition), JSON.stringify(currentPos));
                queueBFS.push(newPosition);
            }
        }
        queueBFS.splice(0,1);
        return BFS(queueBFS[0]);
    })(starting);
}   

function validateVertices(c1, c2) {
    return [c1, c2].every(([x, y]) => x >= 0 && x <= 7 && y >= 0 && y <= 7);
}

function validatePosition(Arr) {
    const [x,y] = Arr;
    if (x < 0 || x > 7 || y < 0 || y > 7) return false;
    return true;
}

knightMoves([3,3],[4,3]);
