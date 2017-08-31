//点击游戏按钮跳转页面
//function gameClick(){
//	window.location.href = "../list.html";
//}
//
////点击游戏按钮跳转页面
//function gamListClick(){
//	window.location.href = "./list.html";
//}
////点击游戏礼包跳转页面
//function giftsClick(){
//	window.location.href = "../detail.html";
//}
////点击游戏我的跳转页面
//function myClick(){
//	//toPersonalPage();
//	window.location.href = "./user/personal.html";
//}


//点击游戏按钮跳转页面
//function gamListClick(){
//	window.location.href = "./list.html";
//}
////点击游戏礼包跳转页面
//function giftsClick(){
//	window.location.href = "#";
//}
////点击游戏我的跳转页面
//function myClick(){
//	//toPersonalPage();
//	window.location.href = "./user/personal.html";
//}


////解除对a标签href属性的屏蔽
//    	window.onload = function() {
//			var els = $("a");
//			for(var i = 0; i < els.length; i++) {
//				els[i].addEventListener('tap', function() {
//					openCustURL(this.getAttribute('href'));
//				})
//			}
//		}
//
//		function openCustURL(vurl) {
//			mui.openWindow({
//						url: vurl,
//						show: {
//							autoShow: true,
//							aniShow:'slide-in-right',
//					duration: 400
//				},
//				waiting: {
//					autoShow: false,
//					title: '正在加载...'
//				}
//			})
//		}


function wechatClick(){
	$(".wechat-share").animate({opacity:1},100);
}
function closeWechatShare(){
		$(".wechat-share").animate({opacity:0},100);
}

//动态给head添加meta标签

