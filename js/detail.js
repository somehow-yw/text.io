/**
 * 查询页面详情
 * @param id
 * @returns
 */
function getDetail(){
	var id = GetQueryString("id");
	
	window.location.href="detail.html";
// 	 $.ajax({  
//	    	dataType: "json",
//	        type : "POST",  //提交方式  
//	      //  async: false,//同步
//	        url : URLCfg.gameInfo,//路径  
//	        data : {
//	        	"gId":id,  "r": new Date().getTime()//给一个随机事件，避免缓存
//	        },
//	        beforeSend: function(){
//	        },
//	        success : function(result) {//返回数据根据结果进行相应的处理  
//	         
//	        	analyticalDetail(result);
//	        	saveJsonData("gameDetail",result.gameInfo);
//
//	        },
//	        error:    function(XMLHttpRequest, textStatus, errorThrown){
//	        		//alert("老板数据请求出错了，请再来一次");
//	        }
//	    }); 
}


function pcDetail(id){
 	window.location.href="./down_pc_detail.html?id="+id;
}
function getPcDetailData(){
	var id = GetQueryString("id");
	 $.ajax({  
   	dataType: "json",
       type : "POST",  //提交方式  
     //  async: false,//同步
       url : "./gameInfo",//路径  
       data : {
       	"gId":id,  "r": new Date().getTime()//给一个随机事件，避免缓存
       },
       beforeSend: function(){
       	loadingShow();
       },
       success : function(result) {//返回数据根据结果进行相应的处理  	         
       	analyticalDetailPc(result);
       	saveJsonData("gameDetail",result.gameInfo);
       	//loadingClose();

       },
       error:    function(XMLHttpRequest, textStatus, errorThrown){
       		//alert("老板数据请求出错了，请再来一次");
       		loadingClose();
       	
       }
   }); 
}

function getDetailData(){

	var id = GetQueryString("id");
	 	 $.ajax({  
	    	dataType: "json",
	        type : "POST",  //提交方式  
	      //  async: false,//同步
	        url : "../gameInfo",//路径  
	        data : {
	        	"gId":id,  "r": new Date().getTime()//给一个随机事件，避免缓存
	        },
	        beforeSend: function(){
	        	loadingShow();
	        },
	        success : function(result) {//返回数据根据结果进行相应的处理  	         
	        	analyticalDetail(result);
	        	saveJsonData("gameDetail",result.gameInfo);
	        	//loadingClose();

	        },
	        error:    function(XMLHttpRequest, textStatus, errorThrown){
	        		//alert("老板数据请求出错了，请再来一次");
	        		loadingClose();
	        	
	        }
	    }); 
}


function idIsNull(){
	
	var gameId = getJsonData(SESSION_KEY.GAME_ID);
	if(gameId ==null){
		var domain  =document.domain;
		if(domain.indexOf("4488.mobi") >0){
			$("#game-back").attr("href","http://4488.mobi"); 
		}else{
			$("#game-back").attr("href","http://test.ismartinfo.cn/test_4488"); 
		}
		
	}
}

//礼包列表
function getPackList(pageNo,gameId){
	 
	
	 $.ajax({  
	    	dataType: "json",
	        type : "POST",  //提交方式  
	      //  async: false,//同步
	        url : URLCfg.packListGameDetail,//路径  
	        data : {
	        	"gameId":gameId, "pageNo":pageNo, "id":0,   "r": new Date().getTime()//给一个随机事件，避免缓存
	        },
	        beforeSend: function(){
	        },
	        success : function(result) {//返回数据根据结果进行相应的处理  
	        	console.log(result);
	        	
	        var div = "";
	        var flag = result.errornum;
	        var data = result.data;
	         console.log(data);
	        if(flag ==0){
	        	if(data.length == 0){
	        		$(".no-pack").css("display","block");
	        	}
	        	for(i = 0;i<data.length;i++){
//	        		
//	        		var content = data[i].content;
//	        		var guide = data[i].guide;
//	        		var index = 8;
//	        		if(content.length > index){
//	        			content = content.substring(0,index);
//	        			content +="..";
//	        		}
//	        		if(guide.length > index){
//	        			guide = guide.substring(0,index);
//	        			guide +="..";
//	        		}
//	        		
	        		
	        		div += '<div class="package" onclick="toPackDetailByGameIndoPage('+data[i].id+')">';
	        		div += '<div class="pack-left">';
	        		div += '	<h4 class="pack-title">'+data[i].name+'</h4>';
	        		div += '	<p class="residue">剩余数量：<span>'+data[i].availableCount+'/</span><span>'+data[i].totalCount+'</span></p>';
	        		div += '	<p class="outdate">过期日期：<span class="date">'+data[i].endTime+'</span></p>';
	        		div += '			</div>';
	        		div += '     			<div class="pack-right">';
	        		div += '     				<i class="mui-icon mui-icon-arrowright"></i>';
	        		div += '      			</div>';
	        		div += '   		</div>';
	      		
//	        		
//	        	 
//	        		div += '<div class="novice-pack">';
//	        		div += '<div class="pack-left">';
//	        		div += '<div class="left-box"><img style="width:100%;" src="'+data[i].iconURL+'"/></div>';
//	        		div += '<div class="pack-content">';
//	        		div += '<h4>'+data[i].name+'</h4>';
//	        		div += '<p><span>礼包详情：</span><span>'+content+'</span></p>';
//	        		div += '<p><span>使用方法：</span><span>'+guide+'</span></p>';
//	        		div += '<p><span>剩余：</span><span>'+data[i].availableCount+'</span></p>'; 
//	        		div += '</div>';
//	        		div += '</div>';
//	        		div += '<a href="javascript:void(0)" class="get" onclick="getClick()">领取</a>';
//	        		div += '</div>';
//	         
//		
	        	}
	        }
	        
	       $("#pack-list").html(div);
	        
			
	        	//Alert(result.errormsg);
	        },
	        error:    function(XMLHttpRequest, textStatus, errorThrown){
	        		Alert("老板数据请求出错了，请再来一次");
	        }
	    }); 
	
}

function analyticalDetail(result){ 
 
	
	console.log()
	var retCode = result.retCode;
	var gameInfo = result.gameInfo;
	console.log(gameInfo);
//	if(typeof(result.gameInfo)=="undefined"){
//		window.location.href ="./list.html";
//		return;
//	}
//	
//loding延迟
setTimeout(function(){
		loadingClose();
	},500)
	
	var inFlag = false;
	inFlag = gameInfo.appFrom;
	console.log("the inFlag is  " + inFlag);
	if(inFlag){
		 inFlag = 1;
	}else{
		inFlag =0;
	}
	var urlStr = gameInfo.downURL;
	 //urlStr = urlStr +"?r="+Math.random();
 
	 
 
	 
	var div = ' <div class="down-layout">';
     div +='    <a   id="playBtn"  href="javascript:void(0);" onclick="install(1,1,'+inFlag+' ,&apos;'+urlStr+'&apos;);" class="ui-btn play playBtn" style="z-index:999" data-ui="danger small active">立即安装</a>'
    div +='  </div>';
    
     
   $("#insBut").html(div);
	
		 //setTimeout(function(){},1000);
	document.title = gameInfo.name;
//	document.getElementsByTagName("meta")[1].content = gameInfo.name;
//	document.getElementsByTagName("meta")[2].content = gameInfo.name;
//	console.log(document.getElementsByTagName("meta")[1].content)
	
	$("#iconURL").attr("src",gameInfo.iconURL);
	$("#title2").html(gameInfo.name);
	$("#head_title").html(gameInfo.name);
	$("#titleHi").html(gameInfo.name);
	$("#meta_content").attr("content",gameInfo.name);
	$("#abstrac").html(gameInfo.abstrac);
	
	$("#game-name").html(gameInfo.name);
	$("#title3").html(gameInfo.name);
	$("#count").html(gameInfo.descStr);
	$("#game_desc_more").html(gameInfo.desc)
	var html = $("#game_desc").html();
	$("#game_desc").html(html + gameInfo.descStr)
	
	$(".cover img").attr("src",gameInfo.iconURL)
	console.log(gameInfo);
	var discount =  gameInfo.discount;
	if(discount == 0){
		$("#zhekou").css("display","none");
	}
	else if(discount >0){
		console.log(discount)
		$("#zhekou").css("display","block");
		$("#thiszhekou").html(discount);
	}
	var gamePicList = gameInfo.gamePicList;
	var picDiv = "";
	
	 /*picDiv +='<div class="screenshot ui-slider" data-opt="{&quot;auto&quot;:false,&quot;switchAt&quot;:0.2}" data-ui="col2" data-preview="true" s-id="s8652548">';
	picDiv +='<ul id="gamePicList" data-role="wrapper" style="touch-action: pan-y; user-select: none; -webkit-user-drag: none; -webkit-tap-highlight-color: rgba(0, 0, 0, 0); width: 750px; transition: all 300ms; transform: translate3d(0%, 0px, 0px) scale3d(1, 1, 1);">';
*/
   var dotDiv = "";
	if(gamePicList !=null){
		for(var i = 0; i < gamePicList.length;  i++){
			console.log(gamePicList[i].picURL,gamePicList[i].picURL)
			$("#img" + (i)).attr("src",gamePicList[i].picURL);
		
			if(i==0){
				dotDiv+='<b class="active"></b>';
			}else if(i % 2 == 0){
				dotDiv+='<b class=""></b>';
			}
			/*
			var k = 0;
			 if(i%2 ==0){
//				 picDiv += '<li data-role="item">';
			 }	
			 picDiv +='<img data-role="image" src="'+gamePicList[i].picURL+'" data-imageview="'+i+'">';
		 	if(i%2 ==1 || (i+1) == gamePicList.length){
		 		
//		 		picDiv += '</li>';
		 	}*/
		}
/*		 picDiv +='</ul>';
		picDiv +=' <div data-role="dot">';
		picDiv +='    <b class="active"></b>';
		picDiv +='    <b class=""></b>';
		picDiv +='</div>';
		picDiv +='</div>'; */
						
		$("#dot").html(dotDiv);
	}

        var div = '<span>';
		div += '<hr style="float: left;height:1px;border:none;border-top:1px dashed #0066CC; width:80%;"> ';
		div += '<span style="float: right ;font-size:12px;color: #000;font-size: 13px ">展开更多↓ </span>';
		div += '</span>'
	
	$("#game_desc").html(gameInfo.descStr+div);

	$("#packageSize").html("大小："+gameInfo.packageSize);
	$("#minSystem").html("系统："+gameInfo.minSystem);
	$("#language").html("语言："+gameInfo.language);
	$("#version").html("版本："+gameInfo.version);
	$("#typeName").html("类别："+gameInfo.gameType.name);
	$("#relseTime").html("时间："+gameInfo.time.substring(0,11));
	$(".certificate-name").html(gameInfo.certificateName);
	$(".diff_certificate").html("信任:"+gameInfo.certificateName);
	//$("#playBtn").attr("src",gameInfo.downURL);
	
	
}


function analyticalDetailPc(result){ 
 
	
	console.log()
	var retCode = result.retCode;
	var gameInfo = result.gameInfo;
	console.log(gameInfo);
//	if(typeof(result.gameInfo)=="undefined"){
//		window.location.href ="./list.html";
//		return;
//	}
//	
//loding延迟
setTimeout(function(){
		loadingClose();
	},500)
	
	var inFlag = false;
	inFlag = gameInfo.appFrom;
 
	if(inFlag){
		 inFlag = 1;
	}else{
		inFlag =0;
	}
	var urlStr = gameInfo.downURL;
	 //urlStr = urlStr +"?r="+Math.random();
 
	 
 
	 
	var div = ' <div class="down-layout">';
     div +='    <a   id="playBtn"  href="javascript:void(0);" onclick="install(1,1,'+inFlag+' ,&apos;'+urlStr+'&apos;);" class="ui-btn play playBtn" data-ui="danger small active">立即安装</a>'
    div +='  </div>';
    
     
   $("#insBut").html(div);
	
		 //setTimeout(function(){},1000);
	document.title = gameInfo.name;
//	document.getElementsByTagName("meta")[1].content = gameInfo.name;
//	document.getElementsByTagName("meta")[2].content = gameInfo.name;
//	console.log(document.getElementsByTagName("meta")[1].content)
	
	$("#head_title").html(gameInfo.name);
	
	$("#icon").attr("src",gameInfo.iconURL);
	$("#title2").html(gameInfo.name);
	
	$("#titleHi").html(gameInfo.name);
	$("#meta_content").attr("content",gameInfo.name);
	$("#abstrac").html(gameInfo.abstrac);
	
	$("#game-name").html(gameInfo.name);
	$("#title3").html(gameInfo.name);
	//$("#desc").html(gameInfo.descStr);
	$("#desc").html(gameInfo.desc);
	var html = $("#game_desc").html();
	$("#game_desc").html(html + gameInfo.descStr)
	
	$(".cover img").attr("src",gameInfo.iconURL)
	console.log(gameInfo);
	var discount =  gameInfo.discount;
	if(discount == 0){
		$("#list-zhekou").css("display","none");
	}
	else if(discount >0){
 
		$("#list-zhekou").css("display","block");
		$("#zhekou").html(discount);
	}
	var gamePicList = gameInfo.gamePicList;
	var picDiv = "";
	
	 /*picDiv +='<div class="screenshot ui-slider" data-opt="{&quot;auto&quot;:false,&quot;switchAt&quot;:0.2}" data-ui="col2" data-preview="true" s-id="s8652548">';
	picDiv +='<ul id="gamePicList" data-role="wrapper" style="touch-action: pan-y; user-select: none; -webkit-user-drag: none; -webkit-tap-highlight-color: rgba(0, 0, 0, 0); width: 750px; transition: all 300ms; transform: translate3d(0%, 0px, 0px) scale3d(1, 1, 1);">';
*/
   var iteamActive = "";
   var iteam = "";
	if(gamePicList !=null){
		for(var i = 0; i < gamePicList.length;  i++){
			console.log(gamePicList[i].picURL,gamePicList[i].picURL);
			var picURL = gamePicList[i].picURL ;
			if(i<=3){
				iteamActive += '<img src="'+gamePicList[i].picURL +'">';
			}else{
				iteam += '<img src="'+gamePicList[i].picURL +'">';
			}
			
		
		/*	if(i==0){
				dotDiv+='<b class="active"></b>';
			}else if(i % 2 == 0){
				dotDiv+='<b class=""></b>';
			}*/
			/*
			var k = 0;
			 if(i%2 ==0){
//				 picDiv += '<li data-role="item">';
			 }	
			 picDiv +='<img data-role="image" src="'+gamePicList[i].picURL+'" data-imageview="'+i+'">';
		 	if(i%2 ==1 || (i+1) == gamePicList.length){
		 		
//		 		picDiv += '</li>';
		 	}*/
		}
/*		 picDiv +='</ul>';
		picDiv +=' <div data-role="dot">';
		picDiv +='    <b class="active"></b>';
		picDiv +='    <b class=""></b>';
		picDiv +='</div>';
		picDiv +='</div>'; */
		
		
		$("#porActive").html(iteamActive);
		$("#por").html(iteam);

		
	}

        var div = '<span>';
		div += '<hr style="float: left;height:1px;border:none;border-top:1px dashed #0066CC; width:80%;"> ';
		div += '<span style="float: right ;font-size:12px;color: #000;font-size: 13px ">展开更多↓ </span>';
		div += '</span>'
	
	$("#game_desc").html(gameInfo.descStr+div);

	$("#size").html("大小："+gameInfo.packageSize);
	$("#minSystem").html("系统："+gameInfo.minSystem);
	$("#language").html("语言："+gameInfo.language);
	$("#version").html("版本："+gameInfo.version);
	$("#gameType").html(gameInfo.gameType.name);
	$("#relseTime").html("时间："+gameInfo.time.substring(0,11));
	$(".certificate-name").html(gameInfo.certificateName);
	$(".diff_certificate").html("信任:"+gameInfo.certificateName);
	//$("#playBtn").attr("src",gameInfo.downURL);
	
	
}

function showAllDesc( ){
	//var gameInfo =getJsonData("gameDetail");
	$("#game_desc").hide();
	$("#game_desc_more").show();
	//$("#game_desc").html(gameInfo.desc);
}

//评论和详情点击效果

function detailClick(){
	console.log(9991)
	$(".pack-btn").css("background","white");
	$(".pack-btn").css("color","#1ABBEF")
	$(".detail-btn2").css("color","white");
	$(".detail-btn2").css("background","#1ABBEF");
	
	
	$("#slider").css("display","block");
	$("#mod-box").css("display","block");
	$("#advertisement").css("display","none");
	$(".mod-box").css("display","block")
	
	$("body").css("background","white")
	
	$(".pack-btn-container").css("display","none")
}

//点击礼包
function packClick(){
	$(".detail-btn2").css("background","white");
	$(".detail-btn2").css("color","#1ABBEF");
	
	$(".pack-btn").css("background","#1ABBEF");
	$(".pack-btn").css("color","white");
	
	$("#slider").css("display","none");
	$("#mod-box").css("display","none");
	$("#advertisement").css("display","none");
	
	$(".mod-box").css("display","none");
	$("body").css("background","#EFEFF4");
	$("html").css("background","#EFEFF4")
	$(".pack-btn-container").css("display","block");
	//数据请求
	var gameId = getJsonData(SESSION_KEY.GAME_ID);
	getPackList(1,gameId);
}