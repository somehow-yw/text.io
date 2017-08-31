$(function () {
    isShowHeader()
});

function isShowHeader(){
    var ua = window.navigator.userAgent.toLowerCase();
    if(ua.match(/MicroMessenger/i) == 'micromessenger'  || ua.match(/WeiBo/i) == "weibo"
        ||navigator.userAgent.indexOf("MQQBrowser") > -1){
        $("header.ui-bar").hide();
    }
}

try {
    window.localStorage.foobar = "foobar";
} catch(_) {
    alert("若为safari浏览器请关闭隐身模式浏览。");
}