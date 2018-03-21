if (sessionStorage) {
	var network = localStorage.getItem("network");
	var searc = sessionStorage.getItem("searc");
	var key = JSON.parse(sessionStorage.keyname);
}else{
	var network = $.cookie("network");
	var key = $.JSONCookie("keyname");
	var searc = $.cookie("searc");
}

var username = $.cookie("username");
var userid = $.cookie("user_id");
var frequency = $.cookie("frequency");

jQuery("#search").val(searc);
$(".nright .divname span").html(username);
$(".nright .divnum span").html(frequency);

if($(window).height() <= 768){
	$(".last").css("margin-bottom","20");
}else{
	$(".last").css("margin-bottom",($(window).height()-748));
}

$("#loading").hide();
//没有查询到
if(key.length == 0 || key == []){
	$(".cont").hide();
	$(".conthide").show().html("如需获取更多信息，请联系昂美数据，电话021-52212966");
	$("#loading").hide();
}else{
	$(".conthide").hide();
	$(".cont").show();
	$(".table0 tr:eq(0) td:eq(0)").html(key.mikey);
	$(".table0 tr:eq(0) td:eq(1)").html(key.Manufacture_CN);
	$(".table0 tr:eq(1) td:eq(0)").html(key.Vehicle_Name_CN);
	$(".table0 tr:eq(1) td:eq(1)").html(key.Name_of_sales);
	$(".table0 tr:eq(2) td:eq(0)").html(key.Vehicle_of_year);
	$(".table0 tr:eq(2) td:eq(1)").html(key.Emission_standards);
	$(".table0 tr:eq(3) td:eq(0)").html(key.Year_of_production);
	$(".table0 tr:eq(3) td:eq(1)").html(key.Domestic_joint_venture_imported);
	$(".table0 tr:eq(4) td:eq(0)").html(key.Engine_Code);
	$(".table0 tr:eq(4) td:eq(1)").html(key.Air_intake_form);
	$(".table0 tr:eq(5) td:eq(0)").html(key.Fuel_Type);
	$(".table0 tr:eq(5) td:eq(1)").html(key.Engine_description);
	$(".table0 tr:eq(6) td:eq(0)").html(key.Guide_price+"万");
	$(".table0 tr:eq(6) td:eq(1)").html(key.ChassisNumber);
	$(".table0 tr:eq(7) td:eq(0)").html(key.Vehicle_body_type);
	$(".table0 tr:eq(7) td:eq(1)").html(key.Engine_location);

	//车标及信息
	$(".wrap-nav1").html("");

	if(key.Transmission_description == "undefined"){
		var Transmission_description = key.Transmission_description;
	}else{
		var Transmission_description = "";
	}
	$(".wrap-nav1").html("<img src='http://mattrio-car-img.oss-cn-shanghai.aliyuncs.com/car_icon/"+key.car_icon+"'><span class='car-name' id='car-name'> "+key.Manufacture_CN+" "+key.Vehicle_Name_CN+" "+key.Capacity+" "+Transmission_description+"</span><p class='go_back'>返回上一页</p><button class='vin_error'>纠错</button>");
	var name = " "+key.Manufacture_CN+" "+key.Vehicle_Name_CN+" "+key.Capacity+" "+Transmission_description;	
	//图片
	$(".mainheadimg").html("");
	$("<img style='background:url(\"http://www.51macc.com/image/loading.gif\") no-repeat  center 50%;' src='http://mattrio-car-img.oss-cn-shanghai.aliyuncs.com/car_img/"+key.car_img+"'onerror=\"javascript:this.src='../../image/blank.jpg'\">").appendTo(".mainheadimg");
	$(".contheader p").click(function(){
		$(this).addClass("active").siblings("p").removeClass("active");
		demo($(this).index(),key);
	})
	if (sessionStorage) {
		var searc = sessionStorage.getItem("searc");
	}else{
		var searc = $.cookie("searc");
	}
	$(".vin_error").click(function(){
		$(".error").fadeIn();
		$(".vinnum").val(searc)
	})
	if($("#search").val() == ""){
		$(".vin_error").hide();
	}else{
		$(".vin_error").show();
	}
	//点击进去保养件
	$(".last").on("click",".lastbtn",function(){
		window.location.href="../maintenance/maintenance.html?mikey="+key.mikey+"&name="+name+"&iamg="+key.car_icon;
		_czc.push(["_setCustomVar","在详情页选择保养件",username,0]);
	})
	//点击进去全车件
	$(".last").on("click",".lastbutton",function(){
		window.location.href="../maintain/maintain.html?mikey="+key.mikey+"&Manufacture="+key.Manufacture_CN;
		_czc.push(["_setCustomVar","在详情页选择全车件",username,0]);
	})
	//点击进去保养周期
	$(".last").on("click",".cyclebtn",function(){
		window.location.href="../cycle/cycle.html?mikey="+key.mikey+"&year="+key.Year_of_production;
		_czc.push(["_setCustomVar","在详情页选择保养周期",username,0]);
	})
	//epc
	$(".last").on("click",".epcbtn",function(){
		$("#loading").show();
		var userid = $.cookie("user_id");
		var str = key.Manufacture_CN;
		var mikey = key.mikey;
		_czc.push(["_setCustomVar","在详情页选择epc",username,0]);
		if(str.indexOf("宝马")>=0 || str.indexOf("MINI")>=0){
			if(searc == ""){
				$.ajax({
					type:"post",
					url:network+"/Mattrio/BwmEpcInterface/getBwmEpcMikeyPid",
					data:{
						"mikey":mikey,
						"userid":userid
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
							alert("暂无数据");
							return false;
						}
						window.location.href = "../../bwm_epc/content/detail_epc/detail_epc.html?vin="+""+"&fgstnr_mospid="+data.fgstnr_mospid+"&fgstnr_prod="+data.keys[0]+"&fztyp_einsatz="+data.fztyp_einsatz+"&year="+key.Vehicle_of_year;
					}
				})
			}else{
				window.location.href = "../../bwm_epc/content/detail_epc/detail_epc.html?vin="+searc+"&fgstnr_mospid="+""+"&fgstnr_prod="+""+"&fztyp_einsatz="+""+"&year="+key.Vehicle_of_year;
			}
		}else if(str.indexOf("本田")>=0 || str.indexOf("讴歌")>=0){
			$.ajax({
				type:"post",
				url:network+"/Mattrio/HondaEpcInterface/getHondMikey",
				data:{
					"userid":userid,
					"mikey":mikey
				},
				dataType:"json",
				cache: false,
				crossDomain: true == !(document.all),
				success:function(data){
					console.log(data)
					$("#loading").hide();
					if(data.recode == -3){
						alert("如需获取更多信息，请联系昂美数据，电话021-52212966");
						return false;
					}
					if(data.length == 0){
						alert("如需获取完整信息，请联系昂美数据，电话021-52212966");
						return false;
					}
					if(data.length == 1){
						window.location.href = "../../bentian_epc/bentian_epc/bentian_epc.html?a="+data[0].DISC_NO+"&b="+data[0].HMODTYP+"&c="+data[0].NENGNSEQEPCEND+"&d="+data[0].NPL+"&d="+data[0].XGRADEFULNAM+"&f="+data[0].nengnseqepcstrt+"&year="+$(".table0 tr:eq(3) td:eq(0)").html()+"&mikey="+mikey;
						return false;
					}
					if(data.length > 1){
						$(".contout").fadeIn();
						$(".span2").html("配置：")
						$.each(data,function(key,value){
							$("<option></option>").html(value.XGRADEFULNAM).appendTo(".select1");
						});
						$(".select2").html("");
						$.each(data[0].CMNOPT,function(key,value){
							$("<option></option>").html(value).appendTo(".select2");
						})
						$(".select1").change(function(){
							var k = $(this).val();
							$(".select2").html("");
							$.each(data,function(key,value){
								if(k == value.XGRADEFULNAM){
									$.each(value.CMNOPT,function(k,v){
										$("<option></option>").html(v).appendTo(".select2");
									})
								}
							})
						})
						$(".contepc .contbtn").click(function(){
							$.each(data,function(key,value){
								if(value.XGRADEFULNAM.replace(/\s/g,"") == $(".select1").val().replace(/\s/g,"")){
									window.location.href = "../../bentian_epc/bentian_epc/bentian_epc.html?a="+value.DISC_NO+"&b="+value.HMODTYP+"&c="+value.NENGNSEQEPCEND+"&d="+value.NPL+"&d="+value.XGRADEFULNAM+"&f="+value.nengnseqepcstrt+"&year="+$(".table0 tr:eq(3) td:eq(0)").html()+"&mikey="+mikey;
								}	
							});
							$(".contout").fadeOut();
						})
					}
				}
			})
		}else if(str.indexOf("现代") >= 0){
			if(searc == ""){
				$.ajax({
					type:"post",
					url:network+"/Mattrio/HyundaiEpcInterface/getHyundaiMikey",
					data:{
						"userid":userid,
						"mikey":mikey
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
						if(data.list.length == 0){
							alert("如需获取完整信息，请联系昂美数据，电话021-52212966");
							return false;
						}
						window.location.href = "../../xiandai_epc/xiandai_epc/xiandai_epc.html?a="+data.list[0].MLBPNO+"&b="+data.list[0].MLUC01+"&c="+data.list[0].MLUC02+"&d="+data.list[0].MLUC03+"&e="+data.list[0].MLUC04+"&f="+data.list[0].MLUC05+"&year="+$(".table0 tr:eq(2) td:eq(0)").html()+"&mikey="+mikey;
					}
				})
			}else{
				$.ajax({
					type:"post",
					url:network+"/Mattrio/HyundaiEpcInterface/getHyundaiVin",
					data:{
						"userid":userid,
						"vin":searc
					},
					dataType:"json",
					cache: false,
					crossDomain: true == !(document.all),
					success:function(data){
						$("#loading").hide();
						if(data.list){
							window.location.href = "../../xiandai_epc/xiandai_epc/xiandai_epc.html?a="+data.list[0].MLBPNO+"&b="+data.list[0].MLUC01+"&c="+data.list[0].MLUC02+"&d="+data.list[0].MLUC03+"&e="+data.list[0].MLUC04+"&f="+data.list[0].MLUC05+"&year="+$(".table0 tr:eq(2) td:eq(0)").html()+"&vin="+searc;
						}else{
							alert("暂无数据")
						}
					}
				})
			}
		}else if(str.indexOf("奔驰")>=0 || str.indexOf("SMART")>=0){
			if(searc == ""){
				window.location.href="../../benchi_epc/benchi_epc/benchi_epc.html?mikey="+key.mikey;
			}else{
				window.location.href = "../../benchi_epc/benchi_epc/benchi_epc.html?vin="+searc+"&year="+$(".table0 tr:eq(2) td:eq(0)").html();
			}
		}else if(str.indexOf("日产")>=0 || str.indexOf("英菲尼迪")>=0){
			if(searc == ""){
				$.ajax({
					type:"post",
					url:network+"/Mattrio/NissanEpcInterface/getNissanMikey",
					data:{
						"userid":userid,
						"mikey":mikey
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
						if(data.list.length == 0){
							alert("如需获取完整信息，请联系昂美数据，电话021-52212966");
							return false;
						}
						window.location.href = "../../nisang_epc/nisang_epc/nisang_epc.html?a="+data.list[0].car_id+"&c="+data.list[0].time+"&year="+$(".table0 tr:eq(2) td:eq(0)").html()+"&mikey="+mikey;
					}
				})
			}else{
				$.ajax({
					type:"post",
					url:network+"/Mattrio/NissanEpcInterface/getNissanVin",
					data:{
						"userid":userid,
						"vin":searc
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
						window.location.href = "../../nisang_epc/nisang_epc/nisang_epc.html?a="+data.list[0].car_id+"&b="+data.list[0].f8+"&c="+data.list[0].time+"&year="+$(".table0 tr:eq(2) td:eq(0)").html()+"&vin="+searc;
					}
				})
			}
		}else if(str.indexOf("荣威")>=0 || str.indexOf("名爵")>=0){
			if(searc == ""){
				$.ajax({
					type:"post",
					url:network+"/Mattrio/RoeweEpcInterface/getRoeweMikey",
					data:{
						"userid":userid,
						"mikey":mikey
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
						if(data.list.length == 0){
							alert("如需获取完整信息，请联系昂美数据，电话021-52212966");
							return false;
						}
						window.location.href = "../../rongwei_epc/rongwei_epc/rongwei_epc.html?a="+data.list[0].carid+"&b="+data.list[0].carname+"&c="+data.list[0].Year+"&mikey="+mikey;
					}
				})
			}else{
				$.ajax({
					type:"post",
					url:network+"/Mattrio/RoeweEpcInterface/getRoeweVin",
					data:{
						"userid":userid,
						"vin":searc
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
						window.location.href = "../../rongwei_epc/rongwei_epc/rongwei_epc.html?a="+data.list[0].carid+"&b="+data.list[0].carname+"&c="+data.list[0].YEAR+"&vin="+searc;
					}
				})
			}
		}else if(str.indexOf("奥迪")>=0){
		 	window.location.href="../detail_epc/detail_epc.html?mikey="+key.mikey;
		}else if(str.indexOf("凯迪拉克")>=0 || str.indexOf("别克")>=0 || str.indexOf("宝骏")>=0 || str.indexOf("雪佛兰")>=0){
			window.location.href="../../tongyong_epc/tongyong_epc/tongyong_epc.html?mikey="+key.mikey;
		}
		_czc.push(["_setCustomVar","选择epc",username+"cycle",0]);
	})
}

$(".contepc .span").click(function(){
	$(".contout").fadeOut();
})
$(".removebtn").click(function(){
	$(".contout").fadeOut();
})
