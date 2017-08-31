function phoneRegister(){
	var pattenPwd = /[a-zA-Z0-9]{6,16}/;
	
	//用户名密码取值
	var password = $("#password").val();
	var wait = 2;//错误提示显示事件
	//用户名密码是否匹配
	var isMatchPwd = pattenPwd.test(password);
	
	if(!isMatchPwd){
			$(".eject").css("display","block");
			$(".eject").html("密码不合法 请重新输入");
			var id = setInterval(function(){
				console.log(isMatchPwd);
				if(wait === 0){
					console.log("不合法");
					clearInterval(id);
					$(".eject").css("display","none");
					wait = 2;
				}
				else{
					wait--;
				}
			},1000)
			
		}
	else{
			//验证成功调用
			userRegister();
	}
	
	
}
