/**
 * Created by z97 on 15-4-8.
 */

function addjs(){

    var book_js='<script id="xxc_as_js" type="text/javascript" charset="utf-8" src="http://s.qituc.com/shanbay_book.js"></script>';
    var jsnode = jQuery(book_js);
    console.log(jsnode.html());
    jQuery('head:first').append(jsnode);

}

function extract_allwords(txt){
    return txt.match(/[\w]+/g);
}

function addworkspace(){
    var spacetxt = '<div id="xxc_workspace">\
        <div id="xxc_top"></div>\
        <div id="xxc_main"><div id="xxc_mleft"></div><div id="xxc_mright"></div><div style="clear: both"></div></div>\
        <div id="xxc_footer"></div>\
        </div>';

    var myspace = jQuery(spacetxt);
    jQuery("body").append(myspace);
    jQuery(window).resize(function(){
        var client_w = jQuery( window ).width();
        var client_h = jQuery( window ).height();
        jQuery("#xxc_workspace").width(client_w);
        jQuery("#xxc_workspace").height(client_h);

    });
    jQuery(window).resize();
    return myspace;
}

function newui(){
    var myspace =addworkspace();


    var righth = jQuery("#xxc_mright").height()-100;

    var diatxt ='<div id="xxc_word_dia" title="Add Words"><textarea id="tx_words"></textarea>\
        <input type="button" value="Add words" name="addw" id="xxc_add_wbt">\
        <div id="xxc_word_error"></div><div id="xxc_word_ok"></div>\
        </div>';
    jQuery(diatxt).dialog({
        appendTo:'#xxc_mright',
        position: { my: "right bottom", at: "right bottom",of:'#xxc_mright'},
        height:righth
    });

    jQuery("#xxc_add_wbt").click(function(){
        xc_error_words=[];
        xc_ok_count=0;
        word_inx=0;
        var word_txt = jQuery("#tx_words").val();
        word_list =extract_allwords(word_txt);

        wordTo_page();
    });

    jQuery(".ui-dialog").css("pointer-events","auto");
}

function listener(){
    window.addEventListener('message', function(event) {
        console.log("webui listen:"+event.data);    // Message from page script
    }, false);
}




function sendto_page(msg){
    window.postMessage(msg, "http://shanbay.com/");
}

var xc_error_words=[];
var xc_ok_count=0;
var word_list=[];
var word_inx=0;

function event_revor(){
    window.addEventListener('sb', function (e) {
        var type = e.detail.type;
        var data = e.detail.data;
        switch (type){
            case "ERROR":
                if(word_inx<word_list.length){
                    wordTo_page();
                    xc_error_words.push(data);
                }
                break;
            case "OK":
                if(word_inx<word_list.length){
                    wordTo_page();
                    xc_ok_count++;
                }
                break;
            default :
                console.log(type+"data="+data);
                break;
        }

        jQuery("#xxc_word_error").html(xc_error_words.join(","));
        jQuery("#xxc_word_ok").html("success words : "+(xc_ok_count+1));

    }, false);
}

function wordTo_page(){
    if(word_inx<word_list.length){
        eventTo_page("WORD",word_list[word_inx]);
        word_inx++;
    }else{
        console.log("wordlist end!!"+word_inx);
    }
}

function eventTo_page(type,msg){
    var detail = {
        type : type,
        data : msg
    };
    var cloned = cloneInto(detail, document.defaultView);
    var event = new CustomEvent("xp", {
        detail: cloned
    });
    window.dispatchEvent(event);
}





function init(){
    jQuery(addjs);
    newui();
    jQuery(event_revor);
//    init_mxyd_voice();
}

init();