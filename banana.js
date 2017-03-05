var Gpio = require('chip-gpio').Gpio;
var btn = new Gpio(7, 'in', 'both', {
    debounceTimeout: 500
});
var led = new Gpio(6, 'out');
 
btn.watch(function (err, value) {
    if (err) {
        throw err;
    }
    led.write(led.read() == 1 ? 0 : 1);
});
 
function exit() {
    btn.unexport();
    led.unexport();
    process.exit();
}
 
process.on('SIGINT', exit);