if (localStorage) {
	var network = localStorage.getItem("network");
}else{
	var network = $.cookie("network");	
}
var username = $.cookie("username");
var userid = $.cookie("user_id");
var frequency = $.cookie("frequency");

$(".nright div span").html(username);
$(".nright .divnum span").html(frequency);

//获取通过url传的参数
 function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg);  //匹配目标参数
    if (r != null) return unescape(r[2]); return null; //返回参数值
}
var product_id = getUrlParam('?product_id');
var main = getUrlParam('?main');

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
		if(data == [] || data.length == 0){
			alert("如需获取完整信息，请联系昂美数据，电话021-52212966");
			$("#loading").hide();
		}

		
		$.each(data,function(key,value){
			$("#loading").hide();
			var div1 = $("<div>").html(value.Manufacture_CN);
			var div2 = $("<div>").html(value.oe_numbers);
			div1.appendTo($(".bottom"));
			div2.appendTo($(".bottom"));
			
		})
	},
	error:function(data){
		//console.log(data);
	}
})

	var $button = $("<button class=\"associatebtn\" onClick=\"car_edit('车型详细信息','../../version/detail/detail.html?product_id="+product_id+"','500','800')\">").html("产品关联车型");
	$button.appendTo($(".associate"));

	var img = $("<img src='http://mattrio-car-img.oss-cn-shanghai.aliyuncs.com/category/"+main+"'>");
	img.appendTo($(".contentbottomimg"));
	







