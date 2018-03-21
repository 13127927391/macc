if (localStorage) {
	var network = localStorage.getItem("network");
}else{
	var network = $.cookie("network");
}
$("#loading").hide();

var user_name = $.cookie("username");
var pasword = $.cookie("password");
//判断是否有localStorage
if(user_name == undefined || user_name == "null" || user_name == null){
	$("#inputEmail3").val("");
	$("#inputPassword3").val("");
}else{
	$("#inputEmail3").val(user_name);
	$("#inputPassword3").val(pasword);
}
//登录请求
$("#btn").click(function(){
	var username = $("#inputEmail3").val();
	var pwd = $("#inputPassword3").val();
	var security = $("#security").val();
	if(username == "" || username == null){
		alert('请输入用户名');
		return false;
	}
	if(pwd == "" || pwd == null){
		alert("请输入您的密码");
		return false;
	}
	$("#loading").show();
	$.ajax({
		type:"post",
        url:network+"/Mattrio/LoginInterface/login",
        data:{
            "user_name":username,"password":pwd,"verifyCode":security
        },
        dataType:"json",
		cache: false,
		crossDomain: true == !(document.all),
        success:function(data){
        	// console.log(data)
			$("#loading").hide();
   			//正则验证用户名
	   		if (data.recode == -2) {
		   		alert("账户用户密码不正确");
		   	}else if(data.recode == -1){
		   		alert("验证码错误");
		   	}else if(data.recode == -999){
		   		alert(data.msg);
		   	}else{
				// _czc.push(["_trackEvent",username+"登录",0,"btn"]);
				
   				$.cookie("username",data.user_name,{expires:7,path: "/"});
   				$.cookie("frequency",data.frequency,{expires:7,path: "/"});
   				$.cookie("user_id",data.user_id,{expires:7,path: "/"});
   				$.cookie("phone",data.phone,{expires:7,path: "/"});
   				$.cookie("loginmode","",{expires:7,path: "/"});
	   		
	   			window.location.href="../index.html";
			}
        },error:function(data){
        }
	})

});



$("#bttn").click(function(){
	window.location.href="../register/register.html";
})


$(document).keydown(function(even){
	if(event.keyCode==13){
		$("#btn").click();
	}
})