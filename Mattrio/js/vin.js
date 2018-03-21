if(localStorage){
	var network = localStorage.getItem("network");
}else{
	var network = $.cookie("network");
}

//点击其他地方隐藏盒子
function stopPropagation(e) { 
	if (e.stopPropagation) 
		e.stopPropagation(); 
	else {
		e.cancelBubble = true;
	}
}
$(document).bind('click',function(){ 
	$('.carname').css('display','none');
}); 
$('.cont_epc').bind('click',function(e){ 
	stopPropagation(e);
}); 

$(".contentbg").click(function(){
	$(".conts1").hide();
	$(".conts3").hide();
	$(".conts4").hide();
})
$(".click_none").click(function(){
	$(".conts1").hide();
	$(".conts3").hide();
	$(".conts4").hide();
})
$(".nav").click(function(){
	$(".conts1").hide();
	$(".conts3").hide();
	$(".conts4").hide();
})
$(".image").click(function(){
	$(".conts1").hide();
	$(".conts3").hide();
	$(".conts4").hide();
})
// $(".cont_epcinp").show();
// $("#loading").hide();

$(".work_cont_vin").click(function(){
	$(".cont_epc").addClass("cont_active");
	$(".cont_detalis").removeClass("cont_active");
	$(".contentcxvin").click();
	$("body,html").animate({
		scrollTop:0
	},200);
})
$(".work_cont_oe").click(function(){
	$(".cont_epc").addClass("cont_active");
	$(".cont_detalis").removeClass("cont_active");
	$(".contentcxoe").click();
	$("body,html").animate({
		scrollTop:0
	},200);
})
$(".work_cont_epc").click(function(){
	$(".cont_detalis").addClass("cont_active");
	$(".cont_epc").removeClass("cont_active");
	$("body,html").animate({
		scrollTop:0
	},200);
})
$(".work_cont_mikey").click(function(){
	$(".cont_epc").addClass("cont_active");
	$(".cont_detalis").removeClass("cont_active");
	$(".contentcxmikey").click();
	$("body,html").animate({
		scrollTop:0
	},200);
})
$(".work_cont_platform").click(function(){
	$(".cont_epc").addClass("cont_active");
	$(".cont_detalis").removeClass("cont_active");
	$(".contentcxyear").click();
	$("body,html").animate({
		scrollTop:0
	},200);
})
$(".work_cont_juece").click(function(){
	if(name == undefined || name == "undefined" || name == "null" || name == null){
		if(confirm("您还没登录，是否登录") == true) {
			window.location.href = "./login/login.html";
		}
	}else{
		$(".nav_bi p").click();
	}
})
$(".content_work div div img").mouseover(function(){
	$(this).stop().animate({width:"230px",left:"-5px",top:"-5px"},300)
}).mouseout(function(){
	$(this).stop().animate({width:"200px",left:"0px",top:"0px"},300)
})

$(".cont_epcinp span").click(function(){
	$(".carname").toggle();
})
$(".carname p").click(function(){
	$(".carname").hide();
	$(".cont_epcinp span").html($(this).html())
})
$("#epc_inp").focus(function(){
	$(".carname").hide();
})
$(".cont_epc_title_back").click(function(){
	$(".cont_detalis").removeClass("cont_active");
	$(".cont_epc").addClass("cont_active");
})

//有
var name = $.cookie("username");
var frequency = $.cookie("frequency");
var phone = $.cookie("phone");

if(name == undefined || name == "undefined" || name == "null" || name == null){
	$("#btn_epc").click(function(){
		if(confirm("您还没登录，是否登录") == true) {
			window.location.href = "./login/login.html";
		}
	})
}else{
	$("#btn_epc").click(function(){	
		var userid = $.cookie("user_id");
		fn2();
		if(!$.trim($("#epc_inp").val())){
			alert("输入的内容不能是空");
			return false;
		}
		var vin = $.trim($("#epc_inp").val().toUpperCase());
		var reg = /^\w{17}$/;
		if(vin.match(reg) == null){
			alert("请填写正确的VIN码");
			return false;
		}
		$("#loading").show();
		if(phone == undefined || phone == "undefined" || phone == "null" || phone == null || phone == ""){
			if(confirm("您还没有绑定手机号码，需要绑定手机号码后才能查询")){
				$(".b_phone").fadeIn();
				$("#loading").hide();
				$(".bingtit span").click(function(){
					$(".b_phone").fadeOut();
				});
			}
		}else{
			if($.cookie("loginmode") == undefined){
			    var loginmode = "" ;
			}else{
			    var loginmode = $.cookie("loginmode");
			}
			_czc.push(["_trackEvent", "epc查询", name, phone + loginmode, 0, "epcbtn"]);
			var epc_inp = $.trim($("#epc_inp").val().toUpperCase());
			if (sessionStorage) {
				var searc = sessionStorage.setItem("searc",epc_inp);
			}else{
				var searc = $.cookie("searc",epc_inp);
			}
			var str = {"0":"2000","1":"2001","2":"2002","3":"2003","4":"2004","5":"2005","6":"2006","7":"2007","8":"2008","9":"2009","A":"2010","B":"2011","C":"2012","D":"2013","E":"2014","F":"2015","G":"2016","H":"2017","I":"2018"};
			var num = $.trim($("#epc_inp").val().toUpperCase()).substring(9,10);
			var epcyear;
			$.each(str,function(key,value){
				if(num == key){
					epcyear = value;
				}
			})
			var carname = $(".cont_epcinp span").html().split(">")[1];
			if($(".cont_epcinp span").html() == "请选择主机厂" || $(".cont_epcinp span").html() == "VIN查询"){
				$("#loading").hide();
				alert("请选择主机厂");
			}else if(carname.indexOf("宝马") >=0 || carname.indexOf("MINI")>=0){
				$("#loading").hide();
				window.location.href="bwm_epc/content/detail_epc/detail_epc.html?vin="+$.trim($("#epc_inp").val().toUpperCase())+"&fgstnr_mospid="+""+"&fgstnr_prod="+""+"&fztyp_einsatz="+""+"&year="+epcyear;
			}else if(carname.indexOf("奔驰") >= 0 || carname.indexOf("SMART") >= 0){
				$("#loading").hide();
				window.location.href = "benchi_epc/benchi_epc/benchi_epc.html?vin="+$.trim($("#epc_inp").val().toUpperCase());
			}else if(carname.indexOf("本田") >= 0 || carname.indexOf("讴歌") >= 0){
				$.ajax({
					type:"post",
					url:network+"/Mattrio/HondaEpcInterface/getHondVin",
					data:{
						"userid":userid,
						"vin":$.trim($("#epc_inp").val().toUpperCase())
					},
					dataType:"json",
					cache: false,
					crossDomain: true == !(document.all),
					success:function(data){
						$("#loading").hide();
						if(data.recode == -3){
							alert("如需获取更多信息，请联系昂美数据，电话021-52212966");
							return false;
						}
						if($.isEmptyObject(data)){
							alert("如需获取更多信息，请联系昂美数据，电话021-52212966");
							return false;
						}
						$(".contout").fadeIn();
						$(".select1").html("");
						$.each(data,function(key,value){
							$("<option>").html(value.XGRADEFULNAM).appendTo(".select1");
						});
						$(".select2").html("");
						$.each(data[0].CMNOPT,function(key,value){
							$("<option>").html(value).appendTo(".select2");
						})
						$(".select1").change(function(){
							var k = $(this).val();
							$(".select2").html("");
							$.each(data,function(key,value){
								if(k == value.XGRADEFULNAM){
									$.each(value.CMNOPT,function(k,v){
										$("<option>").html(v).appendTo(".select2");
									})
								}
							})
						})
						$(".contepc .contbtn").click(function(){
							$.each(data,function(key,value){
								if(value.XGRADEFULNAM.replace(/\s/g,"") == $(".select1").val().replace(/\s/g,"")){
									window.location.href = "./bentian_epc/bentian_epc/bentian_epc.html?a="+value.DISC_NO+"&b="+value.HMODTYP+"&c="+value.NENGNSEQEPCEND+"&d="+value.NPL+"&d="+value.XGRADEFULNAM+"&f="+value.nengnseqepcstrt+"&year="+epcyear+"&vin="+$.trim($("#epc_inp").val().toUpperCase());
								}
							});
							$(".contout").fadeOut();
						})
					}
				})
			}else if(carname.indexOf("现代") >= 0){
				$.ajax({
					type:"post",
					url:network+"/Mattrio/HyundaiEpcInterface/getHyundaiVin",
					data:{
						"userid":userid,
						"vin":$.trim($("#epc_inp").val().toUpperCase())
					},
					dataType:"json",
					cache: false,
					crossDomain: true == !(document.all),
					success:function(data){
						$("#loading").hide();
						if(data.recode == -3){
							alert("如需获取更多信息，请联系昂美数据，电话021-52212966");
							return false;
						}
						if(data.list){
							window.location.href = "xiandai_epc/xiandai_epc/xiandai_epc.html?a="+data.list[0].MLBPNO+"&b="+data.list[0].MLUC01+"&c="+data.list[0].MLUC02+"&d="+data.list[0].MLUC03+"&e="+data.list[0].MLUC04+"&f="+data.list[0].MLUC05+"&year="+epcyear+"&vin="+$.trim($("#epc_inp").val().toUpperCase());
						}else{
							alert("暂无数据");
						}
					}
				})
			}else if(carname.indexOf("日产") >= 0 || carname.indexOf("英菲尼迪") >= 0){
				$.ajax({
					type:"post",
					url:network+"/Mattrio/NissanEpcInterface/getNissanVin",
					data:{
						"userid":userid,
						"vin":$.trim($("#epc_inp").val().toUpperCase())
					},
					dataType:"json",
					cache: false,
					crossDomain: true == !(document.all),
					success:function(data){
						$("#loading").hide();
						if(data.list == [] || data.list.length == 0){
							alert("暂无数据");
							return false;
						}
						if(data.recode == -3){
							alert("如需获取更多信息，请联系昂美数据，电话021-52212966");
							return false;
						}
						window.location.href = "nisang_epc/nisang_epc/nisang_epc.html?a="+data.list[0].car_id+"&b="+data.list[0].f8+"&c="+data.list[0].time+"&year="+epcyear+"&vin="+$.trim($("#epc_inp").val().toUpperCase());
					}
				})
			}else if(carname.indexOf("荣威") >= 0 || carname.indexOf("名爵") >= 0){
				$.ajax({
					type:"post",
					url:network+"/Mattrio/RoeweEpcInterface/getRoeweVin",
					data:{
						"userid":userid,
						"vin":$.trim($("#epc_inp").val().toUpperCase())
					},
					dataType:"json",
					cache: false,
					crossDomain: true == !(document.all),
					success:function(data){
						if(data.recode == -3){
							alert("如需获取更多信息，请联系昂美数据，电话021-52212966");
							return false;
						}
						$("#loading").hide();
						window.location.href = "rongwei_epc/rongwei_epc/rongwei_epc.html?a="+data.list[0].carid+"&b="+data.list[0].carname+"&c="+data.list[0].YEAR+"&vin="+$.trim($("#epc_inp").val().toUpperCase());
					}
				})
			}else{
				$("#loading").hide();
				alert("如需获取完整信息，请联系昂美数据，电话021-52212966");
			}
		}
		//点击其他地方隐藏盒子
		function stopPropagation(e) { 
			if (e.stopPropagation) {
				e.stopPropagation(); 
			}
			else {
				e.cancelBubble = true; 
			}
		} 
		$(document).bind('click',function(){ 
			$('.contout').fadeOut();
		}); 

		$('.contepc').bind('click',function(e){ 
			stopPropagation(e); 
		}); 
		$(".contepc span").click(function(){
			$('.contout').fadeOut();
		});
		$(".removebtn").click(function(){
			$('.contout').fadeOut();
		});
	})

	demo();
	function demo(){
		//获取验证码
		$(".code").click(function(){
			var phone = $("#inputtext").val();
			if(phone == "" || phone == null){
				alert("请输入您的手机号码");
				return false;
			}
			//验证电话号码
			var reg = /^1([358][0-9]|4[57]|7[0135678])\d{8}$/;
			if(phone.match(reg) == null){
				$(".span1").html("电话号码格式错误");
				return false;
			}
			$(".span1").html("");
			$.ajax({
				type:"post",
				url:network+"/Mattrio/RegeditInterface/sendMsg3",
				data:{
					"userid":userid,
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
								$(".codenone").show().html(num+"秒再次获取");
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
			var phone = $("#inputtext").val();
			var yzm = $("#security").val();
			if(phone == "" || phone == null){
				alert("请输入您的手机号码");
				return false;
			}
			//验证电话号码
			var reg = /^1([358][0-9]|4[57]|7[0135678])\d{8}$/;
			if(phone.match(reg) == null){
				$(".span1").html("电话号码格式错误")
				return false;
			}
			$(".span1").html("");
			//验证码不为空
			if(yzm == "" || yzm == null){
				$(".span2").html("验证码不能为空");
				return false;
			}
			$(".span2").html("");
			$.ajax({
				type:"post",
				url:network+"/Mattrio/RegeditInterface/bindPhone",
				data:{

					"yzm":yzm,
					"phone":phone,
					"userid":userid
				},
				dataType:"json",
				cache: false,
				crossDomain: true == !(document.all),
				success:function(data){
					if(data.msg == "验证码错误"){
						alert("验证码错误");
					}else{
						alert("绑定手机号码成功");
						_czc.push(["_trackEvent", "微信用户添加号码" , name+phone, 0 , "btnyear"]);
			   			$.cookie("phone",$("#inputtext").val(),{expires:7,path: "/"});
						window.location.href="javascript:history.go(0);";
					}
				},
				error:function(data){
					//console.log(data);
				}
			})
		})
	}
}
function fn2(){
    if (userid == undefined || userid == "undefined" || userid ==null || userid == "null") {
        $.cookie("username", null, { path: '/' });
        window.location.href = "./login/login.html";
        return false;
    }
}