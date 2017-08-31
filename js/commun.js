var URLCfg = {
		banner:"../gameBanner",
		bannerByPack:"../../gameBanner",
		gamelist:"../gameList",
		gameInfo:"../gameInfo",
		searchKey:"../searchKey",
		weixinSign:"../weiXinSign",
		checkSmsCode:"../../checkCode",
		sendSmsCode:"../../sendSmsCode",
		userlogin:"../../userLogin",
		userRegister:"../../userRegister",
		userRegisterByAccount:"../../userRegisterAccount",
		resetPassword:"../../resetPassword",
		records :"../../orderList",
		bindPhone :"../../bindPhone",
		unBindPhone:"../../unBindPhone",
		packList:"../../packList",
		packDetail:"../../packDetail",
		receivePack:"../../receivePack",
		packListGameDetail:"../packList",

};


var PAGECfg = {
		loginPage:"./login.html",
		registerPage:"./register.html",
		registerAccountNamePage:"./username_register.html",
		personalPage:"./personal.html",
		registerPageEnterPassword:"./phone_register.html",
		updatePassword:"./update_password.html",
		findPassword:"./find_passwprd.html",
		records:"../moneyrecord/money_record.html",
		bindPage:"./bind.html",
		unBindPage:"./nobind.html",
		packListPage:"../gifts/noviece_pack.html",
		packDetailPage:"../gifts/pack_detail.html",
		packDetailByGameInfoPage:"./gifts/pack_detail.html",
		loginPageByPack:"../user/login.html",
		discountPage:"../discount/discount.html",
		contactPage:"./contact.html",
 };


var SESSION_KEY = {
		PAGE:"pageNum",
		SEARCH_HISTORY:"searchHistory",
		SEARCH_LIST_DATA:"searchListData",
		SELECT_TYPE_KEY :"typeKey",
		SELECT_TAG_KEY :"tagKey",
		SELECT_THEME_KEY :"themeKey",
		SEARCH_KEY_WORD :"searchKeyWord",
		USER_INFO:"userInfo",
		PHONE:"phone",
		SMSCODE:"smscode",
		PASSWORD:"password",
		PACK_ID:"packId",
		GAME_ID:"gameId",
		GAME_TYPE:"gameType",
		PHONE_IDFA:"idfa",
		SHARE_ID:"share_id",
		SHARE_USER_ID:"share_user_id",
		DEVICE_ID:"device_id"
};


var BAIDUTONGJI_CATEGORY = {
		TO_DETAIL : "点击进入详情",//点击进入详情
		TO_INSTALL_BY_LIST : "列表安装",//列表点击安装按钮
		TO_INSTALL_BY_DETAIL: "详情安装",//详情点击安装按钮
		TO_BACK_BY_DETAIL  : "返回",//详情点击返回按钮
		
		ON_GAME_LIST:"游戏列表",
		ON_GAME_DETAIL:"游戏详情",
};

var BAIDUTONGJI_OPTION = {
		INSTALL:"点击安装",
		BACK:"点击返回",
		DETAIL:"进入详情",
		COLLECTION:"点击收藏",

}
function getInfo(){
var s = "";   
  
s += " 屏幕分辨率的高："+ window.screen.height+"\n";    
s += " 屏幕分辨率的宽："+ window.screen.width+"\n";    
s += " 屏幕可用工作区高度："+ window.screen.availHeight+"\n";    
s += " 屏幕可用工作区宽度："+ window.screen.availWidth+"\n";    
s += " 你的屏幕设置是 "+ window.screen.colorDepth +" 位彩色"+"\n";    
s += " 你的屏幕设置 "+ window.screen.deviceXDPI +" 像素/英寸"+"\n";    
alert (s);
}


//loading 创建 显示 隐藏
function createLoading(){
	var div = "";
	div += '<div class="loading-bg">';
	div += '<div class="loading-img">';
	div += '<img src="./images/get_loading.gif"/>';
	div += '</div>';
	div += '</div>';
	$("body").append(div);
}

function loadingShow(){

	$(".loading-img").css("display","block");
}
function loadingClose(){

	$(".loading-img").css("display","none");
}

var IS_DEBUG = true;
var CLICK = false;
var DOWN_URL_TEST = 'itms-services://?action=download-manifest&url=https://git.oschina.net/hzzhplist/plist/raw/master/4488box_test.plist';
var DOWN_URL =      'itms-services://?action=download-manifest&url=https://git.oschina.net/hzzhplist/plist/raw/master/4488box.plist';
var ANDROID_DOWN_URL =  'http://oss.4488.mobi/4488box/';
var ANDROID_DOWN_URL_TEST =  'http://oss.4488.mobi/4488box_test/';

function yes(){
	$(".opacity-bg").css({"background":"rgba(0,0,0,0)","display":"none"})
	$(".crenter-eject").css("display","none");
	CLICK = true;
	return true;
}



function no(){
	$(".opacity-bg").css({"background":"rgba(0,0,0,0)","display":"none"})
	$(".crenter-eject").css("display","none");
	CLICK = false;
	return false;
}


function Alert(title){
	var div = '<div class="eject"  style="z-index:999;position:fixed;top:30%" >'+title+'</div>';
	$(document.body).append(div);
	//三秒后弹框消失
	var wait = 2;
	var id = setInterval(function(){
			if(wait === 0){
				clearInterval(id);
				$(".eject").remove();
					wait = 2;
			}
			else{
				wait--;
			}
		},1000)
}

function myconfirm(title){
	var div = "";
	div +='<div class="opacity-bg"  >';
	div +='<div class="crenter-eject">';
	div +='	<h4 class="detail-title">'+title+'</h4>';
	div +='	<p class="no-yes">';
	div +='		<a id="yes" onclick="no()" href="javascript:void(0);">否</a>';
	div +='		<a id="no"  onclick="yes()"  href="javascript:void(0);">是</a>';
	div +='	</p>';
	div +='</div>';
	div +='	</div>';
	$(document.body).append(div);
	 
	return CLICK;
}

//礼包领取成功弹窗
function myShow(){
	$("#get-bg").css("display","block");
	$("#get-bg").css("background","rgba(0,0,0,0.5)")
	$(".get-success").css("display","block");
}

function GetQueryString(name)
{
     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
     var r = window.location.search.substr(1).match(reg);
     if(r!=null)return  unescape(r[2]); return null;
}

 function getURL(){
	var tjUserId = GetQueryString("tjuserid");
	
	var GAME_LIST = "./list.html"+"?tjuserid="+tjUserId;
	var GIFT_LIST = "./gifts/noviece_pack.html"+"?tjuserid="+tjUserId;
	var PERSONAL = "./user/personal.html"+"?tjuserid="+tjUserId;
	
	
	  $("#gameListId").attr("href",GAME_LIST);
	  $("#giftListId").attr("href",GIFT_LIST);
	  $("#personalListId").attr("href",PERSONAL);
}
 
 function getURL2(){
		var tjUserId = GetQueryString("tjuserid");
		
		var GAME_LIST = "../list.html"+"?tjuserid="+tjUserId;
		var GIFT_LIST = "../gifts/noviece_pack.html"+"?tjuserid="+tjUserId;
		var PERSONAL = "../user/personal.html"+"?tjuserid="+tjUserId;
		
		
		  $("#gameListId").attr("href",GAME_LIST);
		  $("#giftListId").attr("href",GIFT_LIST);
		  $("#personalListId").attr("href",PERSONAL);
	}
	 


function returnHomePage(){
	  var ua = window.navigator.userAgent.toLowerCase();
	    if(ua.match(/MicroMessenger/i) == 'micromessenger'  || ua.match(/WeiBo/i) == "weibo"
	        ||navigator.userAgent.indexOf("MQQBrowser") > -1){
	    }else{
	    	//未微信浏览器，跳转到4488
	    	var domain  =document.domain;
	    	if(domain !="4488.mobi" && domain !="localhost" && !IS_DEBUG){
	    		window.location.href ="http://4488.mobi";
	    	}
	    }
}

function returnSearchPage(){
	  var ua = window.navigator.userAgent.toLowerCase();
	    if(ua.match(/MicroMessenger/i) == 'micromessenger'  || ua.match(/WeiBo/i) == "weibo"
	        ||navigator.userAgent.indexOf("MQQBrowser") > -1){
	    }else{
	    	//未微信浏览器，跳转到4488
	    	var domain  =document.domain;
	    	if(domain !="4488.mobi" && domain !="localhost" && !IS_DEBUG ){
	    		window.location.href ="http://4488.mobi/game/search.html";
	    	}
	    }
}

function returnDetailPage(){
	var id = GetQueryString("id");
	  var ua = window.navigator.userAgent.toLowerCase();
	    if(ua.match(/MicroMessenger/i) == 'micromessenger'  || ua.match(/WeiBo/i) == "weibo"
	        ||navigator.userAgent.indexOf("MQQBrowser") > -1){
	    }else{
	    	//未微信浏览器，跳转到4488
	    	var domain  =document.domain;
	    	 
	    	if(domain !="4488.mobi" && domain !="localhost" && !IS_DEBUG){
	    		document.referrer = "";
	    		window.location.href ="http://4488.mobi/game/gameDetail?id="+id;
	    	}
	    }
}

function showMore(){
	$("#moreBtn").show();
}

function hiddenMore(){
	$("#moreBtn").hide();
}
 

function showLoading(){
	$("#loading").addClass("active");
}

function hiddenLoading(){
	$("#loading").removeClass("active");
}


function showEmpty(){
	$("#noRecord").show();
}

function hiddenEmpty(){
	$("#noRecord").hide();
}

function saveShareId(){
	
	
	var shareid = getJsonDataLocal(SESSION_KEY.SHARE_ID);
	var userid  = getJsonDataLocal(SESSION_KEY.SHARE_USER_ID);
	var deviceid  = getJsonDataLocal(SESSION_KEY.DEVICE_ID);
	
	
	if (typeof(userid) == "undefined" || userid=="" || userid == undefined  || userid == null) {
		
		shareid = GetQueryString("shareid");
		userid  = GetQueryString("userid");
		
		saveJsonDataLocal(SESSION_KEY.SHARE_ID, shareid);
		saveJsonDataLocal(SESSION_KEY.SHARE_USER_ID, userid);
	
	}  
	
 
 if (typeof(deviceid) == "undefined" || deviceid=="" || deviceid == undefined  || deviceid == null) {
	 var random = _getRandomString(32);
	  var random = $.md5(random);
	   
	  saveJsonDataLocal(SESSION_KEY.DEVICE_ID, random);
 	}  
}
 

//获取长度为len的随机字符串  
function _getRandomString(len) {  
    len = len || 32;  
    var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678'; // 默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1  
    var maxPos = $chars.length;  
    var pwd = '';  
    for (i = 0; i < len; i++) {  
        pwd += $chars.charAt(Math.floor(Math.random() * maxPos));  
    }  
    return pwd;  
}


function zimu(len){
    len = len || 1;
    var $chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var maxPos = $chars.length;
    var pwd = '';
    for (i = 0; i < len; i++) {
        pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
    }
}
    

function diu_Randomize(b,e){   
    if(!b && b!=0 || !e){return "?";}   
    return Math.floor( ( Math.random() * e ) + b );   
} 

 

function diu_Randomize(b,e){   
    if(!b && b!=0 || !e){return "?";}   
    return Math.floor( ( Math.random() * e ) + b );   
} 

 
//将数据保存到session中
function saveJsonData(key,value){
	sessionStorage.setItem(key,JSON.stringify(value) );
}

//将数据从session中取出来
function getJsonData(key){
	var data = sessionStorage.getItem(key);
 	return  JSON.parse(data);
 }

//将数据保存到session中
function saveStrData(key,value){
	sessionStorage.setItem(key,value );
}

//将数据从session中取出来
function getStrData(key){
	return sessionStorage.getItem(key);
 }

//清除指定session数据
function clearSessionByKey(key){
	sessionStorage.removeItem(key);
}


//保存手机idfa
function saveIdfa(idfa){
	saveJsonDataLocal(SESSION_KEY.PHONE_IDFA,idfa);
}

//获取idfa
function getIdfa(){
	return getJsonDataLocal(SESSION_KEY.PHONE_IDFA);
}

//将数据保存到客户端
function saveJsonDataLocal(key,value){
	localStorage.setItem(key,JSON.stringify(value));
}

//从数据从客户端取出来
function getJsonDataLocal(key){
	var data = localStorage.getItem(key);
 	return  JSON.parse(data);
}

//将数据保存到客户端
function saveStrDataLocal(key,value){
	localStorage.setItem(key,JSON.stringify(value));
}

//从数据从客户端取出来
function getStrDataLocal(key){
	var data = localStorage.getItem(key);
 	return  JSON.parse(data);
}
//数据客户删除数据
function clearLocalByKey(key){
	localStorage.removeItem(key);
}


//更新用户数据
function updateUserInfoLocal(userInfo){
	saveJsonDataLocal(SESSION_KEY.USER_INFO,userInfo);
}
//保存当前登录用户信息
function saveUserInfoLocal(userInfo){
	saveJsonDataLocal(SESSION_KEY.USER_INFO,userInfo);
}

//获取当前登录用户信息 - 未登录用户，跳转到登录界面
//function getUserInfoLocal(){
//	var userInfo = getJsonDataLocal(SESSION_KEY.USER_INFO);
//	if(userInfo != null &&  (typeof(userInfo)!="undefined")){
//		return userInfo;
//	}else{
//		//用户登录界面
//		toLoginPageByPack();
//	}
//}

//获取当前登录用户信息 - 未登录用户，返回 0 
function getUserInfoLocal(){
	var userInfo = getJsonDataLocal(SESSION_KEY.USER_INFO);
	if(userInfo != null &&  (typeof(userInfo)!="undefined")){
		return userInfo;
	}else{
		//用户登录界面
		return 0;
	}
}


//注销
function userLogoutLocal(){
	localStorage.removeItem(SESSION_KEY.USER_INFO);

}