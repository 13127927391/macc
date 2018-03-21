if(localStorage) {
	var network = localStorage.getItem("network");
} else {
	var network = $.cookie("network");
}	
var username = $.cookie("username");
var userid = $.cookie("user_id");
var frequency = $.cookie("frequency");

$(".nright .divname span").html(username);
$(".nright .divnum span").html(frequency);

function getUrlParam(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
	var r = window.location.search.substr(1).match(reg); //匹配目标参数
	if(r != null) return decodeURI(r[2]);
	return null; //返回参数值
}
var mikey = getUrlParam('?mikey');
var year = getUrlParam('?year');

var yearstr = ['2017', '2016', '2015', '2014', '2013', '2012', '2011', '2010', '2009', '2008', '2007', '2006', '2005', '2004', '2003', '2002', '2001', '2000', '1999', '1998', '1997', '1996', '1995', '1994', '1993', '1992', '1991', '1990', '1989', '1988', '1987', '1986', '1985', '1984'];
$.each(yearstr, function(key, value) {
	if(year - 1 <= value) {
		$("<li>").html(value).appendTo(".chooseyear");
	}

})

$(".year").click(function() {
	$(".chooseyear").toggleClass("active");
	$(".choosemouth1").addClass("active");
	$(".choosemouth2").addClass("active");
	$(".choosedistance").addClass("active");
})

$(".chooseyear li").click(function() {
	$(".year").html($(this).html() + "年");
	$(".chooseyear").addClass("active");
	$(".mouth").html("请选择上路月份");
	$(".distance").html("请选择行驶里程");
})

$(".mouth").click(function() {
	$(".chooseyear").addClass("active");
	$(".choosedistance").addClass("active");
	if($(".year").html() == "请选择上路年份") {
		alert("请选择上路年份");
	} else if($(".year").html() == "2017年") {
		$(".choosemouth2").toggleClass("active");
		$(".choosemouth2 li").click(function() {
			$(".mouth").html($(this).html());
			$(".choosemouth2").addClass("active");
			$(".distance").html("请选择行驶里程");
		})
	} else {
		$(".choosemouth1").toggleClass("active");
		$(".choosemouth1 li").click(function() {
			$(".mouth").html($(this).html());
			$(".choosemouth1").addClass("active");
			$(".distance").html("请选择行驶里程");
		})
	}
})

$("#loading").show();
var mileage;
$.ajax({
	type: "post",
	url: network + "/Mattrio/MaintenanceCycleInterface/getMileages",
	data: {
		"userid": userid,
		"mikey": mikey
	},
	dataType: "json",
	crossDomain: true == !(document.all),
	success: function(data) {
		$("#loading").hide();
		if(data.length == 0 || data == []) {
			alert("如需获取完整信息，请联系昂美数据，电话021-52212966");
			window.location.href = "javascript:history.back();";
			return false;
		}

		$.each(data, function(key, value) {
			$(".choosedistance").append($("<li></li>").html(value.section))
		})
		$(".distance").click(function() {
			if($(".mouth").html() == "请选择上路月份") {
				alert("请选择上路月份");
			} else {
				$(".choosedistance").toggleClass("active");
				$(".chooseyear").addClass("active");
				$(".choosemouth1").addClass("active");
				$(".choosemouth2").addClass("active");
				$(".choosedistance li").click(function() {
					$(".distance").html($(this).html() + " km");
					mileage = data[$(this).index()].mileage;
					$(".choosedistance").addClass("active");
				})
			}
		})
	},
	error: function(data) {
		// console.log(data);
	}
})

$(".contentbtn").click(function() {
	if($(".distance").html() == "请选择行驶里程") {
		alert("请选择您要查询的条件");
		return false;
	};
	$(".choosedistance").addClass("active");
	$(".chooseyear").addClass("active");
	$(".choosemouth1").addClass("active");
	$(".choosemouth2").addClass("active");

	var time = $(".year").html().split("年")[0] + "-" + $(".mouth").html().split("月")[0];

	$("#loading").show();
	$(".cyclenone").hide();
	$(".contentnone").hide();
	$.ajax({
		type: "post",
		url: network + "/Mattrio/MaintenanceCycleInterface/getMcForMikey",
		data: {
			"userid": userid,
			"mikey": mikey,
			"mileage": mileage,
			"time": time
		},
		dataType: "json",
		crossDomain: true == !(document.all),
		success: function(data) {
			$("#loading").hide();
			if(data.categorys.length == 0 || data.categorys == []) {
				$(".cyclenone").show();
				return false;
			}

			$(".cycle").show();
			$(".cyclecontent").html("");
			$.each(data.categorys, function(key, value) {
				var div = $("<div class='cyclediv'>");
				if(value.img == "") {
					var img = $("<img src='../../image/blank.jpg'>")
				} else {
					var img = $("<img src='http://mattrio-car-img.oss-cn-shanghai.aliyuncs.com/category/" + value.img + "'>");
				}

				var span1 = $("<span class='cyclespan'></span>").html(value.categoryname);
				if(value.oes.length == 0 || value.oes == []) {
					var span2 = $("<span class='cyalesapn2'></span>").html("暂无OE信息");
				} else {
					var span2 = $("<span class='cyalesapn2'></span>").html(value.oes[0].oe_numbers);
				}

				img.appendTo(div);
				span1.appendTo(div);
				span2.appendTo(div);
				div.appendTo(".cyclecontent");
			})
			if(data.maintenance_cost=="￥暂无价格"){
				$(".price span").html(data.maintenance_cost);
			}else{
				$(".price span").html(Number(data.maintenance_cost).toFixed(2));
			}
		},
		error: function(data) {
			// console.log(data);
		}
	})

	$.ajax({
		type: "post",
		url: network + "/Mattrio/MaintenanceCycleInterface/getMcTable",
		data: {
			"userid": userid,
			"mikey": mikey,
			"mileage": mileage
		},
		dataType: "json",
		cache: false,
		crossDomain: true == !(document.all),
		success: function(data) {
			if(data.recode == -3){
				alert(data.msg);
				window.location.href="javascript:history.back();"
			}
			if(data == [] || data.length == 0) {
				$(".contentnone").show();
				return false;
			};
			$(".handbook").show();
			$(".tr").html("");
			$(".tr0").html("");
			$(".tr1").html("");
			$(".tr2").html("");
			$(".tr3").html("");
			$(".tr4").html("");
			$(".tr5").html("");
			$(".tr6").html("");
			$(".tr7").html("");
			$(".tr8").html("");
			$(".tr9").html("");


			var minnum = [data[3952].length,data[1072].length,data[399].length,data[760].length,data[486].length,data[3954].length,data[1769].length,data[1208].length,data[3953].length,data[3955].length];
			var minnumber = Math.min.apply(null, minnum);

			$.each(data[3952],function(key,value){
				if(minnumber > key){
					var $td = $('<td></td>');
					var $td0 = $('<td></td>');
					$($td).html(value.mileages+"km").appendTo(".tr");
					if(value.replace_state == '换') {
						$('<span>').html('●').appendTo($td0);
					} else {
						$('<span>').html('--').appendTo($td0);
					}
					$td0.appendTo('.tr0');
				}
			})
			$.each(data[1072],function(key,value){
				if(minnumber > key){
					var $td4 = $('<td></td>');
					if(value.replace_state == '换') {
						$('<span>').html('●').appendTo($td4);
					} else {
						$('<span>').html('--').appendTo($td4);
					}
					$td4.appendTo('.tr1');
				}
			})
			$.each(data[399],function(key,value){
				if(minnumber > key){
					var $td1 = $('<td></td>');
					if(value.replace_state == '换') {
						$('<span>').html('●').appendTo($td1);
					} else {
						$('<span>').html('--').appendTo($td1);
					}
					$td1.appendTo('.tr2');
				}
			})
			$.each(data[760],function(key,value){
				if(minnumber > key){
					var $td2 = $('<td></td>');
					if(value.replace_state == '换') {
						$('<span>').html('●').appendTo($td2);
					} else {
						$('<span>').html('--').appendTo($td2);
					}
					$td2.appendTo('.tr3');
				}
				
			})
			$.each(data[486],function(key,value){
				if(minnumber > key){
					var $td3 = $('<td></td>');
					if(value.replace_state == '换') {
						$('<span>').html('●').appendTo($td3);
					} else {
						$('<span>').html('--').appendTo($td3);
					}
					$td3.appendTo('.tr4');
				}
				
			})
			
			$.each(data[3953],function(key,value){
				if(minnumber > key){
					var $td6 = $('<td></td>');
					if(value.replace_state == '换') {
						$('<span>').html('●').appendTo($td6);
					} else {
						$('<span>').html('--').appendTo($td6);
					}
					$td6.appendTo('.tr5');
				}
				
			})
			$.each(data[1769],function(key,value){
				if(minnumber > key){
					var $td7 = $('<td></td>');
					if(value.replace_state == '换') {
						$('<span>').html('●').appendTo($td7);
					} else {
						$('<span>').html('--').appendTo($td7);
					}
					$td7.appendTo('.tr6');
				}
			})
			$.each(data[1208],function(key,value){
				if(minnumber > key){
					var $td8 = $('<td></td>');
					if(value.replace_state == '换') {
						$('<span>').html('●').appendTo($td8);
					} else {
						$('<span>').html('--').appendTo($td8);
					}
					$td8.appendTo('.tr7');
				}
			})
			$.each(data[3953],function(key,value){
				if(minnumber > key){
					var $td9 = $('<td></td>');
					if(value.replace_state == '换') {
						$('<span>').html('●').appendTo($td9);
					} else {
						$('<span>').html('--').appendTo($td9);
					}
					$td9.appendTo('.tr8');
				}
			})
			$.each(data[3955],function(key,value){
				if(minnumber > key){
					var $td5 = $('<td></td>');
					if(value.replace_state == '换') {
						$('<span>').html('●').appendTo($td5);
					} else {
						$('<span>').html('--').appendTo($td5);
					}
					$td5.appendTo('.tr9');
				}
			})
			$(".tr td:first").css("color", "#b20822");
			$.each($(".handbookright td span"), function(key, value) {
				if($(this).html() == "换") {
					$(this).css({
						"color": "#E7161A",
						"font-size": "16px"
					})
				} else if($(this).html() == "--") {
					$(this).css({
						"color": "green",
						"font-size": "16px"
					})
				}
			})
		},
		error: function(data) {
			//console.log(data);
		}
	})
})

$(document).keydown(function(even) {
	if(event.keyCode == 13) {
		$(".contentbtn").click();
	}
})
/*$(document).on("click","td",function(){
	$(this).parents("tr").css("background","#eaeaea").siblings("tr").css("background","");
})*/