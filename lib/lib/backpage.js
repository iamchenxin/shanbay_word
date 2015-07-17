/**
 * Created by z97 on 15-5-5.
 */
var data = require('sdk/self').data;
var pageWorker = require("sdk/page-worker").Page({
    contentScriptFile: [data.url('jquery/jquery-2.1.3.min.js'),data.url('jquery/jquery.cookie.js'),
        data.url('bpage.js')],
    contentURL: "http://d.qituc.com"
});

function getword(word,rev_fuc){
    pageWorker.port.emit("getword",word);
    func_on("revword",rev_fuc);
    console.log("i am in backpage.getword");
}

function voice_word(word){
    pageWorker.port.emit("voiceword",word);
    console.log("i am in backpage.voice_word");
}

function getuser(rev_fuc){
    pageWorker.port.emit("getuser");
    func_on("revuser",rev_fuc);
    console.log("i am in backpage.getuser");
}


var fuc_map =new Map();   // use map to convert multiple port.on(func) to single, because the temp function in javascipt is considered defer in each call
function func_on(str,func){
    if(fuc_map.get(str)==func){
        console.log("the same func "+str);
        console.log("type of func ,= "+typeof(func) );
    }else{
        if(fuc_map.has(str)==true){
            pageWorker.port.removeListener(str,fuc_map.get(str));
            console.log("remove pre func,->"+str+",func="+func);
            console.log("type of func ,= "+typeof(func) );
        }
        fuc_map.set(str,func);
        pageWorker.port.on(str,fuc_map.get(str));
    }
}

pageWorker.port.on("revuser",function(){
    console.log("port.on.revuser in file");
});

console.log('require("backpage")');

exports.getword=getword;
exports.getuser=getuser;
exports.voice_word=voice_word;
