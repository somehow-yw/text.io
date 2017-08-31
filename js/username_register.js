//验证用户名是否合法
function usernameRegister(){
	
	//用户名密码正则
	var pattern  = /^[a-z][a-zA-Z0-9]{3,15}$/;
	var pattenPwd = /[a-zA-Z0-9]{6,16}/
	
	//用户名密码取值
	var username = $("#username").val();
	var password = $("#password").val();
	
	//用户名密码是否匹配
	var isMatch =   pattern.test(username)
	var isMatchPwd = pattenPwd.test(password);
	
	var wait = 2;//错误提示显示事件
	if(isMatch){
		if(!isMatchPwd){
			$(".eject").css("display","block");
			$(".eject").html("密码不合法 请重新输入");
			var id = setInterval(function(){
				if(wait === 0){
					console.log(555);
					clearInterval(id);
					$(".eject").css("display","none");
					wait = 2;
				}
				else{
					console.log(555);
					wait--;
				}
			},1000)
			
		}
		else{
			//验证成功调用
			userRegisterAccount();
		}
	}
	else{
		$(".eject").css("display","block")
		$(".eject").html("用户名不合法 请重新输入");
		var id = setInterval(function(){
				if(wait === 0){
					clearInterval(id);
					$(".eject").css("display","none");
					wait = 2;
				}
				else{
					console.log(555);
					wait--;
				}
			},1000)
	}
}

