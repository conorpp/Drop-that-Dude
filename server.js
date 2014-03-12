/* top level server entity.*/

/*  the globals.  Never overwrite these names.  */

C = require('./lib/colorLog'),    //globals
S = require('./static_admin/js/settings').Settings;
console.log('Starting up web server.  Here are settings ', S);
express = require('express'),
views = require('./views'),
db = require('./database'),
live = require('./live'),
//AudioServer = require('./audioServer'),
crypto = require('crypto'),
app = express();
SECRET = 'wow such secret.';
/******************************************/
require('./lib/funcs');
app.set('view engine','jade');

app.use(express.static('static_admin'));
app.use(express.cookieParser(SECRET));
app.use(express.bodyParser());

var debug = process.argv.indexOf('-debug');
if (debug != -1) 
  C.set({logLevel: process.argv[parseInt(debug)]});
else
  C.set({logLevel: 0});

C.log('Listening for http requests on ', S.http_port, {logLevel:1, color:'green', font:'bold'});
C.log('Listening for commands on ', S.command_port, {logLevel:1, color:'green', font:'bold'});
C.log('Redis connected to '+S.redis_port, {logLevel:1, color:'green', font:'bold'});
app.listen(S.http_port);
views.listen(app);

var fs = require('fs');

var settings = JSON.parse(fs.readFileSync('/home/ubuntu/web_apps/CORE/apps.json'));
var dsettings = settings['dropthatdude.com'];
console.log(settings, dsettings.command_port);
live.socket.listen(dsettings.command_port);
// console.log('redis is  ', settings.services);
live.redis.listen(settings.services.redis,'127.0.0.1');

db.listen(settings.services.redis, '127.0.0.1');
//Exit gracefully
var Terminal = require('child_process');
process.on('SIGINT', function() {
  //console.log('signal caught??');
 // Terminal.exec('./stop', function(err, stdout, stderr){
 //   console.log(err, stdout, stderr);
    process.exit();
 // });
});



