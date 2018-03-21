if (localStorage) {
	var network = localStorage.getItem("network");
}else{
	var network = $.cookie("network");
}
var username = $.cookie("username");
var userid = $.cookie("user_id");
var frequency = $.cookie("frequency");

$(".divname span").html(username);
$(".divnum span").html(frequency);

$("#loading").hide();

function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg);  //匹配目标参数
    if (r != null) return decodeURI(r[2]); return null; //返回参数值
}
var mikey = getUrlParam('?mikey');
var Manufacture = getUrlParam('?Manufacture');
$(".carname span").html(Manufacture)
var cont_1;
//点击第一个
$(".content1 p").click(function(){
	var str = ["A","B","C","D","E","F","G"];
	var categoryid = str[$(this).index()];

	$("#loading").show();
	$(this).css({"background":"#e94740","color":"#fff"}).siblings("p").css({"background":"","color":"#000"});
	$.ajax({
		type:"post",
		url:network+"/Mattrio/ProductInterface/getCategory2",
		data:{
			"categoryid":categoryid,
			"mikey":mikey,
			"userid":userid
		},
		dataType:"json",
		cache: false,
		crossDomain: true == !(document.all),
		success:function(data){
			$("#loading").hide();
			$(".content3").html("");
			cont_1 = data;
			var div = $("<div>");
			if(data.list == [] || data.list.length == 0){
				$("<p>").html("暂无数据").appendTo(div);
				$(".content2").html(div);
			}else{
				$.each(data.list,function(key,value){
					$("<p>").html(value.category_name).appendTo(div);
				})
				$(".content2").html(div);

				$(".content2 p").click(function(){
					$(this).css({"background":"#e94740","color":"#fff"}).siblings("p").css({"background":"","color":"#000"});
					$("#loading").show();
					$.ajax({
						type:"post",
						url:network+"/Mattrio/ProductInterface/getCategory3",
						data:{
							"categoryid":cont_1.list[$(this).index()].category_id,
							"mikey":mikey,
							"userid":userid
						},
						dataType:"json",
						cache: false,
						crossDomain: true == !(document.all),
						success:function(data){
							$("#loading").hide();
							var div = $("<div>");
							if(data.list == [] || data.list.length == 0){
								$("<p>").html("暂无数据").appendTo(div);
								$(".content3").html(div);
							}else{
								$.each(data.list,function(key,value){
									div.append("<a target='_blank'><p>"+value.category_name+"</p></a>");
								})
								$(".content3").html(div);
								$(".content3 a").click(function(){
									$(this).css({"background":"#e94740",}).siblings("a").css({"background":"",});
									$(this).children("p").css({"background-color":"#e94740","color":"#fff"}).parents("a").siblings("a").children("p").css({"background-color":"","color":""});
									$(this).attr("href","./oecont/oecont.html?categoryid="+data.list[$(this).index()].category_id+"&mikey="+mikey+"&Manufacture="+Manufacture);
									_czc.push(["_setCustomVar",username,"全车件配件"+$(".content3 p").html(),0]);

								})
							}
						}
					})
				})
			}
		},
		error:function(data){
			//console.log(1)
		}
	})
})

$(document).keydown(function(even){
	if(event.keyCode==13){
		$("#btn").click();
	}
})

//点击搜索栏
$("#btn").click(function(){
	if($("#search").val() == "" || $("#search").val() == null){
		alert("输入内容不能为空");
		return false;
	}
	var str = $("#search").val();
	window.open("./oecont/oecont.html?str="+$("#search").val()+"&mikey="+mikey+"&Manufacture="+Manufacture);
	_czc.push(["_setCustomVar","模糊查询",username+"allcar",0]);
})


// $(".inputbox").focus(function(){
// 	$(this).hide();
// 	$(".active").show();
// 	$("#arrcity").focus();
// 	$.ajax({
// 		type:"post",
// 		url:"http://192.168.1.112:8080/Mattrio/SelectCar/Manufacture",
// 		data:{
// 			"year":	"2013"
// 		},
// 		dataType:"json",
// 		cache: false,
// 		crossDomain: true == !(document.all),
// 		success:function(data){
// 			commoncitys.splice(0, commoncitys.length);
// 			citys.splice(0, citys.length);
// 			for(var i = 0; i < data.all.length; i++) {
// 				commoncitys[i] = data.all[i];
// 			}
// 			for(var i = 0; i < data.all.length; i++) {
// 				citys[i] = data.all[i];
// 			}
// 		},error:function(data){
// 			console.log(data);
// 		}

// 	})
// })

