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
var car_id = getUrlParam('?a');
var category_id2 = getUrlParam('?b');
var category_id3 = getUrlParam('?c');
var time = getUrlParam('?d');
var img = getUrlParam('?e');
var oe = getUrlParam('?oe');
var name1 = getUrlParam('?name1');
var name2 = getUrlParam('?name2');
var epcnum = getUrlParam('?epcnum');
var choice = getUrlParam('?choice');
var image = img;

$(".name1").html(name1);
$(".name2").html(name2);

$("<img class='img' src='"+image+"'>").appendTo(".contentleft");
$("img").load(function(){
	getEpcInfo(userid,car_id,category_id2,category_id3,time);
})
var width;
$(function(){
	var imgSrc = $(".img").attr("src");
	getImageWidth(imgSrc,function(w,h){
		width = w;
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
	var category_id2 = cont[num].category_id2.split(",")[0];
	var category_id3 = cont[num].category_id2.split(",")[1];
	$(".name2").html(cont[num].category_name2);
	$(".contentleft").html("");
	$("<img class='img' src='"+cont[num].img.split("?")[0]+"'>").appendTo(".contentleft");
	getEpcInfo(userid,car_id,category_id2,category_id3,time);
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
	var category_id2 = cont[num].category_id2.split(",")[0];
	var category_id3 = cont[num].category_id2.split(",")[1];
	$(".name2").html(cont[num].category_name2);
	$(".contentleft").html("");
	$("<img class='img' src='"+cont[num].img.split("?")[0]+"'>").appendTo(".contentleft");
	getEpcInfo(userid,car_id,category_id2,category_id3,time);
})


function getEpcInfo(userid,car_id,category_id2,category_id3,time){
	$.ajax({
		type:"post",
		url:network+"/Mattrio/NissanEpcInterface/getNissanOes",
		data:{
			"userid":userid,
			"car_id":car_id,
			"category_id2":category_id2,
			"category_id3":category_id3,
			"time":time
		},
		dataType:"json",
		cache: false,
		crossDomain: true == !(document.all),
		success:function(data){
			$("#loading").hide();
			$("tbody").html("");
			// console.log(data)
			$.each(data.list,function(key,value){
				if(oe == ""){
					var tr = $("<tr>");
				}else if($.trim(value.oe_number) == oe){
					var tr = $("<tr class='tr1'>");
				}else{
					var tr = $("<tr>");
				}
				var td0 = $("<td>").html("<p><span class='check_span'><input type='checkbox' name='gay'></span></p></td>");
				var td1 = $("<td>").html(value.callout);
				var td2 = $("<td class='oecont'>").html("<span>"+value.oe_number+"</span>");
				if(value.oe_name){
					var td3 = $("<td>").html(value.oe_name);
				}else{
					var td3 = $("<td>").html("");
				}
				if(value.oe_name2){
					var td4 = $("<td>").html(value.oe_name2);
				}else{
					var td4 = $("<td>").html("");
				}
				var td5 = $("<td>").html(value.re_oe_number);
				if(value.number){
					var td6 = $("<td>").html(value.number.replace(/\b(0+)/gi,""));
				}else{
					var td6 = $("<td>").html("");
				}
				if(value.price){
					var td7 = $("<td>").html(value.price);
				}else{
					var td7 = $("<td>").html("");
				}
				
				td0.appendTo(tr);
				td1.appendTo(tr);
				td2.appendTo(tr);
				td3.appendTo(tr);
				td4.appendTo(tr);
				td5.appendTo(tr);
				td6.appendTo(tr);
				td7.appendTo(tr);
				tr.appendTo("tbody");
			})
			$(function(){
				$("#checkbox").selectCheck();
			})

			//点击获取坐标
			$.each(data.poinlist,function(key,value){
				var scale = ($(".contentleft img").width()/width)/2;
				var span = $("<span style='position:absolute;top:"+(value.y*scale-12)+"px;left:"+(value.x*scale-47)+"px;width:55px;height:20px;' class='span"+value.callout+"'>");
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
					// iarray.push($("tbody tr").eq(value).children("td").eq(2).html());
					iarray.push(data.list[value].oe_number);
				})
				var oenumbers = iarray.join(",")
				window.location.href = network+"/Mattrio/NissanEpcInterface/exportOeExcel?oenumbers="+oenumbers+"&car_id="+car_id+"&time="+time;
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
			// console.log(data);
		}
	})
}

$(document).on("click",".oecont span",function(){
	window.open("../../content/maintain/oecont/oecont.html?oenumber="+$(this).html());
})
