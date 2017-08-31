function updatePassword() {
	var pattern = /^1[3|4|5|7|8][0-9]{9}$/;
	var pattenPwd = /[a-zA-Z0-9]{6,16}/;

	//用户名密码取值
	var oldPaddword = $("#oldpassword").val();
	var password = $("#password").val();

	var isSame;
	if(oldPaddword !== password) {
		isSame = false;
	} else {
		isSame = true;
	}
	var isMatchPwd = pattenPwd.test(password);
	var wait = 2; //错误提示显示事件

	if(isMatchPwd) {
		if(isSame == true) {
			$(".eject").css("display", "block");
			$(".eject").html("新旧密码相同 请重新输入");
			var id = setInterval(function() {
				if(wait === 0) {
					console.log(555);
					clearInterval(id);
					$(".eject").css("display", "none");
					wait = 2;
				} else {
					wait--;
				}
			}, 1000);
			return false;
		}
		else {
			//resetPassword(type);
			//sendSms(type);
			return true;
		}
	}
	else {
		$(".eject").css("display", "block");
			$(".eject").html("密码不合法 请重新输入");
			var id = setInterval(function() {
				if(wait === 0) {
					console.log(555);
					clearInterval(id);
					$(".eject").css("display", "none");
					wait = 2;
				} else {
					wait--;
				}
			}, 1000);
			return false;
		}
	return false;

}