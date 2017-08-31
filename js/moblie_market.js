//跳转到设置
function GoToSet(){
	location.href="prefs:root=General&path=ManagedConfigurationList";
}
/********************************************************************************************
	安装应用市场，微信的话就显示遮罩
	判断是否是IOS
********************************************************************************************/
function install(tg_id,is_ios,appStore,url,gameName) {
	if(is_weixn()){
		showDiv_my();
	}else{
		//is_ios =is_ios ||1;
		if(appStore==1 || appStore == true){
			_hmt.push(['_trackEvent', BAIDUTONGJI_CATEGORY.ON_GAME_DETAIL , BAIDUTONGJI_OPTION.INSTALL, gameName]);//百度统计分析，游戏列表页面，点击详情按钮

			showTrust();		
			location.href=url;
		}
		else{
			_hmt.push(['_trackEvent', BAIDUTONGJI_CATEGORY.ON_GAME_LIST ,BAIDUTONGJI_OPTION.INSTALL, tg_id]);//百度统计分析，游戏列表页面，点击详情按钮

			location.href=url;
			/*hong 2017.01.10 */
			/*if(is_qq() || is_qqbrowser()){
				showDiv_my();
			}else{
				location.href=android_market_url;
			}*/
		}
	}
}
/********************************************************************************************
	安装应用市场，微信的话就显示遮罩
	判断是否是IOS
	下面是专门使用在官网首页的---2016-11-16 ALone添加
********************************************************************************************/
function install_x7sy_index(tg_id,is_ios,android_market_url) {
	if(is_weixn()){
		showDiv_my();
	}else{
		is_ios =is_ios ||1;
		if(is_ios==1){
			//showDiv_mytc();
			showTrust();
			location.href='itms-services://?action=download-manifest&url=https://market.x7sy.com/plist/market/'+tg_id;
		}else{
			location.href=android_market_url;
			/*hong 2017.01.10 删除is_qq()*/
			/*
			if(is_qq()){
				showDiv_my();
			}else{
				location.href=android_market_url;
			}*/
		}
	}
}

/*微信弹出*/
function showDiv_my(){
	document.getElementById('popDiv_tc').style.display='block';
	document.getElementById('popIframe_tc').style.display='block';
	document.getElementById('bg_tc').style.display='block';
}
function closeDiv_my(){
	document.getElementById('popDiv_tc').style.display='none';
	document.getElementById('bg_tc').style.display='none';
	document.getElementById('popIframe_tc').style.display='none';
}
/*信任信息弹出*/
//function showDiv_mytc(){
//	document.getElementById('popDiv_tctc').style.display='block';
//	document.getElementById('popIframe_tctc').style.display='block';
//	document.getElementById('bg_tctc').style.display='block';
//}
//function closeDiv_my(){
//	document.getElementById('popDiv_tctc').style.display='none';
//	document.getElementById('bg_tctc').style.display='none';
//	document.getElementById('popIframe_tctc').style.display='none';
//}
//判断是否是微信

//弹窗(证书)
function showTrust(){
//	console.log(mui(".mui-slider").slider())
	mui(".mui-slider").slider().gotoItem(0);	
	$("body").css("position","fixed")
	$("body").css("top",$(window).scrollTop())
	//把滚动的div的position设置成fixed，然后top:0,或者top设为$(window).scrollTop()
	$(".trust-bg").css("height","100%");
	$(".trust-bg").css("display","block");
	$(".trust-container").css("display","block");
	$(".trust-bg").css("background","rgba(0,0,0,0.9)")
	$(".certificate-name").html($(".certificate-name").text().substring(0,20)+"…");
	$(".diff_certificate").html("信任"+$(".diff_certificate").text().substring(0,22));
}


function is_weixn(){
  var ua = navigator.userAgent.toLowerCase();
  if(ua.match(/MicroMessenger/i)=="micromessenger") {
      return true;
  } else {
      return false;
  }
}

//判断当前客户端是否android设备
function is_android(){
	  var ua = navigator.userAgent.toLowerCase();
	  if(/\android\b/i.test(ua)) {
	      return true;
	  } else {
	      return false;
	  }
}
//判断是否是qq
function is_qq(){
  var ua = navigator.userAgent.toLowerCase();
  if(/\bqq\b/i.test(ua)) {
      return true;
  } else {
      return false;
  }
}

//判断是否是qq浏览器
function is_qqbrowser(){
  var ua = navigator.userAgent.toLowerCase();
  if(/\bmqqbrowser\b/i.test(ua)) {
      return true;
  } else {
      return false;
  }
}


/*首冲弹出	2017.01.09 hong*/
function showDiv_mytctc_sc(){
document.getElementById('popDiv_tctc_sc').style.display='block';
document.getElementById('popIframe_tctc_sc').style.display='block';
document.getElementById('bg_tctc_sc').style.display='block';
}
function closeDiv_my_sc(){
document.getElementById('popDiv_tctc_sc').style.display='none';
document.getElementById('bg_tctc_sc').style.display='none';
document.getElementById('popIframe_tctc_sc').style.display='none';

}
