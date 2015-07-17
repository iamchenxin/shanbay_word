/**
 * Created by z97 on 15-4-9.
 */
var tabs = require("sdk/tabs");
var self = require("sdk/self");
var data = require('sdk/self').data;
var { attach, detach } = require('sdk/content/mod');
var { Style } = require('sdk/stylesheet/style');
//var xnet =require('./xnet');
var panel=require('./menupanel');

var tabcss =Style({uri:data.url('webui.css')});
var juicss = Style({uri:data.url('jquery/jquery-ui.css')});

var backpage =require("./backpage");

var worker_map= new WeakMap();

tabs.on("ready", function(tab) {
    var tab_worker =tab.attach({
        contentScriptFile: [data.url('jquery/jquery-2.1.3.min.js'),data.url('jquery/jquery-ui.min.js'),data.url('jquery/jquery.cookie.js'),
            data.url('webui.js')],
    });
    attach(tabcss, tab);
    attach(juicss, tab);

    worker_map.set(tab,tab_worker);


    tab_worker.port.on("getpage",function(pageid){

        console.log("webtab! call backpage.getword,pageid="+pageid);
        backpage.getword(pageid,function(txt){
            console.log("webtab! emit(getpage)");
            tab_worker.port.emit("revpage",txt);
        });

    });

    tab_worker.port.on("voiceword",function(word){
        backpage.voice_word(word);
    });

    tab_worker.port.on("dragstop",function(ps){
        console.log("dragstop,ps="+ps.left);
        panel.get_panel_e().show( {position:{
            top: ps.top+50,left:ps.left
        } });
    });

});
tabs.on("close",function(tab){
    worker_map.delete(tab);
});

function current_worker(){
    return worker_map.get(tabs.activeTab);
}

exports.worker_map=worker_map;
exports.current_worker=current_worker;

