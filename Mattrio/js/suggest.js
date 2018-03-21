 // 页面浮动面板

    $("#floatPanel > .ctrolPanel > a.arrow").eq(0).click(function(){
        $("html,body").animate({scrollTop :0}, 800);return false;
    });
    $("#floatPanel > .ctrolPanel > a.arrow").eq(1).click(function(){
        $("html,body").animate({scrollTop : $(document).height()}, 800);return false;
    });


    $(".qrcode").mouseover(function(){
        $(".popPanel").css("width","0px").show();
        $(".popPanel").stop().animate({"width" : 230 + "px"},300);return false;
    }).mouseout(function(){
        $(".popPanel").stop().animate({"width" : "0px"},300);return false;
        $(".popPanel").css("width",240 + "px");
    })
   $(".arrow1").mouseover(function(){
        $(".arrow1 img").hide();
        $(".arrow1 span").show();
    }).mouseout(function(){
        $(".arrow1 img").show();
        $(".arrow1 span").hide();
    })
    $(".arrow2").mouseover(function(){
        $(".arrow2 img").hide();
        $(".arrow2 span").show();
    }).mouseout(function(){
        $(".arrow2 img").show();
        $(".arrow2 span").hide();
    })
    $(".contact").mouseover(function(){
        $(".contact img").hide();
        $(".contact span").show();
    }).mouseout(function(){
        $(".contact img").show();
        $(".contact span").hide();
    })
    $(".qrcode1").mouseover(function(){
        $(".qrcode1 img").hide();
        $(".qrcode1 span").show();
        $(".popPanel1").css("width","0px").show();
        $(".popPanel1").stop().animate({"width" : 230 + "px"},300);return false;
    }).mouseout(function(){
        $(".qrcode1 img").show();
        $(".qrcode1 span").hide();
        $(".popPanel1").stop().animate({"width" : "0px"},300);return false;
        $(".popPanel1").css("width",240 + "px");
    })   
    $(".qrcode").mouseover(function(){
        $(".qrcode img").hide();
        $(".qrcode span").show();
    }).mouseout(function(){
        $(".qrcode img").show();
        $(".qrcode span").hide();
    })  


if (localStorage) {
    var network = localStorage.getItem("network");
}else{
    var network = $.cookie("network");
}

//点击其他地方隐藏盒子
function stopPropagation(e) { 
    if (e.stopPropagation) {
        e.stopPropagation(); 
    }else {
        e.cancelBubble = true; 
    }
} 
$('.suggestcont').bind('click',function(e){ 
    stopPropagation(e); 
});
$(".suggest").bind('click',function(){ 
    $('.suggest').fadeOut();
});




//=====
$(".contact").click(function(){
    $('.suggest').fadeIn();
})
$(".onbtn").click(function(){
    $('.suggest').fadeOut();
})
$(".offbtn").click(function(){
    if($(".suggest textarea").val() == ""){
        alert("填写您的意见建议");
        return false;
    }
    $.ajax({
        type:"post",
        url:network+"/Mattrio/OeProductErrorCorrectionInterface/addFeedbackSuggestion",
        data:{
            "type":"功能建议",
            "msg":$(".suggest textarea").val(),
            "user_name":$(".user_name").val(),
            "user_phone":$(".user_phone").val()
        },
        dataType:"json",
        cache: false,
        crossDomain: true == !(document.all),
        success:function(data){
            alert("提交建议成功");
            $('.suggest').fadeOut();
        }
    })
})