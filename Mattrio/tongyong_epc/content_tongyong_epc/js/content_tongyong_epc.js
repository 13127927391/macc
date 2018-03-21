if (localStorage) {
	var network = localStorage.getItem("network");
	var cont = JSON.parse(sessionStorage.cont);
}else{
	var network = $.cookie("network");
	var cont = $.JSONCookie("cont");
}
var username = $.cookie("username");
var frequency = $.cookie("frequency");
var userid = $.cookie("user_id");

$(".nright .divname span").html(username);
$(".divnum span").html(frequency);

//获取通过url传的参数
function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg);  //匹配目标参数
    if (r != null) return decodeURI(r[2]); return null; //返回参数值
}

$("#loading").show();

var car_id = getUrlParam('?carid');
var category_id1 = getUrlParam('?id1');
var category_id2 = getUrlParam('?id2');
var img = getUrlParam('?img');
var oe = getUrlParam('?oe');
var no = getUrlParam('?no');
var name1 = getUrlParam('?name1');
var name2 = getUrlParam('?name2');
var epcnum = getUrlParam('?epcnum');
var choice = getUrlParam('?choice');

$(".name1").html(name1);
$(".name2").html(name2);
if(name1){
	$(".breadcrumb").show();
}else{
	$(".breadcrumb").hide();
}
$("<img class='img' src='"+img+"'>").appendTo(".contentleft");
$("img").load(function(){
	getEpcInfo(userid,car_id,category_id1,category_id2);
})
var width;
var height;
$(function(){
	var imgSrc = $(".img").attr("src");
	getImageWidth(imgSrc,function(w,h){
		width = w;
		height = h;
	});
});

function getImageWidth(url,callback){
	var img = new Image();
	img.src = url;
	if(img.complete){
		callback(img.width, img.height);
	}else{
		img.onload = function(){
			callback(img.width, img.height);
		}
	}
}


//上下翻页
if(epcnum == 0){
	$('#topone').attr('disabled',"true");
	$('#topone').css("background","#ccc");
}
if(epcnum == cont.length-1){
	$('#next').attr('disabled',"true");
	$('#next').css("background","#ccc");
}
if(choice == 0){
	$('#topone').attr('disabled',"true");
	$('#topone').css("background","#ccc");
	$('#next').attr('disabled',"true");
	$('#next').css("background","#ccc");
}
var num = parseInt(epcnum);
$("#next").click(function(){
	$("#loading").show();
	$("#topone").removeAttr("disabled");
	$('#topone').css("background","#e94740");
	num += 1;
	if(num >= cont.length-1){
		$('#next').attr('disabled',"true");
		$('#next').css("background","#ccc");
		num = cont.length - 1;
	}
	if(no == "-1"){
		var category_id1 = cont[num].category_id1;
	}else{
		var category_id1 = getUrlParam('?id1');
	}
	var category_id2 = cont[num].category_id2;
	$(".name2").html(cont[num].category_name2);
	$(".contentleft").html("");
	$("<img class='img' src='"+cont[num].img.split("?")[0]+"'>").appendTo(".contentleft");
	getEpcInfo(userid,car_id,category_id1,category_id2);
})
$("#topone").click(function(){
	$("#loading").show();
	$("#next").removeAttr("disabled");
	$('#next').css("background","#e94740");
	num -= 1;
	if(num <= 0){
		$('#topone').attr('disabled',"true");
		$('#topone').css("background","#ccc");
		num = 0;
	}
	if(no == "-1"){
		var category_id1 = cont[num].category_id1;
	}else{
		var category_id1 = getUrlParam('?id1');
	}
	var groupid2 = cont[num].category_id2;
	$(".name2").html(cont[num].category_name2);
	$(".contentleft").html("");
	$("<img class='img' src='"+cont[num].img.split("?")[0]+"'>").appendTo(".contentleft");
	getEpcInfo(userid,car_id,category_id1,category_id2);
})

function getEpcInfo(userid,car_id,category_id1,category_id2){
	$.ajax({
		type:"post",
		url:network+"/Mattrio/GmcEpcInterface/getGmcOes",
		data:{
			"userid":userid,
			"car_id":car_id,
			"category_id1":category_id1,
			"category_id2":category_id2
		},
		dataType:"json",
		cache: false,
		crossDomain: true == !(document.all),
		success:function(data){
			$("#loading").hide();
			$("tbody").html("");
			if(data.list.length == 0 || data.list == {}){
				var td = $("<td colspan='12'>").html("暂无数据");
				var tr = $("<tr>");
				td.appendTo(tr);
				tr.appendTo("tbody");
			}
			$.each(data.list,function(key,value){
				if(oe == null){
					var tr = $("<tr>");
				}else if(value.oe_number == oe){
					var tr = $("<tr class='tr1'>");
				}else{
					var tr = $("<tr>");
				}
				var callout = value.callout.replace(/\b(0+)/gi,"");
				if(value.oe_name){
					var oe_name = value.oe_name;
				}else{
					var oe_name = "";
				}
				if(value.oe_name2){
					var oe_name2 = value.oe_name2;
				}else{
					var oe_name2 = "";
				}
				if(value.oe_number){
					var oe_number = value.oe_number;
				}else{
					var oe_number = "";
				}

				if(value.remark){
					var remark = value.remark;
				}else{
					var remark = "";
				}

				if(value.price){
					var price = value.price;
				}else{
					var price = "";
				}

				if(value.number){
					var number = value.number.replace(/\b(0+)/gi,"");
				}else{
					var number = "";
				}

				if(value.First_Year){
					var First_Year = value.First_Year;
				}else{
					var First_Year = "";
				}

				if(value.Last_Year){
					var Last_Year = value.Last_Year;
				}else{
					var Last_Year = "";
				}

				if(value.Series){
					var Series = value.Series;
				}else{
					var Series = "";
				}

				tr.html("<td><p><span class='check_span'><input type='checkbox' name='gay'></span></p></td><td>"+callout+"</td><td>"+oe_name+"</td><td>"+oe_name2+"</td><td class='oecont'><span>"+oe_number+"</span></td><td>"+remark+"</td><td>"+price+"</td><td>"+number+"</td><td>"+First_Year+"</td><td>"+Last_Year+"</td><td>"+Series+"</td>")
				tr.appendTo("tbody");
			})
			$(function(){
				$("#checkbox").selectCheck();
			})
			//点击获取坐标
			var scale = $(".contentleft img").width() / width;
			$.each(data.poinlist,function(key,value){
				var scale_x = value.x * scale;
				var scale_y = value.y * scale;
				var span = $("<span style='position:absolute;top:"+(scale_y)+"px;left:"+(scale_x)+"px;width:20px;height:20px;' class='span"+value.callout+"'>");
				span.appendTo(".contentleft");
			})
			$(".contentleft span").click(function(){
				$("tbody tr").removeClass("tr1");
				$(this).css({"border":"2px solid red"}).siblings("span").css({"border":"0"});
				for(var i = 0 ; i< $("tbody tr").length; i++ ){
					if($("tbody tr").eq(i).children("td").eq(1).html() == $(this)[0].className.split("n")[1]){
						$("tbody tr").eq(i).addClass("tr1");
					}
				}
				var height = 0;
				$.each($("tbody tr"),function(key,value){
					if(key < $(".tr1").index()-1){
						height += Number($(value).height());
					}
				})
				$('html, body').animate({  
                    scrollTop:height+$(".contentleft img").height()
                }, 400);
			})
			//OE
			var height = 0;
			$.each($("tbody tr"),function(key,value){
				if(key < $(".tr1").index()){
					height += Number($(value).height())+$(".contentleft img").height();
				}
			})
			$('html, body').animate({
                scrollTop:height
            }, 400);
			// //下载
			$("#btn").click(function(){
				var id_array=new Array();  
				$('input[name="gay"]:checked').each(function(){
				    id_array.push($(this).parent("span").parent("p").parent("td").parent("tr").index());//向数组中添加元素  
				});
				if(id_array.length == 0){
					alert("选择您要导出的选项");
					return false;
				}
				var iarray=new Array(); 
				$.each(id_array,function(key,value){
					iarray.push(data.list[value].oe_number);
				})
				var oenumbers = iarray.join(",")
				window.location.href = network+"/Mattrio/RoeweEpcInterface/exportOeExcel?oenumbers="+oenumbers+"&carname="+carname+"&carid="+carid+"&groupid="+groupid+"&groupid2="+groupid2;
			})
			$("tbody tr").click(function(){
				$(this).addClass("tr1").siblings("tr").removeClass("tr1");
				$(".contentleft span").css({"border":"0"})
				for(var i = 0 ; i< $(".contentleft span").length; i++ ){
					if($(".contentleft span")[i].className.split("n")[1] == $(this).children("td").eq(1).html()){
						$($(".contentleft span")[i]).css({"border":"2px solid red"});
					}
				}
			})
		},
		error:function(data){
		}
	})
}

$(document).on("click",".oecont span",function(){
	window.open("../../content/maintain/oecont/oecont.html?oenumber="+$(this).html());
})
