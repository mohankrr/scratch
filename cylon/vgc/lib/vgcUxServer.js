(function(){

var http = require('http');
var fs=require('fs');
var Cylon = require('cylon');

//Define HTTP Port and Socket IO port
const HTTP_PORT=3001; 
const VGC_PORT=3002; //Virtual Game Controller input port

//We need a function which handles requests and send response
function handleRequest(request, response){
	
	var url = require('url').parse(request.url, true);
	console.log("Serving : %s", url.path);

	var fileToServe=(url.path=='/gamecontroller.js')? "gamecontroller.js" : "vgcux.html";

	fileToServe=require("path").join(__dirname,fileToServe);

	fs.readFile(fileToServe, function(err, data){
		if(err)
		{
			response.writeHead(404);
			response.end("Not Found");
			return;
		}

		response.writeHead(200);
		response.end(data);
	});
}

//export the init function
exports.init=function(){
	//Create a server
	var server = http.createServer(handleRequest);

	//Start UX web server
	server.listen(HTTP_PORT, function(){
	    //Callback triggered when server is successfully listening. Hurray!
	    console.log("Server listening on: http://localhost:%s", HTTP_PORT);
	});

	//Start Socketio port for listening to virtual device commands.
	Cylon.api(
		  'socketio',
		  {
		    host: '0.0.0.0',
		    port: VGC_PORT
		  });
}



}());
