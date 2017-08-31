//点击小图时显示大图
$(".item1").on("touchend",function(){
	$("#slider2").css("display","block");
	
});

//点击大图时大图消失 
$(".item2").on("touchend",function(){
//	$(".out-group").css("transform","translate3d(0px,0px,0px)");
	$("#slider2").css("display","none");
});

//点击完成时大图消失 
$("#complete").on("touchend",function(){
//	$(".out-group").css("transform","translate3d(0px,0px,0px)"); 
	$("#slider2").css("display","none");
});



//点击图片放大
//$("#item1").on("touchend",function(){	
//	$("#item2-1")[0].src = $("#img1")[0].src;
//	$("#slider2").css("display","block");
//})
//
//$("#item2").on("touchend",function(){
//	$("#item2-1")[0].src = $("#img2")[0].src;
//	$("#slider2").css("display","block");
//})
//$("#item3").on("touchend",function(){
//	$("#item2-1")[0].src = $("#img3")[0].src;
//	$("#slider2").css("display","block");
//})
//
//$("#item5").on("touchend",function(){
//	$("#item2-1")[0].src = $("#img5")[0].src;
//	$("#slider2").css("display","block");
//})


//回到顶部
$("#gotop").on("touchend",function(){
	document.body.scrollTop = 0;
});


window.onscroll = function(){
	var top = document.body.scrollTop || document.documentElement.scrollTop;
	if(top > 0){
		$("#gotop").css("display","block")
	}
	else{
		$("#gotop").css("display","none")
	}
}



//信任证书弹窗
//$("#playBtn").on("click",function(){
//	mui(".mui-slider").slider().gotoItem(0);
//	$(".trust-bg").css("height","100%");
//	$(".trust-bg").css("display","block");
//	$(".trust-container").css("display","block");
//	$(".trust-bg").css("background","rgba(0,0,0,0.5)")
//	var gallery = mui('.mui-slider');  
//	gallery.slider('gotoItem',0)	
//})

//点击叉的时候
$(".cha").on("click",function(){
	$("body").css("position","static")
	//$("body").css("top",$(window).scrollTop())
	$(".trust-bg").css("height","0");
	$(".trust-bg").css("background","rgba(0,0,0,0)")
	$(".trust-bg").css("display","none");
	$(".trust-container").css("display","none");
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

//$(".certificate-name").html($(".certificate-name").join("").slice(1,20).spilt("") + "...");

