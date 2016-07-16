const express = require('express');
const PORT = process.env.PORT || 3000;
const WebSocketServer = require('ws').Server;
const path = require('path');
const INDEX = path.join(__dirname, 'index.html');
const server = express()
	.use((req, res) => res.sendFile(INDEX) )
  	.listen(PORT, () => console.log(`Listening on ${ PORT }`));



const wss = new WebSocketServer({server});
var messages = [];
wss.on('connection', function(ws){
	messages.forEach(function(message){
		ws.send(message);
	});
	ws.on('message', function(message){
		messages.push(message);
		console.log('Message Received: %s', message);
		wss.clients.forEach(function(conn){
			conn.send(message);
		});
	});
});

