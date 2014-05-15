var http = require('http');
var url = require('url');
var commands = require('./commands.js').commands;

this.server = http.createServer(function (req, res) {
  var searchUrl = '';
  try {
    var sq = url.parse(req.url, true).query.cmd.split(' '),
        cmd = sq[0],
        cmd_url = sq.splice(1).join('%20');
    searchUrl = commands[cmd].replace(/%s/, cmd_url);
  } catch (err) {
    res.writeHead(400);
    res.end();
  }

  console.log('search_url ' + searchUrl);

  res.writeHead(302, {'Location': searchUrl});
  res.end(req.method + " " + req.url);
});

exports.listen = function() {
  this.server.listen.apply(this.server, arguments);
};

exports.close = function() {
 this.server.close();
};
