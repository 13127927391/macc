if (localStorage) {
	var network = localStorage.getItem("network");
}else{
	var network = $.cookie("network");
}
var username = $.cookie("username");
var frequency = $.cookie("frequency");
var userid = $.cookie("user_id");
$(".divname span").html(username);
$(".divnum span").html(frequency);

//获取通过url传的参数
 function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg);  //匹配目标参数
    if (r != null) return decodeURI(r[2]); return null; //返回参数值
}
var mikey =getUrlParam('?mikey');
var vin =getUrlParam('?vin');
$("#loading").show();
/*var cont;
var name1;*/
var brand = "";
var car_model_code = "";
var make_year = "";
$.ajax({
	type:"post",
	url:network+"/Mattrio/EpcInterface/getEpcCar",
	data:{
		"userid":userid,
		"mikey":mikey
	},
	dataType:"json",
	cache: false,
	crossDomain: true == !(document.all),
	success:function(data){
		if(data.recode == -3){
			alert("如需获取更多信息，请联系昂美数据，电话021-52212966");
			window.location.href = "javascript:history.back();";
			return false;
		}
		if(data.list.length == 0){
			$("#loading").hide();
			alert("如需获取完整信息，请联系昂美数据，电话021-52212966");
			window.location.href = "javascript:history.back();";
			return false;
		}
		brand = data.list[0].brand;
		car_model_code = data.list[0].car_model_code;
		make_year = data.list[0].make_year;
	}
})

var parameters = "";
demo();
function demo(){
	$(".content_left").html("");
	$.ajax({
		type:"post",
		url:network+"/Mattrio/EpcApi/EpcCategory1",
		data:{
			"userid":userid,
			"mikey":mikey,
			"vin":vin,
			"type":"6"
		},
		dataType:"json",
		cache: false,
		crossDomain: true == !(document.all),
		success:function(data){
			parameters = data.parameters;
			var category_id1 = data.categorys1[0].category_id1;
			var name1 = data.categorys1[0].category_name1;
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
			$.ajax({
				type:"post",
				url:network+"/Mattrio/EpcApi/EpcCategory2",
				data:{
					"userid":userid,
					"parameters":parameters,
					"category_id1":category_id1,
					"type":"6"
				},
				dataType:"json",
				cache: false,
				crossDomain: true == !(document.all),
				success:function(data){
					$("#loading").hide();
					$(".row").html("");
					$.each(data.categorys2,function(key,value){
						var div1 = $("<div class='col-sm-4 col-md-3 contentname'>");
						div1.html("<a target='_blank' class='epc_a'><div class='thumbnail' title='"+value.category_name2+"'><img style='background:url(\"http://www.51macc.com/image/loading.gif\") no-repeat  center 50%;'  src='"+value.img+"'><p>"+value.category_name2+"</p></div></a>");
						div1.appendTo(".row");
					});
					$(".epc_a").click(function(){
						if(sessionStorage) {
							sessionStorage.cont = JSON.stringify(data.categorys2);
						} else {
							$.JSONCookie("cont", data.categorys2, {path: '/'});
						}
						$(this).attr("href","./contentepc/contentepc.html?brand="+brand+"&car_model_code="+car_model_code+"&make_year="+make_year+"&module="+data.categorys2[$(this).parents().index()].category_id2+"&oecode="+$("#search").val()+"&name1="+name1+"&name2="+data.categorys2[$(this).parents().index()].category_name2+"&epcnum="+$(this).parents("div").index()+"&image="+data.categorys2[$(this).parents().index()].img.split("?")[0]);
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
			"type":"6"
		},
		dataType:"json",
		cache: false,
		crossDomain: true == !(document.all),
		success:function(data){
			$("#loading").hide();
			$(".row").html("");
			$.each(data.categorys2,function(key,value){
				var div1 = $("<div class='col-sm-4 col-md-3 contentname'>");
				div1.html("<a target='_blank' class='epc_a'><div class='thumbnail' title='"+value.category_name2+"'><img style='background:url(\"http://www.51macc.com/image/loading.gif\") no-repeat  center 50%;'  src='"+value.img+"'><p>"+value.category_name2+"</p></div></a>");
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
				$(this).attr("href","./contentepc/contentepc.html?brand="+brand+"&car_model_code="+car_model_code+"&make_year="+make_year+"&module="+data.categorys2[$(this).parents().index()].category_id2+"&oecode="+"&name1="+name1+"&name2="+data.categorys2[$(this).parents().index()].category_name2+"&epcnum="+$(this).parents("div").index()+"&image="+data.categorys2[$(this).parents().index()].img.split("?")[0]);
			});
			$(".contentul li").click(function(){
				$(this).css("border",'1px solid red').siblings("li").css("border",'1px solid #ccc');
				$(".row").html("");
				$(".row").html("<div class='col-sm-4 col-md-3 contentname'><a target='_blank' class='epc_a'><div class='thumbnail' title='"+data.categorys2[$(this).index()].category_name2+"'><img style='background:url(\"http://www.51macc.com/image/loading.gif\") no-repeat  center 50%;'  src='"+data.categorys2[$(this).index()].img+"'><p>"+data.categorys2[$(this).index()].category_name2+"</p></div></a></div>");

				var module = data.categorys2[$(this).index()].category_id2
				var name2 = data.categorys2[$(this).index()].category_name2
				$(".epc_a").click(function(){
					if(sessionStorage) {
						sessionStorage.cont = JSON.stringify(data.categorys2);
					} else {
						$.JSONCookie("cont", data.categorys2, {path: '/'});
					}
					$(this).attr("href","./contentepc/contentepc.html?brand="+brand+"&car_model_code="+car_model_code+"&make_year="+make_year+"&module="+module+"&oecode="+"&name1="+name1+"&name2="+name2+"&epcnum="+$(this).parents().index()+"&image="+data.categorys2[$(this).index()].img.split("?")[0]);
				});
			})
		}
	})
})

$("#btn").click(function(){
	if($.trim($("#search").val()) == "" || $.trim($("#search").val()) == null){
		alert("输入内容不能为空");
		return false;
	}
	if($.trim($("#search").val()) == "配件编号"){
		alert("输入内容不能为空");
		return false;
	}
	$("#loading").show();
	$.ajax({
		type:"post",
		url:network+"/Mattrio/EpcApi/queryCategory",
		data:{
			"parameters":parameters,
			"type":"6",
			"query_str":$.trim($("#search").val()),
			"userid":userid
		},
		dataType:"json",
		cache: false,
		crossDomain: true == !(document.all),
		success:function(data){
			$("#loading").hide();
			$("#loading").hide();
			if(data.categorys2.length == 0){
				$(".row").html("");
				$(".row").html("<p style='font-size:20px;text-align:center;'>没有查询到您要查询的数据</p>");
				return false;
			}
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
				$(this).attr("href","./contentepc/contentepc.html?brand="+brand+"&car_model_code="+car_model_code+"&make_year="+make_year+"&module="+data.categorys2[$(this).parents().index()].category_id2+"&oecode="+$.trim($("#search").val())+"&name2="+data.categorys2[$(this).parents().index()].category_name2+"&epcnum="+$(this).parents("div").index()+"&image="+data.categorys2[$(this).parents().index()].img.split("?")[0]);
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
			"type":"6",
			"query_str":$.trim($(".searchtwo").val()),
			"userid":userid
		},
		dataType:"json",
		cache: false,
		crossDomain: true == !(document.all),
		success:function(data){
			$("#loading").hide();
			if(data.categorys2.length == 0){
				$(".row").html("");
				$(".row").html("<p style='font-size:20px;text-align:center;'>没有查询到您要查询的数据</p>");
				// alert("如需获取更多信息，请联系昂美数据，电话021-52212966");
				return false;
			}
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
				var module = data.categorys2[$(this).index()].category_id2
				var name2 = data.categorys2[$(this).index()].category_name2
				$(".epc_a").click(function(){
					if(sessionStorage) {
						sessionStorage.cont = JSON.stringify(data.categorys2);
					} else {
						$.JSONCookie("cont", data.categorys2, {path: '/'});
					}
					$(this).attr("href","./contentepc/contentepc.html?brand="+brand+"&car_model_code="+car_model_code+"&make_year="+make_year+"&module="+module+"&oecode="+"&name2="+name2+"&epcnum="+$(this).parents().index()+"&image="+data.categorys2[$(this).index()].img.split("?")[0]);
				});
			})
			$(".epc_a").click(function(){
				if(sessionStorage) {
					sessionStorage.cont = JSON.stringify(data.categorys2);
				} else {
					$.JSONCookie("cont", data.categorys2, {path: '/'});
				}
				$(this).attr("href","./contentepc/contentepc.html?brand="+brand+"&car_model_code="+car_model_code+"&make_year="+make_year+"&module="+data.categorys2[$(this).parents().index()].category_id2+"&oecode="+$("#search").val()+"&name2="+data.categorys2[$(this).parents().index()].category_name2+"&epcnum="+$(this).parents("div").index()+"&image="+data.categorys2[$(this).parents().index()].img.split("?")[0]);
			});
		}
	})
})
$("#goback").click(function(){
	$(".searchtwo").val("");
	demo();
})