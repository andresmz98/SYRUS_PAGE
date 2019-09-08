// jshint esversion: 6

const dgram = require('dgram');
const express = require('express');
const decodSyrus = require('./decodSyrus.js');
const IP_ADRESS = '192.168.0.16';
const UDP_PORT = '9000';
const TCP_PORT = 8000;

const server = dgram.createSocket('udp4');
const app = express();
let syrusMessage;

server.on('error', (err) => {
  console.log(`server error:\n${err.stack}`);
  server.close();
});

server.on('message', (msg, rinfo) => {
  console.log(`server got: ${msg} from ${rinfo.address}:${rinfo.port}`);
  syrusMessage = decodSyrus.decode(msg);
});

server.on('listening', () => {
  const address = server.address();
  console.log(`server listening ${address.address}:${address.port}`);
});

server.bind(UDP_PORT, IP_ADRESS);

app.use(express.static('Public'));

app.get('/', function(request, response){
  response.sendFile(__dirname + '/index.html');
});

app.get('/Appdata',function(request,response){
    response.json(syrusMessage);
});

app.listen(TCP_PORT, function(){
  console.log('Server started at port ' + TCP_PORT.toString());
});