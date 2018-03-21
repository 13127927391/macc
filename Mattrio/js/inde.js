if (localStorage) {
    var network = localStorage.getItem("network");
} else {
    var network = $.cookie("network");
}

$(".img_left").css("top", -$(".img_left").height() + "px");
setTimeout(runImg, 1000);

function runImg() {
    $(".img_left").animate({ "top": "0px" }, 500);
    $(".img_right").animate({ "right": "10px" }, 500);
}

function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg); //匹配目标参数
    if (r != null) return decodeURI(r[2]);
    return null; //返回参数值
}
var loginid = getUrlParam('?loginid');
var mikey = getUrlParam('?mikey');
if(mikey){
    $(".contentcxmikey").addClass("active").siblings("p").removeClass("active");
    $(".cont_vin").hide();
    $(".contentyear").hide();
    $(".contentmikey").show();
    $(".contentgz").hide();
    $(".contentoe").hide();
    $(".contentsh").hide();
    $(".contentmikey input").val(mikey);
}
if (loginid) {
    if (localStorage) {
        localStorage.setItem("network", "http://www.51macc.com:8080");
        var network = localStorage.getItem("network");
    } else {
        $.cookie("network", "http://www.51macc.com:8080", { path: "/" });
        var network = $.cookie("network");
    }
    $.ajax({
        type: "post",
        url: network + "/Mattrio/LoginInterface/AuthorizedLogin",
        data: {
            "loginid": loginid
        },
        dataType: "json",
        cache: false,
        async: false,
        crossDomain: true == !(document.all),
        success: function(data) {
            if (data.recode == -3) {
                alert(data.msg);
                window.location.href = "./index.html";
                return false;
            }
            $.cookie("username", data.user_name, { expires: 7, path: "/" });
            $.cookie("frequency", data.frequency.frequency, { expires: 7, path: "/" });
            $.cookie("user_id", data.user_id, { expires: 7, path: "/" });
            $.cookie("phone", data.phone, { expires: 7, path: "/" });
            $.cookie("loginmode", "第三方", { expires: 7, path: "/" });
        }
    })
}


var userid = $.cookie("user_id");
var name = $.cookie("username");
var frequency = $.cookie("frequency");
var phone = $.cookie("phone");

if($.cookie("loginmode") == undefined){
    var loginmode = "" ;
}else{
    var loginmode = $.cookie("loginmode");
}

$("#loading").hide();
$(".image_epc").click(function() {
    $(".cont_detalis").toggleClass("cont_active");
    $(".cont_epc").toggleClass("cont_active");
})
$(".contentcxyear").click(function() {
    $(this).addClass("active").siblings("p").removeClass("active");
    $(".contentyear").show();
    $(".cont_vin").hide();
    $(".contentmikey").hide();
    $(".contentgz").hide();
    $(".contentoe").hide();
    $(".contentsh").hide();
})
$(".contentcxvin").click(function() {
    $(this).addClass("active").siblings("p").removeClass("active");
    $(".cont_vin").show();
    $(".contentyear").hide();
    $(".contentmikey").hide();
    $(".contentgz").hide();
    $(".contentoe").hide();
    $(".contentsh").hide();
});
$(".contentcxmikey").click(function() {
    $(this).addClass("active").siblings("p").removeClass("active");
    $(".cont_vin").hide();
    $(".contentyear").hide();
    $(".contentmikey").show();
    $(".contentgz").hide();
    $(".contentoe").hide();
    $(".contentsh").hide();
});


$(".contentcxgz").click(function() {
    $(this).addClass("active").siblings("p").removeClass("active");
    $(".cont_vin").hide();
    $(".contentyear").hide();
    $(".contentmikey").hide();
    $(".contentgz").show();
    $(".contentoe").hide();
    $(".contentsh").hide();
});

$(".contentcxoe").click(function() {
    $(this).addClass("active").siblings("p").removeClass("active");
    $(".cont_vin").hide();
    $(".contentyear").hide();
    $(".contentmikey").hide();
    $(".contentgz").hide();
    $(".contentoe").show();
    $(".contentsh").hide();
});
$(".contentcxsh").click(function() {
    $(this).addClass("active").siblings("p").removeClass("active");
    $(".cont_vin").hide();
    $(".contentyear").hide();
    $(".contentmikey").hide();
    $(".contentgz").hide();
    $(".contentoe").hide();
    $(".contentsh").show();
})

if (name == undefined || name == "undefined" || name == "null" || name == null) {
    //没有登录
    $(".navright").show();
    $(".navright1").hide();
    $("#s1,#btn,.btnyear,.mikeybtn,.gzhbtn,.oebtn,.shcxbtn").click(function() {
        if (confirm("是否登录") == true) {
            window.location.href = "./login/login.html";
        }
    });
} else if (phone == undefined || phone == "undefined" || phone == "null" || phone == null || phone == "") {
    if (confirm("您还没有绑定手机号码，需要绑定手机号码后才能查询")) {
        $(".b_phone").fadeIn();
        $(".bingtit span").click(function() {
            $(".b_phone").fadeOut();
        });
    }
} else {
    //有
    $(".navright").hide();
    $(".navright1").show();
    $(".navrighttel").html(name);
    $(".navcenter").html(frequency);
    // ==============按年份查询
    $("#loading").show();
    $.ajax({
        type: "post",
        url: network + "/Mattrio/SelectCar/Manufacture",
        data: {
            "year": "",
            "userid": userid
        },
        dataType: "json",
        cache: false,
        crossDomain: true == !(document.all),
        success: function(data) {
            $("#loading").hide();
            commoncitys.splice(0, commoncitys.length);
            citys.splice(0, citys.length);
            for (var i = 0; i < data.all.length; i++) {
                commoncitys[i] = data.all[i];
            }
            for (var i = 0; i < data.all.length; i++) {
                citys[i] = data.all[i];
            }
        },
        error: function(data) {

        }
    })
    $("#s1").click(function() {
        fn1();
        $(".conts1").toggle().html("");
        $(".conts3").hide();
        $(".conts4").hide();
        if ($("#arrcity").val() == "") {
            var str = ['2017', '2016', '2015', '2014', '2013', '2012', '2011', '2010', '2009', '2008', '2007', '2006', '2005', '2004', '2003', '2002', '2001', '2000', '1999', '1998', '1997', '1996', '1995', '1994', '1993', '1992', '1991', '1990', '1989', '1988', '1987', '1986', '1985'];
            $.each(str, function(key, value) {
                $("<p>").html(value).appendTo($(".conts1"));
            })
        } else {
            if ($("#s3").html() == "请选择车型") {
                var VehicleName = "";
            } else {
                var VehicleName = $("#s3").html();
            }
            if ($("#s4").html() == "请选择销售名称") {
                var Nameofsales = "";
            } else {
                var Nameofsales = $("#s4").html();
            }
            $("#loading").show();
            $.ajax({
                type: "post",
                url: network + "/Mattrio/SelectCar/Years",
                data: {
                    "Manufacture": $("#arrcity").val(),
                    "VehicleName": VehicleName,
                    "Nameofsales": Nameofsales,
                    "userid": userid
                },
                dataType: "json",
                cache: false,
                crossDomain: true == !(document.all),
                success: function(data) {
                    $("#loading").hide();
                    $.each(data, function(key, value) {
                        $("<p>").html(value.year).appendTo($(".conts1"));
                    })
                }
            })
        }
    })

    $(document).on("click", ".conts1 p", function() {
        fn1();
        $("#loading").show();
        $(".conts1").hide();
        $("#s1").html($(this).html());
        $("#s1").css("color", "#000");
        if ($("#s1").html() == "选择年份") {
            var year = "";
        } else {
            var year = $("#s1").html();
        }
        $.ajax({
            type: "post",
            url: network + "/Mattrio/SelectCar/Manufacture",
            data: {
                "year": year,
                "userid": userid
            },
            dataType: "json",
            cache: false,
            crossDomain: true == !(document.all),
            success: function(data) {
                $("#loading").hide();
                commoncitys.splice(0, commoncitys.length);
                citys.splice(0, citys.length);
                for (var i = 0; i < data.all.length; i++) {
                    commoncitys[i] = data.all[i];
                }
                for (var i = 0; i < data.all.length; i++) {
                    citys[i] = data.all[i];
                }
            },
            error: function(data) {

            }
        })
    });

    $("#box").click(function() {
        $(".conts1").hide();
        $(".conts3").hide();
        $(".conts4").hide();
        $("#s3").html("请选择车型");
        $("#s3").css("color", "#999");
        $("#s4").html("请选择销售名称");
        $("#s4").css("color", "#999");
    })
    $("#s3").click(function() {
        fn1();
        $("#loading").show();
        $(".conts3").toggle().html("");
        $(".conts4").hide();
        $(".conts1").hide();
        if ($("#s1").html() == "选择年份") {
            var year = "";
        } else {
            var year = $("#s1").html();
        }
        if ($("#arrcity").val() == "") {
            alert("请选择主机厂");
            $("#loading").hide();
            return false;
        }
        $.ajax({
            type: "post",
            url: network + "/Mattrio/SelectCar/VehicleName",
            data: {
                "year": year,
                "Manufacture": encodeURI($("#arrcity").val()),
                "userid": userid
            },
            dataType: "json",
            cache: false,
            crossDomain: true == !(document.all),
            success: function(data) {
                $("#loading").hide();
                $.each(data, function(key, value) {
                    $("<p>").html(value.Vehicle_Name_CN).appendTo($(".conts3"));
                })
            },
            error: function(data) {
                //console.log(data);
            }
        })
    });

    $(document).on("click", ".conts3 p", function() {
        $("#s3").html($(this).html());
        $(".conts3").hide();
        $("#s4").show();
        $(".conts4").hide();
        $("#s4").show().html("请选择销售名称");
        $("#s3").css("color", "#000");
        $("#s4").css("color", "#999");
    })
    $("#s4").click(function() {
        fn1();
        $("#loading").show();
        if ($("#s1").html() == "选择年份") {
            var year = "";
        } else {
            var year = $("#s1").html();
        }
        $.ajax({
            type: "post",
            url: network + "/Mattrio/SelectCar/Nameofsales",
            data: {
                "year": year,
                "Manufacture": encodeURI($("#arrcity").val()),
                "VehicleName": $("#s3").html(),
                "userid": userid
            },
            dataType: "json",
            cache: false,
            crossDomain: true == !(document.all),
            success: function(data) {
                $("#loading").hide();
                if (data == null || data.length == 0) {
                    // $("#s4").hide();
                } else {
                    $("#s4").show();
                    $(".conts4").toggle().html("");
                    $.each(data, function(key, value) {
                        $("<p>").html(value.Name_of_sales).appendTo($(".conts4"));
                    })
                    $(".conts4 p").click(function() {
                        $(".conts4").hide();
                        $("#s4").html($(this).html());
                        $("#s4").css("color", "#000");
                        if ($("#s1").html() == "选择年份") {
                            $("#s1").click();
                        }
                    })
                }
            },
            error: function(data) {
                //console.log(data);
            }
        })
    });

    $(".btnyear").click(function() {
        var userid = $.cookie("user_id");
        fn1();
        if ($("#s1").html() == "选择年份") {
            $("#loading").hide();
            alert("请选择年份");
            return false;
        }
        if ($("#s3").html() == "请选择车型") {
            $("#loading").hide();
            alert("请选择车型");
            return false;
        }
        if ($("#s4").html() == "请选择销售名称") {
            $("#loading").hide();
            alert("请选择销售名称");
            return false;
        }
        if (sessionStorage) {
            sessionStorage.setItem("searc", "");
        } else {
            $.cookie("searc", null, { path: "/" });
        }

        $("#loading").show();
        $.ajax({
            type: "post",
            url: network + "/Mattrio/SelectCar/QueryCar",
            cache: false,
            data: {
                "year": $("#s1").html(),
                "Manufacture": encodeURI($("#arrcity").val()),
                "VehicleName": $("#s3").html(),
                "Nameofsales": $("#s4").html(),
                "userid": userid
            },
            dataType: "json",
            cache: false,
            crossDomain: true == !(document.all),
            success: function(data) {
                $("#loading").hide();
                _czc.push(["_trackEvent", "在首页四步查询",name + phone + loginmode, 0, "btnyear"]);
                $.cookie("frequency", data.frequency, { expires: 7, path: '/' });
                fn(data);
            },
            error: function(data) {}
        })

    });
    //vin查询
    $("#btn").click(function() {
        var userid = $.cookie("user_id");
        fn1();
        if (!jQuery("#search").val()) {
            alert("输入的内容不能是空");
            return false;
        }
        var vin = $.trim($("#search").val());
        var reg = /^\w{17}$/;
        if (vin.match(reg) == null) {
            alert("请填写正确的VIN码");
            return false;
        }
        var search = $.trim($("#search").val().toUpperCase());
        if (sessionStorage) {
            var searc = sessionStorage.setItem("searc", search);
        } else {
            var searc = $.cookie("searc", search);
        }

        $("#loading").show();
        $.ajax({
            type: "post",
            url: network + "/Mattrio/VinInterface/queryvin",
            data: {
                "userid": userid,
                "vin": search
            },
            dataType: "json",
            cache: false,
            crossDomain: true == !(document.all),
            success: function(data) {
                $("#loading").hide();
                if (sessionStorage) {
                    addDataList('vinlist', search);
                }
                $.cookie("frequency", data.frequency, { expires: 7, path: '/' });
                 _czc.push(["_trackEvent","在首页查询VIN", name + phone + loginmode , 0, "vinbtn"]);
                fn(data);
            },
            error: function(data) {

            }
        })
    })
    function fn(data){
        var data = data;
        if (data.recode == -3) {
            $("#loading").hide();
            alert(data.msg);
            return false;
        }
        if (data.recode == -999) {
            alert(data.msg);
            $.cookie("username", null, { path: '/' });
            window.location.href = "./login/login.html";
            return false;
        }
        if (data.recode == -5) {
            $("#loading").hide();
            alert("格式不正确");
            return false;
        } else {
            $("#loading").hide();
            //判断是去哪个页面
            if (data.list.length == 0) {
                alert("暂无数据");
                return false
            } else if (data.list.length > 1) {
                if (sessionStorage) {
                    sessionStorage.key1 = JSON.stringify(data);
                } else {
                    $.JSONCookie("key1", data, { path: '/' });
                }
                window.location.href = "./content/particulars/particulars_select.html";
                return false;
            } else {
                if (sessionStorage) {
                    sessionStorage.keyname = JSON.stringify(data.list[0]);
                } else {
                    $.JSONCookie("keyname", data.list[0], { path: '/' });
                }
                window.location.href = "./content/particulars/particulars.html";
            }
        }
    }
    
    //mikey查询
    $(".mikeybtn").click(function() {
        var userid = $.cookie("user_id");
        fn1();
        if (!$(".contentmikey input").val()) {
            alert("输入的内容不能是空");
            return false;
        }
        if (sessionStorage) {
            sessionStorage.setItem("searc", "");
        } else {
            $.cookie("searc", null, { path: "/" });
        }
        $("#loading").show();
        $.ajax({
            type: "post",
            url: network + "/Mattrio/CarInterface/query_mikey",
            data: {
                "mikey": $.trim($(".contentmikey input").val().toUpperCase()),
                "userid": userid
            },
            dataType: "json",
            cache: false,
            crossDomain: true == !(document.all),
            success: function(data) {
                $("#loading").hide();
                fn1(data);
                _czc.push(["_trackEvent","查询mikey", name + phone + loginmode ,  0, "mikeybtn"]);
                if (sessionStorage) {
                    addDataList('mikeylist', $.trim($(".contentmikey input").val()));
                }
                $.cookie("frequency", data.frequency, { expires: 7, path: '/' });
                fn(data);
            },
            error: function(data) {
                //console.log(data);
            }
        })
    })

    //oe查询
    $(".oebtn").click(function() {
        fn1();
        if (!$(".contentoe input").val()) {
            alert("输入的内容不能是空");
            return false;
        }
        _czc.push(["_trackEvent", "在首页查询oe",name + phone + loginmode , 0, "oebtn"]);
        window.open("./content/maintain/oecont/oecont.html?oenumber=" + $.trim($(".contentoe input").val()));
        addDataList('oelist', $.trim($(".contentoe input").val()));
    })

    //售后查询
    $(".shcxbtn").click(function() {
        fn1();
        if (!$(".contentsh input").val()) {
            alert("输入的内容不能是空");
            return false;
        }
        _czc.push(["_trackEvent", "查询售后",name+phone + loginmode , 0, "shcxbtn"]);
        window.location.href = "./content/aftermarket/aftermarket.html?product_id=" + $.trim($(".contentsh input").val());
        addDataList('productlist', $(".contentsh input").val());
    })

    //退出登录
    $(".tuichu").click(function() {
        $.cookie("username", null, { path: '/' });
        window.location.href = "javascript:history.go(0);";
    })
}

function addDataList(key, value) {
    var list = localStorage.getItem(key);
    if (list == null) {
        list = "";
        list += value + ',';
        localStorage.setItem(key, list);
    } else {
        if (list.indexOf(value) == -1) {
            list += value + ',';
            localStorage.setItem(key, list);
        }
    }
}
function fn1(){
    if (userid == undefined || userid == "undefined" || userid ==null || userid == "null") {
        $.cookie("username", null, { path: '/' });
        window.location.href = "./login/login.html";
        return false;
    }
}

// 新改页面
$(".images_top_left").click(function(){
    $(".images_bottom").slideToggle();
    $(".cont_epc").removeClass("cont_active");
    $(".cont_detalis").addClass("cont_active");
})
$(".images_top_right").click(function(){
    $(".images_bottom").slideUp();
     $(".cont_detalis").removeClass("cont_active");
    $(".cont_epc").addClass("cont_active");
})
$(".images .images_bottom_car img").mouseover(function(){
    $(this).stop().animate({width:"56px","margin-top":"-3px","margin-left":"-3px"},100)
}).mouseout(function(){
    $(this).stop().animate({width:"46px","margin-top":"2px","margin-left":"0px"},100)
})
$(".images .images_top img").mouseover(function(){
    $(this).stop().animate({width:"145px"},100)
}).mouseout(function(){
    $(this).stop().animate({width:"130px"},100)
})
$(".images_bottom_car p img").click(function(){
    $(".cont_detalis").addClass("cont_active");
    $(".cont_epc").removeClass("cont_active");
    if($(this).context.title == "宝马"){
        $(".cont_epcinp span").html("<img src='./image/baoma.jpg'>宝马");
    }else if($(this).context.title == "奔驰"){
        $(".cont_epcinp span").html("<img src='./image/benchi.jpg'>奔驰");
    }else if($(this).context.title == "本田"){
        $(".cont_epcinp span").html("<img src='./image/bentian.jpg'>本田");
    }else if($(this).context.title == "现代"){
        $(".cont_epcinp span").html("<img src='./image/xiandai.jpg'>现代");
    }else if($(this).context.title == "日产"){
        $(".cont_epcinp span").html("<img src='./image/richan.jpg'>日产");
    }else if($(this).context.title == "荣威"){
        $(".cont_epcinp span").html("<img src='./image/rongwei.jpg'>荣威");
    }else if($(this).context.title == "英菲尼迪"){
        $(".cont_epcinp span").html("<img src='./image/yingfeinidi.jpg'>英菲尼迪");
    }else if($(this).context.title == "讴歌"){
        $(".cont_epcinp span").html("<img src='./image/ouge.jpg'>讴歌");
    }else if($(this).context.title == "MINI"){
        $(".cont_epcinp span").html("<img src='./image/MINI.jpg'>MINI");
    }else if($(this).context.title == "SMART"){
        $(".cont_epcinp span").html("<img src='./image/smart.jpg'>SMART");
    }else if($(this).context.title == "名爵"){
        $(".cont_epcinp span").html("<img src='./image/MG.jpg'>名爵");
    }
})
$(".images_allcar_close").click(function(){
    $(".images_all").fadeOut();
    $("body,html").animate({scrollTop:0},0);
})
$(".images_top_right").click(function(){
    $(".images_all").fadeIn();
})

var carlogo = {"aerfaluomiou.jpg":"阿尔法·罗密欧","aodi.jpg":"奥迪","asidun·mading.jpg":"阿斯顿·马丁(进口)","babosi.jpg":"巴博斯(进口)","baojun.jpg":"宝骏(上汽通用五菱)","baolong.jpg":"宝龙","baoma.jpg":"宝马","baoshijie.jpg":"保时捷(进口)","baowo.jpg":"宝沃","beijing.jpg":"北京汽车","beiqihuansu.jpg":"北汽幻速","beiqiweiwang.jpg":"北汽威旺","beiqizhizao.jpg":"北汽制造","benchi.jpg":"奔驰","benteng.jpg":"奔腾(一汽)","bentian.jpg":"本田","biaozhi.jpg":"标致","bieke.jpg":"别克","binli.jpg":"宾利(进口)","bisu.jpg":"比速汽车","biyadi.jpg":"比亚迪","changhe.jpg":"昌河","chenggong.jpg":"成功汽车","dadi.jpg":"大迪","daoqi.jpg":"道奇(进口)","dayu.jpg":"大宇汽车","dazhong.jpg":"大众","dongfeng.jpg":"东风","dongnan.jpg":"东南(东南汽车)","DS.jpg":"DS(长安标致雪铁龙)","falali.jpg":"法拉利(进口)","feiyate.jpg":"菲亚特","fengtian.jpg":"丰田","fudi.jpg":"福迪汽车","fuqi.jpg":"富奇","fuqiqiteng.jpg":"福汽启腾","fute.jpg":"福特","futian.jpg":"福田","gmc.jpg":"GMC","guanggang.jpg":"光冈汽车","guangqichuanqi.jpg":"广州汽车","guangqijiao.jpg":"吉奥","guanzhiqiche.jpg":"观致","hafei.jpg":"哈飞","hafu.jpg":"哈弗(长城)","haige.jpg":"大金龙","haima.jpg":"海马","hanma.jpg":"悍马(进口)","hanma.jpg":"悍马(进口)","hanteng.jpg":"汉腾汽车","heibao.jpg":"黑豹","hengtianqiche.jpg":"恒天汽车","hongqi.jpg":"红旗(一汽)","huabei.jpg":"中客华北","huanghai.jpg":"黄海","huapu.jpg":"华普","huasong.jpg":"华颂汽车","huatai.jpg":"华泰","huayang.jpg":"华阳","huizhong.jpg":"上海汇众","Jeep.jpg":"吉普","jianghuai.jpg":"安驰","jianghuai.jpg":"江淮","jiangling.jpg":"江铃","jiangnan.jpg":"江南","jiebao.jpg":"捷豹(进口)","jiebao.jpg":"路虎(奇瑞)","jiliqiche.jpg":"全球鹰(吉利)","jiliqiche.jpg":"吉利","jiliqiche.jpg":"帝豪(吉利)","jiliqiche.jpg":"英伦(吉利)","jinbei.jpg":"金杯(华晨金杯)","jincheng.jpg":"金程汽车","jiulong.jpg":"九龙汽车","kaersen.jpg":"卡尔森汽车","kaidilake.jpg":"凯迪拉克","kairui.jpg":"开瑞(奇瑞)","kaiyi.jpg":"凯翼汽车","kawei.jpg":"卡威汽车","kelaisile.jpg":"克莱斯勒","kenisaike.jpg":"科尼赛克","lanbojini.jpg":"兰博基尼(进口)","laosilaisi.jpg":"劳斯莱斯(进口)","leikesasi.jpg":"雷克萨斯(进口)","leinuo.jpg":"雷诺","lianhua.jpg":"莲花汽车","liebaoqiche.jpg":"扬子","liebaoqiche.jpg":"猎豹(长丰猎豹)","lifan.jpg":"力帆","lingmu.jpg":"铃木","linken.jpg":"林肯(进口)","lufeng.jpg":"陆风(江铃)","luhu.jpg":"路虎(进口)","lutesi.jpg":"莲花(进口)","maikailun.jpg":"迈凯伦(进口)","mashaladi.jpg":"玛莎拉蒂汽车(进口)","mazida.jpg":"马自达","meiya.jpg":"天汽美亚汽车","MG.jpg":"名爵(上汽名爵)","MINI.jpg":"MINI(进口)","nazhijie.jpg":"纳智捷(东风裕隆)","oubao.jpg":"欧宝(进口)","ouge.jpg":"广汽讴歌","ouge.jpg":"讴歌(进口)","pajiani.jpg":"帕加尼汽车","qichen.jpg":"启辰","qingling.jpg":"庆铃","qirui.jpg":"奇瑞","qirui.jpg":"瑞麒(奇瑞)","qiya.jpg":"起亚","richan.jpg":"日产","rongwei.jpg":"荣威(上汽荣威)","ruhu.jpg":"如虎(进口)","sabo.jpg":"萨博","sanling.jpg":"三菱","shangqidatongMAXUS.jpg":"上汽大通","shanqitongjia.jpg":"通家福","shijue.jpg":"世爵汽车","shuanghuan.jpg":"双环","shuanglong.jpg":"双龙(进口)","sibalu.jpg":"斯巴鲁(进口)","sikeda.jpg":"斯柯达","siwei.jpg":"斯威汽车","smart.jpg":"SMART(进口)","SWMsiweiqiche.jpg":"华晨鑫源","tengshi.jpg":"腾势","tesila.jpg":"特斯拉(进口)","tianma.jpg":"天马","tongtian.jpg":"通田","wanfeng.jpg":"万丰","weichaiyingzhi.jpg":"英致","weilai.jpg":"蔚来","weilin.jpg":"威麟(奇瑞)","weiziman.jpg":"威兹曼(进口)","woerwo.jpg":"沃尔沃","wuling.jpg":"五菱(上汽通用五菱)","wushiling.jpg":"五十铃(江西)","xiandai.jpg":"现代","xinkai.jpg":"新凯","xinyatu.jpg":"新雅途","xiyate.jpg":"西雅特(进口)","xuefolan.jpg":"雪佛兰","yemaqiche.jpg":"野马汽车","yingfeinidi.jpg":"英菲尼迪","yiqi.jpg":"一汽","yiqi.jpg":"一汽(吉林)","yiqi.jpg":"夏利(天津一汽)","yiqi.jpg":"大发(一汽大发)","yiqi.jpg":"解放","yiweike.jpg":"南京依维柯","yongyuan.jpg":"永源","yunque.jpg":"云雀","zhangan.jpg":"长安","zhangcheng.jpg":"长城","zhidou.jpg":"知豆","zhonghua.jpg":"中华(华晨中华)","zhongshun.jpg":"中顺汽车","zhongtai.jpg":"众泰","zhongxing.jpg":"中兴"};

$.each(carlogo,function(key,value){
    var li = $("<li>").html("<img src='http://mattrio-car-img.oss-cn-shanghai.aliyuncs.com/car_icon/"+key+"' title='"+value+"'>");
    li.appendTo(".images_allcar ul");
})



$(".images_allcar ul li").click(function(){
    if($(this).children("img").attr("title") == "奥迪"){
        $(".images_all_cont div").html("<span>×</span><p>奥迪(一汽奥迪)</p><p>奥迪(进口)</p>")
        $(".images_all_cont").show();
        return false;
    }else if($(this).children("img").attr("title") == "宝马"){
        $(".images_all_cont div").html("<span>×</span><p>宝马(华晨宝马)</p><p>宝马(进口)</p>")
        $(".images_all_cont").show();
        return false;
    }else if($(this).children("img").attr("title") == "北京汽车"){
        $(".images_all_cont div").html("<span>×</span><p>北京汽车</p><p>北汽新能源</p>")
        $(".images_all_cont").show();
        return false;
    }else if($(this).children("img").attr("title") == "奔驰"){
        $(".images_all_cont div").html("<span>×</span><p>奔驰(北京奔驰)</p><p>奔驰(福建奔驰)</p><p>奔驰(进口)</p>")
        $(".images_all_cont").show();
        return false;
    }else if($(this).children("img").attr("title") == "本田"){
        $(".images_all_cont div").html("<span>×</span><p>本田(东风本田)</p><p>本田(广汽本田)</p><p>本田汽车(进口)</p>")
        $(".images_all_cont").show();
        return false;
    }else if($(this).children("img").attr("title") == "标致"){
        $(".images_all_cont div").html("<span>×</span><p>标致(东风标致雪铁龙)</p><p>标致(进口)</p>")
        $(".images_all_cont").show();
        return false;
    }else if($(this).children("img").attr("title") == "别克"){
        $(".images_all_cont div").html("<span>×</span><p>别克(上汽通用)</p><p>别克(进口)</p>")
        $(".images_all_cont").show();
        return false;
    }else if($(this).children("img").attr("title") == "大众"){
        $(".images_all_cont div").html("<span>×</span><p>大众(一汽大众)</p><p>大众(上汽大众)</p><p>大众(进口)</p>")
        $(".images_all_cont").show();
        return false;
    }else if($(this).children("img").attr("title") == "东风"){
        $(".images_all_cont div").html("<span>×</span><p>东风</p><p>东风风度</p><p>东风风神</p><p>东风风行</p><p>东风(东风小康)</p>")
        $(".images_all_cont").show();
        return false;
    }else if($(this).children("img").attr("title") == "菲亚特"){
        $(".images_all_cont div").html("<span>×</span><p>菲亚特(南京菲亚特)</p><p>菲亚特(广汽菲亚特)</p><p>菲亚特(进口)</p>")
        $(".images_all_cont").show();
        return false;
    }else if($(this).children("img").attr("title") == "丰田"){
        $(".images_all_cont div").html("<span>×</span><p>丰田(一汽丰田)</p><p>丰田(广汽丰田)</p><p>丰田汽车(进口)</p>")
        $(".images_all_cont").show();
        return false;
    }else if($(this).children("img").attr("title") == "福特"){
        $(".images_all_cont div").html("<span>×</span><p>福特(江铃)</p><p>福特(进口)</p><p>福特(长安福特马自达)</p>")
        $(".images_all_cont").show();
        return false;
    }else if($(this).children("img").attr("title") == "海马"){
        $(".images_all_cont div").html("<span>×</span><p>海马(郑州)</p><p>海马汽车</p>")
        $(".images_all_cont").show();
        return false;
    }else if($(this).children("img").attr("title") == "吉普"){
        $(".images_all_cont div").html("<span>×</span><p>吉普(北京奔驰)</p><p>吉普(广汽菲克)</p><p>吉普(进口)</p>")
        $(".images_all_cont").show();
        return false;
    }else if($(this).children("img").attr("title") == "凯迪拉克"){
        $(".images_all_cont div").html("<span>×</span><p>凯迪拉克(上汽通用)</p><p>凯迪拉克(进口)</p>")
        $(".images_all_cont").show();
        return false;
    }else if($(this).children("img").attr("title") == "克莱斯勒"){
        $(".images_all_cont div").html("<span>×</span><p>克莱斯勒(东南汽车)</p><p>克莱斯勒(北京奔驰)</p><p>克莱斯勒(进口)</p>")
        $(".images_all_cont").show();
        return false;
    }else if($(this).children("img").attr("title") == "雷诺"){
        $(".images_all_cont div").html("<span>×</span><p>雷诺(进口)</p><p>雷诺(东风)</p>")
        $(".images_all_cont").show();
        return false;
    }else if($(this).children("img").attr("title") == "铃木"){
        $(".images_all_cont div").html("<span>×</span><p>铃木(昌河铃木)</p><p>铃木(进口)</p><p>铃木(长安铃木)</p>")
        $(".images_all_cont").show();
        return false;
    }else if($(this).children("img").attr("title") == "马自达"){
        $(".images_all_cont div").html("<span>×</span><p>马自达(一汽马自达)</p><p>马自达(进口)</p><p>马自达(长安福特马自达)</p>")
        $(".images_all_cont").show();
        return false;
    }else if($(this).children("img").attr("title") == "起亚"){
        $(".images_all_cont div").html("<span>×</span><p>起亚(进口)</p><p>起亚(东风悦达起亚)</p>")
        $(".images_all_cont").show();
        return false;
    }else if($(this).children("img").attr("title") == "日产"){
        $(".images_all_cont div").html("<span>×</span><p>日产(东风日产)</p><p>日产(进口)</p><p>日产(郑州日产)</p>")
        $(".images_all_cont").show();
        return false;
    }else if($(this).children("img").attr("title") == "三菱"){
        $(".images_all_cont div").html("<span>×</span><p>三菱(东南)</p><p>三菱(北京奔驰)</p><p>三菱(广汽三菱)</p><p>三菱(进口)</p>")
        $(".images_all_cont").show();
        return false;
    }else if($(this).children("img").attr("title") == "斯柯达"){
        $(".images_all_cont div").html("<span>×</span><p>斯柯达(上汽大众-斯柯达)</p><p>斯柯达(进口)</p>")
        $(".images_all_cont").show();
        return false;
    }else if($(this).children("img").attr("title") == "沃尔沃"){
        $(".images_all_cont div").html("<span>×</span><p>沃尔沃(进口)</p><p>沃尔沃(长安福特马自达)</p><p>沃尔沃亚太</p>")
        $(".images_all_cont").show();
        return false;
    }else if($(this).children("img").attr("title") == "现代"){
        $(".images_all_cont div").html("<span>×</span><p>现代(北京现代)</p><p>现代(进口)</p>")
        $(".images_all_cont").show();
        return false;
    }else if($(this).children("img").attr("title") == "雪佛兰"){
        $(".images_all_cont div").html("<span>×</span><p>雪佛兰(上汽通用)</p><p>雪佛兰(上汽通用五菱)</p><p>雪佛兰(进口)</p><p>雪铁龙(东风标致雪铁龙)</p>")
        $(".images_all_cont").show();
        return false;
    }else if($(this).children("img").attr("title") == "英菲尼迪"){
        $(".images_all_cont div").html("<span>×</span><p>英菲尼迪(东风)</p><p>英菲尼迪(进口)</p>")
        $(".images_all_cont").show();
        return false;
    }
    $("#arrcity").val($(this).children("img").attr("title"));
    $(".images_all").fadeOut();
    $("body,html").animate({scrollTop:0},0);
    $("#s1").html("选择年份");
    $("#s1").css("color", "#999");
})
$(document).on("click",".images_all_cont div p",function(){
    $("#arrcity").val($(this).html());
    $(".images_all_cont").hide();
    $(".images_all").hide();
})
$(document).on("click",".images_all_cont div span",function(){
    $(".images_all_cont").fadeOut();
})

$(document).click(function(e) {
    $('.images_all_cont').hide()
    e.stopPropagation()
})
