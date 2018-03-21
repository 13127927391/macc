if(localStorage) {
	var network = localStorage.getItem("network");
} else {
	var network = $.cookie("network");
}
var username = $.cookie("username");
var userid = $.cookie("user_id");
var frequency = $.cookie("frequency");

$(".divname span").html(username);
$(".divnum span").html(frequency);

function getUrlParam(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
	var r = window.location.search.substr(1).match(reg); //匹配目标参数
	if(r != null) return decodeURI(r[2]);
	return null; //返回参数值
}

var categoryid = getUrlParam('?categoryid');
var mikey = getUrlParam('?mikey');
var str = getUrlParam('?str');
var oenumber = getUrlParam('?oenumber');
var Manufacture = getUrlParam('?Manufacture');

$("#loading").show();
var oe;
if(categoryid !== null) {
	$.ajax({
		type: "post",
		url: network + "/Mattrio/ProductInterface/getOeNumber",
		data: {
			"categoryid": categoryid,
			"mikey": mikey,
			"userid": userid
		},
		dataType: "json",
		cache: false,
		crossDomain: true == !(document.all),
		success: function(data) {
			$("#loading").hide();
			if(data.msg == -3) {
				$(".content").hide();
				$(".nocontent").show();
				return false;
			}
			if (data.recode==-3) {
				alert(data.msg);
				window.opener=null;window.open('','_self');window.close();
			}
			if(data.list.length == 0 || data.list == []) {
				$(".content").hide();
				$(".nocontent").show();
				return false;
			}
			demoAjax(userid, data.list[0].oe_numbers);
			oe = data;
			$.each(data.list, function(key, value) {
				$("<li>").html("品类：" + value.category_name + "<br>" + "OE号：" + value.oe_numbers).appendTo($("ul"));
			})
			$(".content ul li:first").addClass("active");
			$(".td1").html(data.list[0].parent_name);
			$(".td").html(data.list[0].name1);
			$(".td2").html(data.list[0].category_name);
			$(".td3").html(data.list[0].oe_numbers);
			if(data.list[0].system_market_price == ""){
				$(".td4").html("暂无价格");
			}else{
				$(".td4").html("￥"+data.list[0].system_market_price);
			}
			fn();
		},
		error: function(error) {
			//console.log(1);
		}
	})

} else if(str !== null) {
	$.ajax({
		type: "post",
		url: network + "/Mattrio/ProductInterface/LikeQueryOes",
		data: {
			"like_name": encodeURI(str),
			"mikey": mikey,
			"userid": userid
		},
		dataType: "json",
		cache: false,
		crossDomain: true == !(document.all),
		success: function(data) {
			oe = data;
			$("#loading").hide();
			if(data.msg == -3) {
				$(".content").hide();
				$(".nocontent").show();
				return false;
			}
			if(data.list.length == 0 || data.list == []) {
				$(".content").hide();
				$(".nocontent").show();
				return false;
			}
			$.each(data.list, function(key, value) {
				$("<li>").html("品类：" + value.category_name + "<br>" + "OE号：" + value.oe_numbers).appendTo($("ul"));
			})
			$(".content ul li:first").addClass("active");
			$(".td1").html(data.list[0].parent_name);
			$(".td").html(data.list[0].name1);
			$(".td2").html(data.list[0].category_name);
			$(".td3").html(data.list[0].oe_numbers);
			if(data.list[0].system_market_price == ""){
				$(".td4").html("暂无价格");
			}else{
				$(".td4").html("￥"+data.list[0].system_market_price);
			}
			//$(".td5").html(data.list[0].note_parts);
			demoAjax(userid, data.list[0].oe_numbers);
			fn();
		},
		error: function(data) {
			//console.log(data);
		}
	})
} else if(oenumber !== null) {
	$("#search").val(oenumber);
	$.ajax({
		type: "post",
		url: network + "/Mattrio/OeInterface/queryOenumber",
		data: {
			"oenumber": oenumber.replace(/\s/g, "").replace(/\-/g, ""),
			"userid": userid
		},
		dataType: "json",
		cache: false,
		crossDomain: true == !(document.all),
		success: function(data) {
			$("#loading").hide();
			if(data.msg == -3) {
				$(".content").hide();
				$(".nocontent").show();
				return false;
			}
			if(data.list.length == 0 || data.list == []) {
				$(".content").hide();
				$(".nocontent").show();
				return false;
			}
			oe = data;
			$.each(data.list, function(key, value) {
				$("<li>").html("品类：" + value.category_name + "<br>" + "OE号：" + value.oe_numbers).appendTo($("ul"));
			})
			$(".content ul li:first").addClass("active");
			$(".td1").html(data.list[0].parent_name);
			$(".td2").html(data.list[0].category_name);
			$(".td3").html(data.list[0].oe_numbers);
			if(data.list[0].system_market_price == ""){
				$(".td4").html("暂无价格");
			}else{
				$(".td4").html("￥"+data.list[0].system_market_price);
			}
			
			//$(".td5").html(data.list[0].note_parts);
			demoAjax(userid, data.list[0].oe_numbers);
			fn();
		},
		error: function(data) {
			//console.log(data);
		}
	})
}

//点击搜索
$("#btn").click(function() {
	if($("#search").val() == "") {
		alert("请输入您要查询的OE号码");
		return false;
	}
	$("#loading").show();
	$.ajax({
		type: "post",
		url: network + "/Mattrio/OeInterface/queryOenumber",
		data: {
			"oenumber": $("#search").val().replace(/\s/g, "").replace(/\-/g, ""),
			"userid": userid
		},
		dataType: "json",
		cache: false,
		crossDomain: true == !(document.all),
		success: function(data) {
			$("#loading").hide();
			$(".content ul").html("");
			if(data.recode == -3){
				alert(data.msg);
				$(".content").hide();
				$(".nocontent").show();
				return false;
			}
			if(data.list.length == 0 || data.list == []) {
				$(".content").hide();
				$(".nocontent").show();
				return false;
			}
			$(".content").show();
			$(".nocontent").hide();
			oe = data;
			$.each(data.list, function(key, value) {
				$("<li>").html("品类：" + value.category_name + "<br>" + "OE号：" + value.oe_numbers).appendTo($("ul"));
			})
			$(".content ul li:first").addClass("active");
			$(".td1").html(data.list[0].parent_name);
			$(".td2").html(data.list[0].category_name);
			$(".td3").html(data.list[0].oe_numbers);
			if(data.list[0].system_market_price == ""){
				$(".td4").html("暂无价格");
			}else{
				$(".td4").html("￥"+data.list[0].system_market_price);
			}
			demoAjax(userid, data.list[0].oe_numbers);
			$("#image").show();
			$(".cont_img").hide();
			$(".cont_i").hide();
			Manufacture = "";
			addDataList('oelist', $("#search").val());
			fn();
		},
		error: function(data) {
			//console.log(data);
		}
	})
})
//绑定回车键
$(document).keydown(function(even){
	if(event.keyCode==13){
		$("#btn").click();
	}
})


function fn(){
	$.ajax({
		type: "post",
		url: network + "/Mattrio/OeInterface/getTecDocOeProduct",
		data: {
			"userid": userid,
			"oenumber": $(".td3").html().replace(/\s/g, "").replace(/\-/g, "")
		},
		dataType: "json",
		cache: true,
		crossDomain: true == !(document.all),
		success:function(data){
			$("#loading").hide();
			if(!data.products){
				$(".contentbrand").hide();
				return false;
			}
			$(".nocontent").hide();
			$(".contentbrand").show();
			$(".contentbrand tbody").html("");
			var array1 = new Array();
			var array2 = new Array();
			$.each(data.products,function(key,value){
				if(key%2){
					array1.push(value);
				}else{
					array2.push(value);
				}
			})
			$.each(array1,function(key,value){
				 $(".table2 tbody").append("<tr><td>"+value.brand+"</td><td>"+value.product_id+"</td></tr>");
			})
			$.each(array2,function(key,value){
				 $(".table1 tbody").append("<tr><td>"+value.brand+"</td><td>"+value.product_id+"</td></tr>");
			})
			if(array1.length < array2.length){
				$(".table2 tbody").append("<tr><td> </td><td> </td></tr>");
			}
		}
	})
}
		

//获取信息
function demoAjax(userid, oenumber) {
	var userid = userid;
	var oenumber = oenumber;
	$.ajax({
		type: "post",
		url: network + "/Mattrio/ProductInterface/getOeCars",
		data: {
			"oenumber": oenumber.replace(/\s/g, "").replace(/\-/g, ""),
			"userid": userid
		},
		dataType: "json",
		cache: false,
		crossDomain: true == !(document.all),
		success: function(res) {
			if(res.list.length == 0 || res.list == []) {
				$(".contentbottom2 div").html("暂无数据");
				return false;
			}
			$(".contentbottom2 div").html("");
			$.each(res.list, function(key, value) {
				$("<p>").html(value.Manufacture_CN + "&nbsp; " + value.Vehicle_Name_CN + "&nbsp; " + value.Vehicle_of_year + "&nbsp; " + value.Name_of_sales).appendTo(".contentbottom2 div");
			})
		},
		error: function(res) {
			$(".contentbottom2 div").html("暂无数据");
			//console.log(res)
		}
	})
}

$(".contentbottom2 div").html("正在加载中。。。");
$(document).on("click", "ul li", function() {
	$(".contentbottom2 div").html("正在加载中。。。");
	var num = $(this).index();
	$(this).addClass("active").siblings().removeClass("active");
	$(".td1").html("");
	$(".td2").html("");
	$(".td3").html("");
	$(".td4").html("");
	$(".td5").html("");

	$(".td1").html(oe.list[num].parent_name);
	$(".td2").html(oe.list[num].category_name);
	$(".td3").html(oe.list[num].oe_numbers);
	if(oe.list[num].system_market_price == ""){
		$(".td4").html("暂无价格");
	}else{
		$(".td4").html("￥"+oe.list[num].system_market_price);
	}
	//$(".td5").html(oe.list[num].note_parts);
	$(".contimg div").html("").hide();
	$("#image").show();
	$(".contimg_1").hide();
	$(".contimg_2").hide();
	var oenumber = oe.list[num].oe_numbers;
	demoAjax(userid,oenumber);
	fn();
})

$(".contimg_1").hide();
$(".contimg_2").hide();

//获取epc图片
var epc_img;
$("#image").click(function() {
	$(".contimg .cont_img").html("正在加载中。。。").show();
	$(".contimg .cont_i").html("").show();
	$.ajax({
		type: "post",
		url: network + "/Mattrio/ProductInterface/getOeManufacture",
		data: {
			"oenumber": $(".td3").html(),
			"userid": userid
		},
		dataType: "json",
		cache: false,
		crossDomain: true == !(document.all),
		success: function(data) {
			if(data.list.length == 0) {
				$("#image").hide();
				$(".contimg .cont_img").html("暂无数据");
				$(".contimg .cont_i").html("");
				return false;
			}
			var car_name = "";
			$.each(data.list, function(key, value) {
				if(value !== null) {
					car_name += value.Manufacture_CN + ",";
				}
			})
			if(car_name.indexOf("宝马") >= 0|| car_name.indexOf("MINI")>=0) {
				fnBwm($(".td3").html(), "宝马", userid);
				$(document).on("click", ".cont_img img", function() {
					var epc_cont = epc_img.list[$(this).parents("a").parents("p").index()];
					$(this).parents("a").attr("href", "../../../bwm_epc/content/contentepc/contentepc.html?a=" + epc_cont.BTZEILENV_MOSPID + "&b=" + epc_cont.category_id1 + "&c=" + epc_cont.category_id2 + "&d=&e=&f=" + epc_cont.category_id3 + "&g=http://bwm-epc.oss-cn-shanghai.aliyuncs.com/epc_img/" + epc_cont.bildtaf_grafikid + ".jpg&oe=" + $(".td3").html()+'&type=all&choice=0'+"&h=" + $(".td1").html() + "&i=" + $(".td2").html());
				})
			} else if(car_name.indexOf("日产") >= 0 || car_name.indexOf("英菲尼迪")>=0) {
				fnNisang($(".td3").html(), "日产", userid);
				$(document).on("click", ".cont_img img", function() {
					var epc_cont = epc_img.list[$(this).parents("a").parents("p").index()];
					$(this).parents("a").attr("href", "../../../nisang_epc/content_nisang_epc/content_nisang_epc.html?a=" + epc_cont.car_id + "&b=" + epc_cont.category_id2 + "&c=" + epc_cont.category_id3 + "&d=" + epc_cont.start_time + "&e=http://nissan-epc.oss-cn-shanghai.aliyuncs.com/Pictures/" + epc_cont.img + ".png&oe=" + $(".td3").html().substring(0, 10)+"&choice=0"+"&name2="+epc_cont.category_name);
				})
			} else if(car_name.indexOf("现代") >= 0) {
				fnXiandai($(".td3").html(), "现代", userid);
				$(document).on("click", ".cont_img img", function() {
					var epc_cont = epc_img.list[$(this).parents("a").parents("p").index()];
					$(this).parents("a").attr("href", "../../../xiandai_epc/content_xiandai_epc/content_xiandai_epc.html?a=" + epc_cont.MLBPNO + "&b=" + epc_cont.ORGRNO + "&c=" + epc_cont.GIILPG + "&d=" + epc_cont.txuc01 + "&e=" + epc_cont.txuc02 + "&f=" + epc_cont.txuc03 + "&g=" + epc_cont.txuc04 + "&h=" + epc_cont.txuc05 + "&i=" + epc_cont.img + "&oe=" + $(".td3").html()+"&choice=0");
				})
			} else if(car_name.indexOf("本田") >= 0 || car_name.indexOf("讴歌")>=0) {
				findEpcOeCategory($(".td3").html(), "本田", userid);
				$(document).on("click", ".cont_img img", function() {
					var epc_cont = epc_img.list[$(this).parents("a").parents("p").index()];
					$(this).parents("a").attr("href", "../../../bentian_epc/content_bentian_epc/content_bentian_epc.html?a=" + epc_cont.npl + "&b=" + epc_cont.DISC_NO + "&c=" + epc_cont.nserepcend + "&d=" + epc_cont.nserepcstrt + "&e=" + epc_cont.nplblk + "&f="+epc_cont.hmodtyp+"&choice=0&oe=" + $(".td3").html());
				})
			} else if(car_name.indexOf("荣威") >= 0 || car_name.indexOf("名爵")>=0) {
				findEpcOeCategory($(".td3").html(), "荣威", userid);
				$(document).on("click", ".cont_img img", function() {
					var epc_cont = epc_img.list[$(this).parents("a").parents("p").index()];
					$(this).parents("a").attr("href", "../../../rongwei_epc/content_rongwei_epc/content_rongwei_epc.html?a=" + epc_cont.platform_code + "&b=" + epc_cont.FEATURE_LIST_VERSION_ID + "&c=" + epc_cont.group_code + "&d=" + epc_cont.art_code + "&e=" + epc_cont.img.replace('http://roewe-epc.oss-cn-shanghai.aliyuncs.com/images/','') + "&oe=" + $(".td3").html()+"&choice=0");
				})
			}else if(car_name.indexOf("奔驰") >= 0 || car_name.indexOf("SMART")>=0) {
				findEpcOeCategory($(".td3").html(), "奔驰", userid);
				$(document).on("click", ".cont_img img", function() {
					var epc_cont = epc_img.list[$(this).parents("a").parents("p").index()];
					var image = epc_cont.img.replace('http://benz-epc.oss-cn-shanghai.aliyuncs.com/benz_img/','').replace('.jpg','')
					$(this).parents("a").attr("href", "../../../benchi_epc/content_benchi_epc/content_benchi_epc.html?a="+epc_cont.CATNUM+"&b="+epc_cont.GROUPNUM+"&c="+epc_cont.SUBGRP +","+image+"&d="+image +"&oe=" + $(".td3").html()+"&choice=0"+"&i="+epc_cont.category_name);
				})
			}else if(car_name.indexOf("奥迪") >= 0) {
				findEpcOeCategory($(".td3").html(), "奥迪", userid);
				$(document).on("click", ".cont_img img", function() {
					var epc_cont = epc_img.list[$(this).parents("a").parents("p").index()];
					$(this).parents("a").attr("href", "../../../content/detail_epc/contentepc/contentepc.html?brand="+epc_cont.brand+"&car_model_code="+epc_cont.car_model_code+"&make_year="+epc_cont.make_year+"&module="+epc_cont.module_pic_num+"&oecode=" + $(".td3").html()+"&choice=0&image="+epc_img.list[$(this).parents("a").parents("p").index()].img);
				})
			}else if(car_name.indexOf("别克") >= 0 || car_name.indexOf("凯迪拉克") >= 0 || car_name.indexOf("宝骏") >= 0 || car_name.indexOf("雪佛兰") >= 0) {

				if(car_name.indexOf("别克") >= 0){
					var carname = "别克";
				}else if(car_name.indexOf("凯迪拉克") >= 0){
					var carname = "凯迪拉克";
				}else if(car_name.indexOf("宝骏") >= 0){
					var carname = "宝骏";
				}else if(car_name.indexOf("雪佛兰") >= 0){
					var carname = "雪佛兰";
				}

				findEpcOeCategory($(".td3").html(), carname, userid);
				$(document).on("click", ".cont_img img", function() {
					var epc_cont = epc_img.list[$(this).parents("a").parents("p").index()];
					$(this).parents("a").attr("href", "../../../tongyong_epc/content_tongyong_epc/content_tongyong_epc.html?carid="+epc_cont.car_id+"&id1="+epc_cont.category_id1+"&id2="+epc_cont.category_id2+"&choice=0&name2="+epc_cont.category_name2+"&img="+epc_cont.img+"&epcnum="+$(this).parents().index());
				})
			}else {
				$("#image").hide();
				$(".contimg .cont_img").html("暂无数据");
				$(".contimg .cont_i").html("");
			}
		}
	})
})

function findEpcOeCategory(oenumber, Manufacture, userid) {
	$.ajax({
		type: "post",
		url: network + "/Mattrio/ProductInterface/getOeEPC",
		data: {
			"oenumber": $(".td3").html(),
			"Manufacture": Manufacture,
			"userid": userid
		},
		dataType: "json",
		cache: false,
		crossDomain: true == !(document.all),
		success: function(data) {
			if(sessionStorage) {
				sessionStorage.cont = JSON.stringify("");
			} else {
				$.JSONCookie("cont", "", {path: '/'});
			}
			epc_img = data;
			$("#image").hide();
			if(data.list.length == 0) {
				$(".contimg .cont_img").html("暂无数据");
				$(".contimg .cont_i").html("");
				return false;
			}
			if(data.list.length == 1) {
				$(".contimg div").html("");
				$(".contimg_2").hide();
				var a = $("<a  target='_blank'>").html(data.list[0].category_name + "；位置：" + data.list[0].callout + "<br><img src='" + data.list[0].img + "?x-oss-process=style/min_img'>")
				var p = $("<p>");
				a.appendTo(p);
				p.appendTo(".contimg .cont_img");
				return false;
			}
			$(".contimg_2").show();
			$(".contimg div").html("");
			$.each(data.list, function(key, value) {
				var a = $("<a  target='_blank'>").html(value.category_name + "；位置：" + value.callout + "<br><img src='" + value.img + "?x-oss-process=style/min_img'>");
				var p = $("<p>");
				var span = $("<i>").html(key + 1);
				a.appendTo(p);
				p.appendTo(".contimg .cont_img");
				span.appendTo(".contimg .cont_i");
			})
			$(".contimg .cont_img p:first").addClass("xianshi").siblings().addClass("yincang"); //初始化的隐藏
			$(".contimg .cont_i i:first").addClass("spani").siblings("i").removeClass("spani");

			$(document).on("click", ".contimg .cont_i i", function() {
				if($(this).index() == 0) {
					$(".contimg_1").hide();
				} else {
					$(".contimg_2").show();
				}
				if($(this).index() == $(".contimg .cont_i i").length - 1) {
					$(".contimg_2").hide();
				} else {
					$(".contimg_1").show();
				}
				$(this).addClass("spani").siblings("i").removeClass("spani");
				$(".contimg .cont_img").children("p").eq($(this).index()).removeClass("yincang").addClass("xianshi").siblings().removeClass("xianshi").addClass("yincang");
				
			})
		}
	});
}

function fnBwm(oenumber, Manufacture, userid) {
	$.ajax({
		type: "post",
		url: network + "/Mattrio/ProductInterface/getOeEPC",
		data: {
			"oenumber": $(".td3").html(),
			"Manufacture": Manufacture,
			"userid": userid
		},
		dataType: "json",
		cache: false,
		crossDomain: true == !(document.all),
		success: function(data) {
			epc_img = data;
			if(sessionStorage) {
				sessionStorage.cont = JSON.stringify("");
			} else {
				$.JSONCookie("cont", "", {path: '/'});
			}
			$("#image").hide();
			if(data.list.length == 0) {
				$(".contimg .cont_img").html("暂无数据");
				$(".contimg .cont_i").html("");
				return false;
			}
			if(data.list.length == 1) {
				$(".contimg div").html("");
				$(".contimg_2").hide();
				var a = $("<a  target='_blank'>").html(data.list[0].ben_text + "；位置：" + data.list[0].location + "<br><img src='http://bwm-epc.oss-cn-shanghai.aliyuncs.com/epc_img/" + data.list[0].bildtaf_grafikid + ".jpg?x-oss-process=style/min_img'>")
				var p = $("<p>");
				a.appendTo(p);
				p.appendTo(".contimg .cont_img");
				return false;
			}
			$(".contimg_2").show();
			$(".contimg div").html("");
			$.each(data.list, function(key, value) {
				var a = $("<a  target='_blank'>").html(value.ben_text + "；位置：" + value.location + "<br><img src='http://bwm-epc.oss-cn-shanghai.aliyuncs.com/epc_img/" + value.bildtaf_grafikid + ".jpg?x-oss-process=style/min_img'>");
				var p = $("<p>");
				var span = $("<i>").html(key + 1);
				a.appendTo(p);
				p.appendTo(".contimg .cont_img");
				span.appendTo(".contimg .cont_i");
			})
			$(".contimg .cont_img p:first").addClass("xianshi").siblings().addClass("yincang"); //初始化的隐藏
			$(".contimg .cont_i i:first").addClass("spani").siblings("i").removeClass("spani");

			$(document).on("click", ".contimg .cont_i i", function() {
				if($(this).index() == 0) {
					$(".contimg_1").hide();
				} else {
					$(".contimg_2").show();
				}
				if($(this).index() == $(".contimg .cont_i i").length - 1) {
					$(".contimg_2").hide();
				} else {
					$(".contimg_1").show();
				}
				$(this).addClass("spani").siblings("i").removeClass("spani");
				$(".contimg .cont_img").children("p").eq($(this).index()).removeClass("yincang").addClass("xianshi").siblings().removeClass("xianshi").addClass("yincang");
			})
		}
	})
}

function fnNisang(oenumber, Manufacture, userid) {
	$.ajax({
		type: "post",
		url: network + "/Mattrio/ProductInterface/getOeEPC",
		data: {
			"oenumber": $(".td3").html(),
			"Manufacture": Manufacture,
			"userid": userid
		},
		dataType: "json",
		cache: false,
		crossDomain: true == !(document.all),
		success: function(data) {
			console.log(data)
			epc_img = data;
			if(sessionStorage) {
				sessionStorage.cont = JSON.stringify("");
			} else {
				$.JSONCookie("cont", "", {path: '/'});
			}
			$("#image").hide();
			if(data.list.length == 0) {
				$(".contimg .cont_img").html("暂无数据");
				$(".contimg .cont_i").html("");
				return false;
			}
			if(data.list.length == 1) {
				$(".contimg div").html("");
				$(".contimg_2").hide();
				var a = $("<a  target='_blank'>").html(data.list[0].ben_text + "；位置：" + data.list[0].location + "<br><img src='http://nissan-epc.oss-cn-shanghai.aliyuncs.com/Pictures/" + data.list[0].img + "?x-oss-process=style/min_img'>")
				var p = $("<p>");
				a.appendTo(p);
				p.appendTo(".contimg .cont_img");
				return false;
			}
			$(".contimg_2").show();
			$(".contimg div").html("");
			$.each(data.list, function(key, value) {
				var a = $("<a  target='_blank'>").html(value.category_id3 + " &nbsp;" + value.category_name + "<br><img src='http://nissan-epc.oss-cn-shanghai.aliyuncs.com/Pictures/" + value.img + ".png?x-oss-process=style/min_img'>");
				var p = $("<p>");
				var span = $("<i>").html(key + 1);
				a.appendTo(p);
				p.appendTo(".contimg .cont_img");
				span.appendTo(".contimg .cont_i");
			})
			$(".contimg .cont_img p:first").addClass("xianshi").siblings().addClass("yincang"); //初始化的隐藏
			$(".contimg .cont_i i:first").addClass("spani").siblings("i").removeClass("spani");

			$(document).on("click", ".contimg .cont_i i", function() {
				if($(this).index() == 0) {
					$(".contimg_1").hide();
				} else {
					$(".contimg_2").show();
				}
				if($(this).index() == $(".contimg .cont_i i").length - 1) {
					$(".contimg_2").hide();
				} else {
					$(".contimg_1").show();
				}
				$(this).addClass("spani").siblings("i").removeClass("spani");
				$(".contimg .cont_img").children("p").eq($(this).index()).removeClass("yincang").addClass("xianshi").siblings().removeClass("xianshi").addClass("yincang");
			})

		}
	})
}

function fnXiandai(oenumber, Manufacture, userid) {
	$.ajax({
		type: "post",
		url: network + "/Mattrio/ProductInterface/getOeEPC",
		data: {
			"oenumber": $(".td3").html(),
			"Manufacture": Manufacture,
			"userid": userid
		},
		dataType: "json",
		cache: false,
		crossDomain: true == !(document.all),
		success: function(data) {
			epc_img = data;
			if(sessionStorage) {
				sessionStorage.cont = JSON.stringify("");
			} else {
				$.JSONCookie("cont", "", {path: '/'});
			}
			$("#image").hide();
			if(data.list.length == 0) {
				$(".contimg .cont_img").html("暂无数据");
				$(".contimg .cont_i").html("");
				return false;
			}
			if(data.list.length == 1) {
				$(".contimg div").html("");
				$(".contimg_2").hide();
				var a = $("<a  target='_blank'>").html(data.list[0].MLBPNO + "；位置：" + data.list[0].callout + "<br><img src='http://hyundai-epc.oss-cn-shanghai.aliyuncs.com/hyundai_img/" + data.list[0].img + "?x-oss-process=style/min_img'>")
				var p = $("<p>");
				a.appendTo(p);
				p.appendTo(".contimg .cont_img");
				return false;
			}
			$(".contimg_2").show();
			$(".contimg div").html("");
			$.each(data.list, function(key, value) {
				var a = $("<a  target='_blank'>").html(value.MLBPNO + " &nbsp;" + value.unlgch + "<br><img src='http://hyundai-epc.oss-cn-shanghai.aliyuncs.com/hyundai_img/" + value.img + "?x-oss-process=style/min_img'>");
				var p = $("<p>");
				var span = $("<i>").html(key + 1);
				a.appendTo(p);
				p.appendTo(".contimg .cont_img");
				span.appendTo(".contimg .cont_i");
			})
			$(".contimg .cont_img p:first").addClass("xianshi").siblings().addClass("yincang"); //初始化的隐藏
			$(".contimg .cont_i i:first").addClass("spani").siblings("i").removeClass("spani");

			$(document).on("click", ".contimg .cont_i i", function() {
				if($(this).index() == 0) {
					$(".contimg_1").hide();
				} else {
					$(".contimg_2").show();
				}
				if($(this).index() == $(".contimg .cont_i i").length - 1) {
					$(".contimg_2").hide();
				} else {
					$(".contimg_1").show();
				}
				$(this).addClass("spani").siblings("i").removeClass("spani");
				$(".contimg .cont_img").children("p").eq($(this).index()).removeClass("yincang").addClass("xianshi").siblings().removeClass("xianshi").addClass("yincang");
			})

		}
	})
}

//点击其他地方隐藏盒子
function stopPropagation(e) {
	if(e.stopPropagation) {
		e.stopPropagation();
	} else {
		e.cancelBubble = true;
	}
}
$(".error").bind('click', function() {
	$('.error').fadeOut();
});

$('.errorcont').bind('click', function(e) {
	stopPropagation(e);
});

$(".contentp").click(function() {
	$(".error").fadeIn()
	$(".oenum").val($(".td3").html());
	$(".category_name").val($(".td2").html())
})

$(".onbtn").click(function() {
	$('.error').fadeOut();
})
$(".offbtn").click(function() {
	if($(".new_oenum").val() == "") {
		alert("OE号码不能为空");
		return false;
	}
	$.ajax({
		type: "post",
		url: network + "/Mattrio/OeProductErrorCorrectionInterface/addErrorCorrection",
		data: {
			"part_number": $(".oenum").val(),
			"user_id": userid,
			"category_name": $(".category_name").val(),
			"type": "OE号码(全车件)",
			"new_part_number": $(".new_oenum").val(),
			"brand_name": "",
			"mikey": mikey
		},
		dataType: "json",
		cache: false,
		crossDomain: true == !(document.all),
		success: function(data) {
			alert("纠错成功");
			$('.error').fadeOut();
		}
	})
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