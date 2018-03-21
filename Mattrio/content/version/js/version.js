if (localStorage) {
	var network = localStorage.getItem("network");
}else{
	var network = $.cookie("network");
}

var username = $.cookie("username");
var frequency = $.cookie("frequency");
var userid = $.cookie("user_id");

$(".nright div span").html(username);
$(".nright .divnum span").html(frequency);



$("#loading").show();
//获取通过url传的参数
 function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg);  //匹配目标参数
    if (r != null) return decodeURI(r[2]); return null; //返回参数值
}


var num = getUrlParam('?num');
var product_id = getUrlParam('?product_id');
var userid = getUrlParam('?userid');
var image = getUrlParam('?image');

$.ajax({
	type:"post",
	url:network+"/Mattrio/OeInterface/queryPrductDetail",
	data:{
		"product_id":product_id,
		"userid":userid
	},
	dataType:"json",
	cache: false,
	crossDomain: true == !(document.all),
	success:function(data){
		$("#loading").hide();
		if(data == [] || data.length == 0){
			alert("没有数据");
			$("#loading").hide();
		}
		
		$.each(data,function(key,value){
			$("#loading").hide();
			var div1 = $("<div>").html(value.Manufacture_CN);
			var div2 = $("<div>").html(value.oe_numbers);
			div1.appendTo($(".bottom"));
			div2.appendTo($(".bottom"));
			
		})
		var $button = $("<button class=\"associatebtn\" onClick=\"car_edit('车型详细信息','./detail/detail.html?product_id="+product_id+"','500','800')\">").html("产品关联车型");
		$button.appendTo($(".associate"));

		var img = $("<img src='http://mattrio-car-img.oss-cn-shanghai.aliyuncs.com/category/"+image+"'>");
		img.appendTo($(".contentbottomimg"));
	},
	error:function(data){
		//console.log(data);
	}
})




	







