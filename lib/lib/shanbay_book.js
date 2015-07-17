/**
 * Created by z97 on 15-6-4.
 */
/**
 * var add_vocabulary_ajax=    {
        "msg": "SUCCESS",
        "status_code": 0,
        "data": {
            "vocabulary": {
                "en_definitions": {"n": ["destruction by annihilating something", "total destruction"]},
                "uk_audio": "http://media.shanbay.com/audio/uk/annihilation.mp3",
                "conent_id": 40172,
                "cn_definition": {"pos": "", "defn": "n. 歼灭, 消灭, 湮灭"},
                "content_type": "vocabulary",
                "id": 40172,
                "definition": " n. 歼灭, 消灭, 湮灭",
                "content_id": 40172,
                "en_definition": {"pos": "n", "defn": "destruction by annihilating something; total destruction"},
                "object_id": 40172,
                "content": "annihilation",
                "pron": "әˏnaiә'leiʃәn",
                "pronunciation": "әˏnaiә'leiʃәn",
                "audio": "http://media.shanbay.com/audio/us/annihilation.mp3",
                "us_audio": "http://media.shanbay.com/audio/us/annihilation.mp3"
            }
        }
    }
 */
function sendto_plugin(msg){
    window.postMessage("i receive your msg","http://shanbay.com/");
}


function eventTo_plugin(type,msg){
    var event = new CustomEvent("sb", {
        detail: {
            type: type,
            data: msg
        }
    });
    window.dispatchEvent(event);
}

function event_revor(){
    window.addEventListener('xp', function (e) {
        var type = e.detail.type;
        var data = e.detail.data;
        switch (type){
            case "WORD":
                xxc_add_vocabulary(data);
                break;
            default :
                eventTo_plugin("DEF","b.even book.js to you["+data+"] : ");
                break;
        }
    }, false);
}

function xxc_listener(){
    window.addEventListener('message', function(event) {
        console.log(JSON.stringify(event));
        console.log(event.data);  // Message from content script
        console.dir(event);
        switch (event.data){
            case "test":
                eventTo_plugin("test:"+event.data);
                break;
            default :
                eventTo_plugin("book.js to you["+event.data+"] : ");
                break;
        }
//        xxc_add_vocabulary(event.data);
    }, false);
}

function xxc_add_vocabulary(word) {
    var url = '/api/v1/wordlist/vocabulary/';
    var vocabulary = word;
    var wordlist_id = $('#wordlist-id').html();
    if (wordlist_id.length > 0 && vocabulary.length > 0) {
        var data = {id: wordlist_id, word: vocabulary};
        $.post(url, data, function (res) {
            console.log(JSON.stringify(res));
            $('.alert').remove();
            $('.add-vocab-succeed').removeClass('add-vocab-succeed');
            if (res.status_code != 0) {
                $('#to_add_vocabulary').before("<p class='alert alert-error'>" + res.msg + "</p>");
                eventTo_plugin("ERROR",word);
            } else {
                var html = $('#vocab-entry').tmpl(res.data);
                $('table tbody').prepend(html);
                $('#to_add_vocabulary').val("");
                trigger_add_example_modal();
                trigger_edit_definition_modal();
                enable_delete_button();
                update_wordlist_num_vocab(1);
                eventTo_plugin("OK",word);
            }
        });
    }
}

function init(){
    event_revor();
    console.log("iam shanbay.js");
}

init();