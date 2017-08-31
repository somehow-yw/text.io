function styleChange(){
	$("#get-verification").css("background","#7E7E7E");
	var wait = 60;
	var id = setInterval(function(){
		wait--;
		if(wait === 0){
			$("#get-verification").css("background","#FF7E00");
			$("#get-verification").text("获取验证码");
			clearInterval(id);
		}
		else{
			$("#get-verification").text(wait + "s后重新获取");
			$("#get-verification").css("background","#7E7E7E");
		}
	},1000);
}
function getVerificationUnBind(type){

var pattern  = /^1[3|4|5|7|8][0-9]{9}$/;
	
	//用户名密码取值
	var username = $("#username").val();
	
	//用户名密码是否匹配
	var isMatch =  pattern.test(username);
	
	var wait = 2;//错误提示显示事件
	if(!isMatch){
		Alert("手机号输入错误 请重新输入");
	}
		else{
			//验证成功调用
			styleChange();
		//	checkSmsCode(1);
			sendSms(type);//发送短信
		}
	
}



