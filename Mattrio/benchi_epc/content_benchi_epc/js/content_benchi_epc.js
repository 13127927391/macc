if(localStorage) {
	var network = localStorage.getItem("network");
	var cont = JSON.parse(sessionStorage.cont);
} else {
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
	var r = window.location.search.substr(1).match(reg); //匹配目标参数
	if(r != null) return decodeURI(r[2]);
	return null; //返回参数值
}

$("#loading").show();
var CATNUM = getUrlParam('?a');
var GROUPNUM = getUrlParam('?b');
var SUBGRP = getUrlParam('?c');
var image = getUrlParam('?d');
var oe = getUrlParam('?oe');
var no = getUrlParam('?no');
var epcnum = getUrlParam('?epcnum');
var choice = getUrlParam('?choice');
var name1 = getUrlParam('?h');
var name2 = getUrlParam('?i');
var SALESDES = getUrlParam('?Vehicle_Name_CN');


$(".name1").html(name1);
$(".name2").html(name2);
$("<img class='img' src='http://benz-epc.oss-cn-shanghai.aliyuncs.com/benz_img/" + image + ".jpg'>").appendTo("#viewer2");

getEpcInfo(userid,CATNUM,GROUPNUM,SUBGRP,SALESDES);

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
	if(no == "-1"){
		var GROUPNUM = cont[num].category_id1;
	}else{
		var GROUPNUM = getUrlParam('?b');
	}
	var SUBGRP = cont[num].category_id2;
	var image = cont[num].img.split("?")[0];
	$(".name2").html(cont[num].category_name2);
	$("#viewer2 img").attr("src",image);
	getEpcInfo(userid,CATNUM,GROUPNUM,SUBGRP,SALESDES);
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
		var GROUPNUM = cont[num].category_id1;
	}else{
		var GROUPNUM = getUrlParam('?b');
	}
	var SUBGRP = cont[num].category_id2;
	var image = cont[num].img.split("?")[0];
	$(".name2").html(cont[num].category_name2);
	$("#viewer2 img").attr("src", image);
	getEpcInfo(userid,CATNUM,GROUPNUM,SUBGRP,SALESDES);
})

function getEpcInfo(userid,CATNUM,GROUPNUM,SUBGRP,SALESDES){
	$.ajax({
		type: "post",
		url: network + "/Mattrio/BenzEpcInterface/getBenzEpcOEs",
		data: {
			"userid": userid,
			"CATNUM": CATNUM,
			"GROUPNUM": GROUPNUM,
			"SUBGRP": SUBGRP,
			"SALESDES":SALESDES
		},
		dataType: "json",
		cache: false,
		crossDomain: true == !(document.all),
		success: function(data) {
			$("#loading").hide();
			$("tbody").html("");
			if(data.list.length == 0 || data.list == []){
				$("tbody").html("<tr><td colspan='6'>暂无数据<td><tr>");
			}
			$.each(data.list, function(key, value) {
				if(oe == "") {
					var tr = $("<tr>");
				} else if(value.oe == oe) {
					var tr = $("<tr class='tr1'>");
				} else {
					var tr = $("<tr>");
				}
				// var td0 = $("<td>").html("<p><span class='check_span'><input type='checkbox'  name='gay'></span></p></td>");
				var td1 = $("<td>").html(value.CALLOUT);
				var td2 = $("<td class='oecont'>").html("<span>"+value.oe+"</span>");
				var td3 = $("<td>").html(value.NOUN);
				if(value.NEUTRAL) {
					var td4 = $("<td>").html(value.NEUTRAL);
				} else {
					var td4 = $("<td>").html("");
				}
				if(value.RANKING_NUMBER) {
					var td6 = $("<td>").html(value.RANKING_NUMBER);
				} else {
					var td6 = $("<td>").html("");
				}

				if(value.price.indexOf(".00000") >= 0){
					var td7 = $("<td>").html("暂无价格");
				}else{
					var td7 = $("<td>").html(value.price);
				}
				
				if(value.oe_name) {
					var td8 = $("<td>").html(value.oe_name);
				} else {
					var td8 = $("<td>").html("");
				}
				// td0.appendTo(tr);
				td1.appendTo(tr);
				td2.appendTo(tr);
				td8.appendTo(tr);
				td3.appendTo(tr);
				td4.appendTo(tr); 
				td6.appendTo(tr);
				td7.appendTo(tr);
				tr.appendTo("tbody");
			})
			$(function() {
				$("#checkbox").selectCheck();
			})

			//OE
			var height = 0;
			$.each($("tbody tr"), function(key, value) {
				if(key < $(".tr1").index()) {
					height += Number($(value).height());
				}
			})

			$("tbody tr").click(function() {
				$(this).addClass("tr1").siblings("tr").removeClass("tr1");
				$("#viewer2 span").css({
					"border": "0"
				})
				for(var i = 0; i < $("#viewer2 span").length; i++) {
					if(Number($("#viewer2 span")[i].className.split("n")[1]) == Number($(this).children("td").eq(1).html())) {
						$($("#viewer2 span")[i]).css({
							"border": "2px solid red"
						});
					}
				}
			})

		},
		error: function(data) {
			console.log(data);
		}
	})
}
$(document).on("click",".oecont span",function(){
	window.open("../../content/maintain/oecont/oecont.html?oenumber="+$(this).html());
})