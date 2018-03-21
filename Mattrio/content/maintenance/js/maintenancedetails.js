if (localStorage) {
	var network = localStorage.getItem("network");
}else{
	var network = $.cookie("network");
};

var username = $.cookie("username");
var userid = $.cookie("user_id");
var frequency = $.cookie("frequency");
$(".nright .divname span").html(username);
$(".nright .divnum span").html(frequency);
//类型名称
$("#loading").show();

//获取通过url传的参数
 function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg);  //匹配目标参数
    if (r != null) return decodeURI(r[2]); return null; //返回参数值
}

var num = getUrlParam('?num');
var category_name = getUrlParam('?category_name');
var category_id = getUrlParam('?category_id');
var image = getUrlParam('?image');
var mi_key = getUrlParam('?mi_key');

$.ajax({
	type:"post",
	url:network+"/Mattrio/OeInterface/queryPrductOfCategory",
	data:{
		"mikey":mi_key,
		"category_id":category_id,
		"userid":userid
	},
	dataType:"json",
	cache: false,
	crossDomain: true == !(document.all),
	success:function(data){
		$("#loading").hide();

		if(data.oes == [] || data.oes.length == 0){
			$(".oenone").html("");
			$("<td colspan='6'>").html("如需获取完整信息，请联系昂美数据，电话021-52212966").appendTo($(".oenone"));
		}else{
			$(".oenone").html("");
			var $td1 = $("<td>").html(data.oes[0].oe_numbers);
			var $td2 = $("<td>").html(data.oes[0].category_name);
			var $td3 = $("<td>");
			var $td4 = $("<td>");
			var $td5 = $("<td>");
			var $td6 = $("<td>");
			var btn = $("<button class='errorbtn'>").html("纠错");
			var $td7 = $("<td>");
			btn.appendTo($td7);
			$td1.appendTo($(".oenone"));
			$td2.appendTo($(".oenone"));
			$td3.appendTo($(".oenone"));
			$td4.appendTo($(".oenone"));
			$td5.appendTo($(".oenone"));
			$td6.appendTo($(".oenone"));
			$td7.appendTo($(".oenone"));
		}
		if(data.products == [] || data.products.length == 0){
			var div = $("<div class='maincebottom clearfix'>");
			$("<p>").html("暂无数据").appendTo(div);
			div.appendTo($(".maince"));
		}else{
			var divoe = $("<div>");
			$.each(data.products,function(key,val){
				var div = $("<div class='maincebottom clearfix'>")
				var	div1 = $("<div class='mainceleft'>");
				var img = $("<img src='"+val.brand_img+"'>");
				img.appendTo(div1);
				/*===========*/
				var div2 = $("<div class='maincecenter'>");
				var table = $("<table>");
				//创建第一行tr
				var tr2 = $("<tr>");
				var td21 = $("<th style='width:100px'>").html("产品编号");
				var td22 = $("<td style='width:180px'>").html(val.product_id);
				var td23 = $("<th style='width:100px'>").html("品牌");
				var td24 = $("<td style='width:180px'>").html(val.brand_name);
				
				td21.appendTo(tr2);
				td22.appendTo(tr2);
				td23.appendTo(tr2);
				td24.appendTo(tr2);
				//创建第三行tr
				var tr3 = $("<tr>");
				var td31 = $("<th>").html("分类图片");
				var td32 = $("<td>");
				var img = $("<img src='http://mattrio-car-img.oss-cn-shanghai.aliyuncs.com/category/"+image+"'>");
				img.appendTo(td32);
				var td33 = $("<th>").html("分类");
				var td34 = $("<td>").html(category_name);
				td31.appendTo(tr3);
				td32.appendTo(tr3);
				td33.appendTo(tr3);
				td34.appendTo(tr3);
				//将tr添加到table中
				tr2.appendTo(table);
				tr3.appendTo(table);
				table.appendTo(div2);
				/*========*/
				var div3 = $("<div class='mainceright'>");
				div3.html('<p class="mainceright1">'+"<a href='JavaScript:;' class=\"associatebtn\" onClick=\"car_edit('车型详细信息','../version/detail/detail.html?product_id="+val.product_id+"','500','800')\">适用车型</a></p>"+'<p class="mainceright2"><a href="JavaScript:;">查看明细</a></p>'+'<p class="mainceright3">'+'<a href="JavaScript:;">产品纠错</a></p>')
				div1.appendTo(div);
				div2.appendTo(div);
				div3.appendTo(div);
				div.appendTo(divoe);
			})
			$(".oexinxi").html(divoe);
			$(".mainceright2").click(function(){
				var number = $(this).parent().parent().index();
				window.location.href="../version/version.html?num="+num+"&product_id="+data.products[number].product_id+"&userid="+userid+"&image="+image;
			})

			$(".mainceright3").click(function(){
				$('.error').fadeIn();
				var number = $(this).parent().parent().index();
				$(".oenum").val(data.products[number].product_id);
				$(".category_name").val(data.oes[0].category_name);
				$(".brand_name").val(data.products[number].brand_name);
			})
		}
	},
	error:function(data){
		//console.log(data);
	}
})

$("#loading").hide();

//点击其他地方隐藏盒子
function stopPropagation(e) { 
	if (e.stopPropagation) {
		e.stopPropagation(); 
	}else {
		e.cancelBubble = true; 
	}
} 
$(".error").bind('click',function(){ 
	$('.error').fadeOut(); 
}); 
$('.errorcont').bind('click',function(e){ 
	stopPropagation(e); 
}); 


$(".oe_error").bind('click',function(){ 
	$('.oe_error').fadeOut(); 
}); 
$('.oe_errorcont').bind('click',function(e){ 
	stopPropagation(e); 
}); 


$(".onbtn").click(function(){
	$('.error').fadeOut(); 
})
$(".offbtn").click(function(){
	if($(".new_oenum").val() == ""){
		alert("OE号码不能为空");
		return false;
	}
	$.ajax({
		type:"post",
		url:network+"/Mattrio/OeProductErrorCorrectionInterface/addErrorCorrection",
		data:{
			"part_number":$(".oenum").val(),
			"user_id":userid,
			"category_name":$(".category_name").val(),
			"type":"售后品牌",
			"new_part_number":$(".new_oenum").val(),
			"brand_name":$(".brand_name").val(),
			"mikey":mi_key
		},
		dataType:"json",
		cache: false,
		crossDomain: true == !(document.all),
		success:function(data){
			alert("纠错成功");
			$('.error').fadeOut();
		}
	})
})





//oe纠错
$(document).on("click",".errorbtn",function(){
	$('.oe_error').fadeIn();
	$(".oe_oenum").val($(this).parent().parent("tr").children("td").eq(0).html());
	$(".oe_brand_name").val($(this).parent().parent("tr").children("td").eq(1).html());
})
$(".oe_onbtn").click(function(){
	$('.oe_error').fadeOut(); 
})
$(".oe_offbtn").click(function(){
	if($(".oe_new_oenum").val() == ""){
		alert("OE号码不能为空");
		return false;
	}
	$.ajax({
		type:"post",
		url:network+"/Mattrio/OeProductErrorCorrectionInterface/addErrorCorrection",
		data:{
			"part_number":$(".oe_oenum").val(),
			"user_id":userid,
			"category_name":$(".oe_brand_name").val(),
			"type":"OE号码(保养件)",
			"new_part_number":$(".oe_new_oenum").val(),
			"brand_name":"",
			"mikey":mi_key
		},
		dataType:"json",
		cache: false,
		crossDomain: true == !(document.all),
		success:function(data){
			alert("纠错成功");
			$('.oe_error').fadeOut();
		}
	})
})