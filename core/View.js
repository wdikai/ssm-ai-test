exports.View = class View {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.clear();
    }
    set(x, y, c) {
        if (x < 0 || x >= this.width || y < 0 || y >= this.height)
            return;
        this.screen[y][x] = c || ' ';
    }

    drawMap(map) {
        for(let y = 0; y < map.h; y++) {
            for(let x = 0; x < map.w; x++) {
                this.set(x, y, map.getValue(x, y));
            }
        }
    }

    clear() {
        this.screen = Array
            .from({ length: this.height })
            .map(() => Array
                .from({ length: this.width })
                .map(() => ' '));
    }
    flush() {
        process.stdout.write('\x1b[0f');
        console.log();
        console.log(Array.from({ length: this.width + 5 }).join('-'));
        this.screen.forEach(line => console.log('|', line.join(''), '|'));
        console.log(Array.from({ length: this.width + 5 }).join('-'));
    }
}
