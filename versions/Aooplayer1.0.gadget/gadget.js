/* Иди нахуй злостный урод, взламывающий чужой код!
   Добро пожаловать в обитель радости и сверхлогичных решений добрый молодец, решивший усовершенствовать данный продукт*/
var token = '';
var acces_token = 0;
var aoo_user_id = 0;
var aoolist = new Object();
var aoolist_active = 0;
var aoolist_length = 0;
var aoolist_active_num = 1;
var aoo_playlist = '';
var current_slide = 0;
var big_slider_show = null;
var get_big_slider_info = null;
var id_info_script=null;
var slides = null;
var WMState = new Array();
WMState[0] = "Yea, baby, click Play or Settings";
WMState[1] = "Why Stopped? Click Play!";
WMState[2] = "Why Paused? Click Play!";
WMState[3] = "Baby,I'm Playing for you!";
WMState[4] = "Scan Forward";
WMState[5] = "Scan Reverse";
WMState[6] = "Waiting, baby, music is buffering...";
WMState[7] = "Waiting, baby, waiting...";
WMState[8] = "Media Ended";
WMState[9] = "Waiting, baby, I Connecting...";
WMState[10] = "Yea, baby, Ready!";
WMState[11] = "Waiting, baby, I Reconnecting";
function init() {

var player = new Object();
player = document.getElementById("player");


document.getElementById("status").innerHTML = 'Login and play';
document.getElementById("track").innerHTML = 'Loading...';

System.Gadget.settingsUI = 'settings.html';
//	initFlyout();
//	showInfo();

var background = $('#background').get(0);
$('.sections').hide();

System.Gadget.onDock = dockStateChanged;
System.Gadget.onUndock = dockStateChanged;
dockStateChanged();
System.Gadget.Settings.writeString('token', token);
main();
System.Gadget.onSettingsClosed = function() {
   main();
   getinfo();
};
stop();
}

// ParseQuery
	jQuery.parseQuery = function (qs, options) {
		var q = (typeof qs === 'string' ? qs : window.location.search),
			o = {
				'f': function (v) {
					return unescape(v).replace(/\+/g, ' ');
				}
			},
			options = (typeof qs === 'object' && typeof options === 'undefined') ? qs : options,
			o = jQuery.extend({}, o, options),
			params = {};
		jQuery.each(q.match(/^\??(.*)$/)[1].split('&'), function (i, p) {
			p = p.split('=');
			p[1] = o.f(p[1]);
			params[p[0]] = params[p[0]] ? ((params[p[0]] instanceof Array) ? (params[p[0]].push(p[1]), params[p[0]]) : [params[p[0]], p[1]]) : p[1];
		});
		return params;
	};
// ParseQuery


function Stringify(jsonData) {
	    var strJsonData = '{';
	    var itemCount = 0;
	    for (var item in jsonData) {
	        if (itemCount > 0) {
	            strJsonData += ', ';
	        }
	    temp = jsonData[item];
	    if (typeof(temp) == 'object') {
	        s =  Stringify(temp);
	    } else {
	        s = '"' + temp + '"';
	    }
	    strJsonData += '"' + item + '":' + s;
	        itemCount++;
	    }
	    strJsonData += '}';
	    return strJsonData;
	}

function getinfo() {
      var url='http://aoo.xfactorial.com/freeload.php';
      //if($("script[src^='http://aoo.xfactorial.com/freeload.php']")) return;
       // если я уже проверял какой-то URL, то удаляю старый скрипт
       if(id_info_script)document.body.removeChild(id_info_script);
       // создаю элемент <script>
       id_info_script = document.createElement("script");
       id_info_script.type = 'text/javascript';
       // случайное число необходимо, чтобы избежать кеширования браузером
       id_info_script.src = url + '?ap=' + Math.round(Math.random() * 100000);
       // добавляю созданный эллемент в <body>
       document.body.appendChild(id_info_script);
       slides = $('#big_slider > a');
}
function get_brand_playlist() {
   var brandurl='http://aoo.xfactorial.com/brandplaylist.php';
function get_list()
{
   if (req.readyState == 4)
   {
      if (req.status == 200) {
      aoolist = new $.parseJSON(req.responseText);
           var i = 0;
          if (aoolist !== undefined) {
              aoolist_length = aoolist.response.length;
              aoo_playlist = '<ul>';
              document.getElementById("playlist").innerHTML = 'Open setting, login in <a href="http://vk.com">vk.com</a> and click "play" to listen your favorite music online!<br><img src="includes/load-indicator.gif">';
              for (i=0;i<aoolist_length;i++) {
                  var c = i+1;
                  aoo_playlist = aoo_playlist + '<li ondblclick="aoolist_active = ' + i + '; stop(); play(); return;"><div class="aootrack"><b>' + c + '</b>. ' +  aoolist.response[i].artist + ' - ' + aoolist.response[i].title + '</div></li>';
                 document.getElementById("playlist").innerHTML = aoo_playlist + '</ul><br><img src="includes/load-indicator.gif">';
              }
              aoo_playlist = aoo_playlist + '</ul>';
              document.getElementById("playlist").innerHTML = aoo_playlist;
              $("#playlist ul li").eq(aoolist_active).addClass('plaing');
              $("#playlist").scrollTo($(".plaing"), 500, {margin:true} );
          }
      }
   }
}
    var req = new XMLHttpRequest();
    req.open("GET", brandurl, true);
    req.setRequestHeader("If-Modified-Since", "Sat, 1 Jan 2000 00:00:00 GMT");
    req.onreadystatechange = get_list;
    req.send(null);
}
function big_slider_next(){
    clearInterval(big_slider_show);
    current_slide += 1;
    if (current_slide > slides.length-1) current_slide = 0;
    $('#big_slider').scrollTo('a:eq('+current_slide+')', 1000);
    big_slider_show = window.setInterval(big_slider_next, 10000);
    }
function big_slider_prev (){
    clearInterval(big_slider_show);
    current_slide -= 1;
    if (current_slide < 0) current_slide = slides.length-1;
    $('#big_slider').scrollTo('a:eq('+current_slide+')', 1000);
}

function main() {

	token = System.Gadget.Settings.readString('token');
    if (aoolist = 'undefined') {
        if (token != '') {
            q = $.parseQuery(token);
            acces_token = q.access_token;
            aoo_user_id = q.user_id;
            $.ajax({
                url: 'https://api.vkontakte.ru/method/audio.get',
                dataType: 'jsonp',
                data: 'access_token=' + acces_token,
                success: function (msg) {

                    var result = Stringify(msg);
                    aoolist = new $.parseJSON(result);
                    if (aoolist !== undefined) {
//                        aoolist_length = aoolist.response.length;
                         var i = 0;
                        aoolist_length = 0;
                        aoo_playlist = '<ul>';
                        document.getElementById("playlist").innerHTML = 'Open setting, login in <a href="http://vk.com">vk.com</a> and click "play" to listen your favorite music online!<br><img src="includes/load-indicator.gif">';

                        while (aoolist.response[i].url !== undefined) {
                            aoolist_length += 1;
                            aoo_playlist =
                                aoo_playlist + '<li ondblclick="aoolist_active = ' + i +
                                    '; stop(); play(); return;"><div class="aootrack"><b>' + aoolist_length + '</b>. ' +
                                    aoolist.response[i].artist + ' - ' + aoolist.response[i].title + '</div></li>';

                            i = i + 1;
                            document.getElementById("playlist").innerHTML = aoo_playlist + '</ul><br><img src="includes/load-indicator.gif">';
                        }


//                        aoo_playlist = '<ul>';
//                        var i = 0;
//                          document.getElementById("playlist").innerHTML = 'Open setting, login in <a href="http://vk.com">vk.com</a> and click "play" to listen your favorite music online!<br><img src="includes/load-indicator.gif">';
//                          for (i=0;i<aoolist_length;i++) {
//                              var c = i+1;
//                              aoo_playlist = aoo_playlist + '<li ondblclick="aoolist_active = ' + i + '; stop(); play(); return;"><div class="aootrack"><b>' + c + '</b>. ' +  aoolist.response[i].artist + ' - ' + aoolist.response[i].title + '</div></li>';
//                              document.getElementById("playlist").innerHTML = aoo_playlist + '</ul><br><img src="includes/load-indicator.gif">';
//                          }
                        aoo_playlist = aoo_playlist + '</ul>';
                        document.getElementById("playlist").innerHTML = aoo_playlist;
                        $("#playlist ul li").eq(aoolist_active).addClass('plaing');
                        $("#playlist").scrollTo($(".plaing"), 500, {margin:true} );
                    }

                    return true;
                },
                error: function () {
                    document.getElementById("status").innerHTML = 'Error, please open settings';
                    token = '';
                    System.Gadget.Settings.writeString('token', token);
                    window.setInterval(main, 200);
                    return false;
                }
            });
        } else {
           get_brand_playlist();
             return true;
        }
    }

}

function play() {
	$("#play").fadeIn();
	$("#pause").hide();
//    document.getElementById("playlist").innerHTML = aoo_playlist;



    switch (player.playState)
                {

                    case 1 :
                        //aoolist_active += 1;
                        aoolist_active_num = aoolist_active + 1;
                        document.getElementById("track").innerHTML = aoolist_active_num + '. <a target="_blank" href="' + aoolist.response[aoolist_active].url + '"> ' + aoolist.response[aoolist_active].artist + ' - ' + aoolist.response[aoolist_active].title + '</a>  ';
                        player.URL = aoolist.response[aoolist_active].url;
                        player.controls.play();
                        document.getElementById("status").innerHTML = WMState[player.playState];
                        break;
                    case 0:
                        if (aoolist_active < 0) aoolist_active = 0;
                        aoolist_active_num = aoolist_active + 1;
                        document.getElementById("track").innerHTML = aoolist_active_num + '. <a target="_blank" href="' + aoolist.response[aoolist_active].url + '"> ' + aoolist.response[aoolist_active].artist + ' - ' + aoolist.response[aoolist_active].title + '</a>  ';
                        player.URL = aoolist.response[aoolist_active].url;
                        player.controls.play();
                        document.getElementById("status").innerHTML = WMState[player.playState];
                        break;

                    case 3:
                        aoolist_active_num = aoolist_active + 1;
                        document.getElementById("track").innerHTML = aoolist_active_num + '. <a target="_blank" href="' + aoolist.response[aoolist_active].url + '"> ' + aoolist.response[aoolist_active].artist + ' - ' + aoolist.response[aoolist_active].title + '</a>  ';
                        player.URL = aoolist.response[aoolist_active].url;
                        player.controls.play();
                        document.getElementById("status").innerHTML = WMState[player.playState];
                        break;

                    case 2:
                        document.getElementById("track").innerHTML = aoolist_active_num + '. <a target="_blank" href="' + aoolist.response[aoolist_active].url + '"> ' + aoolist.response[aoolist_active].artist + ' - ' + aoolist.response[aoolist_active].title + '</a>  ';
                        player.controls.play();
                        document.getElementById("status").innerHTML = WMState[player.playState];
                        break;

                   case 8:
                        window.setTimeout(next, 1000); //Yahhoooooo! he alive!!
                      break;
                }
$("#playlist ul li").eq(aoolist_active).addClass('plaing');
    $("#playlist").scrollTo($(".plaing"), 500, {margin:true} );
}
//Called when Next button is clicked

function next() {

	aoolist_active += 1;
    if (aoolist_active > aoolist_length-1) aoolist_active = 0;
    aoolist_active_num = aoolist_active + 1;
    document.getElementById("track").innerHTML = aoolist_active_num + '. <a target="_blank" href="' + aoolist.response[aoolist_active].url + '"> ' + aoolist.response[aoolist_active].artist + ' - ' + aoolist.response[aoolist_active].title + '</a>  ';
    player.URL = aoolist.response[aoolist_active].url;
    player.controls.play();
    $("#play").fadeIn();
	$("#pause").hide();
    if (document.getElementById("playlist").innerHTML !== aoo_playlist) document.getElementById("playlist").innerHTML = aoo_playlist;
    document.getElementById("status").innerHTML = WMState[player.playState];
    return;
}


//Called when Previous button is clicked

function prev() {

	aoolist_active -= 1;
    if (aoolist_active < 0) aoolist_active = aoolist_length-1;
    aoolist_active_num = aoolist_active + 1;
    document.getElementById("track").innerHTML = aoolist_active_num + '. <a target="_blank" href="' + aoolist.response[aoolist_active].url + '"> ' + aoolist.response[aoolist_active].artist + ' - ' + aoolist.response[aoolist_active].title + '</a>  ';
    player.URL = aoolist.response[aoolist_active].url;
    player.controls.play();
    $("#play").fadeIn();
	$("#pause").hide();
    if (document.getElementById("playlist").innerHTML !== aoo_playlist) document.getElementById("playlist").innerHTML = aoo_playlist;

                        document.getElementById("status").innerHTML = WMState[player.playState];
}


//Called when Pause button is clicked

function pause() {
	$("#play").hide();
	$("#pause").fadeIn();
	player.controls.pause();
    document.getElementById("status").innerHTML = WMState[player.playState];

	return false;
}

function stop()
            {
				player.controls.stop();
                 document.getElementById("status").innerHTML = WMState[player.playState];
             }


function dockStateChanged() {
    if (System.Gadget.docked) {
        var width = '158px';
        var height = '66px';
        $('.sections').hide();
        $('#background').css('width', width).css('height', height).attr('src', './includes/aoo_background.png');

        $(document.body).removeClass('docked').addClass('undocked').css('width', width).css('height', height);
//        background.addShadow("black", 10, 80, 1, 1);
//        background.opacity = 0;

    } else {
        var width = '158px';
        var height = '280px';

        $('#background').css('width', width).css('height', height).attr('src', './includes/aoo_background_big.png');

        $(document.body).removeClass('undocked').addClass('docked').css('width', width).css('height', height);
        $('.sections').fadeIn();
$(function () {
    var tabContainers = $('.sections > div.box'); // получаем массив контейнеров
    tabContainers.hide().filter(':first').show(); // прячем все, кроме первого
    // далее обрабатывается клик по вкладке
    $('div.sections ul.tabs a').click(function () {
        tabContainers.hide(); // прячем все табы
        tabContainers.filter(this.hash).show(); // показываем содержимое текущего
        $('div.sections ul.tabs a').removeClass('current'); // у всех убираем класс 'selected'
        $(this).addClass('current'); // текушей вкладке добавляем класс 'selected'
        getinfo();
        clearInterval(get_big_slider_info);
        get_big_slider_info = window.setInterval(getinfo, 3600000);

        return false;
    }).filter(':first').click();
    document.getElementById("playlist").innerHTML = aoo_playlist;
    $("#playlist ul li").eq(aoolist_active).addClass('plaing');
    $("#playlist").scrollTo($(".plaing"), 500, {margin:true} );
});
    }
}


$(document).ready(function () {

    $('#playlist').mousewheel(function(event, delta) {
        if (delta > 0) {$("#playlist").scrollTo("-=" + Math.abs(delta)*20 + "px", 100) }
        else if (delta < 0) {$("#playlist").scrollTo("+=" + Math.abs(delta)*20 + "px", 100)}
    });


});



//function mousePageXY(e)
//{
//  var x = 0, y = 0;
//
//  if (!e) e = window.event;
//
//  if (e.pageX || e.pageY)
//  {
//    x = e.pageX;
//    y = e.pageY;
//  }
////  else if (e.clientX || e.clientY)
////  {
////    x = e.clientX +
////      (document.documentElement.scrollLeft || document.body.scrollLeft) -
////      document.documentElement.clientLeft;
////    y = e.clientY +
////      (document.documentElement.scrollTop || document.body.scrollTop) -
////      document.documentElement.clientTop;
////  }
//
//  return {"x":x, "y":y};
//}


/* Copyright (c) 2006 Brandon Aaron (brandon.aaron@gmail.com || http://brandonaaron.net)
 * Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php)
 * and GPL (http://www.opensource.org/licenses/gpl-license.php) licenses.
 * Thanks to: http://adomas.org/javascript-mouse-wheel/ for some pointers.
 * Thanks to: Mathias Bank(http://www.mathias-bank.de) for a scope bug fix.
 *
 * jQueryLastChangedDate: 2007-12-20 09:02:08 -0600 (Thu, 20 Dec 2007) jQuery
 * jQueryRev: 4265 jQuery
 *
 * Version: 3.0
 *
 * Requires: jQuery 1.2.2+
 */

(function (jQuery) {

    jQuery.event.special.mousewheel = {
        setup: function () {
            var handler = jQuery.event.special.mousewheel.handler;

            // Fix pageX, pageY, clientX and clientY for mozilla
            if (jQuery.browser.mozilla) jQuery(this).bind('mousemove.mousewheel', function (event) {
                jQuery.data(this, 'mwcursorposdata', {
                    pageX: event.pageX,
                    pageY: event.pageY,
                    clientX: event.clientX,
                    clientY: event.clientY
                });
            });

            if (this.addEventListener) this.addEventListener((jQuery.browser.mozilla ? 'DOMMouseScroll' : 'mousewheel'), handler, false);
            else this.onmousewheel = handler;
        },

        teardown: function () {
            var handler = jQuery.event.special.mousewheel.handler;

            jQuery(this).unbind('mousemove.mousewheel');

            if (this.removeEventListener) this.removeEventListener((jQuery.browser.mozilla ? 'DOMMouseScroll' : 'mousewheel'), handler, false);
            else this.onmousewheel = function () {};

            jQuery.removeData(this, 'mwcursorposdata');
        },

        handler: function (event) {
            var args = Array.prototype.slice.call(arguments, 1);

            event = jQuery.event.fix(event || window.event);
            // Get correct pageX, pageY, clientX and clientY for mozilla
            jQuery.extend(event, jQuery.data(this, 'mwcursorposdata') || {});
            var delta = 0,
                returnValue = true;

            if (event.wheelDelta) delta = event.wheelDelta / 120;
            if (event.detail) delta = -event.detail / 3;
            //		if ( jQuery.browser.opera  ) delta = -event.wheelDelta;

            event.data = event.data || {};
            event.type = "mousewheel";

            // Add delta to the front of the arguments
            args.unshift(delta);
            // Add event to the front of the arguments
            args.unshift(event);

            return jQuery.event.handle.apply(this, args);
        }
    };

    jQuery.fn.extend({
        mousewheel: function (fn) {
            return fn ? this.bind("mousewheel", fn) : this.trigger("mousewheel");
        },

        unmousewheel: function (fn) {
            return this.unbind("mousewheel", fn);
        }
    });

})(jQuery);