/* Иди нахуй злостный урод, взламывающий чужой код!
 Добро пожаловать в обитель радости и сверхлогичных решений добрый молодец, решивший усовершенствовать данный продукт*/
var token = '',
    acces_token = "", // токен
    acces_token_v = "", //
    aoo_user_id = 0, // id юзера
    aoolist_love_album_id = 0, // love_album_id
    brand = "brand=mmm2011",
    aoolist_love_album_title = "Aoo!Enno", // Aoo!Player MyBest music
    promo_gid = '0', // группа для промо
    promo_host = 'aoo.xfactorial.com', // хост подгрузки
    aoo_all_list = new Object(), // объект главного плейлиста
    aoo_album_list = new Object(), // объект плейлистов альбомов
    aoo_promo_list = new Object(), // объект промо плейлиста
    aoo_release_list = new Object(), // объект главного плейлиста
    aoo_history_list = new Object(), // объект главного плейлиста
    aoo_love_list = new Object(), // объект плейлиста с любимыми треками
    aoo_top_list = new Object(), // объект плейлиста топа
    aoo_search_list = new Object(), // объект поискового плейлиста
    aoo_search_history = "", // истрория поисковых запросов
    search_busy = false, // состояние поискового запроса
    search_more = false, // добавление из нового поиска
    volume_curent = 100,
    status_rest = true,
    status_t_rest = true,
    history_list = System.Gadget.Settings.readString('history_list'), // список истории проигрывания
    aoo_user_id = System.Gadget.Settings.readString('aoo_user_id'),
    aoo_user_first_name = System.Gadget.Settings.readString('acces_token'),
    aoo_user_last_name = System.Gadget.Settings.readString('aoo_user_last_name'),
    aoo_user_img = System.Gadget.Settings.readString('aoo_user_img'),
    broadcast = System.Gadget.Settings.readString('broadcast'),
    active_track = { // номер активного трека
        all:0,
        album:0,
        love:0,
        promo:0,
        release:0,
        top:0,
        history:0,
        search:0
    },
    active_tab = 'promo', // активный таб
    active_list = 'promo', // активный плейлист
    aoolist_length = { // длина плейлиста
        all:0,
        love:0,
        album:0,
        promo:0,
        release:0,
        top:0,
        history:0,
        search:0,
        offset:0
    },
    aoolist_active_num = 1, // номер играющего трека по человечески
    current_slide = 0,
    big_slider_show = null,
    get_big_slider_info = null,
    id_info_script = null,
    slides = null,
    status_upl_timeout, // задержка выведения статуса
    aoo_upload_track = 0, // число загружаемых треков
    stt = "",
    baby = ' Baby',
    gsDestFolder = "c:\\temp\\aoo\\",
    WMState = new Array(),
    scrobble_t = false,
    timer_t, timer, scrollBox,scrollBar,
    scrollTab = false;
function aoo_list(type_list) {
    switch (type_list) {
        case 'promo' :
            return aoo_promo_list;
            break;
        case 'top' :
            return aoo_top_list;
            break;
        case 'release' :
            return aoo_release_list;
            break;
        case 'all' :
            return aoo_all_list;
            break;
        case 'love' :
            return aoo_love_list;
            break;
        case 'album' :
            return aoo_album_list;
            break;
        case 'search' :
            return aoo_search_list;
            break;
        case 'history' :
            return aoo_history_list;
            break;
    }
}
function login() {
    acces_token = System.Gadget.Settings.readString('token');
    if (acces_token == '' || typeof acces_token == 'undefined') {
        FrURL =
        "http://api.vk.com/oauth/authorize?client_id=2463163&scope=audio,wall,status,offline&redirect_uri=http://api.vk.com/blank.html&display=popup&response_type=token";

    if (IE0 = new ActiveXObject("InternetExplorer.Application")) {

        IE0.Height = 100;
        IE0.Width = 100;
        IE0.Visible = false;
        if (IE = new ActiveXObject("InternetExplorer.Application")) {
            IE.Height = 100;
            IE.Width = 100;
            IE.AddressBar = false;
            IE.MenuBar = false;
            IE.ToolBar = false;
            IE.StatusBar = false;
            IE.Visible = true;
            IE.Navigate(FrURL);
            var GetAT = '';
            var Login_error = '';
            while (GetAT == '' || GetAT == FrURL || IE.Visible == true || Login_error == "") {
                if ('LocationURL' in IE) {
                    if (IE.LocationURL == undefined) {
                        HmURL = "http://aooplayer.com/welcome.php";
                        IE0.Navigate(HmURL);
                    }
                }
                var GetLoc = IE.LocationURL;
                GetAT = GetLoc.substring(GetLoc.indexOf("#") + 1);
                var q = $.parseQuery(GetAT);
                if (q.redirect_uri !== undefined) {
//            if (!IE.Visible) IE.Visible = true;
                }
                if (q.error !== undefined) {
                    Login_error = q.error;
                    HmURL = "http://aooplayer.com/welcome.php";
                    IE0.Navigate(HmURL);

                }
                if (q.access_token !== undefined && q.acces_token !== null && q.acces_token !== "") {

                    acces_token = q.access_token;
                    aoo_user_id = q.user_id;
                    acces_token_v = 'access_token=' + acces_token;
                    System.Gadget.Settings.writeString('token', acces_token);
                    System.Gadget.Settings.writeString('aoo_user_id',aoo_user_id);
                    get_playlist('users.get', acces_token_v + '&fields=first_name,last_name,nickname,photo_medium_rec&uids=' + aoo_user_id, null);
                    HmURL = "http://aooplayer.com/welcome.php?id=" + aoo_user_id;

                    IE0.Navigate(HmURL);
                    if ('Quit' in IE) {
                        while (IE.readystate !== 4) {
                            if (IE.readystate == 4) {
                                break;
                            }
                        }
                        IE.Quit();
                        delete IE;
                    }
                    if ('Quit' in IE0) {
                        while (IE0.readystate !== 4) {
                            if (IE0.readystate == 4) {
                                break;
                            }
                        }
                        IE0.Quit();
                        delete IE0;
                    }
                    return true;
                }
            }
        }
    }
    if ('Quit' in IE) {
        while (IE.readystate !== 4) {
            if (IE.readystate == 4) {
                break;
            }
        }
        IE.Quit();
        delete IE;
    }
    if ('Quit' in IE0) {
        while (IE0.readystate !== 4) {
            if (IE0.readystate == 4) {
                break;
            }
        }
        IE0.Quit();
        delete IE0;
    }
    return false;
    }
    else {
        get_playlist('users.get', acces_token_v + '&fields=first_name,last_name,nickname,photo_medium_rec&uids=' + aoo_user_id, null);
    }
}
function init() {
    var player = new Object();
    player = document.getElementById("player");
    player.settings.volume = volume_curent;
    System.Gadget.settingsUI = 'settings.html';

//	initFlyout();
//	showInfo();

    var background = $('#background').get(0);
    $('.sections').hide();

    System.Gadget.onDock = dockStateChanged;
    System.Gadget.onUndock = dockStateChanged;
    dockStateChanged();
    status('Login and play');
    status('I`m Waiting for You...');
//    login();
    main();
    System.Gadget.onSettingsClosed = function () {
        // @todo changeSkin
        main();
        getinfo();

    };
    stopnow();
}
function main() {
    timer_t = document.getElementById("timer");
    timer = window.setInterval( function() {
        timer_t.innerHTML = player.controls.currentPositionString;
    },1000);
    lastfm.sk = System.Gadget.Settings.readString('lastfm_sk');
    lastfm.token = System.Gadget.Settings.readString('lastfm_token');
    lastfm.name = System.Gadget.Settings.readString('lastfm_name');
    lastfm.subscribe = System.Gadget.Settings.readString('lastfm_subscribe');
    acces_token = System.Gadget.Settings.readString('token');
    aoo_user_id = System.Gadget.Settings.readString('aoo_user_id');
    aoo_user_first_name = System.Gadget.Settings.readString('acces_token');
    aoo_user_last_name = System.Gadget.Settings.readString('aoo_user_last_name');
    aoo_user_img = System.Gadget.Settings.readString('aoo_user_img');
    broadcast = System.Gadget.Settings.readString('broadcast');
//    alert (aoo_user_first_name);
    if (aoo_user_first_name != '') {baby = ' ' + aoo_user_first_name;}
    WMState[0] = "Yea," + baby +", click Play";
    WMState[1] = "Why Stopped? Click Play!";
    WMState[2] = "Why Paused? Click Play!";
    WMState[3] = baby +", I'm Playing for you!";
    WMState[4] = "Scan Forward";
    WMState[5] = "Scan Reverse";
    WMState[6] = "Waiting," + baby +", music is buffering...";
    WMState[7] = "Waiting," + baby +", waiting...";
    WMState[8] = "Media Ended";
    WMState[9] = "Waiting," + baby +", I`m Connecting...";
    WMState[10] = "Yea," + baby +", Ready!";
    WMState[11] = "Waiting," + baby +", I`m Reconnecting";
    $(document).ready(function () {
    if (System.Gadget.Settings.readString('shuffle') == 'true') {
        $('#shuffle').addClass('on');
    } else
    {
        System.Gadget.Settings.writeString('shuffle','false');
        $('#shuffle').removeClass('on');
    }
    if (lastfm.sk == '' || typeof lastfm.sk == 'undefined' || lastfm.token == '' || typeof lastfm.token == 'undefined') {
        $('#lastfm').removeClass('on');
    } else {
        $('#lastfm').addClass('on');
    }
//    if (acces_token != '') {

//    if (login() === true || acces_token != '')
    if (acces_token != '')
    {
        data = brand + "&getgid=1";
        get_playlist("promo_gid", data, "https://api.vk.com/method/audio.get");
        acces_token_v = 'access_token=' + acces_token;
//    get_playlist("top", null);
//    if (aoo_all_list = undefined) {
//        if (token != '') {
//            q = $.parseQuery(token);
//            acces_token = q.access_token;
//            aoo_user_id = q.user_id;    aoo_user_id

        get_playlist("get_top", "&limit=100");
        get_playlist("all", acces_token_v);
        get_playlist("history_get", acces_token_v);
        if (aoolist_love_album_id > 0) {
            get_playlist("love", acces_token_v + "&album_id=" + aoolist_love_album_id );
        }  else {
            get_playlist("get_love_album", "id=" + aoo_user_id + "&album_id=" + aoolist_love_album_id);
        }
    } else
    {
        get_playlist("promo", brand);
        logoutTxt = '<p align="center"><br>\
    <img src="includes/load-indicator.gif"></p>';
        document.getElementById('alllist').innerHTML = logoutTxt;
        document.getElementById('searchlist').innerHTML = logoutTxt;
        document.getElementById('lovelist').innerHTML = logoutTxt;
        document.getElementById('toplist').innerHTML = logoutTxt;
        document.getElementById('historylist').innerHTML = logoutTxt;
    }
//    }
});
}
function send_aoo(url, data) {


    function send_data() {
        if (req.readyState == 4) {
            if (req.status == 200) {
                // @todo загрузить top_list
                vo= req.responseText;
            }
        }
    }
    var req = new XMLHttpRequest();
    req.open("POST", url + '?'+Math.random(), true);
    req.setRequestHeader("If-Modified-Since", "Sat, 1 Jan 2000 00:00:00 GMT");
    req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    req.setRequestHeader("Content-Length", data.length);
    req.setRequestHeader("Connection", "close");
    req.send(data);
    req.onreadystatechange = send_data;
}
function getinfo() {
    var url = 'http://aooplayer.com/freeload2.php';
    //if($("script[src^='http://aoo.xfactorial.com/freeload.php']")) return;
    // если я уже проверял какой-то URL, то удаляю старый скрипт
    if (id_info_script)document.body.removeChild(id_info_script);
    // создаю элемент <script>
    id_info_script = document.createElement("script");
    id_info_script.type = 'text/javascript';
    // случайное число необходимо, чтобы избежать кеширования браузером
    id_info_script.src = url + '?ap=' + Math.round(Math.random() * 100000);
    // добавляю созданный эллемент в <body>
    document.body.appendChild(id_info_script);
}
function big_slider_next() {
    slides = $('#big_slider .slide');
    clearInterval(big_slider_show);
//    debugger;
    current_slide += 1;
    if (current_slide > slides.length - 1) current_slide = 0;
//    ('#big_slider').scrollTo('+=100px', '+=100px', 800 );
//    $('#big_slider ul').scrollTo('ul.li:eq(' + current_slide + ')', 1000);
    $('#big_slider').scrollTo('.slide:eq(' + current_slide + ')', 1000);
    big_slider_show = window.setInterval(big_slider_next, 10000);
}
function big_slider_prev() {
    slides = $('#big_slider .slide');
    clearInterval(big_slider_show);
    current_slide -= 1;
    if (current_slide < 0) current_slide = slides.length - 1;
    $('#big_slider').scrollTo('.slide:eq(' + current_slide + ')', 1000);
}
function plusTop(i) {
    if (i !== undefined) {
//      если i определен  указывыем лист из активного таба
        list = active_tab;
        ptrack = i;
    } else {
//        указывыем лист из играющего плейлиста и активный трек из него же
        list = active_list;
        ptrack = active_track[active_list];
    }
    var objectlist = new Object();
    objectlist = aoo_list(list);
    var aid = objectlist.response[ptrack].aid;
    var oid = objectlist.response[ptrack].owner_id;
    var artist = objectlist.response[ptrack].artist;
    var title = objectlist.response[ptrack].title;
    var sendTrack = "aid=" + aid + "&oid=" + oid + "&artist=" + encodeURIComponent(artist) + "&title=" +
        encodeURIComponent(title);
    send_aoo("http://aoo.xfactorial.com/top.php", sendTrack);
    history_list_array = history_list.split(',', 200);
    new_history_item = oid + "_" + aid;
    if (history_list_array.length == 1) {
        if (history_list_array[0] == "" || history_list_array[0] == undefined) {
            history_list_array[0] = new_history_item;
            unshiftedh = 1;
        }
        unshiftedh = history_list_array.unshift(new_history_item);
    }
    else {
        unshiftedh = history_list_array.unshift(new_history_item);
    }
    if (history_list_array.length > 200) {
        history_list_array.splice(201, history_list_array.length - 200);
    }
    history_list = history_list_array.join(",");
    System.Gadget.Settings.writeString('history_list', history_list);
    acces_token_v = 'access_token=' + acces_token;
    get_playlist("history_set", "key=aoo_history&value=" + history_list + "&" + acces_token_v);
//    System.Gadget.Settings.readString('history_list');
    // @todo загрузить history_list
    }
function get_playlist(type_list, data, url) {
//    status('Wait! Loading ' + type_list + '-playlist...');
    status('Waiting ' + aoo_user_first_name + ' , Waiting...');

    function get_list() {
        if (req.readyState == 4) {
            if (req.status == 200) {
                var i = 0;
//                if (aoo_all_list !== undefined) {
                status('Ready!');

                switch (type_list) {
                    case 'audio.save' :
                        qi = new $.parseJSON(req.responseText);
                        if (qi.error !== undefined) {
                            alert('Error ' + qi.error.message);
                            checkUpdates('all');
                        } else {
                            aoo_upload_track = aoo_upload_track - 1;
//                            clearTimeout(status_upl_timeout);
//                            if (!status_rest) {
//                                status_upl_timeout = window.setTimeout(function () {
//                                status('Track Uploaded!');
                                if (aoo_upload_track <=0) checkUpdates('all');
//                            }, 3000);
//                            }
                        }
                        break;
                    case 'getUploadServer' :
                        qi = new $.parseJSON(req.responseText);
                        if (qi.error !== undefined) {
                            alert('Error ' + qi.error.message);
                            aoo_upload_track = 0;
                            checkUpdates('all');
                        } else {
                            WinHTTPPostRequest(qi.response.upload_url,file_o);
                            return ;
                        }
                        break;
                    case 'users.get' :
                        qi = new $.parseJSON(req.responseText);
                        if (qi.error !== undefined) {
                            acces_token = '';
                            aoo_user_first_name = '';
                            aoo_user_last_name = '';
                            aoo_user_img = '';
                        } else {
                            aoo_user_first_name = qi.response[0].first_name;
                            aoo_user_last_name = qi.response[0].last_name;
                            aoo_user_img = '<img id="user" src="' + qi.response[0].photo_medium_rec + '">';
                        }
                        System.Gadget.Settings.writeString('token',acces_token);
                        System.Gadget.Settings.writeString('aoo_user_id',aoo_user_id);
                        System.Gadget.Settings.writeString('aoo_user_first_name',aoo_user_first_name);
                        System.Gadget.Settings.writeString('aoo_user_last_name',aoo_user_last_name);
                        System.Gadget.Settings.writeString('aoo_user_img',aoo_user_img);
                        break;
                    case 'lastfmLove' :
//                        objectlist = new $.parseJSON(req.responseText);
                        break;
                    case 'scrobbling' :
//                        objectlist = new $.parseJSON(req.responseText);
                        break;
                    case 'lastfmNowPlaying' :
                        objectlist = new $.parseJSON(req.responseText);
//                        alert(req.responseText);
                        if (typeof objectlist.error != 'undefined') {
                            alert('OOOPS!! Last.fm error #' + objectlist.error + '.' + objectlist.message + '.');
                        }
                        break;
                    case 'status_set' :
                        objectlist = new $.parseJSON(req.responseText);
//                        alert(req.responseText);
                        if (typeof objectlist.error != 'undefined') {
//                            alert('OOOPS!! User disabled track name broadcast. Please enable broadcast on vk.com/audio');
                        }
                        break;
                    case 'promo_gid' :
                        objectlist = new $.parseJSON(req.responseText);
                        promo_host = objectlist.response[0].host;
                        promo_gid = objectlist.response[0].gid;
                        get_playlist("promo", brand);
                        data_v = 'access_token=' + acces_token + '&gid=' + promo_gid;
                        get_playlist("promo",  data_v, "https://api.vk.com/method/audio.get");
                        break;
                    case 'promo' :
                        objectlist = new $.parseJSON(req.responseText);
                        if (!('host' in objectlist.response[0])) {
                        //  если нет свойства host значит подгрузка с vk.com
                        if ('error' in objectlist) {    // если есть ошибка
                                promo_host = "aoo.xfactorial.com";
                                promo_gid = 0;
                                get_playlist("promo", brand);
                                return false;
                        }
                        }
                        aoo_promo_list = new $.parseJSON(req.responseText);
                        document.getElementById("promolist").innerHTML = render_playlist(aoo_promo_list, type_list);

//                        $("#" + type_list +"list" + " ul li").eq(active_track[active_list]).addClass('plaing');
//                        $("#" + type_list +"list").scrollTo($(".plaing"), 500, {margin:true});

                        break;
                    case 'get_top' :
                        // передача полученного списка топ на vk
                        get_playlist('top', acces_token_v + "&audios=" + req.responseText);
                        break;
                    case 'top' :
                        // создаем объект ТОПлиста
                        aoo_top_list = new $.parseJSON(req.responseText);
                        if (aoo_top_list.error !== undefined) {
                            document.getElementById(type_list +"list").innerHTML = '<p align="center">Please open settings...<br>\
    <img src="includes/load-indicator.gif"></p>';
                            return false;
                        }
                        document.getElementById(type_list +"list").innerHTML = render_playlist(aoo_top_list, type_list);

                        break;
                    case 'release' :
                        break;
                    case 'all_check' :
                        qi = new $.parseJSON(req.responseText);
                        if (qi.error !== undefined) {
                            return false;
                        }
                        if (qi.response != aoo_all_list.response.length) {
                            if (acces_token != '') {
                                get_playlist("all", acces_token_v);
                                if (aoolist_love_album_id > 0) {
                                    get_playlist("love", acces_token_v + "&album_id=" + aoolist_love_album_id);
                                } else {
                                    get_playlist("get_love_album",
                                        "id=" + aoo_user_id + "&album_id=" + aoolist_love_album_id);
                                }
                            }
                        }
                        break;
                    case 'all' :
                        aoo_all_list = new $.parseJSON(req.responseText);
                        if (aoo_all_list.error !== undefined) {
                            document.getElementById(type_list +"list").innerHTML = '<p align="center">Please open settings...<br>\
    <img src="includes/load-indicator.gif"></p>';
                            return false;
                        }
                        document.getElementById(type_list +"list").innerHTML = render_playlist(aoo_all_list, type_list);

                        break;
                    case 'search' :
                        aoo_search_list = new Del_dubs($.parseJSON(req.responseText), 'search');
                        if ('error' in aoo_search_list) {
                            document.getElementById("searchlist").innerHTML = '<p align="center"><br>\
    <img src="includes/load-indicator.gif"></p>';
                            return false;
                        }    else {
                            document.getElementById("searchlist").innerHTML = render_playlist(aoo_search_list, type_list);

                        }
                        break;
                    case 'get_love_album' :
                        if (req.responseText > 0) {
                            aoolist_love_album_id = req.responseText;
                            data_v = acces_token_v + "&album_id=" + aoolist_love_album_id;
                            get_playlist("love", data_v);
                            return false;
                        } else {
                            if (aoolist_love_album_id > 0) {
                                get_playlist("get_love_album",
                                    "id=" + aoo_user_id + "&album_id=" + aoolist_love_album_id);
                                return false;
                            } else {
                                aoolist_love_album_id = req.responseText;
                                get_playlist("add_love_album", acces_token_v + "&title=" + aoolist_love_album_title);
                                return false;
                            }
                        }
                        break;
                    case 'add_love_album' :
                        var objectlist = new $.parseJSON(req.responseText);
                        if ('error' in objectlist) {
                            return false;
                        }
                        aoolist_love_album_id = objectlist.response.album_id;
                        get_playlist("get_love_album", "id=" + aoo_user_id + "&album_id=" + aoolist_love_album_id);
                        return false;
                        break;
                    case 'love' :
                        aoo_love_list = new $.parseJSON(req.responseText);
                        if ('error' in aoo_love_list) {
                            document.getElementById("lovelist").innerHTML = '<p align="center">Please open settings...<br>\
    <img src="includes/load-indicator.gif"></p>';
                            return false;
                        }
                        document.getElementById("lovelist").innerHTML = render_playlist(aoo_love_list, type_list);

                        break;
                    case 'album' :
                        // @todo albums
                        break;

                    case 'like' :
                        actsObj = new $.parseJSON(req.responseText);
                        if ('error' in actsObj) {
                                status('Sorry, I can`t..');
                                return false;
                        } else {
                            get_playlist("love", acces_token_v + "&album_id=" + aoolist_love_album_id);
                            status('Yea, Baby! Track liked...');
                        }
                        break;

                    case 'add' :
                        actsObj = new $.parseJSON(req.responseText);
                        if (actsObj.error !== undefined) {
                                status('Sorry, I can`t..');
                                return false;
                        } else {
                            get_playlist("all", acces_token_v);
                            status('Yea, Baby! Track added...');
                        }
                        break;

                    case 'del' :
                        actsObj = new $.parseJSON(req.responseText);
                        if (actsObj.error !== undefined) {
                            if (acces_token == '') {
                                status('Sorry, I can`t. Login in');
                                return false;
                            }
                        } else {
                            get_playlist(active_tab, acces_token_v);
                            status('Yea, Baby! Track removed...');
                        }
                        break;
                    case 'share' :
                        actsObj = new $.parseJSON(req.responseText);
                        if (actsObj.error !== undefined) {
                            alert (req.responseText);
                            status('Sorry, I can`t share');
                            return false;
                        } else {
                            status('Yea, Baby! Track shared...');
                        }
                        break;

                    case 'history_get' :
                        aoo_history_get =  new $.parseJSON(req.responseText);
                        if (aoo_history_get.error !== undefined ) {
                            status('Sorry, I can`t get Your history now...');
                            history_list = "";
                            System.Gadget.Settings.writeString('history_list', history_list);
                            get_playlist("history_set","key=aoo_history&value=" + history_list + "&" + acces_token_v);
                        } else {
                            history_list = aoo_history_get.response;
                            // передача списка из полученной переменной на vk
                            get_playlist('history', acces_token_v + "&audios=" + aoo_history_get.response);
                        }
                        break;
                    case 'history' :
                        aoo_history_list = new Del_dubs($.parseJSON(req.responseText), type_list);
                        if (aoo_history_list.error !== undefined) {
                            document.getElementById(type_list + 'list').innerHTML = '<p align="center">Please open settings...<br>\
    <img src="includes/load-indicator.gif"></p>';
                            return false;
                        }
                        document.getElementById(type_list + 'list').innerHTML =
                            render_playlist(aoo_history_list, type_list);
                        break;
                    case 'history_set' :
                        aoo_history_set =  new $.parseJSON(req.responseText);
                        if (aoo_history_set.response === "" || 'error' in aoo_history_set ) {
                            status('Sorry, I can`t set Your history now...');
                        } else {

                        }
                        break;
                }
                updatePositionTab();
            }
        }
    }
    var GETPOST = "GET";
    switch (type_list) {
        case 'audio.save' :
            url = "https://api.vk.com/method/audio.save";
            break;
        case 'getUploadServer' :
            var file_o = url;
            url = "https://api.vk.com/method/audio.getUploadServer";
            break;
        case 'users.get' :
            url = "https://api.vk.com/method/users.get";
            break;
        case 'lastfmLove' :
            url = "http://ws.audioscrobbler.com/2.0/";
            GETPOST = "POST";
            break;
        case 'scrobbling' :
            url = "http://ws.audioscrobbler.com/2.0/";
            GETPOST = "POST";
            break;
        case 'lastfmNowPlaying' :
            url = "http://ws.audioscrobbler.com/2.0/";
            GETPOST = "POST";
            break;
        case 'status_set' :
            url = "https://api.vk.com/method/status.set";
            break;
        case 'promo_gid' :
            url = "http://aoo.xfactorial.com/brandplaylist.php";
            break;
        case 'promo' :
            if (url  == undefined || promo_gid == 0){
                url = "http://aoo.xfactorial.com/brandplaylist.php";
            } else {
                url = "https://api.vk.com/method/audio.get";
            }
            document.getElementById(type_list+'list').innerHTML =
                '<p align="center">Loading playlist... <br><img src="includes/load-indicator.gif"></p>';
            break;
        case 'get_top' :

            url = "http://aoo.xfactorial.com/top.php";
            break;
        case 'top' :
            url = "https://api.vk.com/method/audio.getById";
            document.getElementById(type_list+'list').innerHTML =
                '<p align="center">Loading Aoo!Top... <br><img src="includes/load-indicator.gif"></p>';
            break;
        case 'release' :
            url = "http://aoo.xfactorial.com/brandplaylist.php";
            document.getElementById(type_list).innerHTML =
                '<p align="center">Loading playlist... <br><img src="includes/load-indicator.gif"></p>';
            break;
        case 'all' :
            url = "https://api.vk.com/method/audio.get";
            document.getElementById(type_list+'list').innerHTML =
                '<p align="center">Loading playlist... <br><img src="includes/load-indicator.gif"></p>';
            break;
        case 'all_check' :
            url = "https://api.vk.com/method/audio.getCount";
            break;
        case 'get_love_album' :
            url = "http://aoo.xfactorial.com/love_playlist.php";
            break;
        case 'love' :
            url = "https://api.vk.com/method/audio.get";
            document.getElementById(type_list+'list').innerHTML =
                '<p align="center">Loading playlist... <br><img src="includes/load-indicator.gif"></p>';
            break;
        case 'add_love_album' :
            url = "https://api.vk.com/method/audio.addAlbum";
            break;
        case 'album' :
            url = "http://aoo.xfactorial.com/brandplaylist.php";
            document.getElementById(type_list+'list').innerHTML =
                '<p align="center">Loading playlist... <br><img src="includes/load-indicator.gif"></p>';
            break;
        case 'search' :
            url = "https://api.vk.com/method/audio.search";
            document.getElementById(type_list+'list').innerHTML =
                '<p align="center">Searching... <br><img src="includes/load-indicator.gif"></p>';
            break;
        case 'add' :
            url = "https://api.vk.com/method/audio.add";
            break;
        case 'like' :
            url = "https://api.vk.com/method/audio.moveToAlbum";
            break;
        case 'del' :
            url = "https://api.vk.com/method/audio.delete";
            break;
        case 'share' :
            url = "https://api.vk.com/method/wall.post";
            break;
        case 'history_get' :
            url = "https://api.vk.com/method/storage.get";
            data = "key=aoo_history&" + data;
            break;
        case 'history' :
            url = "https://api.vk.com/method/audio.getById";
            break;
        case 'history_set' :
            url = "https://api.vk.com/method/storage.set";
            break;
    }
    var req = new XMLHttpRequest();
    if (GETPOST == "POST") {
        req.open(GETPOST, url, true);
    }
    else {
        req.open("GET", url + "?" + data, true);
    }
    req.setRequestHeader("If-Modified-Since", "Sat, 1 Jan 2000 00:00:00 GMT");
    req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    if (typeof data != 'undefined' && data != null) req.setRequestHeader("Content-Length", data.length);
    req.send(data);
    req.onreadystatechange = get_list;
//    return req.responseText;
}
function searching(qv) {
//
    qv = encodeURIComponent(qv);
    if (typeof qv == "undefined" || qv == null || qv == "") {
        qv = encodeURIComponent($('#insearch').val());
    }
    var q_v = "q=" + qv + "&";
    var auto_completev = "auto_complete=1&";
    var sortv = "sort=0&";
    var lyricsv = "lyrics=0&";
    var countv = "count=200&";
    var offsetv = "offset=" + aoolist_length.offset + "&";
    search_busy = true;
    get_playlist("search", q_v + auto_completev + sortv + lyricsv + countv + offsetv + "&" + acces_token_v);

}
function Del_dubs(objectlist, type_list) {

    if (!('error' in objectlist)) {
    if (type_list == 'search') {
        aoolist_length.search = objectlist.response[0];
        objectlist.response.splice(0, 1);
    }
    var del_dubs_length = objectlist.response.length;
    var i = 0;
    for (i = 0; i < del_dubs_length; i++) {
        var a1 = objectlist.response[i].artist.toString().toLowerCase().replace(/[^a-zA-Zа-я-А-ЯёЁ0-9 ]+/ig,
            " ").replace(/\s+/g, " ");
        var t1 = objectlist.response[i].title.toString().toLowerCase().replace(/[^a-zA-Zа-я-А-ЯёЁ0-9 ]+/ig,
            " ").replace(/\s+/g, " ");
        var j = i + 1;
        for (j = i + 1; j < del_dubs_length; j++) {
            var a2 = objectlist.response[j].artist.toString().toLowerCase().replace(/[^a-zA-Zа-я-А-ЯёЁ0-9 ]+/ig,
                " ").replace(/\s+/g, " ");
            var t2 = objectlist.response[j].title.toString().toLowerCase().replace(/[^a-zA-Zа-я-А-ЯёЁ0-9 ]+/ig,
                " ").replace(/\s+/g, " ");
            if (a1 == a2 && t1 == t2) {
                objectlist.response.splice(j, 1);
                del_dubs_length--;
            }
        }
        if (type_list == 'search' && search_more == true) {
//
            //если работаем над поисковым листом и добавление новых треков активно
            aoo_search_list.response.push(objectlist.response[i]);
            // добавляем новые уникальные треки к объекту листа
        }
    }}
//
    if (type_list == 'search' && search_more == true) {
        aoolist_length[type_list] = aoo_search_list.response.length;
        return aoo_search_list;
    } else {
        aoolist_length[type_list] = del_dubs_length;
        return objectlist;
    }
}
function render_playlist(objectlist, type_list) {
    var render_aoolist_length = objectlist.response.length;
//    var render_list_dom = '<div class="flexcroll"><ul>';
    var render_list_dom = '<ul>';
    var i = 0;
    for (i = 0; i < render_aoolist_length; i++) {
        var c = i + 1,
            a_html = '<div class="acts">',
            a_add = '<a class="acts_add" title="Add"></a>',
            a_del = '<a class="acts_del" title="Delete"></a>',
            a_like = '<a class="acts_like" title="Aoo!Enno"></a>',
            a_share = '<a class="acts_share" title="Share"></a>',
        a_unlike = '<a class="acts_unlike" title="UnLike"></a>';
        var tl = "'" + type_list + "'";
        switch (type_list) {
            case 'promo':
                a_html = a_html + a_add + a_share;
                break;
            case 'all':
                a_html = a_html + a_del + a_like + a_share;
                break;
            case 'love':
                a_html = a_html + a_del + a_unlike + a_share;
                break;
            case 'album':
                a_html = a_html + a_del + a_share;
                break;
            case 'search':
                a_html = a_html + a_add + a_share;
                break;
            case 'top':
                a_html = a_html + a_add + a_share;
                break;
            case 'history':
                a_html = a_html + a_add + a_share;
                break;
        }

        a_html = a_html + '</div>';
        render_list_dom =
            render_list_dom + '<li class="toplay" id="'+type_list+i + '"><div class="aootrack"><span class="artist">' +
                objectlist.response[i].artist + ' </span><b>' + c + '</b>. <span class="title">' +
                objectlist.response[i].title + '</span></div>' + a_html + '</li>';
    }
    if (type_list == "search" && aoolist_length.offset < aoolist_length.search) {
        render_list_dom = render_list_dom + '<li><a id="extrasearch">More...<br><br><br></a></li>';
    }
    render_list_dom = render_list_dom + '</ul>';
//    render_list_dom = render_list_dom + '</ul></div> ';
    aoolist_length[type_list] = render_aoolist_length;
    search_busy = false;
    return render_list_dom;
}
function play() {
// Когда нажали на кнопку Play
//    login();
//
    $("#play").fadeIn();
    $("#pause").hide();
//    document.getElementById("all").innerHTML = aoo_main_dom;
    var objectlist = new Object();
    objectlist = aoo_list(active_list);

    switch (player.playState) {

        case 0:
            if (active_track[active_list] < 0) active_track[active_list] = 0;
            status_t();
            player.URL = objectlist.response[active_track[active_list]].url;
            player.controls.play();
            volume(volume_curent);
            status(player.playState);
            sel_active_track(active_tab);
            break;
        case 1 :
            status_t();
            player.URL = objectlist.response[active_track[active_list]].url;
            player.controls.play();
            volume(volume_curent);
            status(player.playState);
            sel_active_track(active_tab);
            break;
        case 2:
            status_t();
//            alert (player.currentMedia.getItemInfo('Title') + " - " + player.currentMedia.getItemInfo('Author'));
            player.controls.play();
            volume(volume_curent);
            status(player.playState);
            sel_active_track(active_list);
            break;
        case 3:

//            player.URL = objectlist.response[active_track[active_list]].url;
//            player.controls.play();
            volume(volume_curent);
            status(player.playState);
            break;
        case 8:
            volume(0);
            stopnow();
            scrobble_t = true;
            window.setTimeout(next, 500); //Yahhoooooo! he alive!!
            break;
    }
//    $("#"+ active_list +" ul li").eq(active_track[active_list]).addClass('plaing');
//    $("#"+ active_list).scrollTo($(".plaing"), 500, {margin:true});
}
function scrobble(scr_artist, scr_title, scr_duration) {
    if (player.controls.currentPosition >= scr_duration/2 || (player.controls.currentPosition == 0 && scrobble_t) ){
        scrobble_t = false;
        if (lastfm.sk != '' && typeof lastfm.sk != 'undefined') {
        get_playlist('scrobbling', lastfm.toScrobble(scr_artist, scr_title, scr_duration), null);
    }
    plusTop();
    }
}
function next() {
    //Когда нажали на кнопку Следующий
    volume(0);
    var objectlist = new Object();
    objectlist = aoo_list(active_list);
    scrobble(objectlist.response[active_track[active_list]].artist, objectlist.response[active_track[active_list]].title, objectlist.response[active_track[active_list]].duration);

    if (System.Gadget.Settings.readString('shuffle') == 'true') {
        var last_track = active_track[active_list];
        active_track[active_list] = Math.floor(Math.random() * aoolist_length[active_list]);
        if (last_track == active_track[active_list]) {active_track[active_list] += 1;}
    } else {
        active_track[active_list] += 1;
    }
    if (active_track[active_list] > aoolist_length[active_list] - 1) active_track[active_list] = 0;
    status_t();
    player.URL = objectlist.response[active_track[active_list]].url;
    player.controls.play();

    volume(volume_curent);
    $("#play").fadeIn();
    $("#pause").hide();
    status(player.playState);
    sel_active_track(active_tab);
    return true;
}
function prev() {
    //Когда нажали на кнопку Предыдущий
    volume(0);
    var objectlist = new Object();
    objectlist = aoo_list(active_list);
    scrobble(objectlist.response[active_track[active_list]].artist, objectlist.response[active_track[active_list]].title, objectlist.response[active_track[active_list]].duration);
    if (System.Gadget.Settings.readString('shuffle') == 'true') {
        var last_track = active_track[active_list];
        active_track[active_list] = Math.floor(Math.random() * aoolist_length[active_list]);
        if (last_track == active_track[active_list]) {active_track[active_list] -= 1;}
    } else {
        active_track[active_list] -= 1;
    }
    if (active_track[active_list] < 0) active_track[active_list] = aoolist_length[active_list] - 1;

    status_t();
    player.URL = objectlist.response[active_track[active_list]].url;
    player.controls.play();
    volume(volume_curent);
    $("#play").fadeIn();
    $("#pause").hide();

    status(player.playState);
    sel_active_track(active_tab);
    return true;
}
function pause() {
    // Когда нажали на кнопку Пауза
    volume(0);
    $("#play").hide();
    $("#pause").fadeIn();
    player.controls.pause();
    status(player.playState);
    return false;
}
function stopnow() {
//    когда нажали кнопку стоп
    volume(0);
    player.controls.stop();
    status(player.playState);
}
function volume(v) {
//    if (v != undefined || v != 'undefined') {
    var vv = player.settings.volume;
//    var vols = "";
//    if (v != vv) {
//        if (v < vv) {
//            var i = v;
//            while (i >= vv || value >= 100 - v) {
//                i--;
//                var valuev = 98 - 0.01 * Math.exp((i) / 10.857255959);
//                var value = Math.floor(valuev);
//                if (value < v) {
//                    value = v;
//                    break;
//                }
//                player.settings.volume = value;
////                vols = vols + "   " + value;
//            }
//        } else {
//            var i = vv;
//            while (i <= v || value <= v) {
//                i++;
//                var valuev = 2 + 0.01 * Math.exp((i + 10) / 10.857255959);
//                var value = Math.floor(valuev);
//                if (value > v) {
//                    value = v;
//                    break;
//                }
//                player.settings.volume = value;
////                vols = vols + "   " + value;
//            }
//        }
//    }
    player.settings.volume = v;
//        volume_curent = v;
//    status("Volume " + v + "%");
//    } else {
//        return player.settings.volume;
//    }

}
function dockStateChanged() {
    if (System.Gadget.docked) {
//        @todo changeSkin
        var width = '158px';
        var height = '66px';
        $('.sections').hide();
        $('#background').css('width', width).css('height', height).attr('src', './includes/aoo_background.png');

        $(document.body).removeClass('docked').addClass('undocked').css('width', width).css('height', height);
//        background.addShadow("black", 10, 80, 1, 1);
//        background.opacity = 0;

    }
    else {
        // @todo changeSkin
        var width = '158px';
        var height = '280px';

        $('#background').css('width', width).css('height', height).attr('src', './includes/aoo_background_big.png');

        $(document.body).removeClass('undocked').addClass('docked').css('width', width).css('height', height);
        $('.sections').fadeIn();
        $(function () {
        // получаем массив контейнеров
            var tabContainers = $('.sections > div.box');
// показываем содержимое текущего таба
//            tabContainers.hide().filter(':first').show(); // прячем все, кроме первого
            tabContainers.hide().filter(active_list).show();
            if (active_tab != 'release') {
                $('#scrollBar').fadeOut();
                updatePositionTab();

            } else {
                $('#scrollBar').fadeIn();
            }

            // обрабатывается клик по вкладке
            $('div.sections ul.tabs a').click(
                function () {
                    var curent_a = $(this);
                    active_tab_hash = this.hash; //#active_tab
                    if (typeof acces_token != undefined && acces_token != '') {

                        tabContainers.hide(); // прячем все табы
                        //active_tab
                        active_tab = active_tab_hash.substring(1);
                        // показываем содержимое текущего таба
                        tabContainers.filter(active_tab_hash).show();
                        // у всех убираем класс 'current'
                        $('div.sections ul.tabs a').removeClass('current');
                        // текушей вкладке добавляем класс 'current'
                        curent_a.addClass('current');
                        if (active_tab == 'release') {
                            $('#scrollBar').fadeOut();
                            getinfo();
                        } else {
                            $('#scrollBar').fadeIn();
                            if (active_tab == active_list) {
                                sel_active_track(active_tab);
                            } else {
                                updatePositionTab();
                            }
                        }
                        return false;

                    } else {
                        if (active_tab_hash.substring(1) == 'promo' || active_tab_hash.substring(1) == 'release') {
                            tabContainers.hide(); // прячем все табы
                            //active_tab
                            active_tab = active_tab_hash.substring(1);
                            // показываем содержимое текущего таба
                            tabContainers.filter(active_tab_hash).show();
                            // у всех убираем класс 'current'
                            $('div.sections ul.tabs a').removeClass('current');
                            // текушей вкладке добавляем класс 'current'
                            curent_a.addClass('current');
                            if (active_tab == 'release') {
                                $('#scrollBar').fadeOut();
                                getinfo();
                            } else {
                                $('#scrollBar').fadeIn();
                                if (active_tab == active_list) {
                                    sel_active_track(active_tab);
                                } else {
                                    updatePositionTab();
                                }
                            }
                            return false;
                        } else {
                            active_list = 'promo';
                            status('Please open settings... ');
                            return false;
                        }
                    }
                    return false;
                });
            $('div.sections ul.tabs a').filter(':first').click();
            // обрабатывается двойной клик по вкладке
            $('div.sections ul.tabs a').dblclick(
                function () {
                    if (typeof acces_token != undefined && acces_token != '') {
                    var curent_a = $(this);
                    tabContainers.hide(); // прячем все табы
                    active_tab_hash = this.hash; //#active_tab
                    active_tab = active_tab_hash.substring(1); //active_tab
                    checkUpdates (active_tab);
                    // показываем содержимое текущего таба
                    tabContainers.filter(active_tab_hash).show();
                    // у всех убираем класс 'current'
                    $('div.sections ul.tabs a').removeClass('current');
                     // текушей вкладке добавляем класс 'current'
                    curent_a.addClass('current');
                    if (active_tab == 'release') {
                        $('#scrollBar').fadeOut();
                    } else {
                        $('#scrollBar').fadeIn();
                    }
                    return false;
                    }
                    else {
                        status('Please open settings... ');
                    }
            });
        });
    }
}
function checkUpdates(type_list) {
    acces_token_v = 'access_token=' + acces_token;
    switch (type_list)    {
        case "promo":
            if (acces_token != '') {
                get_playlist("promo_gid", brand + "&getgid=1", "https://api.vk.com/method/audio.get");
                //sel_active_track();
            } else
            {
                get_playlist("promo", brand);
                //sel_active_track();
            }
            break;
        case "all":
            get_playlist("all_check", acces_token_v + '&oid=' + aoo_user_id);
            //sel_active_track();
            break;
        case "love":
            if (aoolist_love_album_id != '' && aoolist_love_album_id > 0) {
                get_playlist("love", acces_token_v + "&album_id=" + aoolist_love_album_id );
                //sel_active_track();
            }  else {
                get_playlist("get_love_album", "id=" + aoo_user_id + "&album_id=" + aoolist_love_album_id);

            }
            break;
        case "search":
            break;
        case "release":
            getinfo();
//            clearInterval(get_big_slider_info);
//            get_big_slider_info = window.setInterval(getinfo, 3600000);
            break;
        case "top":
            get_playlist("get_top", "&limit=100");
            //sel_active_track();
            break;
        case "history":
            get_playlist("history_get", acces_token_v);
            //sel_active_track();
            break;
    }

}
function sel_active_track(list) {
    // задаем активный таб и активный лист
    if (list == undefined) { // если лист не указывается то по умолчанию выбираем активный плейлист
//        $('a.promoicon').click();
//        $("#promo ul li").eq(active_track.promo).addClass('plaing');
//        $("#" + active_list + 'list ul li').scrollTo($(".plaing"), 500, {margin:true});
    }
    else {
        active_list = list; // нужный плейлист задаем для активного таба
        if (active_track[list] == NaN || active_track[list] == undefined) active_track[list] = 0;
        if ($("#" + list + "list ul li").eq(active_track[list]).is('.plaing')) {
        } else {
        // убираем из списка класс plaing
        $("#" + list + "list ul li.plaing").removeClass('plaing');
          // отмечаем классом plaing пункт с номером активного трека в нужном плейлисте
        $("#" + list + "list ul li").eq(active_track[list]).addClass('plaing');
            // прокрутить плейлист до активного трека
        $("#" + list + "").scrollTo($(".plaing"), 1000, {margin:false, offset:-5,easing:'easeInOutBack', onAfter: function(){
            if (active_list == active_tab) {
                updatePositionTab();
            }
        }});
        }
    }
}
function status(message) {
// задать статус
    if (aoo_upload_track < 0) {
        aoo_upload_track = 0;
    }
    if (aoo_upload_track != 0) {
        $('#uploading').fadeIn();
    } else {
        $('#uploading').fadeOut();
    }

    if (typeof message == "number" || message.length == 1) {
        document.getElementById("status").innerHTML =
            WMState[message];
    } else
    {
        if (typeof message == "string") {
            function temp_status() {
                if (aoo_upload_track == 0) {
                   $('#uploading').fadeOut();
                }
                clearTimeout(status_back);
                $('#status').fadeOut(
                    function () {
                        $(this).html(WMState[player.playState]);
                    }).fadeIn(function () {
                        status_rest = true;
                    });
//                document.getElementById("status").innerHTML=WMState[player.playState];
                return false;
            }

            document.getElementById("status").innerHTML = message;
            if (message == 'Waiting ' + aoo_user_first_name +' , Waiting...') $('#uploading').fadeIn();
            clearTimeout(status_back);
            if (status_rest) {
                status_rest = false;
                var status_back = window.setTimeout(temp_status, 3000);
            }
        }
    }

}
function status_t(message) {
// показать трек-сообщение
   function echo_status() {
       var objectlist = new Object(),
       dmin = 0,
       dsec = 0,
       duration = 0;
       aoolist_active_num = active_track[active_list] + 1;
       objectlist = aoo_list(active_list);
       if ("duration" in objectlist.response[active_track[active_list]] && typeof objectlist.response[active_track[active_list]].duration === 'number') {
           duration = objectlist.response[active_track[active_list]].duration;
           dmin = Math.floor(duration / 60);
           dsec = duration - dmin * 60;
           if (dsec < 10) {
               dsec = "0" + dsec;
           }
       }
       var url = objectlist.response[active_track[active_list]].url;
       var artist = objectlist.response[active_track[active_list]].artist;
       var title1 = objectlist.response[active_track[active_list]].title;
       var aid = objectlist.response[active_track[active_list]].aid;
       var oid = objectlist.response[active_track[active_list]].owner_id;
       var tr;
       tr = aoolist_active_num + " . <a target='_blank' href='" + url + "'>"+ artist + ' - '+ title1 + " | " + dmin + ":" + dsec + "</a>";
       document.getElementById("track").innerHTML = tr;
       stt = tr;
       if (broadcast == 'true') {
       get_playlist('status_set', 'audio=' + oid + '_' + aid + '&' + acces_token_v, null);
       }
       if (lastfm.sk != '' && typeof lastfm.sk != 'undefined') {
       get_playlist('lastfmNowPlaying', lastfm.updateNowPlaying(artist, title1, duration), null);
       }
//       $('#track').html(tr);
       return true;
   }
// если сообщение не задано, то выводится номер трека, ссылка, артист, название
    if (message == undefined ||
        message == NaN) {
        echo_status();
    } else
    {
// иначе выводится временное сообщение
//        $('#track').stop(true, true).fadeOut(
//                function () {
                    $('#track').html(message, function() {
                        $('#track').fadeIn(2000);
                        if (stt != "") {echo_status();}
                    });
//                }).fadeIn(2000).fadeOut(1000, function () {
//                echo_status();
//            }).fadeIn(1000);
    }
}
function actsAdd(i) {
    var objectlist = new Object();
    objectlist = aoo_list(active_tab);
    var app = "api_id=2463163&";
    var aid = "aid=" + objectlist.response[i].aid + "&";
    var oid = "oid=" + objectlist.response[i].owner_id + "&";
    get_playlist("add", app + aid + oid + acces_token_v);
    plusTop(i);
}
function actsLike(i, album) {
    var objectlist = new Object();
    objectlist = aoo_list(active_tab);
    var app = "&api_id=2463163&";
    var aids = "&aids=" + objectlist.response[i].aid;
    var album_v = "&album_id=" + album;
    get_playlist("like", acces_token_v + app + aids + album_v);
    plusTop(i);
    if (lastfm.sk != '' || typeof lastfm.sk != 'undefined') {
        var scr_artist = objectlist.response[i].artist;
        var scr_title = objectlist.response[i].title;
        if (album == 0) {
            get_playlist('lastfmLove',lastfm.lastfmUnLove(scr_artist, scr_title) , null);
        } else  {
            get_playlist('lastfmLove',lastfm.lastfmLove(scr_artist, scr_title) , null);
        }
    }
}
function actsDel(i) {
    var objectlist = new Object();
    objectlist = aoo_list(active_tab);
//    var app = "api_id=2463163&";
    var aid = "aid=" + objectlist.response[i].aid + "&";
    var oid = "oid=" + objectlist.response[i].owner_id + "&";
    get_playlist("del", aid + oid + acces_token_v);
}
function actsShare(i) {
    var objectlist = new Object();
    objectlist = aoo_list(active_tab);
    var app = "api_id=2463163&";
    var aid = objectlist.response[i].aid;
    var oid = objectlist.response[i].owner_id;
    var artist = objectlist.response[i].artist;
    var title = objectlist.response[i].title;
    var type_sh = "audio";
    var message = "message=#aooramusic " + artist + " - " + title + "&";
    var message_aoo = "message=" + artist + " - " + title + " #aooramusic #music &";
    var attachments = "attachments=" + type_sh + oid + "_" + aid + "&";
    var services = "services=twitter, facebook&";
    var owner_id = "owner_id=-42817636&";
//    var from_group = "from_group=0&"; //user
    var from_group = "from_group=1&";//admin
    var signed = "signed=1&";
    get_playlist("share",encodeURI(app + message + attachments + services)+ acces_token_v);
    get_playlist("share",encodeURI(app + owner_id + from_group + signed + message_aoo + attachments + services)+ acces_token_v);
    plusTop(i);
}
function ProcessOneFile( sSrcFile ) {
    var oFSO = new ActiveXObject("Scripting.FileSystemObject");
    var oDt = new Date();
    var sRenPrefix = oDt.getFullYear()
        + ("0" + (oDt.getMonth() + 1)).slice(-2) // 01 to 12
        + ("0" + oDt.getDate()).slice(-2)       // 01 to 31
        + ("_");

    var sFilename = oFSO.GetFileName(sSrcFile);  // e.g., filename.ext
    var sDestFile = gsDestFolder;
//    sDestFile += sRenPrefix;  // e.g., 20090714_
    sDestFile += sFilename;   // e.g., SomeFile.txt
    oFSO.CopyFile( sSrcFile, sDestFile ); // move & rename to target folder
}
//-----------------------------------------
function ProcessItemsFromDrop(){
    if (acces_token == '' || typeof acces_token == 'undefined') return false;
   var aoo_upload_track_i = 0;
    var oItem;
    while (oItem = System.Shell.itemFromFileDrop(event.dataTransfer, aoo_upload_track_i)) {
//            ProcessOneFile( oItem.path );
        if (oItem.size <= 209715200 && oItem.name.substr(oItem.name.length-4,4) == '.mp3') {
        get_playlist('getUploadServer',acces_token_v,oItem.path);
        aoo_upload_track++;
            aoo_upload_track_i++;
        } else return
    }
    var sHtml = "" + aoo_upload_track + " file(s) uploading...";
    status(sHtml);
    // clear the message after 5 seconds
//    window.setTimeout("document.all.resultsMsg.innerHTML='';", 5000);
}
function cach_response(reqVBS) {
    var qii = new $.parseJSON(reqVBS);
    get_playlist('audio.save',acces_token_v + '&server='+ qii.server + '&audio=' + encodeURIComponent(qii.audio) + '&hash=' + qii.hash );
}
function onScrollBoxDown() {
    scrollTab = true;
}
function onScrollBoxUp(){
    scrollTab = false;
    updatePositionTab();
}
function onMouseMove(){
    if (scrollTab)
    {
        setTabPercent(scrollPositionTab(window.event.clientY));
    }

}
function onMouseUp(){
    if (scrollTab) {
        scrollTab = false;
        setTabPercent(scrollPositionTab(window.event.clientY));
        updatePositionTab();
    }
}
function scrollPositionTab(y){

    var scrollBox = document.getElementById("scrollBox");
    var scrollBar = document.getElementById("scrollBar");
    var maxY = scrollBar.offsetParent.offsetTop+scrollBar.offsetHeight - scrollBox.offsetHeight;
    var minY = scrollBar.offsetParent.offsetTop;
    if (y>maxY) y = maxY;
    if (y<minY) y = minY;
    g = (y - scrollBar.offsetParent.offsetTop) / (scrollBar.offsetHeight);
    return g;
}
function setTabPercent(percent){
    var scrollBox = document.getElementById("scrollBox");
    var scrollBar = document.getElementById("scrollBar");
    var scrollableTabChild = $('#' + active_tab + 'list ul');
    var scrollableTab = document.getElementById(active_tab +"list");

    var t = Math.round(percent * scrollableTabChild.height());
    if (Math.abs(t)>(scrollableTabChild.height()-scrollableTab.offsetHeight)) t = scrollableTabChild.height()-scrollBar.offsetHeight;
    scrollBox.style.top = Math.round( percent * (scrollBox.offsetParent.offsetHeight)) + "px";
//    $('#' + active_tab + 'list ul li').css({'top': -t + 'px'});
    $('#' + active_tab + '').animate({ scrollTop: t }, 10);
}
function updatePositionTab(){
    if (scrollTab) return;

    if (!scrollTab && active_tab != 'release')
    {
        var scrollBox = document.getElementById("scrollBox");
        var scrollBar = document.getElementById("scrollBar");
        var scrollableTab = document.getElementById(active_tab+'list');
        var scrollableTabChild = $('#' + active_tab + 'list ul');


        var percent = 0;
        var tabTop = undefined;
        try {
            tabTop = $('#' + active_tab + 'list ul li').offset().top;}
        catch (e) {
        }
        finally {
            if (typeof tabTop != 'undefined') {
                percent = $('#' + active_tab + 'list ul li').offset().top / scrollableTab.scrollHeight;
            }
        }
        scrollBox.style.top = Math.round(-percent*scrollBar.offsetHeight) + "px";
        scrollBox.style.height = Math.round(scrollBar.offsetHeight*scrollableTab.offsetHeight/scrollableTab.scrollHeight) + 'px';
    }
}


$(document).ready(function () {
    //shuffle
    document.getElementById('shuffle').onclick = function () {
        if (System.Gadget.Settings.readString('shuffle') == 'true') {
            System.Gadget.Settings.writeString('shuffle','false');
            $(this).removeClass('on');
        } else {
            System.Gadget.Settings.writeString('shuffle','true');
            $(this).addClass('on');
        }
    };
    $('.to_search').live('click', function () {
//        debugger;
        var to_search = $(this).attr('alt');
        if (to_search == '') {
//          var f = $(this).parent().get(0).tagName;
//            alert(f);
          var k = $(this).parent();
        k.find('a.site').fadeOut().fadeIn().fadeOut().fadeIn();
            return false;
        } else {
            if (typeof acces_token != undefined && acces_token != '') {
                $('#insearch').val(to_search);
                $('.searchicon').click();
                searching(to_search);
            }
            else {
                status('Please open settings... Login');
            }
        }
    });

    // добавление трека
    $('.acts_add').live('click', function () {
        var i = $('#' + active_tab + ' ul li').index($(this).parents('.toplay'));
        actsAdd(i);
        $(this).parents('.toplay').stop().animate({"opacity":"0.3"}, "slow");
    });
    // перенос трека в любимые
    $('.acts_like').live('click', function () {
        var i = $('#' + active_tab + ' ul li').index($(this).parents('.toplay'));
        actsLike(i, aoolist_love_album_id );
//        $(this).parents('.toplay').stop().animate({"opacity":"0.3"}, "slow");
    });
    // удаление трека из любимых
    $('.acts_unlike').live('click', function () {
        var i = $('#' + active_tab + ' ul li').index($(this).parents('.toplay'));
        actsLike(i, 0);
        $(this).parents('.toplay').stop().animate({"opacity":"0.3"}, "slow");
    });
    // удаление трека
    $('.acts_del').live('click', function () {
        var i = $('#' + active_tab + ' ul li').index($(this).parents('.toplay'));
        actsDel(i);
        $(this).parents('.toplay').stop().animate({"opacity":"0.3"}, "slow");
    });
    // поделиться треком
    $('.acts_share').live('click', function () {
        var i = $('#' + active_tab + ' ul li').index($(this).parents('.toplay'));
        actsShare(i);
//        $(this).parents('.toplay').stop().animate({"opacity":"0.3"}, "slow");
    });
    // Двойной щелчок по треку
    $('.toplay').live('dblclick', function () {
        var objectlist = new Object();
        objectlist = aoo_list(active_list);
        scrobble(objectlist.response[active_track[active_list]].artist, objectlist.response[active_track[active_list]].title, objectlist.response[active_track[active_list]].duration);
        active_track[active_tab] = $('#' + active_tab + ' ul li').index(this);
        volume(0);
                stopnow();
        objectlist = aoo_list(active_list);
        status_t();
        player.URL = objectlist.response[active_track[active_list]].url;
        player.controls.play();
        volume(volume_curent);
        $("#play").fadeIn();
        $("#pause").hide();
        status(player.playState);
        sel_active_track(active_tab);
        return true;
    });
    // дополнительный поиск
    $('#extrasearch').live('click', function () {
        $('#extrasearch').parent('li').remove();
        search_more = true;
        aoolist_length.offset = aoolist_length.offset + 199;
        searching();
    });
    // опрос поискового поля
    $("#insearch").keydown(function (e) {
        search_more = false;
        if (search_busy == false) {
            if (((e.which < 8) && (e.which >= 0)) || ((e.which > 8) && (e.which < 32))) return false;
            aoolist_length.offset = 0;
            var qv = "";
            var c = (e.which < 32) ? ("") : (String.fromCharCode(e.which));
            qv = ($('#insearch').val() + c);
            searching(qv);
        }
    });
    // прокрутка плейлистов
    $('.box').mousewheel(function(event, delta){
        var scrollableTabChild = $('#' + active_tab + 'list ul');
        var h = scrollableTabChild.height();
        var tabTop = undefined;
        try {
            tabTop = $('#' + active_tab + 'list ul li').offset().top;
            if (delta > 0) {
//                if ((tabTop - Math.abs(delta)) < 0) {
//                    delta = 0;
//                }
                $(this).scrollTo("-=" + Math.abs(delta) * 20 + "px", 100);
            } else {
                if (delta < 0) {
//                    if ((tabTop + Math.abs(delta)) > h) {
//                        delta = 0;
//                    }
                    $(this).scrollTo("+=" + Math.abs(delta) * 20 + "px", 100);
                }
            }
            updatePositionTab();
        }
        catch (e) {
        }
    });
    // регулятор громкости
    $('#allcontrols').mousewheel(function (event, delta) {
        var volume_step = 5;
        if (delta > 0 && (volume_curent+volume_step)<=100 ) {
            volume_curent += volume_step;
            volume(volume_curent);

        } else {
            if (delta < 0 && (volume_curent-volume_step)>=0) {
                volume_curent -= volume_step;
                volume(volume_curent);
            }
        }
        status("Volume " + volume_curent + "%");
    });
    // сброс фокуса у ссылок
    $('a').focus(function () {
        $(this).blur();
    });

});


// плагины

// ParseQuery
jQuery.parseQuery = function (qs, options) {
    var q = (typeof qs === 'string' ? qs : window.location.search), o = {
        'f':function (v) {
            return unescape(v).replace(/\+/g, ' ');
        }
    }, options = (typeof qs === 'object' && typeof options === undefined) ? qs : options, o = jQuery.extend({}, o,
        options), params = {};
    jQuery.each(q.match(/^\??(.*)$/)[1].split('&'), function (i, p) {
        p = p.split('=');
        p[1] = o.f(p[1]);
        params[p[0]] =
            params[p[0]] ?
                ((params[p[0]] instanceof Array) ? (params[p[0]].push(p[1]), params[p[0]]) : [params[p[0]], p[1]]) :
                p[1];
    });
    return params;
};
// ParseQuery

//Clone Object
function clone(o) {
    if (!o || 'object' !== typeof o) {
        return o;
    }
    varc = 'function' === typeof o.pop ? [] : {};
    var p, v;
    var c = new Array();
    for (p in o) {
        if (o.hasOwnProperty(p)) {
            v = o[p];
            if (v && 'object' === typeof v) {
                c[p] = clone(v);
            } else {
                c[p] = v;
            }
        }
    }
    return c;
}
//Clone Object

function Stringify(jsonData) {
    var strJsonData = '{';
    var itemCount = 0;
    for (var item in jsonData) {
        if (itemCount > 0) {
            strJsonData += ', ';
        }
        temp = jsonData[item];
        if (typeof(temp) == 'object') {
            s = Stringify(temp);
        } else {
            s = '"' + temp + '"';
        }
        strJsonData += '"' + item + '":' + s;
        itemCount++;
    }
    strJsonData += '}';
    return strJsonData;
}

/*
 * jQuery Easing v1.3 - http://gsgd.co.uk/sandbox/jquery/easing/
 *
 * Uses the built in easing capabilities added In jQuery 1.1
 * to offer multiple easing options
 *
 * TERMS OF USE - jQuery Easing
 *
 * Open source under the BSD License.
 *
 * Copyright © 2008 George McGinley Smith
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 *
 * Redistributions of source code must retain the above copyright notice, this list of
 * conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice, this list
 * of conditions and the following disclaimer in the documentation and/or other materials
 * provided with the distribution.
 *
 * Neither the name of the author nor the names of contributors may be used to endorse
 * or promote products derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
 *  COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 *  EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
 *  GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED
 * AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 *  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED
 * OF THE POSSIBILITY OF SUCH DAMAGE.
 *
 */
// t: current time, b: begInnIng value, c: change In value, d: duration
jQuery.easing['jswing'] = jQuery.easing['swing']; jQuery.extend(jQuery.easing, {
    def: 'linear',
    swing: function(x, t, b, c, d) { return jQuery.easing[jQuery.easing.def](x, t, b, c, d) }, easeInQuad: function(x, t, b, c, d) { return c * (t /= d) * t + b }, easeOutQuad: function(x, t, b, c, d) { return -c * (t /= d) * (t - 2) + b }, easeInOutQuad: function(x, t, b, c, d) { if ((t /= d / 2) < 1) return c / 2 * t * t + b; return -c / 2 * ((--t) * (t - 2) - 1) + b }, easeInCubic: function(x, t, b, c, d) { return c * (t /= d) * t * t + b }, easeOutCubic: function(x, t, b, c, d) { return c * ((t = t / d - 1) * t * t + 1) + b }, easeInOutCubic: function(x, t, b, c, d) { if ((t /= d / 2) < 1) return c / 2 * t * t * t + b; return c / 2 * ((t -= 2) * t * t + 2) + b }, easeInQuart: function(x, t, b, c, d) { return c * (t /= d) * t * t * t + b }, easeOutQuart: function(x, t, b, c, d) { return -c * ((t = t / d - 1) * t * t * t - 1) + b }, easeInOutQuart: function(x, t, b, c, d) { if ((t /= d / 2) < 1) return c / 2 * t * t * t * t + b; return -c / 2 * ((t -= 2) * t * t * t - 2) + b }, easeInQuint: function(x, t, b, c, d) { return c * (t /= d) * t * t * t * t + b }, easeOutQuint: function(x, t, b, c, d) { return c * ((t = t / d - 1) * t * t * t * t + 1) + b }, easeInOutQuint: function(x, t, b, c, d) { if ((t /= d / 2) < 1) return c / 2 * t * t * t * t * t + b; return c / 2 * ((t -= 2) * t * t * t * t + 2) + b }, easeInSine: function(x, t, b, c, d) { return -c * Math.cos(t / d * (Math.PI / 2)) + c + b }, easeOutSine: function(x, t, b, c, d) { return c * Math.sin(t / d * (Math.PI / 2)) + b }, easeInOutSine: function(x, t, b, c, d) { return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b }, easeInExpo: function(x, t, b, c, d) { return (t == 0) ? b : c * Math.pow(2, 10 * (t / d - 1)) + b }, easeOutExpo: function(x, t, b, c, d) { return (t == d) ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b }, easeInOutExpo: function(x, t, b, c, d) { if (t == 0) return b; if (t == d) return b + c; if ((t /= d / 2) < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b; return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b }, easeInCirc: function(x, t, b, c, d) { return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b }, easeOutCirc: function(x, t, b, c, d) { return c * Math.sqrt(1 - (t = t / d - 1) * t) + b }, easeInOutCirc: function(x, t, b, c, d) { if ((t /= d / 2) < 1) return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b; return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b }, easeInElastic: function(x, t, b, c, d) { var s = 1.70158; var p = 0; var a = c; if (t == 0) return b; if ((t /= d) == 1) return b + c; if (!p) p = d * .3; if (a < Math.abs(c)) { a = c; var s = p / 4 } else var s = p / (2 * Math.PI) * Math.asin(c / a); return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b }, easeOutElastic: function(x, t, b, c, d) { var s = 1.70158; var p = 0; var a = c; if (t == 0) return b; if ((t /= d) == 1) return b + c; if (!p) p = d * .3; if (a < Math.abs(c)) { a = c; var s = p / 4 } else var s = p / (2 * Math.PI) * Math.asin(c / a); return a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b }, easeInOutElastic: function(x, t, b, c, d) { var s = 1.70158; var p = 0; var a = c; if (t == 0) return b; if ((t /= d / 2) == 2) return b + c; if (!p) p = d * (.3 * 1.5); if (a < Math.abs(c)) { a = c; var s = p / 4 } else var s = p / (2 * Math.PI) * Math.asin(c / a); if (t < 1) return -.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b; return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p) * .5 + c + b }, easeInBack: function(x, t, b, c, d, s) { if (s == undefined) s = 1.70158; return c * (t /= d) * t * ((s + 1) * t - s) + b }, easeOutBack: function(x, t, b, c, d, s) { if (s == undefined) s = 1.70158; return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b }, easeInOutBack: function(x, t, b, c, d, s) { if (s == undefined) s = 1.70158; if ((t /= d / 2) < 1) return c / 2 * (t * t * (((s *= (1.525)) + 1) * t - s)) + b; return c / 2 * ((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2) + b }, easeInBounce: function(x, t, b, c, d) { return c - jQuery.easing.easeOutBounce(x, d - t, 0, c, d) + b }, easeOutBounce: function(x, t, b, c, d) { if ((t /= d) < (1 / 2.75)) { return c * (7.5625 * t * t) + b } else if (t < (2 / 2.75)) { return c * (7.5625 * (t -= (1.5 / 2.75)) * t + .75) + b } else if (t < (2.5 / 2.75)) { return c * (7.5625 * (t -= (2.25 / 2.75)) * t + .9375) + b } else { return c * (7.5625 * (t -= (2.625 / 2.75)) * t + .984375) + b } }, easeInOutBounce: function(x, t, b, c, d) { if (t < d / 2) return jQuery.easing.easeInBounce(x, t * 2, 0, c, d) * .5 + b; return jQuery.easing.easeOutBounce(x, t * 2 - d, 0, c, d) * .5 + c * .5 + b } });


/**
 * Copyright (c) 2007-2012 Ariel Flesler - aflesler(at)gmail(dot)com | http://flesler.blogspot.com
 * Dual licensed under MIT and GPL.
 * @author Ariel Flesler
 * @version 1.4.3.1
 */
;(function($){var h=$.scrollTo=function(a,b,c){$(window).scrollTo(a,b,c)};h.defaults={axis:'xy',duration:parseFloat($.fn.jquery)>=1.3?0:1,limit:true};h.window=function(a){return $(window)._scrollable()};$.fn._scrollable=function(){return this.map(function(){var a=this,isWin=!a.nodeName||$.inArray(a.nodeName.toLowerCase(),['iframe','#document','html','body'])!=-1;if(!isWin)return a;var b=(a.contentWindow||a).document||a.ownerDocument||a;return/webkit/i.test(navigator.userAgent)||b.compatMode=='BackCompat'?b.body:b.documentElement})};$.fn.scrollTo=function(e,f,g){if(typeof f=='object'){g=f;f=0}if(typeof g=='function')g={onAfter:g};if(e=='max')e=9e9;g=$.extend({},h.defaults,g);f=f||g.duration;g.queue=g.queue&&g.axis.length>1;if(g.queue)f/=2;g.offset=both(g.offset);g.over=both(g.over);return this._scrollable().each(function(){if(e==null)return;var d=this,$elem=$(d),targ=e,toff,attr={},win=$elem.is('html,body');switch(typeof targ){case'number':case'string':if(/^([+-]=)?\d+(\.\d+)?(px|%)?$/.test(targ)){targ=both(targ);break}targ=$(targ,this);if(!targ.length)return;case'object':if(targ.is||targ.style)toff=(targ=$(targ)).offset()}$.each(g.axis.split(''),function(i,a){var b=a=='x'?'Left':'Top',pos=b.toLowerCase(),key='scroll'+b,old=d[key],max=h.max(d,a);if(toff){attr[key]=toff[pos]+(win?0:old-$elem.offset()[pos]);if(g.margin){attr[key]-=parseInt(targ.css('margin'+b))||0;attr[key]-=parseInt(targ.css('border'+b+'Width'))||0}attr[key]+=g.offset[pos]||0;if(g.over[pos])attr[key]+=targ[a=='x'?'width':'height']()*g.over[pos]}else{var c=targ[pos];attr[key]=c.slice&&c.slice(-1)=='%'?parseFloat(c)/100*max:c}if(g.limit&&/^\d+$/.test(attr[key]))attr[key]=attr[key]<=0?0:Math.min(attr[key],max);if(!i&&g.queue){if(old!=attr[key])animate(g.onAfterFirst);delete attr[key]}});animate(g.onAfter);function animate(a){$elem.animate(attr,f,g.easing,a&&function(){a.call(this,e,g)})}}).end()};h.max=function(a,b){var c=b=='x'?'Width':'Height',scroll='scroll'+c;if(!$(a).is('html,body'))return a[scroll]-$(a)[c.toLowerCase()]();var d='client'+c,html=a.ownerDocument.documentElement,body=a.ownerDocument.body;return Math.max(html[scroll],body[scroll])-Math.min(html[d],body[d])};function both(a){return typeof a=='object'?a:{top:a,left:a}}})(jQuery);


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
        setup:function () {
            var handler = jQuery.event.special.mousewheel.handler;

            // Fix pageX, pageY, clientX and clientY for mozilla
            if (jQuery.browser.mozilla) {
                jQuery(this).bind('mousemove.mousewheel', function (event) {
                    jQuery.data(this, 'mwcursorposdata', {
                        pageX:event.pageX,
                        pageY:event.pageY,
                        clientX:event.clientX,
                        clientY:event.clientY
                    });
                });
            }

            if (this.addEventListener) {
                this.addEventListener((jQuery.browser.mozilla ? 'DOMMouseScroll' : 'mousewheel'), handler, false);
            } else {
                this.onmousewheel = handler;
            }
        },

        teardown:function () {
            var handler = jQuery.event.special.mousewheel.handler;

            jQuery(this).unbind('mousemove.mousewheel');

            if (this.removeEventListener) {
                this.removeEventListener((
                    jQuery.browser.mozilla ? 'DOMMouseScroll' : 'mousewheel'), handler, false);
            } else {
                this.onmousewheel = function () {
                };
            }

            jQuery.removeData(this, 'mwcursorposdata');
        },

        handler:function (event) {
            var args = Array.prototype.slice.call(arguments, 1);

            event = jQuery.event.fix(event || window.event);
            // Get correct pageX, pageY, clientX and clientY for mozilla
            jQuery.extend(event, jQuery.data(this, 'mwcursorposdata') || {});
            var delta = 0, returnValue = true;

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
        mousewheel:function (fn) {
            return fn ? this.bind("mousewheel", fn) : this.trigger("mousewheel");
        },

        unmousewheel:function (fn) {
            return this.unbind("mousewheel", fn);
        }
    });

})(jQuery);

//var MD5 = function (string) {
//
//    function RotateLeft(lValue, iShiftBits) {
//        return (lValue << iShiftBits) | (lValue >>> (32 - iShiftBits));
//    }
//
//    function AddUnsigned(lX, lY) {
//        var lX4, lY4, lX8, lY8, lResult;
//        lX8 = (lX & 0x80000000);
//        lY8 = (lY & 0x80000000);
//        lX4 = (lX & 0x40000000);
//        lY4 = (lY & 0x40000000);
//        lResult = (lX & 0x3FFFFFFF) + (lY & 0x3FFFFFFF);
//        if (lX4 & lY4) {
//            return (lResult ^ 0x80000000 ^ lX8 ^ lY8);
//        }
//        if (lX4 | lY4) {
//            if (lResult & 0x40000000) {
//                return (lResult ^ 0xC0000000 ^ lX8 ^ lY8);
//            } else {
//                return (lResult ^ 0x40000000 ^ lX8 ^ lY8);
//            }
//        } else {
//            return (lResult ^ lX8 ^ lY8);
//        }
//    }
//
//    function F(x, y, z) { return (x & y) | ((~x) & z); }
//
//    function G(x, y, z) { return (x & z) | (y & (~z)); }
//
//    function H(x, y, z) { return (x ^ y ^ z); }
//
//    function I(x, y, z) { return (y ^ (x | (~z))); }
//
//    function FF(a, b, c, d, x, s, ac) {
//        a = AddUnsigned(a, AddUnsigned(AddUnsigned(F(b, c, d), x), ac));
//        return AddUnsigned(RotateLeft(a, s), b);
//    }
//
//    ;
//
//    function GG(a, b, c, d, x, s, ac) {
//        a = AddUnsigned(a, AddUnsigned(AddUnsigned(G(b, c, d), x), ac));
//        return AddUnsigned(RotateLeft(a, s), b);
//    }
//
//    ;
//
//    function HH(a, b, c, d, x, s, ac) {
//        a = AddUnsigned(a, AddUnsigned(AddUnsigned(H(b, c, d), x), ac));
//        return AddUnsigned(RotateLeft(a, s), b);
//    }
//
//    ;
//
//    function II(a, b, c, d, x, s, ac) {
//        a = AddUnsigned(a, AddUnsigned(AddUnsigned(I(b, c, d), x), ac));
//        return AddUnsigned(RotateLeft(a, s), b);
//    }
//
//    ;
//
//    function ConvertToWordArray(string) {
//        var lWordCount;
//        var lMessageLength = string.length;
//        var lNumberOfWords_temp1 = lMessageLength + 8;
//        var lNumberOfWords_temp2 = (lNumberOfWords_temp1 - (lNumberOfWords_temp1 % 64)) / 64;
//        var lNumberOfWords = (lNumberOfWords_temp2 + 1) * 16;
//        var lWordArray = Array(lNumberOfWords - 1);
//        var lBytePosition = 0;
//        var lByteCount = 0;
//        while (lByteCount < lMessageLength) {
//            lWordCount = (lByteCount - (lByteCount % 4)) / 4;
//            lBytePosition = (lByteCount % 4) * 8;
//            lWordArray[lWordCount] = (lWordArray[lWordCount] | (string.charCodeAt(lByteCount) << lBytePosition));
//            lByteCount++;
//        }
//        lWordCount = (lByteCount - (lByteCount % 4)) / 4;
//        lBytePosition = (lByteCount % 4) * 8;
//        lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80 << lBytePosition);
//        lWordArray[lNumberOfWords - 2] = lMessageLength << 3;
//        lWordArray[lNumberOfWords - 1] = lMessageLength >>> 29;
//        return lWordArray;
//    }
//
//    ;
//
//    function WordToHex(lValue) {
//        var WordToHexValue = "", WordToHexValue_temp = "", lByte, lCount;
//        for (lCount = 0; lCount <= 3; lCount++) {
//            lByte = (lValue >>> (lCount * 8)) & 255;
//            WordToHexValue_temp = "0" + lByte.toString(16);
//            WordToHexValue = WordToHexValue + WordToHexValue_temp.substr(WordToHexValue_temp.length - 2, 2);
//        }
//        return WordToHexValue;
//    }
//
//    ;
//
//    function Utf8Encode(string) {
//        string = string.replace(/\r\n/g, "\n");
//        var utftext = "";
//
//        for (var n = 0; n < string.length; n++) {
//
//            var c = string.charCodeAt(n);
//
//            if (c < 128) {
//                utftext += String.fromCharCode(c);
//            }
//            else {
//                if ((c > 127) && (c < 2048)) {
//                    utftext += String.fromCharCode((c >> 6) | 192);
//                    utftext += String.fromCharCode((c & 63) | 128);
//                }
//                else {
//                    utftext += String.fromCharCode((c >> 12) | 224);
//                    utftext += String.fromCharCode(((c >> 6) & 63) | 128);
//                    utftext += String.fromCharCode((c & 63) | 128);
//                }
//            }
//
//        }
//
//        return utftext;
//    }
//
//    ;
//
//    var x = Array();
//    var k, AA, BB, CC, DD, a, b, c, d;
//    var S11 = 7, S12 = 12, S13 = 17, S14 = 22;
//    var S21 = 5, S22 = 9 , S23 = 14, S24 = 20;
//    var S31 = 4, S32 = 11, S33 = 16, S34 = 23;
//    var S41 = 6, S42 = 10, S43 = 15, S44 = 21;
//
//    string = Utf8Encode(string);
//
//    x = ConvertToWordArray(string);
//
//    a = 0x67452301;
//    b = 0xEFCDAB89;
//    c = 0x98BADCFE;
//    d = 0x10325476;
//
//    for (k = 0; k < x.length; k += 16) {
//        AA = a;
//        BB = b;
//        CC = c;
//        DD = d;
//        a = FF(a, b, c, d, x[k + 0], S11, 0xD76AA478);
//        d = FF(d, a, b, c, x[k + 1], S12, 0xE8C7B756);
//        c = FF(c, d, a, b, x[k + 2], S13, 0x242070DB);
//        b = FF(b, c, d, a, x[k + 3], S14, 0xC1BDCEEE);
//        a = FF(a, b, c, d, x[k + 4], S11, 0xF57C0FAF);
//        d = FF(d, a, b, c, x[k + 5], S12, 0x4787C62A);
//        c = FF(c, d, a, b, x[k + 6], S13, 0xA8304613);
//        b = FF(b, c, d, a, x[k + 7], S14, 0xFD469501);
//        a = FF(a, b, c, d, x[k + 8], S11, 0x698098D8);
//        d = FF(d, a, b, c, x[k + 9], S12, 0x8B44F7AF);
//        c = FF(c, d, a, b, x[k + 10], S13, 0xFFFF5BB1);
//        b = FF(b, c, d, a, x[k + 11], S14, 0x895CD7BE);
//        a = FF(a, b, c, d, x[k + 12], S11, 0x6B901122);
//        d = FF(d, a, b, c, x[k + 13], S12, 0xFD987193);
//        c = FF(c, d, a, b, x[k + 14], S13, 0xA679438E);
//        b = FF(b, c, d, a, x[k + 15], S14, 0x49B40821);
//        a = GG(a, b, c, d, x[k + 1], S21, 0xF61E2562);
//        d = GG(d, a, b, c, x[k + 6], S22, 0xC040B340);
//        c = GG(c, d, a, b, x[k + 11], S23, 0x265E5A51);
//        b = GG(b, c, d, a, x[k + 0], S24, 0xE9B6C7AA);
//        a = GG(a, b, c, d, x[k + 5], S21, 0xD62F105D);
//        d = GG(d, a, b, c, x[k + 10], S22, 0x2441453);
//        c = GG(c, d, a, b, x[k + 15], S23, 0xD8A1E681);
//        b = GG(b, c, d, a, x[k + 4], S24, 0xE7D3FBC8);
//        a = GG(a, b, c, d, x[k + 9], S21, 0x21E1CDE6);
//        d = GG(d, a, b, c, x[k + 14], S22, 0xC33707D6);
//        c = GG(c, d, a, b, x[k + 3], S23, 0xF4D50D87);
//        b = GG(b, c, d, a, x[k + 8], S24, 0x455A14ED);
//        a = GG(a, b, c, d, x[k + 13], S21, 0xA9E3E905);
//        d = GG(d, a, b, c, x[k + 2], S22, 0xFCEFA3F8);
//        c = GG(c, d, a, b, x[k + 7], S23, 0x676F02D9);
//        b = GG(b, c, d, a, x[k + 12], S24, 0x8D2A4C8A);
//        a = HH(a, b, c, d, x[k + 5], S31, 0xFFFA3942);
//        d = HH(d, a, b, c, x[k + 8], S32, 0x8771F681);
//        c = HH(c, d, a, b, x[k + 11], S33, 0x6D9D6122);
//        b = HH(b, c, d, a, x[k + 14], S34, 0xFDE5380C);
//        a = HH(a, b, c, d, x[k + 1], S31, 0xA4BEEA44);
//        d = HH(d, a, b, c, x[k + 4], S32, 0x4BDECFA9);
//        c = HH(c, d, a, b, x[k + 7], S33, 0xF6BB4B60);
//        b = HH(b, c, d, a, x[k + 10], S34, 0xBEBFBC70);
//        a = HH(a, b, c, d, x[k + 13], S31, 0x289B7EC6);
//        d = HH(d, a, b, c, x[k + 0], S32, 0xEAA127FA);
//        c = HH(c, d, a, b, x[k + 3], S33, 0xD4EF3085);
//        b = HH(b, c, d, a, x[k + 6], S34, 0x4881D05);
//        a = HH(a, b, c, d, x[k + 9], S31, 0xD9D4D039);
//        d = HH(d, a, b, c, x[k + 12], S32, 0xE6DB99E5);
//        c = HH(c, d, a, b, x[k + 15], S33, 0x1FA27CF8);
//        b = HH(b, c, d, a, x[k + 2], S34, 0xC4AC5665);
//        a = II(a, b, c, d, x[k + 0], S41, 0xF4292244);
//        d = II(d, a, b, c, x[k + 7], S42, 0x432AFF97);
//        c = II(c, d, a, b, x[k + 14], S43, 0xAB9423A7);
//        b = II(b, c, d, a, x[k + 5], S44, 0xFC93A039);
//        a = II(a, b, c, d, x[k + 12], S41, 0x655B59C3);
//        d = II(d, a, b, c, x[k + 3], S42, 0x8F0CCC92);
//        c = II(c, d, a, b, x[k + 10], S43, 0xFFEFF47D);
//        b = II(b, c, d, a, x[k + 1], S44, 0x85845DD1);
//        a = II(a, b, c, d, x[k + 8], S41, 0x6FA87E4F);
//        d = II(d, a, b, c, x[k + 15], S42, 0xFE2CE6E0);
//        c = II(c, d, a, b, x[k + 6], S43, 0xA3014314);
//        b = II(b, c, d, a, x[k + 13], S44, 0x4E0811A1);
//        a = II(a, b, c, d, x[k + 4], S41, 0xF7537E82);
//        d = II(d, a, b, c, x[k + 11], S42, 0xBD3AF235);
//        c = II(c, d, a, b, x[k + 2], S43, 0x2AD7D2BB);
//        b = II(b, c, d, a, x[k + 9], S44, 0xEB86D391);
//        a = AddUnsigned(a, AA);
//        b = AddUnsigned(b, BB);
//        c = AddUnsigned(c, CC);
//        d = AddUnsigned(d, DD);
//    }
//
//    var temp = WordToHex(a) + WordToHex(b) + WordToHex(c) + WordToHex(d);
//
//    return temp.toLowerCase();
//};

