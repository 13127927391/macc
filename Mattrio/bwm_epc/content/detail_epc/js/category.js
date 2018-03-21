if(localStorage) {
	var network = localStorage.getItem("network");
} else {
	var network = $.cookie("network");;
}
var username = $.cookie("username");
var frequency = $.cookie("frequency");
var userid = $.cookie("user_id");
//获取通过url传的参数
function getUrlParam(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
	var r = window.location.search.substr(1).match(reg); //匹配目标参数
	if(r != null) return decodeURI(r[2]);
	return null; //返回参数值
}
var vin = getUrlParam('?vin');
var fgstnr_mospid = getUrlParam('?fgstnr_mospid');
var year = getUrlParam('?year');

var categorys;
var category1 = new Array();
$("#loading").show();
$(function() {
	if(vin.length + fgstnr_mospid.length == 0) {
		alert('暂无数据!');
		window.location.href = 'javascript:history.back();'
	}
	$.ajax({
		type: "post",
		url: network + "/Mattrio/BwmEpcInterface/getBwmEpcCategorys",
		data: {
			"vin": vin,
			"fgstnr_mospid": fgstnr_mospid,
			"userid": userid
		},
		dataType: "json",
		cache: false,
		crossDomain: true == !(document.all),
		success: function(data) {
			var carid = data.car_id;
			$("#loading").hide();
			$.ajax({
				type: "post",
				url: network + "/Mattrio/BwmEpcInterface/getBwmEpcCarType",
				data: {
					"userid": userid,
					"year":Number(year),
					"car_id":carid
				},
				dataType: "json",
				cache: false,
				crossDomain: true == !(document.all),
				success:function(data){
					$(".contname").html(data.CarType[0].Manufacture_CN+" "+data.CarType[0].Vehicle_Name_CN+" "+data.CarType[0].Year_of_production);
				}
			})

			if(data.recode == 0) {
				categorys = data;

				for(var i = 0; i < categorys.categorys.length; i++) {
					var find = 0;
					for(var j = 0; j < category1.length; j++) {
						if(categorys.categorys[i].category_id1 == category1[j].category_id1) {
							find = 1;
						}
					}
					if(find == 0) {
						category1.push(categorys.categorys[i]);
					}
				}
				initCategory(category1);
			} else {
				alert('当天次数已用完!');
				window.location.href = '../../../index.html';
			}
		}
	});
})

function getCategory3(category_id1) {
	$("#search").val("");
	var category3 = new Array();
	for(var i = 0; i < categorys.categorys.length; i++) {
		if(categorys.categorys[i].category_id1 == category_id1) {
			var find = 0;
			for(var j = 0; j < category3.length; j++) {
				if(categorys.categorys[i].category_id3 == category3[j].category_id3) {
					find = 1;
				}
			}
			if(find == 0) {
				category3.push(categorys.categorys[i]);
			}
		}
	}
	initCategory3(category3);
}

function findCategoryName(category_name) {
	$("#search").val("");
	var category3 = new Array();
	if('' != category_name) {
		for(var i = 0; i < categorys.categorys.length; i++) {
			if(categorys.categorys[i].category_name3.indexOf(category_name) >= 0) {
				category3.push(categorys.categorys[i]);
			}
		}
		initCategory3(category3);
	} else {
		back();
	}
}

function back() {
	var query = document.getElementById('query');
	query.value = '';
	initCategory(category1);
};

function initCategory(category) {
	$('#groups').html('');
	$(".row").html("");
	for(var i = 0; i < category.length; i++) {
		$('#groups').append('<tr title="'+category[i].category_id1+' '+category[i].category_name1+'" class="contentp"><td onclick="getCategory3(' + category[i].category_id1 + ')">' + category[i].category_id1 + ' ' + category[i].category_name1 + '</td></tr>');
	}
	var str = [{
		"categoryid1": "01",
		"categoryname": "技术文献",
		"categoryimg": "../../image/B0029021.jpg"
	}, {
		"categoryid1": "02",
		"categoryname": "保养和维修范围",
		"categoryimg": "../../image/B0061536.jpg"
	}, {
		"categoryid1": "03",
		"categoryname": "附件加装、改装",
		"categoryimg": "../../image/B0067101.jpg"
	}, {
		"categoryid1": "11",
		"categoryname": "发动机",
		"categoryimg": "../../image/B0036279.jpg"
	}, {
		"categoryid1": "12",
		"categoryname": "发动机电气系统",
		"categoryimg": "../../image/B0028836.jpg"
	}, {
		"categoryid1": "13",
		"categoryname": "混合气制备和调节装置",
		"categoryimg": "../../image/B0036284.jpg"
	}, {
		"categoryid1": "16",
		"categoryname": "燃油供应",
		"categoryimg": "../../image/B0028837.jpg"
	}, {
		"categoryid1": "17",
		"categoryname": "冷却装置",
		"categoryimg": "../../image/B0036268.jpg"
	}, {
		"categoryid1": "18",
		"categoryname": "排气装置",
		"categoryimg": "../../image/B0028838.jpg"
	}, {
		"categoryid1": "21",
		"categoryname": "离合器",
		"categoryimg": "../../image/B0036595.jpg"
	}, {
		"categoryid1": "22",
		"categoryname": "发动机和变速箱悬挂装置",
		"categoryimg": "../../image/B0028839.jpg"
	}, {
		"categoryid1": "23",
		"categoryname": "手动变速箱",
		"categoryimg": "../../image/B0036269.jpg"
	}, {
		"categoryid1": "24",
		"categoryname": "自动变速箱",
		"categoryimg": "../../image/B0028840.jpg"
	}, {
		"categoryid1": "25",
		"categoryname": "换档机构",
		"categoryimg": "../../image/B0036270.jpg"
	}, {
		"categoryid1": "26",
		"categoryname": "传动轴",
		"categoryimg": "../../image/B0028841.jpg"
	}, {
		"categoryid1": "28",
		"categoryname": "双离合器变速箱",
		"categoryimg": "../../image/B0044230.jpg"
	}, {
		"categoryid1": "31",
		"categoryname": "前桥",
		"categoryimg": "../../image/B0028842.jpg"
	}, {
		"categoryid1": "32",
		"categoryname": "转向系和车桥测量",
		"categoryimg": "../../image/B0036272.jpg"
	}, {
		"categoryid1": "33",
		"categoryname": "后桥",
		"categoryimg": "../../image/B0028843.jpg"
	}, {
		"categoryid1": "34",
		"categoryname": "制动",
		"categoryimg": "../../image/B0036596.jpg"
	}, {
		"categoryid1": "35",
		"categoryname": "踏板装置",
		"categoryimg": "../../image/B0028844.jpg"
	}, {
		"categoryid1": "36",
		"categoryname": "车轮及轮胎",
		"categoryimg": "../../image/B0036285.jpg"
	}, {
		"categoryid1": "41",
		"categoryname": "毛坯车身",
		"categoryimg": "../../image/B0028845.jpg"
	}, {
		"categoryid1": "51",
		"categoryname": "车身装备",
		"categoryimg": "../../image/B0036273.jpg"
	}, {
		"categoryid1": "52",
		"categoryname": "座椅",
		"categoryimg": "../../image/B0028846.jpg"
	}, {
		"categoryid1": "54",
		"categoryname": "活动天窗和折叠式软顶",
		"categoryimg": "../../image/B0036274.jpg"
	}, {
		"categoryid1": "61",
		"categoryname": "一般车辆电气系统",
		"categoryimg": "../../image/B0028847.jpg"
	}, {
		"categoryid1": "62",
		"categoryname": "仪表",
		"categoryimg": "../../image/B0036275.jpg"
	}, {
		"categoryid1": "63",
		"categoryname": "车灯",
		"categoryimg": "../../image/B0028848.jpg"
	}, {
		"categoryid1": "64",
		"categoryname": "冷暖空调",
		"categoryimg": "../../image/B0036536.jpg"
	}, {
		"categoryid1": "65",
		"categoryname": "音频、导航、信息系统",
		"categoryimg": "../../image/B0028849.jpg"
	}, {
		"categoryid1": "66",
		"categoryname": "车距控制系统，定速控制系统",
		"categoryimg": "../../image/B0036558.jpg"
	}, {
		"categoryid1": "71",
		"categoryname": "(发动机和底盘)零件和附件(发动机和底盘)",
		"categoryimg": "../../image/B0028850.jpg"
	}, {
		"categoryid1": "72",
		"categoryname": "(车身)零件和附件(车身)",
		"categoryimg": "../../image/B0036276.jpg"
	}, {
		"categoryid1": "83",
		"categoryname": "辅料和消耗材料、颜色系统",
		"categoryimg": "../../image/B0064586.jpg"
	}, {
		"categoryid1": "84",
		"categoryname": "通信系统",
		"categoryimg": "../../image/B0036278.jpg"
	}, {
		"categoryid1": "85",
		"categoryname": "完整车轮、轮辋和轮胎",
		"categoryimg": "../../image/B0064715.jpg"
	}, {
		"categoryid1": "88",
		"categoryname": "保养检查组件",
		"categoryimg": "../../image/B0060614.jpg"
	}, {
		"categoryid1": "91",
		"categoryname": "个性化装备",
		"categoryimg": "../../image/B0028835.jpg"
	}];
	$.each(str, function(key, value) {
		var find = 0
		for(var i = 0; i < categorys.categorys.length; i++) {
			if(categorys.categorys[i].category_id1 == value.categoryid1) {
				find = 1;
			}
		}
		if(find == 1) {
			var div1 = $("<div class='col-sm-4 col-md-3 contentf'>");
			div1.html("<div class='thumbnail' title='" + value.categoryname + "'>" + "<img src='" + value.categoryimg + "'><p>" + value.categoryname + "</p></div>");
			div1.click(
				function() {
					getCategory3(value.categoryid1);
				}
			);
			div1.appendTo(".row");
		}
	})
}

function initCategory3(category) {
	$('#groups').html('');
	$(".row").html("");

	for(var i = 0; i < category.length; i++) {
		$('#groups').append('<tr><td title="'+category[i].category_id3 + ' ' + category[i].category_name3+'" onclick="addRightCategory(\'' + category[i].category_id3 + '\')">' + category[i].category_id3 + ' ' + category[i].category_name3 + '</td></tr>');
		var div1 = $("<div class='col-sm-4 col-md-3 contentname' >");
		div1.html("<a target='_blank' class='epc_a'><div id='category3" + category[i].category_id3 + "' class='thumbnail' title='" + category[i].category_id3 + " " + category[i].category_name3 + "'>" + "<img style='background:url(\"http://www.51macc.com/image/loading.gif\") no-repeat center 50%;' src='http://bwm-epc.oss-cn-shanghai.aliyuncs.com/epc_img/" + category[i].bildtaf_grafikid + ".jpg?x-oss-process=style/min_img'><p>" + category[i].category_id3 + " " + category[i].category_name3 + "</p></div></a>");
		div1.appendTo(".row");
		$("#category3" + category[i].category_id3).click(function() {
			if(sessionStorage) {
				sessionStorage.cont = JSON.stringify(category);
				sessionStorage.setItem("clicknum",$(this).parents("a").parents("div").index());
			} else {
				$.JSONCookie("cont", category, {path: '/'});
				$.cookie("clicknum", $(this).parents("a").parents("div").index(), {path: "/"});
			}
			for(var i = 0; i < categorys.categorys.length; i++) {
				if(categorys.categorys[i].category_id3 == $(this).eq(0).attr('id').substring(9)) {
					category3 = categorys.categorys[i];
					var categoryid1 = category3.category_id1;
					var categoryid2 = category3.category_id2;
					var bildtaf_btnr = category3.category_id3;
					var img = "http://bwm-epc.oss-cn-shanghai.aliyuncs.com/epc_img/" + category3.bildtaf_grafikid + ".jpg";
					$(this).parents("a").attr("href","../contentepc/contentepc.html?a=" + categorys.car_id + "&b=" + categoryid1 + "&c=" + categoryid2 + "&d=&e=&f=" + bildtaf_btnr + "&g=" + img + "&oe="+$('#search').val()+"&h=" + category3.category_name1+ "&i=" +category3.category_name2);
				}
			}
		});
	}
}

function addRightCategory(category_id3) {
	$(".row").html("");
	var category3;
	for(var i = 0; i < categorys.categorys.length; i++) {
		if(categorys.categorys[i].category_id3 == category_id3) {
			category3 = categorys.categorys[i];
			var div1 = $("<div class='col-sm-4 col-md-3 contentname'>");
			div1.html("<a target='_blank' class='epc_a'><div class='thumbnail' title='" + categorys.categorys[i].category_id3 + " " + categorys.categorys[i].category_name3 + "'>" + "<img src='http://bwm-epc.oss-cn-shanghai.aliyuncs.com/epc_img/" + categorys.categorys[i].bildtaf_grafikid + ".jpg?x-oss-process=style/min_img'><p>" + categorys.categorys[i].category_id3 + " " + categorys.categorys[i].category_name3 + "</p></div></a>");
			div1.appendTo(".row");
			$(".epc_a").click(function() {
				var categoryid1 = category3.category_id1;
				var categoryid2 = category3.category_id2;
				var bildtaf_btnr = category3.category_id3;
				var img = "http://bwm-epc.oss-cn-shanghai.aliyuncs.com/epc_img/" + category3.bildtaf_grafikid + ".jpg";
				$(this).attr("href", "../contentepc/contentepc.html?a=" + categorys.car_id + "&b=" + categoryid1 + "&c=" + categoryid2 + "&d=&e=&f=" + bildtaf_btnr + "&g=" + img + "&oe="+$('#search').val()+ "&h=" + category3.category_name1+ "&i=" +category3.category_name2);
			});
		}
	}
}

function searchoe() {
	var search = $('#search').val();
	console.log(search)
	if(search.length > 0) {
		$.ajax({
			type: "post",
			url: network + "/Mattrio/BwmEpcInterface/queryBwmEpcOenumber",
			data: {
				"fgstnr_mospid": fgstnr_mospid,
				"oenumber": search,
				"fztyp_einsatz": "",
				"fgstnr_prod": ""
			},
			dataType: "json",
			cache: false,
			crossDomain: true == !(document.all),
			success: function(data) {
				var category3 = new Array();
				for(var i = 0; i < categorys.categorys.length; i++) {
					for(var j = 0; j < data.list.length; j++) {
						if(categorys.categorys[i].category_id3 == data.list[j].category_id2) {
							category3.push(categorys.categorys[i]);
						}
					}
				}
				initCategory3(category3);
			}
		});
	}
}