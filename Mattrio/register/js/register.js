if (localStorage) {
	var network = localStorage.getItem("network");
}else{
	var network = $.cookie("network");
}

$(".code").show();
$(".codenone").hide();
if($(".industry").val() == "请选择您的行业"){
	$(".industry").css("color","#7d7b7b");
	$(".industry option").css("color","#000");
}
$(".industry").change(function(){
	if($(".industry").val() == "请选择您的行业"){
		$(".industry").css("color","#7d7b7b");
	}else{
		$(".industry").css("color","#333");
	}
	
})
//获取手机验证码
$(".code").click(function(){
	var phone = $("#inputtext").val();
	if($("#inputtext").val() == "" || $("#inputtext").val() == null){
		alert("请输入您的手机号码");
		return false;
	}
	var reg = /^1([358][0-9]|4[57]|7[0135678])\d{8}$/;
	if(phone.match(reg) == null){
		alert("电话号码格式错误")
		return false;
	}
	$.ajax({
		type:"post",
		url:network+"/Mattrio/RegeditInterface/sendMsg",
		data:{
			"phone":phone
		},
		dataType:"json",
		cache: false,
		crossDomain: true == !(document.all),
		success:function(data){
			if(data.recode == -1){
				alert(data.msg);
			}else if(data.recode == -2){
				alert(data.msg);
			}else if(data.recode == -3){
				alert(data.msg);
			}else if(data.recode == 200){
				var timer = setInterval(run,1000);
				var num = 60;
				run();
				function run(){
					if(num == 0){
						num=10;
						$(".code").show();
						$(".codenone").hide();
						clearInterval(timer);
					}else{
						$(".codenone").show().html(num+"秒后再次获取");
						$(".code").hide();
						num--;
					}
				}
			}
		},
		error:function(data){
			//console.log(data);
		}
	})
});

//点击注册
$(".checkform").click(function(){
	var phone = $("#inputtext").val();
	var pwd = $("#inputPassword").val();
	var yzm = $("#security").val();
	var repwd = $("#inputPassword1").val();
	var industry = $(".industry").val();
	var email = $("#exampleInputEmail1").val();
	if(phone == "" || phone == null){
		alert("请输入您的手机号码");
		return false;
	}
	//验证电话号码
	var reg = /^1([358][0-9]|4[57]|7[0135678])\d{8}$/;
	if(phone.match(reg) == null){
		alert("电话号码格式错误")
		return false;
	}
	// $(".span1").html("");
	//验证码不为空
	if(yzm == "" || yzm == null){
		alert("验证码不能为空");
		return false;
	}
	// $(".span2").html("");
	//验证密码： 字母数字下划线组成 6-12
	var reg = /^\w{6,}$/;
	if(pwd.match(reg) == null){
		alert("密码由数字字母下划线组成,不少与六位");
		return false;
	}
	// $(".span3").html("");
	//验证确认密码
	var repwd = repwd;
	if(repwd !== pwd){
		alert("两次密码不一致");
		return false;
	}
	// $(".span4").html("");
	//验证邮箱
	var reg = /^[\w-]{4,20}@\w{2,12}(\.\w+){1,3}$/;	
	if(email.match(reg) == null){
		alert("邮箱格式错误");
		return false;
	}
	// $(".span5").html("");
	if(industry == "请选择您的行业"){
		// $(".span6").html("请选择您的行业");
		alert("请选择您的行业");
		return false;		
	}
	// $(".span6").html("");
	$.ajax({
		type:"post",
		url:network+"/Mattrio/RegeditInterface/regedit",
		data:{
			"yzm":yzm,
			"phone":phone,
			"password":pwd,
			"industry":industry,
			"email":email
		},
		dataType:"json",
		cache: false,
		crossDomain: true == !(document.all),
		success:function(data){
			if(data.recode == -1){
				$(".span2").html(data.msg);
				return false;
			}else if(data.recode == 200){
				alert("注册成功");
				$.cookie("user_id",data.user.userId,{expires:7,path: "/"});
				$.cookie("username",data.user.userName,{expires:7,path: "/"});
				$.cookie("phone",phone,{expires:7,path: "/"});
				$.cookie("unmber",data.user.type,{expires:7,path: "/"});
	   			_czc.push(["_trackEvent","点击注册",phone+"注册",0]);
	   			window.location.href="../login/login.html";
			}
		},
		error:function(data){
			//console.log(data);
		}
	})


})