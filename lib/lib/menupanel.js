/**
 * Created by z97 on 15-4-8.
 */
var { ToggleButton } = require('sdk/ui/button/toggle');
var panels = require("sdk/panel");
var self = require("sdk/self");
var data = require('sdk/self').data;

console.log("menu panel ~");
function showcook(){
    var {Cu} = require("chrome");
//    var {Ci} = require("chrome");// ci = Components.interfaces
    const {Ci} = require("chrome");
    Cu.import("resource://gre/modules/Services.jsm");

    var cookies =Services.cookies.enumerator;
    while (cookies.hasMoreElements())
    {
        var cookie = cookies.getNext().QueryInterface(Ci.nsICookie2);
        if(cookie.rawHost=="e.qituc.com"){
            console.log(cookie);
        }else{
            console.log(cookie.rawHost);
        }

    }
}

function mysound(){
    console.log("mysound");
    const {Cc,Ci} = require("chrome");
    var sound = Cc["@mozilla.org/sound;1"].createInstance(Ci.nsISound);
    sound.init();
    sound.beep();
    sound.play("http://dict.youdao.com/dictvoice?audio=hello&type=1");
}


function init(){
    var button = ToggleButton({
        id: "mybutton",
        label: "show a panel",
        icon: {
            "16": "./images/icon-16.png",
            "32": "./images/icon-32.png",
            "64": "./images/icon-64.png"
        },
        onChange: handleChange
    });



    var panel = panels.Panel({
        contentURL: self.data.url("ctpanel.html"),
        contentScriptWhen: 'ready',
        contentScriptFile: [data.url('jquery/jquery-2.1.3.min.js'),data.url('jquery/jquery-ui.min.js'),data.url('jquery/jquery.cookie.js'),
            data.url('ctpanel.js')],
        onHide: handleHide
    });
    function handleChange(state) {
        if (state.checked) {
            panel.show({
                position: button
            });
        }
    }
    function handleHide() {
        button.state('window', {checked: false});
    }



    panel.port.on("test", function (){
        xnet.postTest();
    });

}



var tv =10;
exports.init =init;
exports.ev =20;
