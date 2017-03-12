var five = require('johnny-five');
var chipio = require('chip-io');

var board = new five.Board({
  io: new chipio()
});

board.on('ready', function() {
  // Create an LED on the XIO-P0 pin
  var led = new five.Pin({
  pin: 71,
  type: "analog"
});

pin.read(function(error, value) {
  console.log(value);
}); 
});