

function emptyClick(){
	$(".search-input").val("");
}

function getClick(){
	$(".get-bg").css("display","block");
	$(".get-bg").css("background","rgba(0,0,0,0.5)");
	$(".get-success").css("display","block")
}


function closeGetSuccess(){
	$(".get-bg").css("display","none");
	$(".get-bg").css("background","rgba(0,0,0,0)");
	$(".get-success").css("display","none");
}


//查詢游戲列表-手游版本
function getPackList(page,searchKey,type){
	
	console.log(getUserInfoLocal());
	var userId = 0;
	try {
		   userId = getUserInfoLocal().id;
	} catch (e) {
		//当前用户未登录
		userId = 0;
	}
	
	 
if(page == 1){
 
	saveJsonData(SESSION_KEY.PAGE,2);
}else{
	page = getJsonData(SESSION_KEY.PAGE);
}
	 console.log(page);
	$.ajax({  
		    	dataType: "json",
		        type : "POST",  //提交方式  
		      //  async: false,//同步
		        url : URLCfg.packList,//路径  
		      //  url : "http://localhost:8080/make_money/packList",//路径  
		        data : {
		        	"searchKey":searchKey, "pageNo":page, "id":userId,   "r": new Date().getTime()//给一个随机事件，避免缓存
		        },
		        beforeSend: function(){
		        	loadingShow();
		        	//showLoading();
		        },
		        success : function(result) {//返回数据根据结果进行相应的处理  		        	
		        	console.log("the result.pageno is " + result.pageno);
		        	var pageNo11 = getJsonData(SESSION_KEY);
		        	console.log(pageNo11);
		        	saveJsonData(SESSION_KEY.PAGE,result.pageno);//保存当前页数，并且+1
		        	analyticalPackList(result,page);
		        	//analyticalPackGameList(result,page);
		        	loadingClose();
		        	//hiddenLoading();
		        },
		        error:    function(XMLHttpRequest, textStatus, errorThrown){moreBtn
		        	loadingClose();
//		        		alert("老板数据请求出错了，请再来一次");
		        }
		    }); 
}

function analyticalPackGameList(data){
	var info= data.pData;
	console.log(info);
 
}

//解析游戏列表数据
function analyticalPackList(data,addType){
	console.log(data);
	var retCode = data.retCode;//返回數據提示
	var list = data.data;
	var map = data.pData;
	var length = list.length;
 
	if(length == 0){
		//showEmpty();
		
		 var pageNo = getJsonData(SESSION_KEY.PAGE);
		 	if(pageNo == 1){
		 		 $(".no-pack").css("display","block");
		 	}
		
	}else{
		 $(".no-pack").css("display","none");
		hiddenEmpty();
		if(addType == 1 && length <10 ){
			$("#moreBtn").hide();
		}
	}

	var div  = "";
   
	
	
	
	
 
    $.each(map,function(key,values){     
        console.log(key);     
        
    	  div += "<div class='gifts-title'> <span></span>";
    	  div +="<span>"+key+"</span></div>";
    	  
    	 
    	  
        /*$("#gamePack").append(packGameDivStart);*/
  
    	  div +=  "<div class='list' data-ui='' data-source='/wy-more-p-_page_.html' id='gamelist'>";
        
        $(values).each(function(i){     
            
            
           
            
            console.log("the is is " +i);
            var pId = values[i].id;
          	var content = values[i].content;
        		var guide = values[i].guide;
        		var index = 8;
        	var title = "领取";
        		if(content.length > index){
        			content = content.substring(0,index);
        			content +="..";
        		}
        		if(guide.length > index){
        			guide = guide.substring(0,index);
        			guide +="..";
        		}
        	     
        		var onclick = "";
    	        if(values[i].isReceive == 1){
    	        	title = '已领取';
    	        }else{
    	        	onclick = "onclick=receivePack("+pId+")";
    	        }
    	        
    	      
        		
    		var receiveButtonId = "receive"+i;
    		
    		div += '<div class="item" data-id="2103">';
    			div += '<a href="javascript:void(0)" onclick="toPackDetailPage('+pId+')">  ';
    				div += '	<figure class="cover">        ';
    					div += '		<img src="'+values[i].iconURL+'"> ';
    						div += '	</figure>         ';
    							div += '	<div class="meta">   ';
    								div += '	<div class="pack-content">	';
    									div += '		<h4>'+values[i].gamePackName+'-'+values[i].name+'</h4>';
    										div += '		<p>		';
    											div += '				<span >礼包详情：</span>	';
    												div += '				<span >'+content+'</span>';
    													div += '			</p>	';
    														div += '			<p>	';
    															div += '			<span>使用方法：</span>		';
    																div += '			<span>'+guide+'</span>	';
    																	div += '		</p>';
    																		div += '		<p>	';
    																			div += '			<span>剩余：</span>';
    																				div += '			<span>'+values[i].availableCount+'</span>';
    																					div += '		</p>';
    																						div += '		</div>  ';
    																							div += '	</div>  ';
    																								div += '</a>      ';
    																									div += '<a href="javascript:void(0);" id="titleH'+pId+'" class="get" '+onclick+'  >'+title+'</a>';    
    																										div += '</div>';
        	 																						
    																									
            
            
        }); 
        div = div+ "</div>";
        console.log(div);
    });   
    
    
    
	if(addType == 1){
		//$("#gamelist").html(div);
		$("#gamePack").html(div);
	}else{
		//$("#gamelist").append(div);
		
		$("#gamePack").append(div);
	}
    
	
	for(var i=0;i<length;i++){
		
		var pId = list[i].id;
      	var content = list[i].content;
    		var guide = list[i].guide;
    		var index = 8;
    	var title = "领取";
    		if(content.length > index){
    			content = content.substring(0,index);
    			content +="..";
    		}
    		if(guide.length > index){
    			guide = guide.substring(0,index);
    			guide +="..";
    		}
    	     
    		var onclick = "";
	        if(list[i].isReceive == 1){
	        	title = '已领取';
	        }else{
	        	onclick = "onclick=receivePack("+pId+")";
	        }
	        
	      
	        
	        
    		
		var receiveButtonId = "receive"+i;
		
		/*div += '<div class="item" data-id="2103">';
			div += '<a href="javascript:void(0)" onclick="toPackDetailPage('+pId+')">  ';
				div += '	<figure class="cover">        ';
					div += '		<img src="'+list[i].iconURL+'"> ';
						div += '	</figure>         ';
							div += '	<div class="meta">   ';
								div += '	<div class="pack-content">	';
									div += '		<h4>'+list[i].gamePackName+'-'+list[i].name+'</h4>';
										div += '		<p>		';
											div += '				<span >礼包详情：</span>	';
												div += '				<span >'+content+'</span>';
													div += '			</p>	';
														div += '			<p>	';
															div += '			<span>使用方法：</span>		';
																div += '			<span>'+guide+'</span>	';
																	div += '		</p>';
																		div += '		<p>	';
																			div += '			<span>剩余：</span>';
																				div += '			<span>'+list[i].availableCount+'</span>';
																					div += '		</p>';
																						div += '		</div>  ';
																							div += '	</div>  ';
																								div += '</a>      ';
																									div += '<a href="javascript:void(0);" id="titleH'+pId+'" class="get" '+onclick+'  >'+title+'</a>';    
																										div += '</div>';*/
	
	 
    //+gameList[i].appFrom?string(1, 0)+','+gameList[i].downURL+'
	}
/*	if(addType == 1){
		$("#gamelist").html(div);
	}else{
		$("#gamelist").append(div);
	}*/
	
	 
}