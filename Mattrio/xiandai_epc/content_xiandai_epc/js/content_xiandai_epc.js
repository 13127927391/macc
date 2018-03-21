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
var MLBPNO = getUrlParam('?a');
var gmugno = getUrlParam('?b');
var GIILPG = getUrlParam('?c');
var txuc01 = getUrlParam('?d');
var txuc02 = getUrlParam('?e');
var txuc03 = getUrlParam('?f');
var txuc04 = getUrlParam('?g');
var txuc05 = getUrlParam('?h');
var img = getUrlParam('?i');
var oe = getUrlParam('?oe');
var name1 = getUrlParam('?name1');
var name2 = getUrlParam('?name2');
var epcnum = getUrlParam('?epcnum');
var choice = getUrlParam('?choice');
var image = img;
// $(document).ready(function(){  
// 	var iv2 = $("#viewer2").iviewer({
// 		src: image
// 	});
// });

if(oe == ""){
	$(".breadcrumb").show();
}else{
	$(".breadcrumb").hide();
}

$("<img class='img' src='"+image+"'>").appendTo(".contentleft");
$("img").load(function(){
	getEpcInfo(userid,MLBPNO,gmugno,GIILPG,txuc01,txuc02,txuc03,txuc04,txuc05);
})
$(".name1").html(name1);
$(".name2").html(name2);
var width;
var height_y;
$(function(){
	var imgSrc = $(".img").attr("src");
	getImageWidth(imgSrc,function(w,h){
		width = w;
		height_y = h;
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
		num = cont.length-1;
	}
	var gmugno = cont[num].category_id2.split(",")[0];
	var GIILPG = cont[num].category_id2.split(",")[1];
	$(".name2").html(cont[num].category_name2);
	$(".contentleft").html("");
	$("<img class='img' src='"+cont[num].img.split("?")[0]+"'>").appendTo(".contentleft");
	getEpcInfo(userid,MLBPNO,gmugno,GIILPG,txuc01,txuc02,txuc03,txuc04,txuc05);
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
	var gmugno = cont[num].category_id2.split(",")[0];
	var GIILPG = cont[num].category_id2.split(",")[1];
	$(".name2").html(cont[num].category_name2);
	$(".contentleft").html("");
	$("<img class='img' src='"+cont[num].img.split("?")[0]+"'>").appendTo(".contentleft");
	getEpcInfo(userid,MLBPNO,gmugno,GIILPG,txuc01,txuc02,txuc03,txuc04,txuc05);
})

function getEpcInfo(userid,MLBPNO,gmugno,GIILPG,txuc01,txuc02,txuc03,txuc04,txuc05){
	$.ajax({
		type:"post",
		url:network+"/Mattrio/HyundaiEpcInterface/getHyundaiOes",
		data:{
			"userid":userid,
			"MLBPNO":MLBPNO,
			"gmugno":gmugno,
			"GIILPG":GIILPG,
			"txuc01":txuc01,
			"txuc02":txuc02,
			"txuc03":txuc03,
			"txuc04":txuc04,
			"txuc05":txuc05
		},
		dataType:"json",
		cache: false,
		crossDomain: true == !(document.all),
		success:function(data){
			$("#loading").hide();
			$("tbody").html("");
			$.each(data.list,function(key,value){
				if(oe == ""){
					var tr = $("<tr></tr>");
				}else if(value.oe_number == oe){
					var tr = $("<tr class='tr1'></tr>");
				}else{
					var tr = $("<tr></tr>");
				}
				if(value.oe_name){
					var td3 = value.oe_name;
				}else{
					var td3 = "";
				}
				if(value.oe_name2){
					var td4 = value.oe_name2;
				}else{
					var td4 = "";
				}
				if(value.number){
					var td6 = Number(value.number);
				}else{
					var td6 = "";
				}
				if(value.price){
					var td7 = value.price;
				}else{
					var td7 = "";
				}
				tr.html("<td><p><span class='check_span'><input type='checkbox' name='gay'></span></p></td><td>"+value.callout+"</td><td class='oecont'><span>"+value.oe_number+"</span></td><td>"+td3+"</td><td>"+td4+"</td><td>"+td6+"</td><td>"+td7+"</td>");
				$("tbody").append(tr);
			})
			$(function(){
				$("#checkbox").selectCheck();
			})
			//点击获取坐标
			$.each(data.poinlist,function(key,value){
				var scale_x = $(".contentleft img").width()/width;
				var scale_y = $(".contentleft img").height()/height_y;
				var span = $("<span style='position:absolute;top:"+(value.OROCY1*scale_y-2)+"px;left:"+(value.OROCX1*scale_x-2)+"px;width:"+(value.OROCW1*scale_x+4)+"px;height:"+(value.OROCH1*scale_y+4)+"px;' class='span"+value.ORPNCD+"'></span>");
				$(".contentleft").append(span);
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
                    scrollTop:height+600
                }, 400);
			})
			
			//OE
			var height = 0;
			$.each($("tbody tr"),function(key,value){
				if(key < $(".tr1").index()){
					height = Number($(value).height())+600;
				}
			})
			$('html, body').animate({  
                scrollTop:height
            }, 400);
			// 下载
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
				window.location.href = network+"/Mattrio/HyundaiEpcInterface/exportOeExcel?oenumbers="+oenumbers+"&mlbpno="+MLBPNO;
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
			console.log(data);
		}
	})
}

$(document).on("click",".oecont span",function(){
	window.open("../../content/maintain/oecont/oecont.html?oenumber="+$(this).html());
})
