//获取微信数据
function getWeiXinEntity(){
	$.ajax({  
		    	dataType: "json",
		        type : "POST",  //提交方式  
		      //  async: false,//同步
		        url : URLCfg.weixinSign,//路径  
		        data : {
		        	  "r": new Date().getTime()//给一个随机事件，避免缓存
		        },
		        beforeSend: function(){
		        	  
		        },
		        success : function(result) {//返回数据根据结果进行相应的处理  
		        	weixinConfig(result);
		        	//console.log(result);
		        },
		        error:    function(XMLHttpRequest, textStatus, errorThrown){
		        		//alert("老板数据请求出错了，请再来一次");
		        }
		    }); 

}

function weixinConfig(result){
	wx.config({
	    debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
	    appId: result.appId, // 必填，公众号的唯一标识
	    timestamp: result.timestamp , // 必填，生成签名的时间戳
	    nonceStr: result.nonceStr, // 必填，生成签名的随机串
	    signature: result.signatrue,// 必填，签名，见附录1
	    jsApiList: [
	                	"onMenuShareTimeline",
	                	"onMenuShareAppMessage",
	                	"onMenuShareQQ",
	                	"onMenuShareWeibo",
	                	"onMenuShareQZone"
	                ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
	});
	
	
	wx.ready(function(){
		//alert("1");
	    // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
	});
	
	onMenuShareTimeline();
	onMenuShareAppMessage();
}

function onMenuShareTimeline(){
	wx.onMenuShareTimeline({
	    title: '测试分享内容', // 分享标题
	    link: 'http://4488.mobi', // 分享链接
	    imgUrl: './images/logo200.png', // 分享图标
	    success: function () { 
	        // 用户确认分享后执行的回调函数
	    	//alert("success");
	    },
	    cancel: function () { 
	        // 用户取消分享后执行的回调函数
	    }
	});
}

function onMenuShareAppMessage(){
	wx.onMenuShareAppMessage({
		title: '测试分享内容', // 分享标题
	    desc: '测试分享内容描述', // 分享描述
	    link: 'http://4488.mobi', // 分享链接
	    imgUrl: './images/logo200.png', // 分享图标
	    type: '', // 分享类型,music、video或link，不填默认为link
	    dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
	    success: function () { 
	        // 用户确认分享后执行的回调函数
	    	//alert("success1");
	    },
	    cancel: function () { 
	        // 用户取消分享后执行的回调函数
	    }
	});
}
function read(){
	
}




