var { ToggleButton } = require('sdk/ui/button/toggle');
var Request = require("sdk/request").Request;
var panels = require("sdk/panel");
var self = require("sdk/self");
var data = require('sdk/self').data;
var tabs = require("sdk/tabs");
var { attach, detach } = require('sdk/content/mod');
var { Style } = require('sdk/stylesheet/style');


var tabcss =Style({uri:data.url('webui.css')});

var mpanel = require('./menupanel');
mpanel.init();

var webtab =require('./webtab');

console.log("1st webtab.current_worker="+webtab.current_worker());

var bpage =require('./backpage');