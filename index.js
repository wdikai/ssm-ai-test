const { Controller } = require("./core/Controller");
const { Timer } = require("./core/Timer");

let controller = new Controller();
let timer = new Timer(
    () => {
        controller.draw();
        controller.update();
    },
    300
);

const sin = process.openStdin();
sin.setRawMode(true);
sin.setEncoding( 'utf8' );
sin.on('data', (key) => {
    if ( key === '\u0003' ) {
        process.exit();
    }

    controller.update(key);
})

timer.start();