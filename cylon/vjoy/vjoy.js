var Cylon = require('cylon');

Cylon.robot({

  name: 'vjoy',
  // This is how we define custom events that will be registered
  // by the API.
  events: ['turned_on', 'turned_off'],
  
  //connections: {
    //arduino: { adaptor: 'firmata', port: '/dev/cu.usbmodemFD131' }
  //},

  //devices: {
    //led: { driver: 'led', pin: 13 }
  //},

commands: function() {
    return {
      turn_on: this.turnOn,
      turn_off: this.turnOff
    };
  },


  work: function(my) {
   
   console.log("running..")
  },

   turnOn: function() {
    console.log("State=ON");
    this.emit('turned_on');
  },

  turnOff: function() {
     console.log("State=OFF");
    this.emit('turned_off');
  }
});

Cylon.api(
  'socketio',
  {
    host: '0.0.0.0',
    port: '3000'
  });

Cylon.start();