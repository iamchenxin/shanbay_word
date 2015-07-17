/**
 * Created by z97 on 15-4-9.
 */

var Request = require("sdk/request").Request;

var dicturl = 'http://w.x.com/' + 'lib/exe/ajax.php';

var webtab =require('./webtab');



function getPage(pageid,rev_func){
    var mdata=new Object();
    var url = dicturl;
    mdata['call']="ajaxpeon";

    mdata['target']="page";
    mdata['pageid']=pageid;
    var mheaders=new Object();

    mheaders['Cookie']="DW68700bfd16c2027de7de74a5a8202a6f=aWFtY2hlbnhpbg%3D%3D%7C1%7Cwl4GAeaRZLeJdtRlEOKoR%2BR3wvAYUwhbA4GKqm7I7fI%3D";

    var rq = Request({url:url,content:mdata,headers:mheaders,
        onComplete:function(rs){
        console.log("xnet! recived data");
        var content = rs.json.content;
        rev_func(content);
    }});
    console.log("my text -------->>>>");
    for (var headerName in rq.headers) {
        console.log(headerName + " : " + rq.headers[headerName]);
    }
    for (var Name in rq) {
        console.log(Name + " : " + rq[Name]);
    }
    console.log(rq.url);
    console.log(rq);
    console.log("my text <<<<<<<--------");
    rq.get();
    console.log("xnet! Request : "+pageid);
}

function getUser(rev_func){
    var mdata=new Object();
    var url = dicturl;
    mdata['call']="ajaxpeon";

    mdata['target']="user";
    var rq = Request({url:url,content:mdata,onComplete:function(rs){
        var content = rs.json.content;
        rev_func(content);
        console.dir("text : \n"+rs.text);
        console.dir("json : \n"+rs.json);
        console.dir("status : \n"+rs.status);
        console.dir("statusText : \n"+rs.statusText);
        console.dir("headers : \n"+rs.headers);
    }});
    rq.get();
}

function postTest(){
    var URL ="http://w.contstr.com/start?do=login";
    var data = "sectok=0f624ef0a79956cf32437d5c4db32c39&id=start&do=login&u=iamchenxin&p=td138pwiam";

    var rq = Request({url:URL,content:data,onComplete:function(rs){
        console.log("rev ~~~:"+URL);
        console.dir("text : \n"+rs.text);
        console.dir("json : \n"+rs.json);
        console.dir("status : \n"+rs.status);
        console.dir("statusText : \n"+rs.statusText);
        console.dir("headers : \n"+rs.headers);
    }});
    rq.post();
}

exports.getPage=getPage;
exports.getUser=getUser;
exports.postTest=postTest;