
function settingsClosing(event) {
    if (event.closeAction == event.Action.commit) {//
//		
//		// убираем выделение ошибок
	$('.error').removeClass('error');
		
		var token =  $('#token').text();
		if(isNaN(token)) {
//			// если token не число от 0 до 100
//			// отменяем закрытие окна настроек
	//		event.cancel = true;
//			// показываем ошибку
			$('#token').parent().addClass('error');
		}
//		
//		var backgroundMode = $('#backgroundMode').val();
//		
//		var showImages = $('#showImages').get(0).checked ? 'yes' : 'no';
//			
//		// если не было ошибок сохраняем значения
		if(!event.cancel) {	
			System.Gadget.Settings.writeString('token', token);
			//System.Gadget.Settings.writeString('backgroundMode', backgroundMode);
			//System.Gadget.Settings.writeString('showImages', showImages);
			
		}
 }

}
function main() {
    System.Gadget.onSettingsClosing = settingsClosing;
	// считываем старые значения настроек и показываем их в форме
	$('#token').val(System.Gadget.Settings.readString('token'));
$('#login').click(function(){
var eventsWindow = window.open('http://api.vkontakte.ru/oauth/authorize?client_id=2463163&scope=audio,offline&redirect_uri=http://api.vkontakte.ru/blank.html&display=popup&response_type=token','popup','width=500,height=500');
eventsWindow.onload;
$('#tokenin').slideToggle();
});
checkUpdates();

}

$(document).ready(function(){
    main();
});
    function getURL(u)
    {
        function get_v()
        {
            if (xmlReq.readyState == 4)
            {
                if(xmlReq.status==200)
                {
                    var urlData = null;
                        urlData = xmlReq.responseText;
                        if(urlData===false)
                        {
                            return false;
                        }
                        var version="1.0";
                        var a=parseFloat(version);
                        var b=parseFloat(urlData);
                    if (b>a)
                    {

                        document.getElementById("about").innerHTML = '<p><a localize="aboutNext,href:aboutHref,title:aboutTitle" href="http://aoo.xfactorial.com/">Download new Aoo!Player</a></p>';
                        return true;
                       }
                    else {
                        document.getElementById("about").innerHTML = '<p><a localize="about,href:aboutHref,title:aboutTitle" href="http://aoo.xfactorial.com/">Aoo!Player</a></p>';
                        return false;
                    }
                }
            }
            return true;
        }
        var xmlReq=new XMLHttpRequest();
            xmlReq.open("GET",u,true);
            xmlReq.setRequestHeader("If-Modified-Since", "Sat, 1 Jan 2000 00:00:00 GMT");
            xmlReq.onreadystatechange = get_v;
            xmlReq.send(null);
        
    }


function checkUpdates()
{
    
    getURL("http://aoo.xfactorial.com/version.php");

}

