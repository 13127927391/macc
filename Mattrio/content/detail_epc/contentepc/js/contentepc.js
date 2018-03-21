if (localStorage) {
	var network = localStorage.getItem("network");
	var cont = JSON.parse(sessionStorage.cont);
}else{
	var network = $.cookie("network");
	var cont = JSON.parse(sessionStorage.cont);
}
var username = $.cookie("username");
var frequency = $.cookie("frequency");
var userid = $.cookie("user_id");

var heig = $(window).height() - 96;
if(heig >= 480){
    $(".cont").css("height",heig);
}else{
    $(".cont").css("height","480");
}
$("#loading").show();

$(".divname span").html(username);
$(".divnum span").html(frequency);


//获取通过url传的参数
 function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg);  //匹配目标参数
    if (r != null) return decodeURI(r[2]); return null; //返回参数值
}
var module_pic_num = getUrlParam('?module');
var oe_code = getUrlParam('?oecode');
var brand = getUrlParam('?brand');
var car_model_code = getUrlParam('?car_model_code');
var make_year = getUrlParam('?make_year');
var image = getUrlParam('?image');
var name1 = getUrlParam('?name1');
var name2 = getUrlParam('?name2');
var epcnum = getUrlParam('?epcnum');
var choice = getUrlParam('?choice');

if(name1){
	$(".breadcrumb").show();
}else{
	$(".breadcrumb").hide();
}

// $(document).ready(function(){  
// 	var iv2 = $("#viewer2").iviewer({
// 		src: image
// 	});
// });
var img = $("<img src='"+image+"'>").appendTo("#viewer2");

$(".name1").html(name1);
$(".name2").html(name2);
$("img").load(function(){
	
})
getEpcInfo(userid,module_pic_num,oe_code,brand,car_model_code,make_year);

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
	$(".name2").html(cont[num].category_name2);
	$("#viewer2 img").attr("src",cont[num].img.split("?")[0]);
	var module_pic_num = cont[num].category_id2;
	getEpcInfo(userid,module_pic_num,oe_code,brand,car_model_code,make_year);
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
	$(".name2").html(cont[num].category_name2);
	$("#viewer2 img").attr("src",cont[num].img.split("?")[0]);
	var module_pic_num = cont[num].category_id2;
	getEpcInfo(userid,module_pic_num,oe_code,brand,car_model_code,make_year);
})

function getEpcInfo(userid,module_pic_num,oe_code,brand,car_model_code,make_year){
	$.ajax({
		type:"post",
		url:network+"/Mattrio/EpcInterface/getEpcCategoryInfo",
		data:{
			"userid":userid,
			"module_pic_num":module_pic_num,
			"oe_code":oe_code,
			"brand":brand,
			"car_model_code":car_model_code,
			"make_year":make_year
		},
		dataType:"json",
		cache: false,
		crossDomain: true == !(document.all),
		success:function(data){
			$("#loading").hide();
			if(data.list.length == 0){
				alert("暂无数据");
				return false;
			}
			$("tbody").html("");
			$.each(data.list,function(key,value){
				if(oe_code == ""){
					var tr = $("<tr></tr>");
				}else if(value.oe_code == oe_code){
					var tr = $("<tr class='tr'></tr>");
				}else{
					var tr = $("<tr></tr>");
				}
				if(value.oe_name){
					var td2 = value.oe_name;
				}else{
					var td2 = "";
				}
				if(value.part_name){
					var td3 = value.part_name;
				}else{
					var td3 = "";
				}
				if(value.part_note){
					var td4 = value.part_note;
				}else{
					var td4 = "";
				}
				if(value.part_model){
					var td7 = value.part_model;
				}else{
					var td7 = "";
				}
				tr.html("<td><p><span class='check_span'><input type='checkbox' name='gay'></span></p></td><td>"+value.location_index+"</td><td class='oecont'><span>"+value.oe_code+"</span></td><td>"+td2+"</td><td>"+td3+"</td><td>"+td4+"</td><td>"+value.part_qty+"</td><td>"+td7+"</td>")
				$("tbody").append(tr);
			})
			$(function(){
				$("#checkbox").selectCheck();
			})

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
					iarray.push(data.list[value].id);
				})
				window.location.href = network+"/Mattrio/EpcInterface/exportOeExcel?ids="+iarray.join(",");
			})
			$("tbody tr").click(function(){
				$(this).addClass("tr").siblings("tr").removeClass("tr");
			})
		},
		error:function(data){
			console.log(data);
		}
	})
}
$(document).on("click",".oecont span",function(){
	window.open("../../../content/maintain/oecont/oecont.html?oenumber="+$(this).html());
})