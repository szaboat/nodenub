var http = require('http');
var PORT = 9696;

var commands = {
  'g': 'http://www.google.com/search?q=%s',
  'so': 'http://stackoverflow.com/search?q=%s',
  'gim': 'http://images.google.com/images?q=%s',
  'flk': 'http://www.flickr.com/photos/search/text:%s'
}

http.createServer(function (req, res) {
  var sq = require('url').parse(req.url, true).query.cmd.split(' '),
      cmd = sq[0],
      cmd_url = sq.splice(1).join('%20');
      search_url = commands[cmd].replace(/%s/, cmd_url);

  console.log('You searched for ' + search_url);
  res.writeHead(302, {'Location': search_url});
  res.end();
}).listen(PORT, "127.0.0.1");

console.log('Running at ' + PORT);