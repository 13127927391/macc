var m = 1;
var timer = setInterval(run,5000);
function run(){
	if(m>2){
		m=0;
	}
	imgControl(m);
	spanControl(m);
	m++	;
}
function imgControl(m){
	for(var i = 0; i<$('.contentbg p').length; i++){
		$('.contentbg p')[i].className = '';
	}
	$('.contentbg p')[m].className = 'headerimg';
}
function spanControl(m){
	for(var j = 0; j < $(".contentbg_list span").length; j++){
		$(".contentbg_list span")[j].className = '';
	}
	$(".contentbg_list span")[m].className = 'active';
}
$(".contentbg").mouseover(function(){
	clearInterval(timer);
})
$(".contentbg").mouseenter(function(){
	timer = setInterval(run,5000);
})
for(var k = 0; k<$(".contentbg_list span").length; k++){
	(function(n){
		$(".contentbg_list span").eq(n).mouseenter(function(){
			spanControl(n);
			imgControl(n);
		})
		$(".contentbg_list span").eq(n).mouseover(function(){
			m = n+1;
		})
	})(k)
}