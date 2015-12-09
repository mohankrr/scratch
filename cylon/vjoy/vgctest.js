var Cylon = require('cylon');

Cylon.robot({

  name: 'vjoytest',
  // This is how we define custom events that will be registered
  // by the API.
  events: ['turned_on', 'turned_off'],
  
  connections: {
    vgc: { adaptor: 'vgc'}
  },

  devices: {
    vjoy: { driver: 'vjoy'}
  },

commands: function() {
    return {
      turn_on: this.turnOn,
      turn_off: this.turnOff
    };
  },


  work: function(my) {
   
   console.log("running..")
   console.log("Calling vjoy Command");
   my.vjoy.hello();
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