var http = require('http');
var commands = require('./commands.js').commands;
var port = process.env.PORT || 6969;

http.createServer(function (req, res) {
  try {
    var sq = require('url').parse(req.url, true).query.cmd.split(' '),
        cmd = sq[0],
        cmd_url = sq.splice(1).join('%20');
        search_url = commands[cmd].replace(/%s/, cmd_url);

  } catch (err) {
    res.writeHead(400);
    res.end();
  }

  console.log('search_url ' + search_url);

  res.writeHead(302, {'Location': search_url});
  res.end();
}).listen(port, "0.0.0.0");
