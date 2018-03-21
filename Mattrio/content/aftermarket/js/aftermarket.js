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


$("#loading").show();
//获取通过url传的参数
 function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg);  //匹配目标参数
    if (r != null) return unescape(r[2]); return null; //返回参数值
}
var product_id = getUrlParam('?id');

var str;

$.ajax({
	type:"post",
	url:network+"/Mattrio/OeInterface/queryPrductRelevant",
	data:{
		"product_id":product_id,
		"userid":userid
	},
	dataType:"json",
	cache: false,
	crossDomain: true == !(document.all),
	success:function(data){
		$("#loading").hide();
		str = data;
		
		if(data.products == [] || data.products.length == 0){
			alert("如需获取完整信息，请联系昂美数据，电话021-52212966");
			return false;
		}

		$.each(data.products,function(key,val){
			var div = $("<div class='maincebottom clearfix'>")
			var	div1 = $("<div class='mainceleft'>");
			var img = $("<img src='http://mattrio-car-img.oss-cn-shanghai.aliyuncs.com/category/"+val.img+"'>");
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
			var img = $("<img src='"+val.brand_img+"'>");
			img.appendTo(td32);
			var td33 = $("<th>").html("分类");
			var td34 = $("<td>").html(val.other);
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
			var p1 = $('<p class="mainceright1">');
			var a1 = $("<a href='JavaScript:;' class=\"associatebtn\" onClick=\"car_edit('车型详细信息','../version/detail/detail.html?product_id="+val.product_id+"','500','800')\">").html("适用车型");
			a1.appendTo(p1);
			var p2 = $('<p class="mainceright2">');
			var a2 = $('<a href="JavaScript:;">').html("查看明细");
			a2.appendTo(p2);
			var p3 = $('<p class="mainceright3">');
			var a3 = $('<a href="JavaScript:;">').html("产品纠错");
			a3.appendTo(p3);
			p1.appendTo(div3);
			p2.appendTo(div3);
			p3.appendTo(div3);
			div1.appendTo(div);
			div2.appendTo(div);
			div3.appendTo(div);
			div.appendTo($(".maince"))
		})
		$(".mainceright3").click(function(){
			$('.error').fadeIn();
			var number = $(this).parent().parent().index() - 1;
			$(".oenum").val(data.products[number].product_id);
			$(".category_name").val(data.products[number].category_name);
			$(".brand_name").val(data.products[number].brand_name);
		})
	},
	error:function(data){
		//console.log(data);
	}
})


$(".maince").on("click",".mainceright2",function(){
	$("#loading").show();
	var num = $(this).parent().parent().index()-1;
	window.location.href="./version/version.html?product_id="+str.products[num].product_id+"&main="+str.products[num].img;
})


//点击其他地方隐藏盒子
function stopPropagation(e) { 
	if (e.stopPropagation) 
		e.stopPropagation(); 
	else {
		e.cancelBubble = true; 
	}
} 
$(".error").bind('click',function(){ 
	$('.error').fadeOut(); 
}); 

$('.errorcont').bind('click',function(e){ 
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
			"mikey":""
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

