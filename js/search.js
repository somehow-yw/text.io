function getSearchData(){
	$.ajax({  
    	dataType: "json",
        type : "POST",  //提交方式  
      //  async: false,//同步
        url : URLCfg.searchKey,//路径  
        data : {
        	  "r": new Date().getTime()//给一个随机事件，避免缓存
        },
        beforeSend: function(){
        	showLoading();
         },
        success : function(result) {//返回数据根据结果进行相应的处理  
        	analySearchKeyList(result);
	        	setTimeout("hiddenLoading()",2000);
        },
        error:    function(XMLHttpRequest, textStatus, errorThrown){
	        	setTimeout("hiddenLoading()",2000);
//        		alert("老板数据请求出错了，请再来一次");
        }
    }); 
}

function getSearchDataPC(){
	$.ajax({  
    	dataType: "json",
        type : "POST",  //提交方式  
      //  async: false,//同步
        url : "./searchKey",//路径  
        data : {
        	  "r": new Date().getTime()//给一个随机事件，避免缓存
        },
        beforeSend: function(){
        	showLoading();
         },
        success : function(result) {//返回数据根据结果进行相应的处理  
        	analySearchKeyListPC(result);
        	analySearchKeyDetailPC(result);
        	hiddenLoading();
        },
        error:    function(XMLHttpRequest, textStatus, errorThrown){
        	hiddenLoading();
//        		alert("老板数据请求出错了，请再来一次");
        }
    }); 
}


//解析游戏列表数据
function analySearchKeyListPC(data){
	var retCode = data.retCode;//返回數據提示
	var searchKeyData = data.searchKey;
	
	//var recommend = searchKeyData.recommend;//推荐
	var gameType = searchKeyData.gameType;//玩法类型
	//var gameTheme = searchKeyData.gameTheme;//热门题材
	//var hotSearch = searchKeyData.gameInfo;//大家都在搜索
	

	var div  = "";//搜索首页
	var searchdiv = "";//大家都在搜索
	//div +=analyRecommend(recommend);//推荐
// div +=analyGameType(gameType);//游戏分类
//div +=analyGameTheme(gameTheme);//游戏主题
//searchdiv +=analyHotSearch(hotSearch);//大家都在搜索
	
	div +='<li style="list-style-type:none;"><span>游戏分类</span></li>';
	div +='<li style="list-style-type:none;">';
	div +='<a href="javascript:void(0)"  onclick="getGameClientListPc(1);" id="all">全部</a>';
	div +='</li>';

for(var i=0;i<gameType.length;i++){
	  div +='<li style="list-style-type:none;">';
	  div +='<a  href="javascript:void(0)" onclick="getGameClientListPc(1,'+gameType[i].id+');" id="gameType'+gameType[i].id+'">'+gameType[i].name+'</a>';
	  div +='</li>'; 
}

	$("#menu-ul").html(div);
	//$("#hotSearch").html(searchdiv);
	//saveJsonData(SESSION_KEY.SEARCH_LIST_DATA,searchKeyData);//保存搜索列表数据
}


//解析游戏列表数据
function analySearchKeyDetailPC(data){
	var retCode = data.retCode;//返回數據提示
	var searchKeyData = data.searchKey;
	
	//var recommend = searchKeyData.recommend;//推荐
	var gameType = searchKeyData.gameType;//玩法类型
	//var gameTheme = searchKeyData.gameTheme;//热门题材
	//var hotSearch = searchKeyData.gameInfo;//大家都在搜索
	

	var div  = "";//搜索首页
	var searchdiv = "";//大家都在搜索
	//div +=analyRecommend(recommend);//推荐
//div +=analyGameType(gameType);//游戏分类
//div +=analyGameTheme(gameTheme);//游戏主题
//searchdiv +=analyHotSearch(hotSearch);//大家都在搜索
	
	
	div +='<li><span>游戏分类</span></li>';
	div +='<li>';
		div +='	<a class="active" href="javascript:void(0)">全部</a>';
			div +='</li>';
	
 

for(var i=0;i<gameType.length;i++){
	 /* div +='<li style="list-style-type:none;">';
	  div +='<a href="javascript:void(0)" onclick="getGameClientListPc(1,'+gameType[i].id+');" id="gameType'+gameType[i].id+'">'+gameType[i].name+'</a>';
	  div +='</li>'; */
	  
	  div +='<li>';
		  div +='<a href="javascript:void(0)" onclick="getGameClientListPcFromDetail(1,'+gameType[i].id+');" id="gameType'+gameType[i].id+'">'+gameType[i].name+'</a>';
			  div +='</li>';
	
	
}

	$("#detail-menu-ul").html(div);
	//$("#hotSearch").html(searchdiv);
	//saveJsonData(SESSION_KEY.SEARCH_LIST_DATA,searchKeyData);//保存搜索列表数据
}

//解析搜索列表，推荐数据
function analyRecommend(recommend){
	if(recommend==null){
		return "";
	}
	var recommendLength = recommend.length;
	var div = "";
	if(recommendLength >0){
	    div += '<div class="search-type" id="">推荐</div>';
	    div += '<div class="search-item">';
	    div += '<ul>';
	    for(var i=0;i<recommendLength;i++){
	    	div += ' <li><a href="">'+recommend[i].name+'</a></li>';
	    }
	    div += '</ul>';
	    div += ' </div>';
	}
	return div;
}
//解析搜索首页，游戏玩法数据
function analyGameType(gameType){
	var div = "";
	var gameTypeLength  = gameType.length;

    if(gameTypeLength>0){
        div += '<div class="search-type" id="">玩法类型</div>';
        div += '<div class="search-item">';
        div += '<ul>';
        for(var i=0;i<gameTypeLength;i++){
        	div += ' <li><a href="javascript:void(0)" onclick="toSearchListByType('+gameType[i].id+')">'+gameType[i].name+'</a></li>';
        }
        div += '</ul>';
        div += ' </div>';
    }
	return div;
}

 

//热门题材数据解析
function analyGameTheme(gameTheme){
	var gameThemeLength = gameTheme.length;
	var div = "";
	
    if(gameThemeLength>0){
        div += '<div class="search-type" id="">热门题材</div>';
        div += '<div class="search-item">';
        div += '<ul>';
        for(var i=0;i<gameThemeLength;i++){
        	div += ' <li><a href="javascript:void(0)" onclick="toSearchListByTheme('+gameTheme[i].id+')">'+gameTheme[i].name+'</a></li>';
        }
        div += '</ul>';
        div += ' </div>';
    }
    return div;
}

//大家都在搜索数据解析
function analyHotSearch(hotSearch){
	var div = "";
	var hotSearchLength = hotSearch.length;
    if(hotSearchLength>0){
    	for(var i=0;i<hotSearchLength;i++){
    		div +='<li> ';
    		div +='<a href="javascript:void(0)"  onclick="toWordSearchList(&#039;'+hotSearch[i].searchStr+'&#039;)">';
    		div +='<div class="img-wrap"> ';
    		div +='<img src="'+hotSearch[i].iconURL+'">';
    		div +='</div>';
    		div +='<p>'+hotSearch[i].searchStr+'</p> ';
        	div +='</a> ';
        	div +='</li> ';
    	}
    	
    }
    return div;
}

//解析游戏列表数据
function analySearchKeyList(data){
	var retCode = data.retCode;//返回數據提示
	var searchKeyData = data.searchKey;
	
	var recommend = searchKeyData.recommend;//推荐
	var gameType = searchKeyData.gameType;//玩法类型
	var gameTheme = searchKeyData.gameTheme;//热门题材
	var hotSearch = searchKeyData.gameInfo;//大家都在搜索
	

	var div  = "";//搜索首页
	var searchdiv = "";//大家都在搜索
 	div +=analyRecommend(recommend);//推荐
    div +=analyGameType(gameType);//游戏分类
    div +=analyGameTheme(gameTheme);//游戏主题
    searchdiv +=analyHotSearch(hotSearch);//大家都在搜索

	$("#content").html(div);
	$("#hotSearch").html(searchdiv);
	
	saveJsonData(SESSION_KEY.SEARCH_LIST_DATA,searchKeyData);//保存搜索列表数据
 }

/**
 * 保存我的搜索关键词
 */
function saveSearchHistory(key){
 	var sessionData = getStrDataLocal(SESSION_KEY.SEARCH_HISTORY);
 	var data = sessionData;
 	if(sessionData !=null){
 	 	//判断是否为空
 		data = sessionData +"#"+key;
 	}else{
		data = key;
	}
  	if( sessionData == null ||  sessionData.indexOf(key) == -1   ){
 		saveStrDataLocal(SESSION_KEY.SEARCH_HISTORY,data);
 	}
	
	showSearchHistory();
}
/**
 * 显示我的搜索关键词
 */
function showSearchHistory(){
	var data = getStrDataLocal(SESSION_KEY.SEARCH_HISTORY);
	var div = "";
	if(data !=null){
	var dataArray = data.split("#");
		if(dataArray.length>0){
			for(var i=0;i<dataArray.length;i++){
				div+='<li><a href="javascript:void(0)" onclick="toWordSearchList(&#039;'+dataArray[i]+'&#039;)">'+dataArray[i]+'</a></li>';
			}
			$("#searchRecord").html(div);
		}
	}
}

//清除搜索记录
function clearHistory(){
	clearLocalByKey(SESSION_KEY.SEARCH_HISTORY);
	$("#searchRecord").html("");
}

//点击类型关键词，进入标签搜索列表
function toSearchListByType(typeId){
 	saveStrData(SESSION_KEY.SELECT_TYPE_KEY, typeId);
 	clearSessionByKey(SESSION_KEY.SELECT_THEME_KEY);

	window.location.href = "./typeSearch.html";
}

//点击游戏题材，进入标签搜索列表
function toSearchListByTheme(tagId){
	saveStrData(SESSION_KEY.SELECT_THEME_KEY, tagId);
 	clearSessionByKey(SESSION_KEY.SELECT_TYPE_KEY);
	window.location.href = "./typeSearch.html";
}

//关键词搜索列表，显示关键词和被点击的关键词
function showGameTypeKey(){
	var selectType = getStrData(SESSION_KEY.SELECT_TYPE_KEY);
	var selectTheme =  getStrData(SESSION_KEY.SELECT_THEME_KEY);
	
	
	if(selectType!=null){
		
		var data = getJsonData(SESSION_KEY.SEARCH_LIST_DATA);
		data = data.gameType;
		var div = "";
		
		for(var i=0;i<data.length;i++){
			if(selectType == data[i].id){
				div += "<li onclick='getGameClientListBySearch(1,"+data[i].id+")' class='active' >"+data[i].name+"</li>";
			}else{
				div += "<li onclick='getGameClientListBySearch(1,"+data[i].id+")' >"+data[i].name+"</li>";
			}
		}
		$("#typeSearch").html(div);
		getGameClientListBySearch(1,selectType);
		
	}else if(selectTheme !=null){
		 
		
		var data = getJsonData(SESSION_KEY.SEARCH_LIST_DATA);
		data = data.gameTheme;
		var div = "";
		
		for(var i=0;i<data.length;i++){
			if(selectTheme == data[i].id){
				div += "<li onclick='getGameClientListBySearch(1,null,"+data[i].id+")' class='active' >"+data[i].name+"</li>";
			}else{
				div += "<li onclick='getGameClientListBySearch(1,null,"+data[i].id+")' >"+data[i].name+"</li>";
			}
		}
		$("#typeSearch").html(div);
		getGameClientListBySearch(1,null,selectTheme);
		

	}

	

}

/**
 * 根据标签，分类查询游戏
 * page 页码数
 * type 分类ID
 * tag  标签ID
 */
function getGameClientListBySearch(page,type,theme,wordKey){
	 
	 //将点击的标签样式设置为 点击效果
	if(event.type == 'click' && (type !=null || theme !=null )){
		 $("#typeSearch").children().attr("class","");//去掉未选中的分类样式
		event.target.className = "active";//赋值点击事件
		if(type !=null){
			//保存点击的分类ID
			saveStrData(SESSION_KEY.SELECT_TYPE_KEY,type);
		}else if(theme !=null){
			//保存点击的主题ID
			saveStrData(SESSION_KEY.SELECT_THEME_KEY,theme);
		}
	}
	
	
	var searchKey = $("#searchKey").val();//搜索关键词
 	if(page !=1){
		  page = getJsonData(SESSION_KEY.PAGE);
	} 
	 
	$.ajax({  
		    	dataType: "json",
		        type : "POST",  //提交方式  
		      //  async: false,//同步
		        url : URLCfg.gamelist,//路径  
		        data : {
		        	 "keyWord":wordKey, "theme":theme, "type":type, "pageNum":page,  "r": new Date().getTime()//给一个随机事件，避免缓存
		        },
		        beforeSend: function(){
		        	showLoading();
/*		        	$("#loading").addClass("active");
*/		        },
		        success : function(result) {//返回数据根据结果进行相应的处理  
  		        	saveJsonData(SESSION_KEY.PAGE,result.pageInfo.currentPage+1);//保存当前页数，并且+1
 		        	if(theme ==null && type == null && wordKey !=null){
 		        		//关键词搜索列表
 		        		analyticGameListByWord(result,page);
 		        	}else{
 		        		//标签搜索列表
 	  		        	analyticGameList(result,page);
 		        	}
 		        	
 		        	
 		        	var length = result.gameInfo.length;
 		        	
 		        	console.log(length);
 		        
 		        	//数据为空
 		        	if(length == 0){
 		        		showEmpty();
 		        		hiddenMore();
 		        	}else{
 		        		if(length < 10){
 		        			//当前请求数据，不到10条，表明已经没有数据了
 		        			hiddenMore();
 		        		}else{
 		        			showMore();
 		        		}
 		        		hiddenEmpty();
 		        	}
 

 		        	setTimeout("hiddenLoading()",2000);
		        },
		        error:    function(XMLHttpRequest, textStatus, errorThrown){
//		        		alert("老板数据请求出错了，请再来一次");
 		        	setTimeout("hiddenLoading()",2000);
		        }
		    }); 
	
}


//解析游戏列表数据
function analyticGameList(data,addType){
	var retCode = data.retCode;//返回數據提示
	var gameList = data.gameInfo;
	var length = gameList.length;
	
	var div  = "";
	for(var i=0;i<length;i++){
        div +='<div class="item" data-id="2103"> ';
        div +='<a href="javascript:void(0)" onclick="getDetail(&apos;'+gameList[i].id+'&apos;)"> ';
        div +='<figure class="cover"> ';
     	div +='<img src="'+gameList[i].iconURL+'"> ';
        div +='</figure> ';
        div +='<div class="meta"> ';
        div +='<div> ';
        div +='<h3 class="title"> ';
		div +=''+gameList[i].nameSubStr+' ';
        div +='</h3> ';
        if(gameList[i].discount >0){
        	div +='<span class="list-zhekou"> ';
        	div +='<span>'+gameList[i].discount+'</span>折 ';
        	div +='</span> ';
        }
        div +='</div> ';
        div +='<span class="count">'+gameList[i].packageSize+'|'+gameList[i].gameType.name+'  </span> ';
/*        	 div +='           <span class="count"><span class="activity-info-h5">h5</span> | 角色扮演</span> ';
*/        		
        div +='<div class="desc">'+gameList[i].abstractSubStr+'</div> ';
        div +='</div> ';
        div +='</a>';
        div +='<a href="'+gameList[i].downURL+'" class="list-install">安装</a> ';
        div +='</div> ';
	}
	if(addType == 1){
		$("#gamelist").html(div);
	}else{
		$("#gamelist").append(div);
	}
    var ua = window.navigator.userAgent.toLowerCase();
    if(ua.match(/MicroMessenger/i) == 'micromessenger'  || ua.match(/WeiBo/i) == "weibo"
        ||navigator.userAgent.indexOf("MQQBrowser") > -1){
        $(".list-install").addClass("isWx").attr("href","javascript:void(0)");
    }
}


//解析游戏列表数据
function analyticGameListByWord(data,addType){
	var retCode = data.retCode;//返回數據提示
	var gameList = data.gameInfo;
	var length = gameList.length;
	
	
	var div  = "";
	for(var i=0;i<length;i++){
			
				div +='<div class="item-wrap">';
				div +=' <div class="item" data-id="2103">';
	 	        div +='<a href="javascript:void(0)" onclick="getDetail(&apos;'+gameList[i].id+'&apos;)"> ';
				div +='         <figure class="cover">';
		 		div +='<img src="'+gameList[i].iconURL+'"> ';
				div +='        </figure>';
				div +='         <div class="meta">';
				div +='            <div>';
				div +='               <h3 class="title">';
				div +=''+gameList[i].nameSubStr+' ';
				div +='               </h3>';
				if(gameList[i].discount >0){
					div +='<span class="list-zhekou"> ';
					div +='<span>'+gameList[i].discount+'</span>折 ';
					div +='</span> ';
				}
				div +='       </div>';
				div +='<span class="count">'+gameList[i].packageSize+'|'+gameList[i].gameType.name+'  </span> ';
				div +='<div class="desc">'+gameList[i].abstractSubStr+'</div> ';
				div +='    </div>';
				div +='  </a>';
				div +='  <a href="'+gameList[i].downURL+'" class="list-install">安装</a>';
				div +='</div>';
				div +='    <div class="open-server-layout">';
				div +=' <ul>';
				if(gameList[i].gameServerList !=null && gameList[i].gameServerList.length >0){

				for(var j=0;j<gameList[i].gameServerList.length;j++){
					if(j ==0){
						div +='<li class="active" >';
					}else{
						div +='<li  >';
					}
					div +='<a href="">';
					div +='<div>'+gameList[i].gameServerList[j].name+' '+gameList[i].gameServerList[j].time+'</div>';
					div +='</a>';
					div +='</li>';
				}
				div +='        </ul>';
				div +='    </div>';
				div +='    <hr style="float: left;height:1px;border:none;border-top:1px solid #ebebeb; width:100%;" />';
				div +='   <span class="unfolded">展开查看全部开服V</span> ';
				}
				div +='  </div>   ';
	}
 	if(addType == 1){
		$("#gamelist").html(div);
	}else{
		$("#gamelist").append(div);
	} 
	
	 
    var ua = window.navigator.userAgent.toLowerCase();
    if(ua.match(/MicroMessenger/i) == 'micromessenger'  || ua.match(/WeiBo/i) == "weibo"
        ||navigator.userAgent.indexOf("MQQBrowser") > -1){
        $(".list-install").addClass("isWx").attr("href","javascript:void(0)");
    }
}



function toWordSearchList(searchStr){
	saveSearchHistory(searchStr);//保存搜索关键词
	clearSessionByKey(SESSION_KEY.SELECT_TYPE_KEY);
	clearSessionByKey(SESSION_KEY.SELECT_THEME_KEY);
	saveJsonData(SESSION_KEY.SEARCH_KEY_WORD, searchStr);//保存搜索关键词
	window.location.href = "./wordSearch.html";
}



function getWordSearchData(){
	var key = $("#searchKey").val() ;
	console.log("the key is "+key.length);
	var searchKey = getJsonData(SESSION_KEY.SEARCH_KEY_WORD);
	getGameClientListBySearch(1,null,null,searchKey);
	
	var searchKey = getJsonData(SESSION_KEY.SEARCH_KEY_WORD);
	$("#searchKey").val(searchKey);
}


