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
var car_id = getUrlParam('?a');
var f8 = getUrlParam('?b');
var time = getUrlParam('?c');
var year = getUrlParam('?year');
var mikey = getUrlParam('?mikey');
var vin = getUrlParam('?vin');

$("#loading").show();
$(".nright .divname span").html(username);
$(".divnum span").html(frequency);
var parameters = "";
demo();
function demo(){
	$.ajax({
		type:"post",
		url:network+"/Mattrio/EpcApi/EpcCategory1",
		data:{
			"userid":userid,
			"type":"2",
			"mikey":mikey,
			"vin":vin
		},
		dataType:"json",
		cache: false,
		crossDomain: true == !(document.all),
		success:function(data){
			$(".content_left").html("");
			parameters = data.parameters;
			var category_id1 = data.categorys1[0].category_id1;
			var name1 = data.categorys1[0].category_name1;
			if(data.car_info == [] || data.car_info.length == 0){
			}else{
				$(".contname").html(data.car_info[0].Manufacture_CN+" "+data.car_info[0].Vehicle_Name_CN+" "+data.car_info[0].Year_of_production);
			}
			if(data.categorys1 == [] || data.categorys1.length == 0){
				alert("如需获取完整信息，请联系昂美数据，电话021-52212966");
				window.location.href="javascript:history.back();";
				return false;
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
					"type":"2"
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
						$(this).attr("href","../content_nisang_epc/content_nisang_epc.html?a="+car_id+"&b="+data.categorys2[$(this).parents().index()].category_id2.split(",")[0]+"&c="+data.categorys2[$(this).parents().index()].category_id2.split(",")[1]+"&d="+time+"&e="+data.categorys2[$(this).parents().index()].img.split("?")[0]+"&oe="+$("#search").val()+"&name1="+name1+"&name2="+data.categorys2[$(this).parents().index()].category_name2+"&epcnum="+$(this).parents(".contentname").index());
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
			"type":"2"
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
				$(this).attr("href","../content_nisang_epc/content_nisang_epc.html?a="+car_id+"&b="+data.categorys2[$(this).parents().index()].category_id2.split(",")[0]+"&c="+data.categorys2[$(this).parents().index()].category_id2.split(",")[1]+"&d="+time+"&e="+data.categorys2[$(this).parents().index()].img.split("?")[0]+"&oe="+$("#search").val()+"&name1="+name1+"&name2="+data.categorys2[$(this).parents().index()].category_name2+"&epcnum="+$(this).parents(".contentname").index());
			});
			$(".contentul li").click(function(){
				$(this).css("border",'1px solid red').siblings("li").css("border",'1px solid #ccc');
				$(".row").html("");
				$(".row").html("<div class='col-sm-4 col-md-3 contentname'><a target='_blank' class='epc_a'><div class='thumbnail' title='"+data.categorys2[$(this).index()].category_name2+"'><img style='background:url(\"http://www.51macc.com/image/loading.gif\") no-repeat  center 50%;'  src='"+data.categorys2[$(this).index()].img+"'><p>"+data.categorys2[$(this).index()].category_name2+"</p></div></a></div>");

				var b = data.categorys2[$(this).index()].category_id2.split(",")[0]
				var c = data.categorys2[$(this).index()].category_id2.split(",")[1]
				var img = data.categorys2[$(this).index()].img.split("?")[0]
				var name2 = data.categorys2[$(this).index()].category_name2
				$(".epc_a").click(function(){
					if(sessionStorage) {
						sessionStorage.cont = JSON.stringify(data.categorys2);
					} else {
						$.JSONCookie("cont", data.categorys2, {path: '/'});
					}
					$(this).attr("href","../content_nisang_epc/content_nisang_epc.html?a="+car_id+"&b="+b+"&c="+c+"&d="+time+"&e="+img+"&oe="+$("#search").val()+"&name1="+name1+"&name2="+name2+"&epcnum="+$(this).parents(".contentname").index());
				});
				
			})
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
			"type":"2",
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
				var img = data.categorys2[$(this).index()].img.split(".png")[0].split("Pictures/")[1];
				$(this).css("border",'1px solid red').siblings("div").css("border",'1px solid #ccc');
				$(".row").html("");
				var div1 = $("<div class='col-sm-4 col-md-3 contentname'>");
				div1.html("<a target='_blank' class='epc_a'><div class='thumbnail' title='"+data.categorys2[$(this).index()].category_name2+"'><img style='background:url(\"http://www.51macc.com/image/loading.gif\") no-repeat  center 50%;'  src='"+data.categorys2[$(this).index()].img+"'><p>"+data.categorys2[$(this).index()].category_id2+" "+data.categorys2[$(this).index()].category_name2+"</p></div></a>");
				div1.appendTo(".row");
				var b = data.categorys2[$(this).index()].category_id2.split(",")[0];
				var c = data.categorys2[$(this).index()].category_id2.split(",")[1];
				var name2 =data.categorys2[$(this).index()].category_name2;
				$(".epc_a").click(function(){
					if(sessionStorage) {
						sessionStorage.cont = JSON.stringify(data.categorys2);
					} else {
						$.JSONCookie("cont", data.categorys2, {path: '/'});
					}
					$(this).attr("href","../content_nisang_epc/content_nisang_epc.html?a="+car_id+"&b="+b+"&c="+c+"&d="+time+"&e="+img+"&oe="+$("#search").val()+"&name1=&name2="+name2+"&epcnum="+$(this).parents(".contentname").index());
				});
			})
			$(".epc_a").click(function(){
				var img = data.categorys2[$(this).parents().index()].img.split("?")[0];
				if(sessionStorage) {
					sessionStorage.cont = JSON.stringify(data.categorys2);
				} else {
					$.JSONCookie("cont", data.categorys2, {path: '/'});
				}
				$(this).attr("href","../content_nisang_epc/content_nisang_epc.html?a="+car_id+"&b="+data.categorys2[$(this).parents().index()].category_id2.split(",")[0]+"&c="+data.categorys2[$(this).parents().index()].category_id2.split(",")[1]+"&d="+time+"&e="+img+"&oe="+$("#search").val()+"&name1=&name2="+data.categorys2[$(this).parents().index()].category_name2+"&epcnum="+$(this).parents(".contentname").index());
			});
		}
	})
})
$("#goback").click(function(){
	$(".searchtwo").val("");
	demo();
})



//点击
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
			"type":"2",
			"query_str":$.trim($("#search").val()),
			"userid":userid
		},
		dataType:"json",
		cache: false,
		crossDomain: true == !(document.all),
		success:function(data){
			$(".row").html("");
			$("#loading").hide();
			$.each(data.categorys2,function(key,value){
				var div1 = $("<div class='col-sm-4 col-md-3 contentname'>");
				div1.html("<a target='_blank' class='epc_a'><div class='thumbnail' title='"+value.category_name2+"'><img style='background:url(\"http://www.51macc.com/image/loading.gif\") no-repeat  center 50%;'  src='"+value.img+"'><p>"+value.category_id2+" "+value.category_name2+"</p></div></a>");
				div1.appendTo(".row");
			});
			$(".epc_a").click(function(){
				var img = data.categorys2[$(this).parents().index()].img.split("?")[0];
				if(sessionStorage) {
					sessionStorage.cont = JSON.stringify(data.categorys2);
				} else {
					$.JSONCookie("cont", data.categorys2, {path: '/'});
				}
				$(this).attr("href","../content_nisang_epc/content_nisang_epc.html?a="+car_id+"&b="+data.categorys2[$(this).parents().index()].category_id2.split(",")[0]+"&c="+data.categorys2[$(this).parents().index()].category_id2.split(",")[1]+"&d="+time+"&e="+img+"&oe="+$.trim($("#search").val())+"&name1=&name2="+data.categorys2[$(this).parents().index()].category_name2+"&epcnum="+$(this).parents(".contentname").index());
			});
		}
	})
})