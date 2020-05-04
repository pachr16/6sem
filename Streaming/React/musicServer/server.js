const http = require('http');
const fileSystem = require('fs');
const express = require('express');
const path = require('path');
const app = express();

//database connection
const pg = require('pg');

const cors = require('cors');
app.use(cors());
app.options('*', cors());

const conString = "postgresql://uzbxyxyi:j7b-g-qv6fw30KkL0dAkN1CMrPMg1sPs@balarama.db.elephantsql.com:5432/uzbxyxyi" //Can be found in the Details page


app.use('/assets', express.static('assets/images'));

var server = http.createServer(app);

app.get('/metadata.json', function (req, res) {

  const db = new pg.Client(conString);
  console.log("Client has asked for metadata for this song: " + req);
  var resdata = [];

  db.connect(function (err) {
    if (err) {
      console.error('could not connect to postgres', err);
      res.status(504).send('Database connection error');
    } else {
      db.query(
        'SELECT songs.song_id, songs.title, songs.duration, songs.song_url, songs.size, albums.album_name, albums.art_url, artists.artist_name  FROM songs ' +
        'JOIN onalbum ON songs.song_id = onalbum.song_id ' +
        'JOIN albums ON onalbum.album_id = albums.album_id ' +
        'JOIN createdby ON onalbum.album_id = createdby.album_id ' +
        'JOIN artists ON  createdby.artist_id = artists.artist_id',
        (err, result) => {
          if (err) {
            res.status(500).send('Database query error')
            console.error('error running query', err);
          } else {

            test = result.rows.map((data) =>({              
                "songid": data.song_id+"",
                "title": data.title,
                "duration": data.duration,
                "song_url": data.song_url,
                "size": data.size,
                "album": data.album_name,
                "image_url": data.art_url,
                "artist": data.artist_name
              }));
            
            db.end();
            
            var testjson = JSON.stringify(test);
            res.json(testjson);
          }
        });
    }
  });
});


app.get('playSong', (req, res) => {
  console.log("Received request to stream this song: " + req.query.song);
  console.log("Requested segment is: " + req.query.segment);

  const filePath = path.resolve(__dirname, './assets', './music', req.query.song + '.mp3');
  console.log("Looking for file at: " + filePath);

  const stat = fileSystem.statSync(filePath, { bigint: true });   // we need the size to divide into segments in the same way as frontend

  const totalSegments = stat.size / 200000;   // 200 kb in each segment - like on frontend

  const readStream = fileSystem.createReadStream(filePath);   // is this the easiest way?
  

  // read stream
  // seperate to segments
  // find the specified segment
  // send it in the response

});


server.listen(2000, function () {
  //server.listen(process.env.PORT || '2000', function () {
  console.log('Server app listening on port 2000!');
});