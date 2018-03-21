if (localStorage) {
	var network = localStorage.getItem("network");
}else{
	var network = $.cookie("network");
}
var username = $.cookie("username");
var frequency = $.cookie("frequency");
var userid = $.cookie("user_id");

//获取通过url传的参数
function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg);  //匹配目标参数
    if (r != null) return decodeURI(r[2]); return null; //返回参数值
}
var vin = getUrlParam('?vin');
var mikey = getUrlParam('?mikey');
var fgstnr_mospid = getUrlParam('?fgstnr_mospid');
var fztyp_einsatz = getUrlParam('?fztyp_einsatz');
var fgstnr_prod = getUrlParam('?fgstnr_prod');

$("#loading").show();
$(".nright .divname span").html(username);
$(".divnum span").html(frequency);

var CATNUM = "";
demo();

var parameters = "";
var Vehicle_Name_CN = "";
function demo(){
	$.ajax({
		type:"post",
		url:network+"/Mattrio/EpcApi/EpcCategory1",
		data:{
			"userid":userid,
			"type":"5",
			"mikey":mikey,
			"vin":vin
		},
		dataType:"json",
		cache: false,
		crossDomain: true == !(document.all),
		success:function(data){
			CATNUM = data.CATNUM;
			$(".content_left").html("");
			Vehicle_Name_CN = data.car_info[0].Vehicle_Name_CN
			parameters = data.parameters;
			if(data.car_info == [] || data.car_info.length == 0){
			}else{
				$(".contname").html(data.car_info[0].Manufacture_CN+" "+data.car_info[0].Vehicle_Name_CN+" "+data.car_info[0].Year_of_production);
			}
			$.each(data.categorys1,function(key,value){
				var p = $("<p class='contentp' title='"+value.category_id1+":"+value.category_name1+"'>").html(value.category_id1+":"+value.category_name1);
				var ul = $("<ul class='contentul'>");
				p.appendTo(".content_left");
				ul.appendTo(".content_left");
			})
			var category_id1 = data.categorys1[0].category_id1;
			var name1 = data.categorys1[0].category_name1;
			$.ajax({
				type:"post",
				url:network+"/Mattrio/EpcApi/EpcCategory2",
				data:{
					"userid":userid,
					"parameters":parameters,
					"category_id1":category_id1,
					"type":"5"
				},
				dataType:"json",
				cache: false,
				crossDomain: true == !(document.all),
				success:function(data){
					$("#loading").hide();
					$(".row").html("");
					$.each(data.categorys2,function(key,value){
						var div1 = $("<div class='col-sm-4 col-md-3 contentname'>");
						div1.html("<a target='_blank' class='epc_a'><div class='thumbnail' title='"+value.category_name2+"'><img style='background:url(\"http://www.51macc.com/image/loading.gif\") no-repeat  center 50%;'  src='"+value.img+"'onerror=\"javascript:this.src='../../image/blank.jpg'\"><p>"+value.category_name2+"</p></div></a>");
						div1.appendTo(".row");
					});
					$(".epc_a").click(function(){
						if(sessionStorage) {
							sessionStorage.cont = JSON.stringify(data.categorys2);
						} else {
							$.JSONCookie("cont", data.categorys2, {path: '/'});
						}
						$(this).attr("href","../content_benchi_epc/content_benchi_epc.html?a="+CATNUM+"&b="+category_id1+"&c="+data.categorys2[$(this).parents().index()].category_id2+"&d="+data.categorys2[$(this).parents().index()].img.split(".jpg")[0].split("benz_img/")[1]+"&oe="+"&epcnum="+$(this).parents(".contentname").index()+"&h="+name1+"&i="+data.categorys2[$(this).parents().index()].category_name2+"&Vehicle_Name_CN="+Vehicle_Name_CN);
					});
				}
			})
		}
	})
}

$(document).on("click",".contentp",function(){
	var category_id1 = $(this).html().split(":")[0];
	var name1 =  $(this).html().split(":")[1]
	$("#loading").show();
	$(this).next().slideToggle().siblings('.content ul').slideUp();
	$(".contentul").html("");
	$.ajax({
		type:"post",
		url:network+"/Mattrio/EpcApi/EpcCategory2",
		data:{
			"userid":userid,
			"parameters":parameters,
			"category_id1":category_id1,
			"type":"5"
		},
		dataType:"json",
		cache: false,
		crossDomain: true == !(document.all),
		success:function(data){
			$("#loading").hide();
			$(".row").html("");
			$.each(data.categorys2,function(key,value){
				var div1 = $("<div class='col-sm-4 col-md-3 contentname'>");
				div1.html("<a target='_blank' class='epc_a'><div class='thumbnail' title='"+value.category_name2+"'><img style='background:url(\"http://www.51macc.com/image/loading.gif\") no-repeat  center 50%;'  src='"+value.img+"'onerror=\"javascript:this.src='../../image/blank.jpg'\"><p>"+value.category_name2+"</p></div></a>");
				div1.appendTo(".row");
				var li = $("<li title='"+value.category_name2+"'>").html(value.category_name2);
				li.appendTo(".contentul");
			});
			$(".epc_a").click(function(){
				if(sessionStorage) {
					sessionStorage.cont = JSON.stringify(data.categorys2);
				} else {
					$.JSONCookie("cont", data.categorys2, {path: '/'});
				}
				$(this).attr("href","../content_benchi_epc/content_benchi_epc.html?a="+CATNUM+"&b="+category_id1+"&c="+data.categorys2[$(this).parents().index()].category_id2+"&d="+data.categorys2[$(this).parents().index()].img.split(".jpg")[0].split("benz_img/")[1]+"&oe="+"&epcnum="+$(this).parents(".contentname").index()+"&h="+name1+"&i="+data.categorys2[$(this).parents().index()].category_name2+"&Vehicle_Name_CN="+Vehicle_Name_CN);
			});
			$(".contentul li").click(function(){
				$(this).css("border",'1px solid red').siblings("li").css("border",'1px solid #ccc');
				$(".row").html("");
				$(".row").html("<div class='col-sm-4 col-md-3 contentname'><a target='_blank' class='epc_a'><div class='thumbnail' title='"+data.categorys2[$(this).index()].category_name2+"'><img style='background:url(\"http://www.51macc.com/image/loading.gif\") no-repeat  center 50%;'  src='"+data.categorys2[$(this).index()].img+"'><p>"+data.categorys2[$(this).index()].category_name2+"</p></div></a></div>");

				$(".epc_a").click(function(){
					if(sessionStorage) {
						sessionStorage.cont = JSON.stringify(data.categorys2);
					} else {
						$.JSONCookie("cont", data.categorys2, {path: '/'});
					}
					$(this).attr("href","../content_benchi_epc/content_benchi_epc.html?a="+CATNUM+"&b="+category_id1+"&c="+data.categorys2[$(this).parents().index()].category_id2+"&d="+data.categorys2[$(this).parents().index()].img.split(".jpg")[0].split("benz_img/")[1]+"&oe="+"&epcnum="+$(this).parents(".contentname").index()+"&h="+name1+"&i="+data.categorys2[$(this).parents().index()].category_name2+"&Vehicle_Name_CN="+Vehicle_Name_CN);
				});
				
			})
		}
	})
})

$("#btn").click(function(){
	var reg = /^\w{5,}$/;
	if($.trim($("#search").val().match(reg)) == null){
		alert("OE号不少于5位");
		return false;
	}
	$("#loading").show();
	$(".contentbackright").html("");
	$.ajax({
		type:"post",
		url:network+"/Mattrio/EpcApi/queryCategory",
		data:{
			"parameters":parameters,
			"type":"5",
			"query_str":$.trim($("#search").val()),
			"userid":userid
		},
		dataType:"json",
		cache: false,
		crossDomain: true == !(document.all),
		success:function(data){
			$("#loading").hide();
			$(".row").html("");
			$.each(data.categorys2,function(key,value){
				var div1 = $("<div class='col-sm-4 col-md-3 contentname'>");
				div1.html("<a target='_blank' class='epc_a'><div class='thumbnail' title='"+value.category_name2+"'><img style='background:url(\"http://www.51macc.com/image/loading.gif\") no-repeat  center 50%;'  src='"+value.img+"'><p>"+value.category_id2+" "+value.category_name2+"</p></div></a>");
				div1.appendTo(".row");

			});
			$(".epc_a").click(function(){
				if(sessionStorage) {
					sessionStorage.cont = JSON.stringify(data.categorys2);
				} else {
					$.JSONCookie("cont", data.categorys2, {path: '/'});
				}
				$(this).attr("href","../content_benchi_epc/content_benchi_epc.html?a="+CATNUM+"&b="+data.categorys2[$(this).parents().index()].category_id1+"&c="+data.categorys2[$(this).parents().index()].category_id2+"&d="+data.categorys2[$(this).parents().index()].img.split(".jpg")[0].split("benz_img/")[1]+"&oe="+$.trim($("#search").val())+"&epcnum="+$(this).parents(".contentname").index()+"&h="+$(".searchtwo").val()+"&i="+data.categorys2[$(this).parents().index()].category_name2+"&no=-1"+"&Vehicle_Name_CN="+Vehicle_Name_CN);
			});
		}
	})
})


$("#searchtwo").click(function(){
	if($.trim($(".searchtwo").val()) == ""){
		alert("查询内容不能为空");
		return false;
	}
	$("#loading").show();
	$.ajax({
		type:"post",
		url:network+"/Mattrio/EpcApi/queryCategory",
		data:{
			"parameters":parameters,
			"type":"5",
			"query_str":$.trim($(".searchtwo").val()),
			"userid":userid
		},
		dataType:"json",
		cache: false,
		crossDomain: true == !(document.all),
		success:function(data){
			$("#loading").hide();
			$(".row").html("");
			$(".content_left").html("");
			$.each(data.categorys2,function(key,value){
				var div1 = $("<div class='col-sm-4 col-md-3 contentname'>");
				div1.html("<a target='_blank' class='epc_a'><div class='thumbnail' title='"+value.category_name2+"'><img style='background:url(\"http://www.51macc.com/image/loading.gif\") no-repeat  center 50%;'  src='"+value.img+"'><p>"+value.category_id2+" "+value.category_name2+"</p></div></a>");
				div1.appendTo(".row");

				var div = $("<div class='eachdiv' title='"+value.category_id2+":"+value.category_name2+"'>").html(value.category_id2+":"+value.category_name2);	
				div.appendTo(".content_left");
			});
			$(".eachdiv").click(function(){
				$(this).css("border",'1px solid red').siblings("div").css("border",'1px solid #ccc');
				$(".row").html("");
				var div1 = $("<div class='col-sm-4 col-md-3 contentname'>");
				div1.html("<a target='_blank' class='epc_a'><div class='thumbnail' title='"+data.categorys2[$(this).index()].category_name2+"'><img style='background:url(\"http://www.51macc.com/image/loading.gif\") no-repeat  center 50%;'  src='"+data.categorys2[$(this).index()].img+"'><p>"+data.categorys2[$(this).index()].category_id2+" "+data.categorys2[$(this).index()].category_name2+"</p></div></a>");
				div1.appendTo(".row");
				var GROUPNUM = data.categorys2[$(this).index()].category_id1;
				var SUBGRP = data.categorys2[$(this).index()].category_id2;
				var img = data.categorys2[$(this).index()].img.split(".jpg")[0].split("benz_img/")[1];
				var name2 = data.categorys2[$(this).index()].category_name2;
				$(".epc_a").click(function(){
					if(sessionStorage) {
						sessionStorage.cont = JSON.stringify(data.categorys2);
					} else {
						$.JSONCookie("cont", data.categorys2, {path: '/'});
					}
					$(this).attr("href","../content_benchi_epc/content_benchi_epc.html?a="+CATNUM+"&b="+GROUPNUM+"&c="+SUBGRP+"&d="+img+"&oe="+$("#search").val()+"&epcnum="+$(this).parents(".contentname").index()+"&i="+name2+"&no=-1"+"&Vehicle_Name_CN="+Vehicle_Name_CN);
				});
			})
			$(".epc_a").click(function(){
				if(sessionStorage) {
					sessionStorage.cont = JSON.stringify(data.categorys2);
				} else {
					$.JSONCookie("cont", data.categorys2, {path: '/'});
				}
				$(this).attr("href","../content_benchi_epc/content_benchi_epc.html?a="+CATNUM+"&b="+data.categorys2[$(this).parents().index()].category_id1+"&c="+data.categorys2[$(this).parents().index()].category_id2+"&d="+data.categorys2[$(this).parents().index()].img.split(".jpg")[0].split("benz_img/")[1]+"&oe="+"&epcnum="+$(this).parents(".contentname").index()+"&h="+$(".searchtwo").val()+"&i="+data.categorys2[$(this).parents().index()].category_name2+"&no=-1"+"&Vehicle_Name_CN="+Vehicle_Name_CN);
			});
		}
	})
})
$("#goback").click(function(){
	$(".searchtwo").val("");
	demo();
})

