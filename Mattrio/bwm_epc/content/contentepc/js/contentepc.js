if(localStorage) {
	var network = localStorage.getItem("network");
	var clicknum = sessionStorage.getItem("clicknum");
	var cont = JSON.parse(sessionStorage.cont);
} else {
	var network = $.cookie("network");
	var clicknum = $.cookie("clicknum");
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
var fgstnr_mospid = getUrlParam('?a');
var categoryid1 = getUrlParam('?b');
var categoryid2 = getUrlParam('?c');
var fztyp_einsatz = getUrlParam('?d');
var fgstnr_prod = getUrlParam('?e');
var bildtaf_btnr = getUrlParam('?f');
var image = getUrlParam('?g');
var oe = getUrlParam('?oe');
var type = getUrlParam('?type');
var choice = getUrlParam('?choice');
var category_name1 = getUrlParam('?h');
var category_name3 = getUrlParam('?i');


$(".name1").html(category_name1);
$(".name2").html(category_name3);
// $(document).ready(function(){
// 	var iv2 = $("#viewer2").iviewer({
// 		src: image
// 	});
// });
$("<img class='img' src='" + image + "'>").appendTo("#viewer2");
$("img").load(function(){
	getEpcInfo(userid,fgstnr_mospid,categoryid1,categoryid2,fztyp_einsatz,fgstnr_prod,bildtaf_btnr,type,oe);
})


var width;
$(function() {
	var imgSrc = $(".img").attr("src");
	getImageWidth(imgSrc, function(w, h) {
		width = w;
	});
});
function getImageWidth(url, callback) {
	var img = new Image();
	img.src = url;
	if(img.complete) {
		callback(img.width, img.height);
	} else {
		img.onload = function() {
			callback(img.width, img.height);
		}
	}
}
//上下翻页
if(clicknum == 0){
	$('#topone').attr('disabled',"true");
	$('#topone').css("background","#ccc");
}
if(clicknum == cont.length-1){
	$('#next').attr('disabled',"true");
	$('#next').css("background","#ccc");
}
if(choice == 0){
	$('#topone').attr('disabled',"true");
	$('#topone').css("background","#ccc");
	$('#next').attr('disabled',"true");
	$('#next').css("background","#ccc");
}
var num = parseInt(clicknum);
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
	var categoryid1 = cont[num].category_id1;
	var categoryid2 = cont[num].category_id2;
	var bildtaf_btnr = cont[num].category_id3;
	var image = "http://bwm-epc.oss-cn-shanghai.aliyuncs.com/epc_img/" + cont[num].bildtaf_grafikid + ".jpg";
	var type = cont[num].type;
	$("#viewer2").html("");
	$(".name2").html(cont[num].category_name3);
	$("<img class='img' src='" + image + "'>").appendTo("#viewer2");
	getEpcInfo(userid,fgstnr_mospid,categoryid1,categoryid2,fztyp_einsatz,fgstnr_prod,bildtaf_btnr,type,oe);
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
	var categoryid1 = cont[num].category_id1;
	var categoryid2 = cont[num].category_id2;
	var bildtaf_btnr = cont[num].category_id3;
	var image = "http://bwm-epc.oss-cn-shanghai.aliyuncs.com/epc_img/" + cont[num].bildtaf_grafikid + ".jpg";
	var type = cont[num].type;
	$("#viewer2").html("");
	$(".name2").html(cont[num].category_name3);
	$("<img class='img' src='" + image + "'>").appendTo("#viewer2");
	getEpcInfo(userid,fgstnr_mospid,categoryid1,categoryid2,fztyp_einsatz,fgstnr_prod,bildtaf_btnr,type,oe);
})

function getEpcInfo(userid,fgstnr_mospid,categoryid1,categoryid2,fztyp_einsatz,fgstnr_prod,bildtaf_btnr,type,oe){
	$.ajax({
		type: "post",
		url: network + "/Mattrio/BwmEpcInterface/getBwmEpcPartInfo",
		data: {
			"userid": userid,
			"fgstnr_mospid": fgstnr_mospid,
			"categoryid1": categoryid1,
			"categoryid2": categoryid2,
			"fztyp_einsatz": fztyp_einsatz,
			"fgstnr_prod": fgstnr_prod,
			"bildtaf_btnr": bildtaf_btnr,
			"type": type,
			"oenumber": oe
		},
		dataType: "json",
		cache: false,
		crossDomain: true == !(document.all),
		success: function(data) {
			$("#loading").hide();
			//替换关系显示
			for (var i = 0; i < data.list.length; i++) {
				if (data.list[i].price==null) {
					for (var j = 0; j < data.list.length; j++) {
						if (data.list[j].price>0&&data.list[i].location==data.list[j].location&&data.list[i].oe_name2==data.list[j].oe_name2&&data.list[i].supplement==data.list[j].supplement) {
							data.list[i].supplement='被'+data.list[j].oenumber+'替换';
						}
					}
				}
			}
			$("tbody").html("");
			$.each(data.list, function(key, value) {
				if(oe == "") {
					var tr = $("<tr></tr>");
				} else if(value.oenumber == oe) {
					var tr = $("<tr class='tr1'></tr>");
				} else {
					var tr = $("<tr></tr>");
				}
				var td0 = $("<td>").html("<p><span class='check_span'><input type='checkbox' name='gay'></span></p></td>");
				var td1 = $("<td>").html(value.location);
				var td2 = $("<td>").html(value.oenumber);
				if(value.oe_name) {
					var td3 = value.oe_name;
				} else {
					var td3 = "";
				}
				var td8 = $("<td>").html(value.oe_name2);

				if(value.price) {
					var td4 = value.price;
				} else {
					var td4 = ""
				}
				var td6 = $("<td>").html(value.number);
				if(value.supplement) {
					var td7 = value.supplement;
				} else {
					var td7 = ""
				}
				tr.html("<td><p><span class='check_span'><input type='checkbox' name='gay'></span></p></td><td>" + value.location + "</td><td class='oecont'><span>" + value.oenumber + "</span></td><td>" + td3 + "</td><td>" + value.oe_name2 + "</td><td>" + td7 + "</td><td>" + value.number + "</td><td>" + td4 + "</td>");
				$("tbody").append(tr);
			})
			
			$(function() {
				$("#checkbox").selectCheck();
			})
			//点击获取坐标
			$.each(data.locations, function(key, value) {
				var scale = $("#viewer2 img").width() / width;
				var span = $("<span style='position:absolute;top:" + (value.top_y * scale - 3) + "px;left:" + (value.buttom_x * scale - 18) + "px;width:25px;height:25px;' class='span" + value.postion + "'></span>");
				var span2 = $("<div disabled='disabled' style='background-color:rgba(255,255,255,.8);position:absolute;top:" + (value.top_y * scale - 3) + "px;left:" + (value.buttom_x * scale - 18) + "px;width:20px;height:20px;' ></div>");
				var isfind = 0;
				for(var i = 0; i < $("tbody tr").length; i++) {
					if(value.postion == Number($("tbody tr").eq(i).children("td").eq(1).html())) {
						isfind = 1;
					}
				}
				if(isfind == 1) {
					$("#viewer2").append(span);
				} else {
					$("#viewer2").append(span2);
				}
			})
			$("#viewer2 span").click(function() {
				$("tbody tr").removeClass("tr1");
				$(this).css({
					"border": "2px solid red"
				}).siblings("span").css({
					"border": "0"
				});
				for(var i = 0; i < $("tbody tr").length; i++) {
					if(Number($("tbody tr").eq(i).children("td").eq(1).html()) == Number($(this)[0].className.split("n")[1])) {
						$("tbody tr").eq(i).addClass("tr1");
					}
				}
				var height = 0;
				$.each($("tbody tr"), function(key, value) {
					if(key < $(".tr1").index() - 1) {
						height = Number($(value).height()*key);
					}
				})
				$('html, body').animate({  
                    scrollTop:height+600
                }, 400); 
			})

			//OE
			var height = 0;
			$.each($("tbody tr"), function(key, value) {
				if(key < $(".tr").index()) {
					height += Number($(value).height());
				}
			})
			if(oe == ""){
				$('html, body').animate({  
	                scrollTop:height
	            }, 400);
			}else{
				$('html, body').animate({  
	                scrollTop:height+600
	            }, 400);
			}
			
			//下载
			$("#btn").click(function() {
				var id_array = new Array();
				$('input[name="gay"]:checked').each(function() {
					id_array.push($(this).parent("span").parent("p").parent("td").parent("tr").index()); //向数组中添加元素  
				});
				if(id_array.length == 0) {
					alert("选择您要导出的选项");
					return false;
				}
				var iarray = new Array();
				$.each(id_array, function(key, value) {
					iarray.push(data.list[value].oenumber);
				})
				window.location.href = network + "/Mattrio/BwmEpcInterface/exportOeExcel?fgstnr_mospid=" + fgstnr_mospid + "&bildtaf_btnr=" + bildtaf_btnr + "&categoryid1=" + categoryid1 + "&categoryid2=" + categoryid2 + "&fztyp_einsatz=" + fztyp_einsatz + "&fgstnr_prod=" + fgstnr_prod + "&ids=" + iarray.join(",");
			})

			$("tbody tr").click(function() {
				$(this).addClass("tr1").siblings("tr").removeClass("tr1");
				$("#viewer2 span").css({"border": "0"})
				for(var i = 0; i < $("#viewer2 span").length; i++) {
					if(Number($("#viewer2 span")[i].className.split("n")[1]) == Number($(this).children("td").eq(1).html())) {
						$($("#viewer2 span")[i]).css({"border": "2px solid red"});
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
	window.open("../../../content/maintain/oecont/oecont.html?oenumber="+$(this).html());
})
