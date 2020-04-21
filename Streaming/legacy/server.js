const http = require('http');
const fileSystem = require('fs');
const express = require('express');
const ss = require('socket.io-stream');
const path = require('path');
const app = express();



//database connection
const pg = require('pg');
//or native libpq bindings
//var pg = require('pg').native

const conString = "postgresql://uzbxyxyi:j7b-g-qv6fw30KkL0dAkN1CMrPMg1sPs@balarama.db.elephantsql.com:5432/uzbxyxyi" //Can be found in the Details page
const client = new pg.Client(conString);
// client.connect(function(err) {
//   if(err) {
//     return console.error('could not connect to postgres', err);
//   }
//   client.query('SELECT * from users', function(err, result) {
//     if(err) {
//       return console.error('error running query', err);
//     }
//     console.log(result);
//     // >> output: 2018-08-23T14:02:57.117Z
//     client.end();
//   });
// });

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
//getMetaData().then((data) => console.log(data));
var test = getMetaData();
console.log(test);

var server = http.createServer(app);
var io = require('socket.io').listen(server);

app.get('/test', function (req, res) {
  console.log("get method activate!")
});

/*
io.on('error', (error) => {
  console.log(error);
});
*/

io.on('connection', client => {
  ss(client).on('getSong', (data, stream) => {
    console.log("received " + data + " from client");

    const filePath = path.resolve(__dirname, './html', './assets', './music', data + '.wav');
    console.log("Looking for file at: " + filePath);

    const stat = fileSystem.statSync(filePath, { bigint: true });
    console.log("Filesize: " + stat.size);

    const readStream = fileSystem.createReadStream(filePath);

    //const stream = ss.createStream();
    readStream.pipe(stream);

    //ss(client).emit('songStream', stream, { stat });


    //stream.destroy();   //maybe????
  });

  console.log('a user connected');
  ss(client).on('disconnect', function () {
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
server.listen(2000, function () {
  //server.listen(process.env.PORT || '2000', function () {
  console.log('Server app listening on port 2000!');
});



function getMetaData() {

  var test = [];

  return (

    client.connect(function (err) {
      if (err) {
        return console.error('could not connect to postgres', err);
      }
      client.query(
        'SELECT songs.title, songs.duration, songs.song_url, songs.size, albums.album_name, albums.art_url, artists.artist_name  FROM songs ' +
        'JOIN onalbum ON songs.song_id = onalbum.song_id ' +
        'JOIN albums ON onalbum.album_id = albums.album_id ' +
        'JOIN createdby ON onalbum.album_id = createdby.album_id ' +
        'JOIN artists ON  createdby.artist_id = artists.artist_id',
        function (err, result) {
          if (err) {
            return console.error('error running query', err);
          }
          test = result.rows;
          // >> output: 2018-08-23T14:02:57.117Z
          client.end();

          //changes the image url a read file of the image
          var ret = (test.map((data) => {
            data.art_url = fileSystem.readFile(path.resolve(__dirname, './html', './assets', './images', data.art_url), (err, fileData) => {
              if (err) {
                console.log(err);
                return null;
              } else {
                console.log(fileData)
                return fileData;
              }
            });
            return data;
          })
          );
          console.log(ret)

          return  ret;

        });

    }

    ))
}






//mere opdelt:




function getImageContext(imageURL){
var imagaedata = fileSystem.readFile(path.resolve(__dirname, './html', './assets', './images', data.art_url), (err, fileData) => {
  if (err) {
    console.log(err);
    return null;
  } else {
    //console.log(fileData)
    return fileData;
  }
});

}
//console.log(typeof getImageContext);