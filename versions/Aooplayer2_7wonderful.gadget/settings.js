﻿var GetAT;var q,acces_token=System.Gadget.Settings.readString("token"),aoo_user_id=System.Gadget.Settings.readString("aoo_user_id"),aoo_user_first_name=System.Gadget.Settings.readString("acces_token"),aoo_user_last_name=System.Gadget.Settings.readString("aoo_user_last_name"),aoo_user_img=System.Gadget.Settings.readString("aoo_user_img"),broadcast=System.Gadget.Settings.readString("broadcast"),acces_token_v;
function openWin(FrURL){if(IE=new ActiveXObject("InternetExplorer.Application")){IE.Height=500;IE.Width=450;IE.AddressBar=true;IE.MenuBar=false;IE.ToolBar=false;IE.StatusBar=false;IE.Visible=true;IE.Navigate(FrURL)}}
function settingsClosing(event){System.Gadget.Settings.writeString("lastfm_token",lastfm.token);System.Gadget.Settings.writeString("lastfm_sk",lastfm.sk);System.Gadget.Settings.writeString("lastfm_name",lastfm.name);System.Gadget.Settings.writeString("lastfm_subscribe",lastfm.subscribe);System.Gadget.Settings.writeString("token",acces_token);System.Gadget.Settings.writeString("aoo_user_id",aoo_user_id);System.Gadget.Settings.writeString("aoo_user_first_name",aoo_user_first_name);System.Gadget.Settings.writeString("aoo_user_last_name",
    aoo_user_last_name);System.Gadget.Settings.writeString("aoo_user_img",aoo_user_img);System.Gadget.Settings.writeString("broadcast",broadcast);if(event.closeAction==event.Action.commit){$(".error").removeClass("error");if(!event.cancel);}}
function main(){checkUpdates();acces_token_v="access_token="+acces_token;if(acces_token!=""&&typeof acces_token!="undefined"){$("#login .switch").removeClass("off");get_i("users.get",acces_token_v+"&fields=first_name,last_name,nickname,photo_medium_rec&uids="+aoo_user_id)}else{$("#login .switch").addClass("off");$("#name").html("");$("#userphoto").html("")}if(lastfm.sk==""||typeof lastfm.sk=="undefined"){$("#lastfm .switch").addClass("off");$("#lastfm_name").html("")}else{$("#lastfm .switch").removeClass("off");
    $("#lastfm_name").html(lastfm.name)}if(broadcast=="true")$("#broadcast .switch").removeClass("off");else $("#broadcast .switch").addClass("off");System.Gadget.onSettingsClosing=settingsClosing}
function logout(){FrURL="http://vk.com/";var IE4;if(IE4=new ActiveXObject("InternetExplorer.Application")){IE4.Height=190;IE4.Width=620;IE4.AddressBar=true;IE4.MenuBar=false;IE4.ToolBar=false;IE4.StatusBar=false;IE4.Navigate(FrURL);IE4.Visible=false}FrURL="http://login.vk.com/?act=logout&from_host=api.vk.com";if(IE5=new ActiveXObject("InternetExplorer.Application")){IE5.Height=190;IE5.Width=620;IE5.AddressBar=true;IE5.MenuBar=false;IE5.ToolBar=false;IE5.StatusBar=false;IE5.Navigate(FrURL);IE5.Visible=
    false;if("Quit"in IE5){while(IE5.readystate!==4)if(IE5.readystate==4)break;IE5.Quit();delete IE5}if("Quit"in IE4){while(IE4.readystate!==4)if(IE4.readystate==4)break;IE4.Quit();delete IE4}return true}}
function loginLast(){if(lastfm.sk==""||typeof lastfm.sk=="undefined"){get_i("getToken","format=json&method=auth.gettoken&api_key="+lastfm.apikey);var ansv=undefined;while(ansv==undefined){ansv=confirm("\u041f\u043e\u0434\u0442\u0432\u0435\u0440\u0434\u0438\u0442\u0435 \u0434\u043e\u0441\u0442\u0443\u043f Aoo!Player \u043a \u0432\u0430\u0448\u0435\u043c\u0443 \u0430\u043a\u043a\u0430\u0443\u043d\u0442\u0443 \u0432 \u043e\u0442\u043a\u0440\u044b\u0432\u0448\u0435\u043c\u0441\u044f \u043e\u043a\u043d\u0435 \u0441\u0435\u0440\u0432\u0438\u0441\u0430 LastFM.");if(ansv){var post=
{method:"auth.getSession",token:lastfm.token,api_key:lastfm.apikey};var rest={format:"json",method:"auth.getSession",token:lastfm.token,api_key:lastfm.apikey,api_sig:lastfm.getsig(post)};get_i("getSession",lastfm.getreq(rest))}}}else{$("#lastfm .switch").addClass("off");lastfm.sk="";$("#lastfm_name").html("")}}
function login(){if(acces_token==""||typeof acces_token=="undefined"){FrURL="http://oauth.vk.com/authorize?client_id=2463163&scope=audio,wall,status,offline&redirect_uri=http://oauth.vk.com/blank.html&display=popup&response_type=token";if(IE0=new ActiveXObject("InternetExplorer.Application")){IE0.Height=190;IE0.Width=620;IE0.Visible=false;if(IE=new ActiveXObject("InternetExplorer.Application")){IE.Height=500;IE.Width=450;IE.AddressBar=false;IE.MenuBar=false;IE.ToolBar=false;IE.StatusBar=false;IE.Visible=
    true;IE.Navigate(FrURL);var GetAT="";var Login_error="";var ansv=undefined;while(ansv==undefined){ansv=confirm("\u041f\u043e\u0434\u0442\u0432\u0435\u0440\u0434\u0438\u0442\u0435 \u0434\u043e\u0441\u0442\u0443\u043f Aoo!Player \u043a \u0432\u0430\u0448\u0435\u043c\u0443 \u0430\u043a\u043a\u0430\u0443\u043d\u0442\u0443 \u0432 \u043e\u0442\u043a\u0440\u044b\u0432\u0448\u0435\u043c\u0441\u044f \u043e\u043a\u043d\u0435 vk.com, \u0414\u043e\u0436\u0434\u0438\u0442\u0435\u0441\u044c \u043d\u0430\u0434\u043f\u0438\u0441\u0438 'Login success', \u0438 \u0442\u043e\u043b\u044c\u043a\u043e \u0417\u0410\u0422\u0415\u041c \u043d\u0430\u0436\u043c\u0438\u0442\u0435 \u043a\u043d\u043e\u043f\u043a\u0443 OK. \u0416\u0435\u043b\u0430\u0435\u043c \u043f\u0440\u0438\u044f\u0442\u043d\u043e\u0433\u043e \u043f\u0440\u043e\u0441\u043b\u0443\u0448\u0438\u0432\u0430\u043d\u0438\u044f:)");
    if(ansv)while(GetAT==""||GetAT==FrURL||IE.Visible==true||Login_error==""){if("LocationURL"in IE)if(IE.LocationURL==undefined){HmURL="http://aooplayer.com/welcome.php";IE0.Navigate(HmURL)}var GetLoc=IE.LocationURL;GetAT=GetLoc.substring(GetLoc.indexOf("#")+1);var q=$.parseQuery(GetAT);if(q.redirect_uri!==undefined);if(q.error!==undefined){Login_error=q.error;HmURL="http://aooplayer.com/welcome.php";IE0.Navigate(HmURL)}if(q.access_token!==undefined&&q.acces_token!==null&&q.acces_token!==""){acces_token=
        q.access_token;aoo_user_id=q.user_id;acces_token_v="access_token="+acces_token;System.Gadget.Settings.writeString("token",acces_token);HmURL="http://aooplayer.com/welcome.php?id="+aoo_user_id;IE0.Navigate(HmURL);get_i("users.get",acces_token_v+"&fields=first_name,last_name,nickname,photo_medium_rec&uids="+aoo_user_id);if("Quit"in IE){while(IE.readystate!==4)if(IE.readystate==4)break;IE.Quit();delete IE}if("Quit"in IE0){while(IE0.readystate!==4)if(IE0.readystate==4)break;IE0.Quit();delete IE0}return true}}}}}if("Quit"in
    IE){while(IE.readystate!==4)if(IE.readystate==4)break;IE.Quit();delete IE}if("Quit"in IE0){while(IE0.readystate!==4)if(IE0.readystate==4)break;IE0.Quit();delete IE0}return false}else{$("#login .switch").addClass("off");$("#name").html("");$("#userphoto").html("");get_i("logout","");FullClearCookie();acces_token="";aoo_user_id=0;aoo_user_first_name="";aoo_user_last_name="";aoo_user_img="";acces_token_v="";System.Gadget.Settings.writeString("token",acces_token);System.Gadget.Settings.writeString("aoo_user_id",
    aoo_user_id);System.Gadget.Settings.writeString("aoo_user_first_name",aoo_user_first_name);System.Gadget.Settings.writeString("aoo_user_last_name",aoo_user_last_name);System.Gadget.Settings.writeString("aoo_user_img",aoo_user_img);System.Gadget.Settings.writeString("broadcast","");logout()}}
function user(){var FrURL="http://vk.com/";if(IE6=new ActiveXObject("InternetExplorer.Application")){IE6.Height=500;IE6.Width=450;IE6.AddressBar=true;IE6.MenuBar=true;IE6.ToolBar=true;IE6.StatusBar=true;IE6.Navigate(FrURL);IE6.Visible=true}return false}
function get_i(type,data){function get_list(){if(req.readyState==4)if(req.status==200){var i=0;switch(type){case "getToken":var response=new $.parseJSON(req.responseText);lastfm.token=response.token;openWin("http://www.lastfm.ru/api/auth?api_key=ce26d7718861e7a6b81e5a398a161b48&token="+lastfm.token);break;case "getSession":var response=new $.parseJSON(req.responseText);if(typeof response.error!="undefined"){alert("OOOPS!! error #"+response.error+"."+response.message+". Please log in again");$("#lastfm .switch").addClass("off")}else{lastfm.sk=
    response.session.key;lastfm.name=response.session.name;lastfm.subscribe=response.session.subscribe;$("#lastfm .switch").removeClass("off");$("#lastfm_name").html(lastfm.name)}break;case "track.scrobble":qi=new $.parseJSON(req.responseText);break;case "users.get":qi=new $.parseJSON(req.responseText);if(qi.error!==undefined){$("#login .switch").addClass("off");$("#name").html("");$("#userphoto").html("");acces_token=""}else{$("#login .switch").removeClass("off");$("#name").html(qi.response[0].first_name+
    " "+qi.response[0].last_name);$("#userphoto").html('<img id="user" src="'+qi.response[0].photo_medium_rec+'">');aoo_user_first_name=qi.response[0].first_name;aoo_user_last_name=qi.response[0].last_name;aoo_user_img='<img id="user" src="'+qi.response[0].photo_medium_rec+'">'}break;case "logout":qi=new $.parseJSON(req.responseText);acces_token="";aoo_user_id=0;aoo_user_first_name="";aoo_user_last_name="";aoo_user_img="";acces_token_v="";System.Gadget.Settings.writeString("token",acces_token);System.Gadget.Settings.writeString("aoo_user_id",
    aoo_user_id);System.Gadget.Settings.writeString("aoo_user_first_name",aoo_user_first_name);System.Gadget.Settings.writeString("aoo_user_last_name",aoo_user_last_name);System.Gadget.Settings.writeString("aoo_user_img",aoo_user_img);System.Gadget.Settings.writeString("broadcast","");break}}}GETPOST="GET";switch(type){case "getToken":url="http://ws.audioscrobbler.com/2.0/";break;case "getSession":url="http://ws.audioscrobbler.com/2.0/";break;case "track.scrobble":url="http://ws.audioscrobbler.com/2.0/";
    GETPOST="POST";break;case "users.get":url="https://api.vk.com/method/users.get";break;case "logout":url="http://api.vk.com/oauth/logout";break}var req=new XMLHttpRequest;if(GETPOST=="POST")req.open(GETPOST,url,true);else req.open("GET",url+"?"+data,true);req.setRequestHeader("If-Modified-Since","Sat, 1 Jan 2000 00:00:00 GMT");req.setRequestHeader("Content-Type","application/x-www-form-urlencoded");req.setRequestHeader("Content-Length",data.length);req.send(data);req.onreadystatechange=get_list}
function DelCookie(name){document.cookie=name+"="+";       path=/; expires=Mon, 02-Jan-2005 00:00:00 GMT"}function strpos(haystack,needle,offset){var i=haystack.indexOf(needle,offset);return i>=0?i:false}
function FullClearCookie(){allcoockies=document.cookie.substring(0,document.cookie.length)+";";while(allcoockies){var spos=strpos(allcoockies,";",0);var val=allcoockies.substr(0,spos);allcoockies=allcoockies.substr(spos+2,allcoockies.length);coockie_param=val.substr(0,strpos(val,"=",0));if(coockie_param.toUpperCase()!="PHPSESSID")DelCookie(coockie_param)}}
$(document).ready(function(){main();document.getElementById("login").onclick=function(){login()};document.getElementById("lastfm").onclick=function(){loginLast();return false};document.getElementById("broadcast").onclick=function(){if(broadcast=="true"){$("#broadcast .switch").addClass("off");broadcast="false"}else{$("#broadcast .switch").removeClass("off");broadcast="true"}return false};document.getElementById("userphoto").onclick=function(){var eventsWindow=window.open("http://vk.com/","blank",
    "width=1000,height=600");eventsWindow.onload;return false}});
function getURL(u){function get_v(){if(xmlReq.readyState==4)if(xmlReq.status==200){var urlData=null;urlData=xmlReq.responseText;if(urlData===false)return false;var version="2.7";var a=parseFloat(version);var b=parseFloat(urlData);if(b>a){document.getElementById("upd").innerHTML='<a style="line-height: 15px;" localize="aboutNext,href:aboutHref,title:aboutTitle" href="http://aooplayer.com/"><img src="http://aooplayer.com/icon.png" alt="">Download new<br> Aoo!Player </a>';return true}else{document.getElementById("upd").innerHTML=
    '<p><a localize="about,href:aboutHref,title:aboutTitle" href="http://aooplayer.com/"><img src="/icon.png" alt="">Aoo!Player</a></p>';return false}}return true}var xmlReq=new XMLHttpRequest;xmlReq.open("GET",u,true);xmlReq.setRequestHeader("If-Modified-Since","Sat, 1 Jan 2000 00:00:00 GMT");xmlReq.onreadystatechange=get_v;xmlReq.send(null)}function checkUpdates(){getURL("http://aooplayer.com/version.php")}
$.parseQuery=function(qs,options){var q=typeof qs==="string"?qs:window.location.search,o={"f":function(v){return unescape(v).replace(/\+/g," ")}},options=typeof qs==="object"&&typeof options===undefined?qs:options,o=$.extend({},o,options),params={};$.each(q.match(/^\??(.*)$/)[1].split("&"),function(i,p){p=p.split("=");p[1]=o.f(p[1]);params[p[0]]=params[p[0]]?params[p[0]]instanceof Array?(params[p[0]].push(p[1]),params[p[0]]):[params[p[0]],p[1]]:p[1]});return params};