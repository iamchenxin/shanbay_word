/**
 * Created by z97 on 15-6-4.
 */
// Import the page-mod API
var pageMod = require("sdk/page-mod");
var self = require("sdk/self");
var data = require('sdk/self').data;

// Create a page mod
// It will run a script whenever a ".org" URL is loaded
// The script replaces the page contents with a message
pageMod.PageMod({
    include: "http://shanbay.com/wordlist/*",
    contentScriptFile: [data.url('jquery/jquery-2.1.3.min.js'),data.url('jquery/jquery-ui.min.js'),data.url('jquery/jquery.cookie.js'),
        data.url('webui.js')],
    contentStyleFile: ["./webui.css",'./jquery/jquery-ui.css']
});

pageMod.PageMod({
    include: "http://shanbay.com/bdc/vocabulary/add/*",
    contentScriptFile: [data.url('jquery/jquery-2.1.3.min.js'),data.url('jquery/jquery-ui.min.js'),data.url('jquery/jquery.cookie.js'),
        data.url('webui2.js')],
    contentStyleFile: ["./webui.css",'./jquery/jquery-ui.css']
});



console.log("pagemod~");