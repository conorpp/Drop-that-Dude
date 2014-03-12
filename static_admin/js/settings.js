/*
    Settings file for allowing project to work in different environments.
    Only make different copies of this file.
    
    DEPLOYMENT
*/

var Settings = {
    /* server */
    host:'dropthatdude.com',
    command_port:15779,
    http_port:28319,
    redis_port:14177,
    canvasClient:21547,
    canvasSource:12578,
    audio_port:17293,
    width:320,
    height:240,
    logLevel:-1,
    home:[44.646875, -68.95869],
    ip:'184.173.103.51',
    udp_port:14408
    
};

try{
    exports.Settings = Settings;
}
catch(e){}
