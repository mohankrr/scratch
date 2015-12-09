"use strict";

var Cylon = require("cylon");



var UxServer=require(require("path").join(__dirname, "/vgcUxServer"));

var Adaptor = module.exports = function Adaptor(opts) {
  Adaptor.__super__.constructor.apply(this, arguments);
  opts = opts || {};
};

Cylon.Utils.subclass(Adaptor, Cylon.Adaptor);

Adaptor.prototype.connect = function(callback) {
	
	console.log("Starting the http server here to serve the virtual game controller UX");
	UxServer.init();
    console.log(__dirname);
	console.log("1. Start the Socket IO connection here to listen to commands coming from vgc page.");
  callback();
};

Adaptor.prototype.disconnect = function(callback) {
  callback();
};
