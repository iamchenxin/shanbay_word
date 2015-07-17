/**
 * Created by z97 on 15-6-12.
 */
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

var tervalId=null;

function newui(){
    var myspace =addworkspace();


    var righth = jQuery("#xxc_mright").height()-100;

    var diatxt ='<div id="xxc_word_dia" title="Add Words"><textarea id="tx_words"></textarea>\
        <input type="button" value="Add words" name="addw" id="xxc_add_wbt">\
        <input type="button" value="Stop" name="stop" id="xxc_stop">\
        <div id="xxc_word_error"></div><div id="xxc_word_ok"></div>\
        </div>';
    jQuery(diatxt).dialog({
        appendTo:'#xxc_mright',
        position: { my: "right bottom", at: "right bottom",of:'#xxc_mright'},
        height:righth
    });

    jQuery("#xxc_add_wbt").click(function(){

        var word_txt = jQuery("#tx_words").val();
        var word_list =extract_allwords(word_txt);

        var span=10;
        var w_length=parseInt(word_list.length/span);

        var i=0;
        var call_ob=this;
        jQuery(this).hide();

        tervalId= window.setInterval(function(){
            if(i<w_length){
                var send_w = word_list.slice(i*span,(i+1)*span).join("\n");
                i++;
                jQuery("#add-learnings-form textarea").val(send_w);
                jQuery("#add-learnings-form input").click();
                jQuery("#xxc_word_ok").html("add words = "+i*span);
            }else{
                window.clearInterval(tervalId);
                var send_w = word_list.slice(i*span).join("\n");
                jQuery("#add-learnings-form textarea").val(send_w);
                jQuery("#add-learnings-form input").click();
                jQuery("#xxc_word_ok").html("End! add words = "+word_list.length);
                jQuery("#xxc_add_wbt").show();
            }
        },1500);
    });

    jQuery('#xxc_stop').click(function(){
        window.clearInterval(tervalId);
        jQuery("#xxc_add_wbt").show();
    });

    jQuery(".ui-dialog").css("pointer-events","auto");
}

function init(){

    newui();

//    init_mxyd_voice();
}

init();