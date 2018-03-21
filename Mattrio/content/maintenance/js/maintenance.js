if (localStorage) {
	var network = localStorage.getItem("network");
}else{
	var network = $.cookie("network");
};
var username = $.cookie("username");
var userid = $.cookie("user_id");
var frequency = $.cookie("frequency");

$("#loading").show();

//获取通过url传的参数
 function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg);  //匹配目标参数
    if (r != null) return decodeURI(r[2]); return null; //返回参数值
}


var mikey = getUrlParam('?mikey');
var name = getUrlParam('?name');
var iamg = getUrlParam('?iamg');

$(".nright .divname span").html(username);
$(".nright .divnum span").html(frequency);
//类型名称

$(".contentname").html("<img src='http://mattrio-car-img.oss-cn-shanghai.aliyuncs.com/car_icon/"+iamg+"'><span class='car-name' id='car-name'> "+name)

$.ajax({
	type:"get",
	url:network+"/Mattrio/OeInterface/getByCategorys",
	data:{
		"mikey":mikey,
		"userid":userid
	},
	dataType:"json",
	cache: false,
	crossDomain: true == !(document.all),
	success:function(data){
		$("#loading").hide();
		if(data.Categorys.length == 0 || data.Categorys == []){
			alert("如需获取完整信息，请联系昂美数据，电话021-52212966");
			window.location.href="javascript:history.back();";
			return false;
		}
		$.each(data.Categorys,function(key,value){
			var div1 = $("<div class='caption'>");
			var p = $("<p>").html(value.category_name);
			var img = $("<img src='http://mattrio-car-img.oss-cn-shanghai.aliyuncs.com/category/"+value.img+"'>");
			img.appendTo(div1);
			p.appendTo(div1);
			var div2 = $("<div class='thumbnail conttoprightdiv'>");
			div1.appendTo(div2);
			var div3 = $("<div class='rowcontent'>");
			div2.appendTo(div3);
			div3.appendTo(".row");
		})

		$(".thumbnail").click(function(){
			var num = $(".thumbnail").index(this);
			window.location.href="./maintenancedetails.html?num="+num+"&category_name="+data.Categorys[num].category_name+"&category_id="+data.Categorys[num].category_id+"&mi_key="+mikey+"&image="+data.Categorys[num].img;
			sessionStorage.setItem('g','');
			_czc.push(["_setCustomVar",username,"选择配件"+data.Categorys[num].category_name,0]);
		})

	},
	error:function(data){
		//console.log(data);
	}
})




