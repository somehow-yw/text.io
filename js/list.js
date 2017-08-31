
//查詢游戲列表-手游版本
function getGameClientList(page){
	var tjUserId = GetQueryString("tjuserid");
	if(page ==1){
		
	}else{
		  page = getJsonData(SESSION_KEY.PAGE);
	}
	 
	$.ajax({  
		    	dataType: "json",
		        type : "POST",  //提交方式  
		      //  async: false,//同步
		        url : URLCfg.gamelist,//路径  
		        data : {
		        	"tjUserId":tjUserId, "pageNum":page,  "r": new Date().getTime()//给一个随机事件，避免缓存
		        },
		        beforeSend: function(){
		        	loadingShow();
		        	//showLoading();
		        },
		        success : function(result) {//返回数据根据结果进行相应的处理  
  		        	saveJsonData(SESSION_KEY.PAGE,result.pageInfo.currentPage+1);//保存当前页数，并且+1
 		        	analyticalList(result,page);
 		        	//hiddenLoading();
 		        	loadingClose();
		        },
		        error:    function(XMLHttpRequest, textStatus, errorThrown){
		        	loadingClose();
//		        		alert("老板数据请求出错了，请再来一次");
		        }
		    }); 
}

//隐藏显示loading
function shLoading(){
	$(".loading").css("display","block");
}
function clLoading(){
	$(".loading").css("display","none");
}
//隐藏显示无游戏图标
function shNoGame(){
	$(".no-game").css("display","block");
}
function clNoGame(){
	$(".no-game").css("display","none");
}
//点击搜索时active回到全部
function activeAll(){		
	$("#menu-ul li a").css({"background":"#00b8f0","color":"white"})
	$("#all").css({"background":"white","color":"#00b8f0"})
}
//查詢游戲列表-手游版本
function getGameClientListPc(page,type){
	if(type == 0){
		activeAll();
	}
//	if(page ==1){
//		
//	}else{
//		  page = getJsonData(SESSION_KEY.PAGE);
//	}
	
	var  searchKey = $("#searchKey").val();
	 
	$.ajax({  
		    	dataType: "json",
		        type : "POST",  //提交方式  
		      //  async: false,//同步
		        url : "./gameList",//路径  
		        data : {
		        	"keyWord":searchKey,"type":type, "listType":1 ,"pageNum":page,  "r": new Date().getTime()//给一个随机事件，避免缓存
		        },
		        beforeSend: function(){
		        	loadingShow();
		        	shLoading();
		        	//showLoading();
		        },
		        success : function(result) {//返回数据根据结果进行相应的处理  
  		        	//saveJsonData(SESSION_KEY.PAGE,result.pageInfo.currentPage+1);//保存当前页数，并且+1
  		        	analyticalListPc(result,page);
 		        	//hiddenLoading();
 		        	loadingClose();
 		        	clLoading();
		        },
		        error:    function(XMLHttpRequest, textStatus, errorThrown){
		        	loadingClose();
//		        		alert("老板数据请求出错了，请再来一次");
		        }
		    }); 
}

//查詢游戲列表-手游版本
function getGameClientListPcFromDetail(page,type){
	
	window.location.href = "./";
	savejsonData(SESSION_KEY.GAME_TYPE);
	
	if(type == 0){
		activeAll();
	}
//	if(page ==1){
//		
//	}else{
//		  page = getJsonData(SESSION_KEY.PAGE);
//	}
	
	var  searchKey = $("#searchKey").val();
	 
	$.ajax({  
		    	dataType: "json",
		        type : "POST",  //提交方式  
		      //  async: false,//同步
		        url : "./gameList",//路径  
		        data : {
		        	"keyWord":searchKey,"type":type, "listType":1 ,"pageNum":page,  "r": new Date().getTime()//给一个随机事件，避免缓存
		        },
		        beforeSend: function(){
		        	loadingShow();
		        	shLoading();
		        	//showLoading();
		        },
		        success : function(result) {//返回数据根据结果进行相应的处理  
  		        	//saveJsonData(SESSION_KEY.PAGE,result.pageInfo.currentPage+1);//保存当前页数，并且+1
  		        	analyticalListPc(result,page);
 		        	//hiddenLoading();
 		        	loadingClose();
 		        	clLoading();
		        },
		        error:    function(XMLHttpRequest, textStatus, errorThrown){
		        	loadingClose();
//		        		alert("老板数据请求出错了，请再来一次");
		        }
		    }); 
}

//解析游戏列表数据PC
function analyticalListPc(data,addType){
	var retCode = data.retCode;//返回數據提示
	var gameList = data.gameInfo;
	var pageInfo = data.pageInfo;
	var length = gameList.length;
	if(length == 0){
		//showEmpty();
		hiddenMore();
		shNoGame();//显示无游戏
	}else{
		hiddenEmpty();
		clNoGame();//不显示无游戏图标
	}
	
	
	/*****************************************分页****************************/
	var div  = "";
	div +=' <ul> ';
	for(var i=1 ;i<pageInfo.totalPage+1;i++){
		if(pageInfo.currentPage == i){
			div += '<li><a href="javascript:void(0)" onclick="getGameClientListPc('+i+')" id="page'+i+'" class="active">'+i+'</a></li>';
		}else{
			div += '<li><a href="javascript:void(0)" onclick="getGameClientListPc('+i+')" id="page'+i+'" >'+i+'</a></li>';
		} 
		
		/*
		$("#page"+i).on("click",function(){
				getGameClientListPc(i);
				alert(i);
			});*/
		
		/*$("#page"+i).click(function(event) {
			getGameClientListPc(i);
			alert(i);
		 Act on the event });*/
		
	}
	div +=' </ul> ';
  	$("#pagination").html(div);
//  	<li><a href="javascript:void(0)">下一页 ></a></li>
	
	/*****************************************分页****************************/
 
  	div = "";
  	div = "<ul>";
	for(var i=0;i<length;i++){
		div +='<li>';
		div +='<div class="item" onclick="pcDetail('+ gameList[i].id +')">';
		div += '	<div class="pic" onclick="pcDetail('+ gameList[i].id +')">';
		div += '		<a href="javascript:void(0)" >';
		div += '			<img src="' + gameList[i].iconURL + '" />';
		div += '		</a>';
		div += '	</div>';
		div += '	<div class="info">';
		div += '	<a href="javascript:void(0)"  onclick="pcDetail('+ gameList[i].id +')" class="name">'+ gameList[i].name +'</a>';
		div += '		<span class="star">';
		div += '   <b id="populaty">大小:' + gameList[i].packageSize + '</b>';
		/*div +='  <i class="iconfont icon-wuxing"></i>';*/
		
		if(gameList[i].discount >0 && gameList[i].discount < 10){
			div += '   <em class="icon icon-shuxian-copy"></em>';
			div += '  	<span class="list-zhekou" style="margin-left:-10px">   ';
			div += 	 	 ' <span>'+ gameList[i].discount +'</span>折   ';
			div += '	</span>'
		}
			
		
		div += '   </span>';
		div += '		<span class="desc">' + gameList[i].nameSubStr + '</span>';
		div += '		<a href="javascript:void(0)" class="play" onclick="tip()">玩一玩</a>';
		div += '	</div>';
		div += '	</div>';
		div += '</li>';
	}
	div +="</ul>";
 
		$("#game-list").html(div);
		
 		$("#menu-ul li a").on("click",function(){			
			$("#menu-ul li a").css({"background":"#00b8f0","color":"white"})
			$(this).css({"background":"white","color":"#00b8f0"})
		})
//    var ua = window.navigator.userAgent.toLowerCase();
//    if(ua.match(/MicroMessenger/i) == 'micromessenger'  || ua.match(/WeiBo/i) == "weibo"
//        ||navigator.userAgent.indexOf("MQQBrowser") > -1){
//        $(".list-install").addClass("isWx").attr("href","javascript:void(0)");
//    }
}

function tip(){
	$(".modal").css("display","block");	
	$(".play-bg").css("display","block");
}
function closePlay(){
	$(".play-bg").css("display","none");
	$(".modal").css("display","none");	
}
//解析游戏列表数据
function analyticalList(data,addType){
	var retCode = data.retCode;//返回數據提示
	var gameList = data.gameInfo;
	var length = gameList.length;
	if(length == 0){
		//showEmpty();
		hiddenMore();
	}else{
		hiddenEmpty();
	}
	var div  = "";
	

	
	for(var i=0;i<length;i++){
		
		div +='		<div class="item" data-id="2103">';
		div +='        <a href="javascript:void(0)" onclick="getDetail(&apos;'+gameList[i].id+'&apos;,&apos;'+1+'&apos;,&apos;'+gameList[i].nameSubStr+'&apos;)"> ';
		div +='            <figure class="cover"> ';
		div +='                <img src="'+gameList[i].iconURL+'"> ';
		div +='           </figure> ';
		div +='            <div class="meta"> ';
		div +='               <div> ';
		div +='                   <h3 class="title">'+gameList[i].nameSubStr+'</h3> ';
		if(gameList[i].discount >0){
			div +='                  <span class="list-zhekou"> ';
			div +='                      <span>'+gameList[i].discount+'</span>折 ';
			div +='                    </span> ';
		}
        div +='                </div> ';
        div +='                <span class="count">'+gameList[i].packageSize+'|'+gameList[i].gameType.name+'  </span> ';
        div +='                <div class="desc">'+gameList[i].abstractSubStr+'</div> ';
        div +='            </div> ';
        div +='        </a> ';
        div +='       <a href="javascript:void(0);" onclick="install(1,1,0,&apos;'+gameList[i].downURL+'&apos;,&apos;'+gameList[i].nameSubStr+'&apos;)" class="list-install">安装</a> ';
        div +='   </div>  ';
        //+gameList[i].appFrom?string(1, 0)+','+gameList[i].downURL+'
	}
	if(addType > 0){
		$("#gamelist").append(div);
	}else{
		$("#gamelist").html(div);
	}
    var ua = window.navigator.userAgent.toLowerCase();
    if(ua.match(/MicroMessenger/i) == 'micromessenger'  || ua.match(/WeiBo/i) == "weibo"
        ||navigator.userAgent.indexOf("MQQBrowser") > -1){
        $(".list-install").addClass("isWx").attr("href","javascript:void(0)");
    }
}

 
//查询banner数据
function getBanner(){
	 $.ajax({  
	    	dataType: "json",
	        type : "POST",  //提交方式  
	      //  async: false,//同步
	        url : URLCfg.banner,//路径  
	        data : {
	        	  "r": new Date().getTime()//给一个随机事件，避免缓存
	        },
	        beforeSend: function(){
	        },
	        success : function(result) {//返回数据根据结果进行相应的处理  
 	        	analyticalBanner(result);
	        },
	        error:    function(XMLHttpRequest, textStatus, errorThrown){
//	        		alert("老板数据请求出错了，请再来一次");
	        }
	    }); 
}


//查询banner数据
function getBannerByPack(){
	 $.ajax({  
	    	dataType: "json",
	        type : "POST",  //提交方式  
	      //  async: false,//同步
	        url : URLCfg.bannerByPack,//路径  
	        data : {
	        	  "r": new Date().getTime()//给一个随机事件，避免缓存
	        },
	        beforeSend: function(){
	        },
	        success : function(result) {//返回数据根据结果进行相应的处理  
 	        	analyticalBanner(result);
	        },
	        error:    function(XMLHttpRequest, textStatus, errorThrown){
//	        		alert("老板数据请求出错了，请再来一次");
	        }
	    }); 
}

/**
 * 页面加载广告数据
 * @param data
 */
function analyticalBanner(data){
	 var retCode = data.retCode;
	 var gameBannerList = data.gameBanner;
	 var length = gameBannerList.length;
	 var div = "";
	 var divPack = "";
	for(var i=0;i<length;i++){
  /*  	div += '<li data-role="item"  style="width: 375px;"> '+
    				'<a onclick="getDetail('+gameBannerList[i].gameInfo.id+')" href="javascript:void(0)"> '+
    					'<img style="opacity: 1; transition: opacity 0.5s linear 0s;" data-src="'+gameBannerList[i].picURL+'" src="'+gameBannerList[i].picURL+'">'+
    				'</a>'+
    		   '</li>';*/
    	
    	var urlStr = "";
    	 	if(gameBannerList[i].type == 1){
    			urlStr = 'onclick="getDetail('+gameBannerList[i].gameInfo.id+',1,"广告")"' ;	
    		}else if(gameBannerList[i].type == 2){
    			urlStr = 'href="'+gameBannerList[i].url+'"' ;	
    		}else if(gameBannerList[i].type == 3){
    			urlStr = "";
    		}
    	 	
    	
    	div +='<div class="swiper-slide">';
   
    	div +='<a '+urlStr+'  href="javascript:void(0)" >';
    	div +='<img src="'+gameBannerList[i].picURL+'" alt="">';
    	div +='</a>';
    	div +='</div>';
    	
    	divPack +='<div class="mui-slider-item">';
    		divPack +='<a  '+urlStr+' href="javascript:void(0)" ><img id="img'+i+'" src="'+gameBannerList[i].picURL+'"/></a>';
    			divPack +='</div>';
    			
	}
	
	$(".swiper-wrapper").html(div);

	$("#group").html(divPack);
	

	var swiper = new Swiper('.swiper-container', {
		pagination: '.swiper-pagination',
		loop : true,
		autoplay : 5000,
	});
}

/**
 * 查询页面详情
 * @param id
 * @returns
 */
function getDetail(id,type,name){
	
	_hmt.push(['_trackEvent', BAIDUTONGJI_CATEGORY.ON_GAME_LIST, BAIDUTONGJI_OPTION.DETAIL, name]);//百度统计分析，游戏列表页面，点击详情按钮
	
	saveJsonData(SESSION_KEY.GAME_ID, id);
	if(type == 2){
		window.location.href="../gameDetail?id="+id;
		//window.location.href="../detail.html?id="+id;
	} else{
		window.location.href="./gameDetail?id="+id;
			console.log(id);
 		//window.location.href="./detail.html?id="+id;
 	

	}
//	window.location.href="./detail.html?id="+id;
	
	
	/*if(id == null){
    	window.location.href="./list.html";
	}
	 $.ajax({  
	    	dataType: "json",
	        type : "POST",  //提交方式  
	      //  async: false,//同步
	        url : URLCfg.gameInfo,//路径  
	        data : {
	        	"gId":id,  "r": new Date().getTime()//给一个随机事件，避免缓存
	        },
	        beforeSend: function(){
	        },
	        success : function(result) {//返回数据根据结果进行相应的处理  
	         
	        	window.location.href="./detail.html?id="+id;
	        	//saveJsonData("gameDetail",result.gameInfo);
	         
	        	//analyticalDetail(result.gameInfo,type);
	        },
	        error:    function(XMLHttpRequest, textStatus, errorThrown){
 	        	//	alert("老板数据请求出错了，请再来一次");
	        }
	    }); */
}

function  analyticalDetail(data,type){
	console.log(data);
	console.log(type);
	if(type =="add"){
	 $("#title").vale(data.name);
	}
}


//点击叉号关闭

$(".cha").on("click",function(){
	
//	$(".trust-bg").css("opacity","0");
//	$(".trust-bg").css("background","rgba(0,0,0,0)")
//	$(".trust-container").css("display","none")
})

$(".cancel a").on("click",function(){
	$(".trust-bg").css("height","0");
	$(".trust-bg").css("background","rgba(0,0,0,0)")
	$(".trust-bg").css("display","none");
	$(".trust-container").css("display","none");
	
})

function chaClick(){
	$("body").css("position","static")
	//$("body").css("top",$(window).scrollTop())
	$(".trust-bg").css("height","0");
	$(".trust-bg").css("background","rgba(0,0,0,0)")
	$(".trust-bg").css("display","none");
	$(".trust-container").css("display","none");
}



