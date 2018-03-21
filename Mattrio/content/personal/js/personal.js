if(localStorage){
	var network = localStorage.getItem("network");
}else{
	var network = $.cookie("network");
}
var username = $.cookie("username");
var frequency = $.cookie("frequency");
var userid = $.cookie("user_id");

$(".daydegree").html(frequency);
$(".username").html(username);

$(".contentleft ul li").click(function(){
	$(this).addClass("contentleftli").siblings().removeClass("contentleftli");
	$(".contentright div").eq($(this).index()).addClass("active").siblings().removeClass("active");
})
//退出登录
$(".outname").click(function(){
	var name = $.cookie("username",null,{ path: '/' });
	window.location.href="../../login/login.html";
})

//获取验证码

$(".code").click(function(){
	//点击获取验证码
	var phone = $("#telinp").val();
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
	var phone = $("#telinp").val();
	var pwd = $("#pwdinp").val();
	var yzm = $("#security").val();
	var repwd = $("#repwdinp").val();

	//验证电话号码
	var reg = /^1([358][0-9]|4[57]|7[0135678])\d{8}$/;
	if(phone.match(reg) == null){
		alert("电话号码格式错误");
		return false;
	}

	//验证码不为空
	if(yzm == "" || yzm == null){
		alert("验证码不能为空");
		return false;
	}

	//验证密码： 字母数字下划线组成 6-12
	var reg = /^\w{6,}$/;
	if(pwd.match(reg) == null){
		alert("密码有数字字母下划线组成,不小于六位");
		return false;
	}

	//验证确认密码
	var repwd = repwd;
	if(repwd !== pwd){
		alert("两次密码不一致");
		return false;
	}


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
				alert(data.msg);
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





//点击看查询记录
$(".vintd").click(function(){
	$.ajax({
			type:"post",
			url:network+"/Mattrio/VinInterface/queryvin",
			data:{
				"userid":userid,
				"vin":$(this).parent("tr").children("td").eq(0).html()
			},
			dataType:"json",
			cache: false,
			crossDomain: true == !(document.all),
			success:function(data){
				if(data.recode == -3 ){
					$("#loading").hide();
					alert(data.msg);
					return false;
				}
				if(data.recode == -5){
					$("#loading").hide();
					alert("格式不正确");
					return false;
				}else{
					$("#loading").hide();
					if (sessionStorage) {
						sessionStorage.key1 =JSON.stringify(data);
						sessionStorage.setItem("frequency",data.frequency);
					}else{
						 $.JSONCookie("key1", data, { path: '/'});
						 $.cookie("frequency",data.frequency, { path: '/'});
					}
					window.location.href="../particulars/particulars.html";
				}	
			},error:function(data){
				
			}
		})
})