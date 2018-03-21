if (localStorage) {
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

//点击搜索Vin查询
$("#btn").click(function(){
	var search = $.trim($("#search").val().toUpperCase());

	if(!jQuery("#search").val()){
		alert("输入的内容不能是空");
		return false;
	}
	var vin = $.trim($("#search").val());
	var reg = /^\w{17}$/;
	if(vin.match(reg) == null){
		alert("请填写正确的VIN码");
		return false;
	}

	if (sessionStorage) {
		sessionStorage.setItem("searc",search);
	}else{
		$.cookie("searc", search ,{ path:"/"});
	}

	$("#loading").show();
	$.ajax({
		type:"post",
		url:network+"/Mattrio/VinInterface/queryvin",
		data:{
			"vin":search,
			"userid":userid
		},
		dataType:"json",
		cache: false,
		crossDomain: true == !(document.all),
		success:function(res){
			$.cookie("frequency",res.frequency, {expires:7, path: '/'});
			if(res.recode == -3 ){
				$("#loading").hide();
				alert(res.msg);
				window.location.href="../../index.html";
				return false;
			}
			if(res.recode == -999){
				alert(res.msg);
				$.cookie("username",null,{ path: '/' });
				window.location.href="../../login/login.html";
				return false;
			}
			$(".table").html("");
			if(res.recode == -5){
				alert("格式不正确");
				$(".cont").hide();
				$(".conthide").show().html("");
				$(".conthide").html("格式不正确");
				$(".nright .divnum span").html("");
				$(".nright .divnum span").html(res.frequency);
				window.location.href="../../index.html";
				return false;
			}else{
				addDataList('vinlist', search);
				_czc.push(["_trackEvent", "在详情页查询VIN", name , 0, "vin_btn"]);
				if(res.list.length == 0){
					$(".cont").hide();
					$(".conthide").show().html("如需获取完整信息，请联系昂美数据，电话021-52212966");
					$("#loading").hide();
					return false;
				}
				if(res.list.length > 1){
					if (sessionStorage) {
						sessionStorage.key1 =JSON.stringify(res);
					}else{
						$.JSONCookie("key1", res, { path: '/'});
					}
					window.location.href="./particulars_select.html";
					return false;
				}
				btn();
				$("#loading").hide();
				$(".nright .divnum span").html("");
				$(".nright .divnum span").html(res.frequency);
				$(".conthide").hide();
				$(".table0 tr td").html("");
				$(".cont").show();
				$(".table0 tr:eq(0) td:eq(0)").html(res.list[0].mikey);
				$(".table0 tr:eq(0) td:eq(1)").html(res.list[0].Manufacture_CN);
				$(".table0 tr:eq(1) td:eq(0)").html(res.list[0].Vehicle_Name_CN);
				$(".table0 tr:eq(1) td:eq(1)").html(res.list[0].Name_of_sales);
				$(".table0 tr:eq(2) td:eq(0)").html(res.list[0].Vehicle_of_year);
				$(".table0 tr:eq(2) td:eq(1)").html(res.list[0].Emission_standards);
				$(".table0 tr:eq(3) td:eq(0)").html(res.list[0].Year_of_production);
				$(".table0 tr:eq(3) td:eq(1)").html(res.list[0].Domestic_joint_venture_imported);
				$(".table0 tr:eq(4) td:eq(0)").html(res.list[0].Engine_Code);
				$(".table0 tr:eq(4) td:eq(1)").html(res.list[0].Air_intake_form);
				$(".table0 tr:eq(5) td:eq(0)").html(res.list[0].Fuel_Type);
				$(".table0 tr:eq(5) td:eq(1)").html(res.list[0].Engine_description);
				$(".table0 tr:eq(6) td:eq(0)").html(res.list[0].Guide_price+"万");
				$(".table0 tr:eq(6) td:eq(1)").html(res.list[0].ChassisNumber);
				$(".table0 tr:eq(7) td:eq(0)").html(res.list[0].Vehicle_body_type);
				$(".table0 tr:eq(7) td:eq(1)").html(res.list[0].Engine_location);
				//表头
				$(".wrap-nav1").html("");
				if(res.list[0].Transmission_description == "undefined"){
					var Transmission_description = res.list[0].Transmission_description;
				}else{
					var Transmission_description = "";
				}
				$(".wrap-nav1").html("<img src='http://mattrio-car-img.oss-cn-shanghai.aliyuncs.com/car_icon/"+res.list[0].car_icon+"'><span class='car-name' id='car-name'> "+res.list[0].Manufacture_CN+" "+res.list[0].Vehicle_Name_CN+" "+res.list[0].Capacity+" "+Transmission_description+"</span><p class='go_back'>返回上一页</p><button class='vin_error'>纠错</button>");
				var name = " "+res.list[0].Manufacture_CN+" "+res.list[0].Vehicle_Name_CN+" "+res.list[0].Capacity+Transmission_description;
				$(".mainheadimg").html("");
				$("<img style='background:url(\"http://www.51macc.com/image/loading.gif\") no-repeat center 50%;' src='http://mattrio-car-img.oss-cn-shanghai.aliyuncs.com/car_img/"+res.list[0].car_img+"' onerror=\"javascript:this.src='../../image/blank.jpg'\">").appendTo(".mainheadimg");
				$(".contheader p").click(function(){
					$(this).addClass("active").siblings("p").removeClass("active");
					demo($(this).index(),res);
				})
				if (sessionStorage) {
					sessionStorage.keyname =JSON.stringify(res.list[0]);
					var searc = sessionStorage.getItem("searc");
				}else{
					$.JSONCookie("keyname", res.list[0], { path: '/'});
					var searc = $.cookie("searc");
				}
				$(".vin_error").click(function(){
					$(".error").fadeIn();
					$(".vinnum").val(searc);
				})
				//点击进去保养件
				$(".last").on("click",".lastbtn",function(){
					window.location.href="../maintenance/maintenance.html?mikey="+res.list[0].mikey+"&name="+name+"&iamg="+res.list[0].car_icon;
					_czc.push(["_setCustomVar",username,"在详情页选择保养件",0]);
				})
				//点击进去全车件
				$(".last").on("click",".lastbutton",function(){
					window.location.href="../maintain/maintain.html?mikey="+res.list[0].mikey+"&Manufacture="+res.list[0].Manufacture_CN;
					_czc.push(["_setCustomVar",username,"在详情页选择全车件",0]);
				})
				//点击进去保养周期
				$(".last").on("click",".cyclebtn",function(){
					window.location.href="../cycle/cycle.html?mikey="+res.list[0].mikey+"&year="+res.list[0].Year_of_production;
					_czc.push(["_setCustomVar",username,"在详情页选择保养周期",0]);
				})
				//epc
				$(".last").on("click",".epcbtn",function(){
					var str = res.list[0].Manufacture_CN;
					_czc.push(["_setCustomVar",username,"在详情页选择epc",0]);
					if(str.indexOf("宝马")>=0 || str.indexOf("MINI")>=0){
						window.location.href = "../../bwm_epc/content/detail_epc/detail_epc.html?vin="+searc+"&fgstnr_mospid="+""+"&fgstnr_prod="+""+"&fztyp_einsatz="+""+"&year="+$(".table0 tr:eq(2) td:eq(0)").html();
						return false;
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
									window.location.href = "../../bentian_epc/bentian_epc/bentian_epc.html?a="+data[0].DISC_NO+"&b="+data[0].HMODTYP+"&c="+data[0].NENGNSEQEPCEND+"&d="+data[0].NPL+"&d="+data[0].XGRADEFULNAM+"&f="+data[0].nengnseqepcstrt+"&year="+$(".table0 tr:eq(2) td:eq(0)").html()+"&mikey="+mikey;
									return false;
								}
								if(data.length > 1){
									$(".contout").fadeIn();
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
					}else if(str.indexOf("奔驰")>=0 || str.indexOf("SMART")>=0){
						window.location.href = "../../benchi_epc/benchi_epc/benchi_epc.html?vin="+search;
					}else if(str.indexOf("现代")>=0){
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
								if(data.recode == -3){
									alert("如需获取更多信息，请联系昂美数据，电话021-52212966");
									return false;
								}
								if(data.list){
									window.location.href = "../../xiandai_epc/xiandai_epc/xiandai_epc.html?a="+data.list[0].MLBPNO+"&b="+data.list[0].MLUC01+"&c="+data.list[0].MLUC02+"&d="+data.list[0].MLUC03+"&e="+data.list[0].MLUC04+"&f="+data.list[0].MLUC05+"&year="+$(".table0 tr:eq(2) td:eq(0)").html()+"&vin="+searc;
								}else{
									alert("暂无数据");
								}
							}
						})
					}else if(str.indexOf("日产")>=0 || str.indexOf("英菲尼迪")>=0){
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
					}else if(str.indexOf("荣威")>=0 || str.indexOf("名爵")>=0){
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
								if(data.recode == -3){
									alert("如需获取更多信息，请联系昂美数据，电话021-52212966");
									return false;
								}
								$("#loading").hide();
								window.location.href = "rongwei_epc/rongwei_epc/rongwei_epc.html?a="+data.list[0].carid+"&b="+data.list[0].carname+"&c="+data.list[0].YEAR+"&vin="+searc;
							}
						})
					}else if(str.indexOf("奥迪")>=0){
						window.location.href="../detail_epc/detail_epc.html?mikey="+res.list[0].mikey;
					}else if(str.indexOf("凯迪拉克")>=0 || str.indexOf("别克")>=0 || str.indexOf("宝骏")>=0 || str.indexOf("雪佛兰")>=0){
						window.location.href="../../tongyong_epc/tongyong_epc/tongyong_epc.html?mikey="+key.mikey;
					}
					_czc.push(["_setCustomVar","选择epc",username+"cycle",0]);
				})
			}
			$(".wrap-nav1 .go_back").click(function(){
				window.location.href = "../../index.html"
			})
		},
		error:function(data){
			$(".cont").hide();
			$(".conthide").show().html("如需获取完整信息，请联系昂美数据，电话021-52212966");
			$("#loading").hide();
		}
	})
})

$(document).keydown(function(event){ 
	if(event.keyCode==13){
		$("#btn").click();
	}
})

function addDataList(key, value) {
	var list = localStorage.getItem(key);
	if(list == null) {
		list = "";
		list += value + ',';
		localStorage.setItem(key, list);
	} else {
		if(list.indexOf(value) == -1) {
			list += value + ',';
			localStorage.setItem(key, list);
		}
	}
}