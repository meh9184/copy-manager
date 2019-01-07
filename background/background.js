var copiedText = null;
var allClips=[];

chrome.runtime.onMessage.addListener(function(a, c, b) {
        if(a.event=="copy"){
            copiedText = a.text;
            allClips.push(copiedText);
            d = allClips.length;
            if (d>25) {
                e = d-25;
                allClips.splice(0,e);
            }
            alert(copiedText);
            alert(allClips);

            assignBadge()
        }
        b({copiedText:copiedText})
    }
);

function assignBadge(){
    var a = allClips.length;

    // alert("new badge:"+ a);
    whale.sidebarAction.setBadgeText({text:""+a});
    // chrome.browserAction.setTitle({title:a+"  clips"})
}

function getAllClips(){
    return allClips
}
function removeClip(a){
    allClips.splice(a,1);
    assignBadge();
}
function returnClip(a){
    return allClips[a];
};