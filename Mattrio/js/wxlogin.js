if(localStorage){
	var network = localStorage.getItem("network");
}else{
	var network = $.cookie("network");
}

function GetQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if (r != null)
		return unescape(r[2]);
	return null;
}
if (GetQueryString("openid") != null) {
	var openid = GetQueryString("openid");
	jQuery.post(network + "/Mattrio/LoginInterface/wxlogin", {
		"openid" : openid
	}, function(data) {
		//存储localStorage
		$.cookie("username",data.user_name,{expires:7,path: "/"});
		$.cookie("user_id",data.user_id,{expires:7,path: "/"});
		$.cookie("phone",data.phone,{expires:7,path: "/"});
		$.cookie("frequency",data.frequency.day_frequency,{expires:7,path: "/"});
		$.cookie("loginmode","微信",{expires:7,path: "/"});

		_czc.push(["_trackEvent","微信登录",data.user_name+data.phone]);
		window.location.href="../index.html";
	});
}
