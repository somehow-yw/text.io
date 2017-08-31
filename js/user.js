//礼包列表
function toPackListPage(){
	window.location.href = PAGECfg.packListPage;
}

//礼包详情
function toPackDetailPage(pId){
	saveJsonData(SESSION_KEY.PACK_ID,pId);
	window.location.href = PAGECfg.packDetailPage;
}

//礼包详情-游戏详情跳转
function toPackDetailByGameIndoPage(pId){
	saveJsonData(SESSION_KEY.PACK_ID,pId);
	window.location.href = PAGECfg.packDetailByGameInfoPage;
}
 
//用户登录界面
function toLoginPage(){
	window.location.href = PAGECfg.loginPage;
}

//用户登录界面
function toLoginPageByPack(){
	window.location.href = PAGECfg.loginPageByPack;
}

//用户注册界面跳转
function toResigterPage(){
	window.location.href = PAGECfg.registerPage;
}


//用户注册界面，第二步，进入输入密码界面
function toResigterPageStep2(){
	window.location.href = PAGECfg.registerPageEnterPassword;
}

//个人中心界面跳转
function toPersonalPage(){
	window.location.href = PAGECfg.personalPage;
}

//用户名注册界面
function toRegisterAccountNamePage(){
	window.location.href =  PAGECfg.registerAccountNamePage;
}

//跳转到修改密码界面
function toUpDataPassword(){
	window.location.href =  PAGECfg.updatePassword;
}

//找回密码
function toFindPasswordPage(){
	window.location.href =  PAGECfg.findPassword;
}

function toDiscountPage(){
	window.location.href =  PAGECfg.discountPage;
}

//跳转消费记录页面
function toRecordsPage(){
	window.location.href =  PAGECfg.records;
}
//登录之后，点击头像
function userLogout(){
	 $("#isLogout").show();
}

//绑定手机账号
function toBindPhonePage(){
	console.log("bindphone");
	window.location.href =  PAGECfg.bindPage;
}

//联系客服
function  toContactPage(){
	window.location.href = PAGECfg.contactPage;
}

//取消手机绑定
function toUnbindPhonePage(){
	console.log("unbindPhone");
	window.location.href =  PAGECfg.unBindPage;
}
//查询用户信息
function getUserInfo(type){
	var userinfo = getUserInfoLocal();
	console.log(userinfo);
	
	//折扣说明页面
	$("#discount").bind("click",function(){
			toDiscountPage();
	});
	$("#lxkf").bind("click",function(){
		toContactPage();
	});
	if(null != userinfo && userinfo.id >=0){
		//当前用户已经登录
		var phonenum = userinfo.username;
		$("#unlogin").hide();
		$("#alreadyLogin").show();
		$("#username").html(userinfo.account_name);
		
		if(typeof(phonenum)=="undefined"){
			//没有绑定手机号，点击跳转到手机绑定界面
			$("#phone").bind("click",function(){
				toBindPhonePage();
			});
		}else{
			//绑定手机号，点击跳转到手机解绑界面
			$("#phone").bind("click",function(){
				toUnbindPhonePage();
			});
		}
		
		$("#phone").html(phonenum);
		
		if(type == 2){
			
			if(typeof(phonenum)!="undefined"){
				$("#username").val(phonenum);
				$("#username").attr('readonly',true);
			}
			
			
		}
		
		console.log("the phonenum is " + phonenum);
		
		
		$("#updatepassword").bind("click",function(){
			toUpDataPassword();//点击跳转到修改密码界面
		});
		
		$("#records").bind("click",function(){
			toRecordsPage();//点击跳转到消费记录
		});
		
		
	 
		console.log(userinfo);
	}else{
		//当前用户未登录
		$("#updatepassword").bind("click",function(){
			toLoginPage();////点击跳转到登录界面
		});
		
		$("#records").bind("click",function(){
		  toLoginPage();//点击跳转到登录界面
		});
	}
	
	
	
}

function cancelLogout(){
	no();
}

function logout(){
	yes();
	userLogoutLocal();
	toLoginPage();//跳转到登录界面
}

function showNameAndPaswd(){
	var username = getJsonData (SESSION_KEY.PHONE);// saveJsonDataLocal(SESSION_KEY.PHONE, username);
	var password = getJsonData(SESSION_KEY.PASSWORD);//
	
	$("#username").val(username);
	$("#password").val(password);

}

//修改用户密码
function resetPassword(type){
	var flag ;
	if(type == 2){
		//修改密码
		  flag = updatePassword();
		if(!flag){
			return;
		}
	}else{
		//找回密码
		flag = usernameRegister();
		if(!flag){
			return;
		}
	}
	var username = $("#username").val();
	var oldPassword = $("#oldpassword").val();
	var password = $("#password").val();
	var passwordText = password;
	var code = $("#smscode").val();

	var userinfo = getUserInfoLocal();
	
	if(userinfo == 0){
		//当前用户未登录，需要跳转到登录界面
		toLoginPage();
	}
	
	if(userinfo != 0){
		//当前用户已经登录
		var accountName = userinfo.account_name;
		var username = userinfo.username;
		
		if(username == null){
			username = accountName;
		}
	}
	
	console.log(userinfo);

	
	
	oldPassword = md5(oldPassword);
	password = md5(password);
 
	

	 $.ajax({  
	    	dataType: "json",
	        type : "POST",  //提交方式  
	      //  async: false,//同步
	        url : URLCfg.resetPassword,//路径  
	        data : {
	        	"password":password,"sms_code":code,"old_pwd":oldPassword ,"type":type, "username":username,   "r": new Date().getTime()//给一个随机事件，避免缓存
	        },
	        beforeSend: function(){
	        },
	        success : function(result) {//返回数据根据结果进行相应的处理  
	        	console.log(result);
	        	Alert(result.errormsg);
	        	if(result.errornum == 0){
	        		//密码修改成功，跳转到个人中心界面
	        		if(type == 2){
	        			
	        			saveJsonData(SESSION_KEY.PHONE, username);
	        			saveJsonData(SESSION_KEY.PASSWORD, passwordText);
	        			
	        		
	        			console.log(getJsonData(SESSION_KEY.PASSWORD));
	        			
	        			toPersonalPage();//跳转到个人中心
	        		}else {
	        			 
	        			console.log(username);
	        			  
	        			saveJsonData(SESSION_KEY.PHONE, username);
	        			saveJsonData(SESSION_KEY.PASSWORD, passwordText);
	        			toLoginPage();//跳转到登录界面
	        		}
	        	}
	        
	        },
	        error:    function(XMLHttpRequest, textStatus, errorThrown){
	        		Alert("老板数据请求出错了，请再来一次");
	        }
	    }); 
}


////礼包列表
//function getPackList(pageNo,searchKey){
//	
//	console.log(getUserInfoLocal());
//	var userId = 0;
//	try {
//		   userId = getUserInfoLocal().id;
//	} catch (e) {
//		//当前用户未登录
//		userId = 0;
//	}
// 	
// 	 console.log(URLCfg.packList);
//	 
//	 $.ajax({  
//	    	dataType: "json",
//	        type : "POST",  //提交方式  
//	      //  async: false,//同步
//	        url : URLCfg.packList,//路径  
//	        data : {
//	        	"searchKey":searchKey, "pageNo":pageNo, "id":userId,   "r": new Date().getTime()//给一个随机事件，避免缓存
//	        },
//	        beforeSend: function(){
//	        },
//	        success : function(result) {//返回数据根据结果进行相应的处理  
//	        	console.log(result);
//	        	
//	        var div = "";
//	        var flag = result.errornum;
//	        var data = result.data;
//	         console.log(data);
//	        if(flag ==0){
//	        }
//	        pullupRefresh(div,1,1,data);
//	        	//Alert(result.errormsg);
//	        },
//	        error:    function(XMLHttpRequest, textStatus, errorThrown){
//	        		Alert("老板数据请求出错了，请再来一次");
//	        }
//	    }); 
//}



//礼包详情
function getPackDetail(){
 
	var userId = 0;
	try {
		 userId = getUserInfoLocal().id;
	} catch (e) {
		userId = 0;
	}

	if(typeof(userId)=="undefined"){
		userId = getUserInfoLocal();
	}
	 
	 
	var pId =  getJsonData(SESSION_KEY.PACK_ID);

	 if(typeof(pId)=="undefined"||pId==null){ 

		 toPackListPage();
	 } 
	 
	 
	 $.ajax({  
	    	dataType: "json",
	        type : "POST",  //提交方式  
	      //  async: false,//同步
	        url : URLCfg.packDetail,//路径  
	        data : {
	        	 "pid":pId, "id":userId,   "r": new Date().getTime()//给一个随机事件，避免缓存
	        },
	        beforeSend: function(){
	        },
	        success : function(result) {//返回数据根据结果进行相应的处理  
	        	console.log(result);
	        	
	        var div = "";
	        var flag = result.errornum;
	        var data = result.data;
	      
	        if(flag ==0){
	        	 $("#content").html(data.content);
	        	 $("#guide").html(data.guide);
	        	 $("#range").html(data.range);
	        	 $("#name").html(data.gamePackName +"-"+data.name);
		        	
	        	 
	        	
	        	 $("#residue-detail").html(data.availableCount+"/"+data.totalCount);
	        	 $("#outdate-detail").html(data.endTime);
	        	 
	        	 if(data.isReceive == 1){
	        		 //已经领取了
	        		 $("#copy-code").show();
	        		 $("#get-btn").hide();
	        		 $("#code").html(data.info);
	        	 }else{
	        		 //当前礼包未领取
	        		 $("#copy-code").hide();
	        		 $("#get-btn").show();
	        	 }
	        	
	        }
	       
	        	//Alert(result.errormsg);
	        },
	        error:    function(XMLHttpRequest, textStatus, errorThrown){
	        		Alert("老板数据请求出错了，请再来一次");
	        }
	    }); 
}

//领取礼包
function receivePack(id){
	console.log(getUserInfoLocal());
	console.log(URLCfg.records);
	 var userId = getUserInfoLocal().id;
	var type = 0;
	 if(typeof(id)=="undefined"){ 
		   id =  getJsonData(SESSION_KEY.PACK_ID);
		   type = 1;
	 } 
	 

	 
	 
	 
	 $.ajax({  
	    	dataType: "json",
	        type : "POST",  //提交方式  
	      //  async: false,//同步
	        url : URLCfg.receivePack,//路径  
	        data : {
	        	 "pid":id,  "id":userId,   "r": new Date().getTime()//给一个随机事件，避免缓存
	        },
	 
	        beforeSend: function(){
	        },
	        
	        success : function(result) {//返回数据根据结果进行相应的处理  
	        	console.log(result);
	     
	        var flag = result.errornum;
	        var data = result.data;
	        
	        
	        if(flag ==0){
	        	//礼包领取成功
				if(type == 0){
					//列表领取
					myShow();
					$("#copy-text").html(data);
					$("#titleH"+id+"").html("已领取");
					
					var u = navigator.userAgent;
					var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
					if( isAndroid){
						 $("#howCopy").html("双击礼包号，点击【复制】按钮");
					}
					
				}else{
					getPackDetail();
				}
	        }else{
	        	//礼包领取失败
	        		
	        		$("#get-btn").show();
	        		
	        		if(typeof(userId)=="undefined"){ 
		  				toLoginPageByPack();
	 				}else{
	 					Alert(result.errormsg);
	 				}
	        		
	        	 
	        }
	        
	        	//Alert(result.errormsg);
	        },
	        error:    function(XMLHttpRequest, textStatus, errorThrown){
	        		Alert("老板数据请求出错了，请再来一次");
	        }
	    }); 
	 
}

//消费记录
function getUserRecords(pageNo){

	console.log(getUserInfoLocal());
	console.log(URLCfg.records);
	 var userId = getUserInfoLocal().id;
	 
	 $.ajax({  
	    	dataType: "json",
	        type : "POST",  //提交方式  
	      //  async: false,//同步
	        url : URLCfg.records,//路径  
	        data : {
	        	"pageNo":pageNo, "id":userId,   "r": new Date().getTime()//给一个随机事件，避免缓存
	        },
	        beforeSend: function(){
	        },
	        success : function(result) {//返回数据根据结果进行相应的处理  
	        	console.log(result);
	        	
	        var div = "";
	        var flag = result.errornum;
	        var data = result.data;
	         console.log(data.length);
	        if(flag ==0){
	        	for(i = 0;i<data.length;i++){
	     
	        		var name = data[i].gameName;
	        		if(name.length >=10){
	        			name = name.substring(0,6);
	        			name += "...";
	        		}
	        	// div += '<li>';
	        div += '<div class="record"> ';
	        div += '	<div class="left-title">游戏【'+name+'】充值</div> ';
	        div += '	<div class="right-record"> ';
	        div += '		<p class="money-add">-'+data[i].realPrice+'</p> ';
	        div += '		<p class="date">'+data[i].successTime+'</p> ';
	        div += '	</div> ';
	        div += '	</div> ';
	        //div += '</li>';
	        	}
	        }
	        
	       // $("#record-container").html(div);
	        pullupRefresh(div,1,1);
			
	        	//Alert(result.errormsg);
	        },
	        error:    function(XMLHttpRequest, textStatus, errorThrown){
	        		Alert("老板数据请求出错了，请再来一次");
	        }
	    }); 
	
}


//绑定手机
function bindPhone(){
	var username = $("#username").val();
	var code = $("#smscode").val();
	var accountname = getUserInfoLocal().account_name;
	
	 $.ajax({  
	    	dataType: "json",
	        type : "POST",  //提交方式  
	      //  async: false,//同步
	        url : URLCfg.bindPhone ,//路径  
	        data : {
	        	"account_name":accountname,"sms_code":code, "username":username,   "r": new Date().getTime()//给一个随机事件，避免缓存
	        },
	        beforeSend: function(){
	        },
	        success : function(result) {//返回数据根据结果进行相应的处理  
	        	console.log(result);
	        	Alert(result.errormsg);
	        	if(result.errornum == 0){
	        		saveUserInfoLocal(result.data);
	        		toPersonalPage();
	        	}
	        },
	        error:    function(XMLHttpRequest, textStatus, errorThrown){
	        		Alert("老板数据请求出错了，请再来一次");
	        }
	    }); 
	
}


//手机解绑
function unBindPhone(){
	var username = $("#username").val();
	var code = $("#smscode").val();
	var accountname = getUserInfoLocal().account_name;
	
	 $.ajax({  
	    	dataType: "json",
	        type : "POST",  //提交方式  
	      //  async: false,//同步
	        url : URLCfg.unBindPhone,//路径  
	        data : {
	        	"account_name":accountname,"sms_code":code, "username":username,   "r": new Date().getTime()//给一个随机事件，避免缓存
	        },
	        beforeSend: function(){
	        },
	        success : function(result) {//返回数据根据结果进行相应的处理  
	        	console.log(result);
	        	Alert(result.errormsg);
	        	if(result.errornum == 0){
	        		saveUserInfoLocal(result.data);
	        		toPersonalPage();
	        	}
	        },
	        error:    function(XMLHttpRequest, textStatus, errorThrown){
	        		Alert("老板数据请求出错了，请再来一次");
	        }
	    }); 
	
}

//请求短信
function sendSms(type){
	var username = $("#username").val();
	 $.ajax({  
	    	dataType: "json",
	        type : "POST",  //提交方式  
	      //  async: false,//同步
	        url : URLCfg.sendSmsCode,//路径  
	        data : {
	        	"type":type, "username":username,   "r": new Date().getTime()//给一个随机事件，避免缓存
	        },
	        beforeSend: function(){
	        },
	        success : function(result) {//返回数据根据结果进行相应的处理  
	        	console.log(result);
	        	Alert(result.errormsg);
	        },
	        error:    function(XMLHttpRequest, textStatus, errorThrown){
	        		Alert("老板数据请求出错了，请再来一次");
	        }
	    }); 
	
}

//显示上一个页面输入的手机号码
function userRegisterInfo(){
	var phoneNum = getJsonData(SESSION_KEY.PHONE);
	$("#username").val(phoneNum);
	 
	console.log(phoneNum);
}

//用户注册
function userRegister(){
	var username =  $("#username").val();
	var password =  $("#password").val();
	var idfa = getIdfa();
	var code = getJsonData(SESSION_KEY.SMSCODE);
	var adminUserId = getJsonDataLocal(SESSION_KEY.SHARE_USER_ID);
	
	
	 $.ajax({  
	    	dataType: "json",
	        type : "POST",  //提交方式  
	      //  async: false,//同步
	        url : URLCfg.userRegister,//路径  
	        data : {
	        	"adminUserId":adminUserId,"idfa":idfa,"sms_code":code,"username":username,"password":password,   "r": new Date().getTime()//给一个随机事件，避免缓存
	        },
	        beforeSend: function(){
	        },
	        success : function(result) {//返回数据根据结果进行相应的处理  
	        	console.log(result);
	        	Alert(result.errormsg);
	        	if(result.errornum == 0){
	        		saveUserInfoLocal(result.data);//保存用户信息到数据中
	        		toPersonalPage();//登录成功，跳转到个人中心页面
	        	
	        	}
	        	
	        },
	        error:    function(XMLHttpRequest, textStatus, errorThrown){
	        		Alert("老板数据请求出错了，请再来一次");
	        }
	    }); 
	
}


//用户注册，使用用户名注册
function userRegisterAccount(){
	var username =  $("#username").val();
	var password =  $("#password").val();
	var idfa = getIdfa();
	 $.ajax({  
	    	dataType: "json",
	        type : "POST",  //提交方式  
	      //  async: false,//同步
	        url : URLCfg.userRegisterByAccount,//路径  
	        data : {
	        	"idfa":idfa,"username":username,"password":password,   "r": new Date().getTime()//给一个随机事件，避免缓存
	        },
	        beforeSend: function(){
	        },
	        success : function(result) {//返回数据根据结果进行相应的处理  
	        	console.log(result);
	        	Alert(result.errormsg);
	        	if(result.errornum == 0){
	        		saveUserInfoLocal(result.data);//保存用户信息到数据中
	        		toPersonalPage();//登录成功，跳转到个人中心页面
	        		
	        	}
	        	
	        },
	        error:    function(XMLHttpRequest, textStatus, errorThrown){
	        		Alert("老板数据请求出错了，请再来一次");
	        }
	    }); 
	
}

 


//用户登录
function userLogin(){
	var username = $("#username").val();
	var password =  $("#password").val();
	
		 
	    password =  md5(password);
	
	 $.ajax({  
	    	dataType: "json",
	        type : "POST",  //提交方式  
	      //  async: false,//同步
	        url : URLCfg.userlogin,//路径  
	        data : {
	        	"username":username,"password":password,   "r": new Date().getTime()//给一个随机事件，避免缓存
	        },
	        beforeSend: function(){
	        },
	        success : function(result) {//返回数据根据结果进行相应的处理  
	        	console.log(result);
	        	Alert(result.errormsg);
	        	if(result.errornum == 0){
	        		saveUserInfoLocal(result.data);//保存用户信息到数据中
	        		toPersonalPage();//登录成功，跳转到个人中心页面
	        		
	        	}
	        	
	        },
	        error:    function(XMLHttpRequest, textStatus, errorThrown){
	        		Alert("老板数据请求出错了，请再来一次");
	        }
	    }); 
}

/**
 * 检查验证码是否正确
 */
function checkSmsCode(type){
	var username = $("#username").val();
	var smsCode = $("#smscode").val();
	 $.ajax({  
	    	dataType: "json",
	        type : "POST",  //提交方式  
	      //  async: false,//同步
	        url : URLCfg.checkSmsCode,//路径  
	        data : {
	        	"sms_code":smsCode, "type":type, "username":username,   "r": new Date().getTime()//给一个随机事件，避免缓存
	        },
	        beforeSend: function(){
	        },
	        success : function(result) {//返回数据根据结果进行相应的处理  
	        	console.log(result);
	        	Alert(result.errormsg);
	        	
	        	if(result.errornum == 0){
	        		//验证码输入正确
	        	  	if(type== 1){
		        		//手机号注册，继续下一步
	        	  		saveJsonData(SESSION_KEY.PHONE, username);
		        		saveJsonData(SESSION_KEY.SMSCODE, smsCode);
		        		toResigterPageStep2();
		        	
		        	}
	        	}
	        	
	      
	        },
	        error:    function(XMLHttpRequest, textStatus, errorThrown){
	        		Alert("老板数据请求出错了，请再来一次");
	        }
	    }); 
	
}


//联系客服
function customerService(qqNumber){
	var url = "mqqwpa://im/chat?chat_type=wpa&uin="+qqNumber+"&version=1&src_type=web&web_src=oicqzone.com";
	window.location.href = url;
}

//加入qq群
function qqGroup(groupNumber){
	url = "mqqapi://card/show_pslcard?src_type=internal&version=1&uin=" + groupNumber+"&card_type=group&source=qrcode"
	window.location.href = url; 
	alert(url == str)
}

function searchGame(){
	var value=$(".search-input").val();
	console.log(value);
	getPackList(1,value);
}


	//输入框点击回车
function searchInput(){
//event.keyIdentifier  苹果
//event.key 非苹果
	if(event.keyIdentifier == "Enter" || event.key == "Enter"){
		var value=$(".search-input").val();
		console.log(value);
		getPackList(1,value);
		/*  getGameClientListBySearch(1,null,null,value); */
	}
}
