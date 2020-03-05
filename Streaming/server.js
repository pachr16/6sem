var http = require('http'),
    fs   = require('fs'),
    filePath = __dirname + '/bensound-buddy.mp3',
    stat = fs.statSync(filePath);

http.createServer(function(request, response) {

    response.writeHead(200, {
        'Content-Type': 'audio/mpeg',
        'Content-Length': stat.size ,
        'Access-Control-Allow-Origin': '*'
    });

    // We replaced all the event handlers with a simple call to util.pump()
    fs.createReadStream(filePath).pipe(response);
})
.listen(2000);