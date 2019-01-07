function floatBar() {
    var $myelement = $('#clipid');
	$myelement.css("text-align", "center");
	$myelement.css("font-weight", "bolder");
    $(window).bind('scroll', function(){
       $myelement.css({
           position: 'absolute',
           top: $(window).scrollTop()
       });
    });

  $("#clipid").hide().prependTo("body")
      .slideDown('fast').delay(1000).slideUp(function() { $(this).remove(); });
}
function showMessageWhenCipped(data) {
	var trends_dom = document.createElement('div');
	trends_dom.setAttribute('id',"clipid");
    trends_dom.innerText = '+ One clip added to clipboard!!!';
    trends_dom.style.background = '#555';
    trends_dom.style.color = '#fff';
    trends_dom.style.padding = '14px';
    trends_dom.style.position = 'fixed';
    trends_dom.style.font = '14px Verdana';
	trends_dom.style.zIndex = '123456';
	trends_dom.style.top = '0';
	trends_dom.style.left = '0';
	trends_dom.style.width ="100%";
	trends_dom.style.margin ="auto";	
	document.body.insertBefore(trends_dom, document.body.firstChild);
	floatBar();
}

function updateClipboardFromBackground(data) {
    showMessageWhenCipped(data.copiedText);
}
// on copy event, send a message to background.html
function onCopy(e) { 
var sel = window.getSelection();
sel=sel + "";
chrome.runtime.sendMessage({'event':'copy','text':sel},updateClipboardFromBackground);
}
//register event listener for copy events on document
document.addEventListener('copy',onCopy,true); 

