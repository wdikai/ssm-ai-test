const { Cell } = require('./cell'); 

exports.PathFinder = class PathFinder {
    constructor (map) {
        this.map = map;
    }

    findPath(start, target) {
        let current, result = [];
        let openList = new Set(), closeList = new Set();
        let cellMap = this.map.map((value, x, y) => new Cell(
            x,
            y,
            value !== '#'
        ));
        openList.add(cellMap.getValue(start.x, start.y));
        while (openList.size) {
            const cell = openList.values().next().value;
            

            if (cell.x === target.x && cell.y === target.y) {
                current = cell;
                break;
            }
            openList.delete(cell);
            closeList.add(cell);

            const neborhood = this.getNeborhood(cell, cellMap);
            for (let next of neborhood) {
                if(!closeList.has(next) && !openList.has(next) && next.isFree) {
                    next.parent = cell;
                    openList.add(next);
                }
            }
        }

        while (current) {
            const position = {x: current.x, y: current.y};
            result.push(position);
            current = current.parent;
        }

        return result;
    }

    getNeborhood(position, map) {
        const neborhood = [];

        if(map.getValue(position.x - 1, position.y - 1)) neborhood.push(map.getValue(position.x - 1, position.y - 1)); 
        if(map.getValue(position.x, position.y - 1)) neborhood.push(map.getValue(position.x, position.y - 1)); 
        if(map.getValue(position.x + 1, position.y - 1)) neborhood.push(map.getValue(position.x + 1, position.y - 1));

        if(map.getValue(position.x - 1, position.y)) neborhood.push(map.getValue(position.x - 1, position.y)); 
        if(map.getValue(position.x + 1, position.y)) neborhood.push(map.getValue(position.x + 1, position.y));

        if(map.getValue(position.x - 1, position.y + 1)) neborhood.push(map.getValue(position.x - 1, position.y + 1));
        if(map.getValue(position.x, position.y + 1)) neborhood.push(map.getValue(position.x, position.y + 1));
        if(map.getValue(position.x + 1, position.y + 1)) neborhood.push(map.getValue(position.x + 1, position.y + 1));

        return neborhood;
    }
} 