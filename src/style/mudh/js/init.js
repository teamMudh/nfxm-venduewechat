/*动态设置font-sixe的值*/
!(function(doc, win) {
	var docEle = doc.documentElement,
		evt = "onorientationchange" in window ? "orientationchange" : "resize",
		fn = function() {
			var width = docEle.clientWidth;
			var height = docEle.clientHeight;
			if(width < 960) {
				width && (docEle.style.fontSize = 100 * (width / 750) + "px");
			} else {
				width && (docEle.style.fontSize = 100 * (960 / 750) + "px");
			}
		};
	win.addEventListener(evt, fn, false);
	doc.addEventListener("DOMContentLoaded", fn, false);
}(document, window));

$(function(){
	$("input").focus(function(){
	var $con = $('.formError .formErrorContent');			
		$con.each(function(){
			if(!$(this).is(':hidden')){
				$con.hide();
			}
		});			
	});
})