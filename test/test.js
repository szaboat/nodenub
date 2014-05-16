var tap = require("tap"),
    nodenub = require("../nodenub.js"),
    PORT = 4242,
    server,
    http = require('http'),
    test = tap.test;

test('setup', function(t) {
  server = nodenub.server;
  server.listen(PORT, function() {
    t.pass('server listening');
    t.end();
  });
});

test('command g redirects to google', function(t) {
  var options = {
    hostname: 'localhost',
    port: PORT,
    path: '/?cmd=g+foobar',
    method: 'GET'
  };

  var req = http.request(options, function(res) {
     t.equal(res.statusCode, 302);
     res.on('data', function (chunk) {
       t.end();
     });
  }).end();
});

test('teardown', function(t) {
  server.close(function() {
    t.pass('server closed');
    t.end();
  });
});
