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
var carname = getUrlParam('?a');
var carid = getUrlParam('?b');
var groupid = getUrlParam('?c');
var groupid2 = getUrlParam('?d');
var img = getUrlParam('?e');
var oe = getUrlParam('?oe');
var no = getUrlParam('?no');
var name1 = getUrlParam('?name1');
var name2 = getUrlParam('?name2');
var epcnum = getUrlParam('?epcnum');
var choice = getUrlParam('?choice');
var image = "http://roewe-epc.oss-cn-shanghai.aliyuncs.com/images/"+img;
// $(document).ready(function(){  
// 	var iv2 = $("#viewer2").iviewer({
// 		src: image
// 	});
// });

$(".name1").html(name1);
$(".name2").html(name2);
if(name1){
	$(".breadcrumb").show();
}else{
	$(".breadcrumb").hide();
}
$("<img class='img' src='"+image+"'>").appendTo(".contentleft");
$("img").load(function(){
	getEpcInfo(userid,carname,carid,groupid,groupid2);
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
		num = cont.length - 1;
	}
	if(no == "-1"){
		var groupid = cont[num].category_id1;
	}else{
		var groupid = getUrlParam('?c');
	}
	var groupid2 = cont[num].category_id2;
	$(".name2").html(cont[num].category_name2);
	$(".contentleft").html("");
	$("<img class='img' src='"+cont[num].img.split("?")[0]+"'>").appendTo(".contentleft");
	getEpcInfo(userid,carname,carid,groupid,groupid2);
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
		var groupid = cont[num].category_id1;
	}else{
		var groupid = getUrlParam('?c');
	}
	var groupid2 = cont[num].category_id2;
	$(".name2").html(cont[num].category_name2);
	$(".contentleft").html("");
	$("<img class='img' src='"+cont[num].img.split("?")[0]+"'>").appendTo(".contentleft");
	getEpcInfo(userid,carname,carid,groupid,groupid2);
})

function getEpcInfo(userid,carname,carid,groupid,groupid2){
	$.ajax({
		type:"post",
		url:network+"/Mattrio/RoeweEpcInterface/getRoeweOes",
		data:{
			"userid":userid,
			"carname":carname,
			"carid":carid,
			"groupid":groupid,
			"groupid2":groupid2
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
				if(oe == ""){
					var tr = $("<tr>");
				}else if(value.oe_number == oe){
					var tr = $("<tr class='tr1'>");
				}else{
					var tr = $("<tr>");
				}
				var td0 = $("<td>").html("<p><span class='check_span'><input type='checkbox' name='gay'></span></p></td>");
				var td1 = $("<td>").html(value.callout);
				var td2 = $("<td>").html(value.oe_name2);
				var td3 = $("<td class='oecont'>").html("<span>"+value.oe_number+"</span>");
				if(value.remark){
					var td4 = $("<td>").html(value.remark);
				}else{
					var td4 = $("<td>").html("");
				}
				var td5 = $("<td>").html(Number(value.price));
				var td6 = $("<td>").html(value.number);
				var td7 = $("<td>").html(value.lr);
				var td8 = $("<td>").html(value.start_time);
				var td9 = $("<td>").html(value.end_time);
				if(value.replace_conntion){
					var td10 = $("<td>").html(value.replace_conntion);
				}else{
					var td10 = $("<td>").html("");
				}
				if(value.replace_oenumber){
					var td11 = $("<td>").html(value.replace_oenumber);
				}else{
					var td11 = $("<td>").html("");
				}
				if(value.oe_name){
					var td12 = $("<td>").html(value.oe_name);
				}else{
					var td12 = $("<td>").html("");
				}
				td0.appendTo(tr);
				td1.appendTo(tr);
				td12.appendTo(tr);
				td2.appendTo(tr);
				td3.appendTo(tr);
				td4.appendTo(tr);
				td5.appendTo(tr);
				td6.appendTo(tr);
				td8.appendTo(tr);
				td9.appendTo(tr);
				td10.appendTo(tr);
				td11.appendTo(tr);
				tr.appendTo("tbody");
			})
			$(function(){
				$("#checkbox").selectCheck();
			})
			//点击获取坐标
			$.each(data.pointlist,function(key,value){
				var scale_x = $(".contentleft img").width() * value.x;
				var scale_y = $(".contentleft img").height() * value.y;
				var span = $("<span style='position:absolute;top:"+(scale_y - 3)+"px;left:"+(scale_x - 3)+"px;width:"+($(".contentleft img").width() * value.w + 5)+"px;height:"+($(".contentleft img").width() * value.h + 5)+"px;' class='span"+value.callout+"'>");
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
					height += Number($(value).height())+600;
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
