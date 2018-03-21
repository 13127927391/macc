if (localStorage) {
	var network = localStorage.getItem("network");
}else{
	var network = $.cookie("network");
}

$(".code").show();
$(".codenone").hide();
$(".code").click(function(){
	//点击获取验证码
	var phone = $("#inputtext").val();
	$.ajax({
		type:"post",
		url:network+"/Mattrio/RegeditInterface/sendMsg2",
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
						$(".code").show();
						$(".codenone").hide();	
						num=10;
						$(".code").show();
						$(".codenone").hide();
						clearInterval(timer);
					}else{
						$(".codenone").show().html(num+"秒后可再次获取");
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


$(".checkform").click(function(){
	//点击找回密码
	var phone = $("#inputtext").val();
	var pwd = $("#inputPassword").val();
	var yzm = $("#security").val();
	var repwd = $("#inputPassword1").val();

	//验证电话号码
	var reg = /^1([358][0-9]|4[57]|7[0135678])\d{8}$/;
	if(phone.match(reg) == null){
		$(".span1").html("电话号码格式错误");
		return false;
	}
	$(".span1").html("");
	//验证码不为空
	if(yzm == "" || yzm == null){
		$(".span2").html("验证码不能为空");
		return false;
	}
	$(".span2").html("");
	//验证密码： 字母数字下划线组成 6-12
	var reg = /^\w{6,}$/;
	if(pwd.match(reg) == null){
		$(".span3").html("密码有数字字母下划线组成,不小于六位");
		return false;
	}
	$(".span3").html("");
	//验证确认密码
	var repwd = repwd;
	if(repwd !== pwd){
		$(".span4").html("两次密码不一致");
		return false;
	}
	$(".span4").html("");

	$.ajax({
		type:"post",
		url:network+"/Mattrio/RegeditInterface/ForgotPassword",
		data:{
			"yzm":yzm,
			"phone":phone,
			"password":pwd,
		},
		dataType:"json",
		cache: false,
		crossDomain: true == !(document.all),
		success:function(data){
			if(data.recode == -1){
				$(".span2").html(data.msg);
				return false;
			}else if(data.recode == 200){
				alert("密码设置成功");
	   			window.location.href="../../index.html";
			}
		},
		error:function(data){
			//console.log(data);
		}
	})


})