if (localStorage) {
	var network = localStorage.getItem("network");
	var searc = sessionStorage.getItem("searc");
	var key = JSON.parse(sessionStorage.key1);
}else{
	var network = $.cookie("network");
	var key = $.JSONCookie("key1");
	var searc = $.cookie("searc");
}

var username = $.cookie("username");
var userid = $.cookie("user_id");
var frequency = $.cookie("frequency");

jQuery("#search").val(searc);
$(".nright .divname span").html(username);
$(".nright .divnum span").html(frequency);

var mikeys ;
$.each(key.list,function(key,value){
	mikeys += value.mikey+",";
})

$(".homepage").click(function(){
	window.location.href = "../../index.html"
})

$(".content").hide();
$(".wrap-nav1 div").hide()
$.ajax({
	type:"post",
	url:network+"/Mattrio/CarInterface/ContrastCar",
	data:{
		"mikeys":mikeys.split("fined")[1]
	},
	timeout:5000,
	dataType:"json",
	cache: false,
	crossDomain: true == !(document.all),
	success:function(data){
		$(".content").show();
		$(".wrap-nav1 div").show()
		if(data.length == 1){
			if (sessionStorage) {
				sessionStorage.keyname =JSON.stringify(key.list[0]);
			}else{
				 $.JSONCookie("keyname",key.list[0], { path: '/'});
			}
			window.location.href = "particulars.html?a=1";
			return false;
		}
		$(".row").html("");
		$.each(key.list,function(key,value){
			var val = value;
			var div = $("<div class='col-sm-4 col-md-4 controw'>");
			var div1 =$('<div class="thumbnail">');

			var img = $("<img style='background:url(\"http://www.51macc.com/image/loading.gif\") no-repeat  center 50%;' src='http://mattrio-car-img.oss-cn-shanghai.aliyuncs.com/car_img/"+value.car_img+"'onerror=\"javascript:this.src='../../image/blank.jpg'\">");
			var div2 = $('<div class="caption">');

			var table = $("<table>");
			var tr1 = $("<tr>");
			var td11 = $("<th>").html("主机厂：");
			var td12 = $("<td>").html(value.Manufacture_CN);
			td11.appendTo(tr1);
			td12.appendTo(tr1);
			tr1.appendTo(table);

			var tr2 = $("<tr>");
			var td21 = $("<th>").html("车型：");
			var td22 = $("<td>").html(value.Vehicle_Name_CN);
			td21.appendTo(tr2);
			td22.appendTo(tr2);
			tr2.appendTo(table);

			var tr3 = $("<tr>");
			var td31 = $("<th>").html("销售版本：");
			var td32 = $("<td>").html(value.Name_of_sales);
			td31.appendTo(tr3);
			td32.appendTo(tr3);
			tr3.appendTo(table);

			$.each(data,function(key,value){
				$.each(value,function(k,v){
					var tr = $("<tr>");
					var td1 = $("<th>").html(k+"：");
					if(val[v] == undefined){
						var td2 = $("<td>").html("暂无");
					}else{
						var td2 = $("<td>").html(val[v]);
					}
					td1.appendTo(tr);
					td2.appendTo(tr);
					tr.appendTo(table);
				})
			})
			table.appendTo(div2);
			img.appendTo(div1);
			div2.appendTo(div1);
			div1.appendTo(div);
			div.appendTo(".row");
		})
		
		$(".thumbnail").click(function(){
			if (sessionStorage) {
				sessionStorage.keyname =JSON.stringify(key.list[$(this).parents(".controw").index()]);
			}else{
				 $.JSONCookie("keyname", key.list[$(this).parents(".controw").index()], { path: '/'});
			}
			window.location.href = "particulars.html";
		})
	},error:function(data){
		$(".content").show();
		alert("请检查您的网络");
	}
})

