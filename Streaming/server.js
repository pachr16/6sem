const http = require('http');
const fileSystem = require('fs');
const express = require('express');
const ss = require('socket.io-stream');
const path = require('path');
const app = express();
//const api = express();

/* api.get('/getTrack', (req, res, err) => {
  // generate file path
  const filePath = path.resolve(__dirname, './html', './assets/music/', req.query.songName + '.mp3');
  // get file size info
  const stat = fileSystem.statSync(filePath);

  // set response header info
  res.writeHead(200, {
    'Content-Type': 'audio/mpeg',
    'Content-Length': stat.size
  });
  //create read stream
  const readStream = fileSystem.createReadStream(filePath);
  // attach this stream with response stream
  readStream.pipe(res);
}); */

//register api calls
//app.use('/api/v1/', api);

/* send react app on / GET
app.use(express.static(path.resolve(__dirname, './public/build/')));
app.use(express.static(path.resolve(__dirname, './public/assets/')));
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, './public/build/', './index.html'));
});
*/

var server = http.createServer(app);
var io = require('socket.io')(server);

app.get('/test', function(req,res){
  console.log("get metod activate!")
})

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});
/*
io.on('connection', client => {

  const stream = ss.createStream();

  client.on('getTrack', () => {
    console.log("Server: getTrack entered");
    console.log(req.query.sonName);
    const filePath = path.resolve(__dirname, './html','./assets/music/', req.query.songName + '.mp3');
    const stat = fileSystem.statSync(filePath);
    const readStream = fileSystem.createReadStream(filePath);
    // pipe stream with response stream
    readStream.pipe(stream);

    ss(client).emit('track-stream', stream, { stat });
  });
  client.on('disconnect', () => {});
});
*/
server.listen(2000, function(){
//server.listen(process.env.PORT || '2000', function () {
  console.log('Server app listening on port 2000!');
});