var copiedText = null;
var allClips=[];

// 사이드바 열려있는지 체크
var is_open = false;
whale.sidebarAction.onClicked.addListener(function(result) {
    if(result.opened) {
        is_open = true;
    } else {
        is_open = false;
    }
});

// 단축키
whale.commands.onCommand.addListener(function (command) {
     // 사이드바 on/off 단축키
    if(command === "sidebar_action") {
        if(is_open) {
            whale.sidebarAction.hide();
            is_open = false;
        } else {
            whale.sidebarAction.show();
            is_open = true;
        }
    }
});

chrome.runtime.onMessage.addListener(function(a, c, b) {
        if(a.event=="copy"){
            copiedText = a.text;
            allClips.push(copiedText);
            d = allClips.length;
            if (d>25) {
                e = d-25;
                allClips.splice(0,e);
            }
            // alert(copiedText);
            // alert(allClips);

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

function removeAllClip(){
    allClips = [];
    assignBadge();
}

function returnClip(a){
    return allClips[a];
};