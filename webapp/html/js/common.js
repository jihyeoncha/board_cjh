$(document).ready(function(){
	$('.path_list > li:last-child').addClass("last");

	/*
	$('.ftab > ul > li > a ').click(function(){
		$('.ftab > ul > li').removeClass('on');
		$(this).parent('li').addClass('on');
	});
	*/

	$('.review_box .p_subject a ').click(function(){
		$(this).parent("p").parent("td").parent("tr").next("tr.review_content").toggle("fast", function(){
			ResizeIframe("review");
		});
		ResizeIframe("review");
	});
	$('.qna_box .p_subject a ').click(function(){
		$(this).parent("p").parent("td").parent("tr").next("tr.qna_content").toggle("fast", function(){
			ResizeIframe("qna");
		});
		ResizeIframe("qna");

	});

	$('dt > a ').click(function(){

		$(this).parent("dt").parent("dl").toggleClass("on");
		$(this).parent("dt").next("dd").slideToggle("fast");
	});

	$('.rtab > .tab_con_wrap > div.tab_con').hide();
	$('.rtab > .tab_con_wrap > div.tab_con').eq(0).show();
	$('.rtab > ul.tab_title > li > a').each(function(i){
		$(this).click(function(event){

			if($(this).attr('class') == 'tab_review') {
				$('#review').attr('src', $('#review').attr('_src'));
			} else if($(this).attr('class') == 'tab_qna') {
				$('#qna').attr('src', $('#qna').attr('_src'));
			}
			$('.rtab > ul.tab_title > li').removeClass('on');
			$(this).parent().addClass('on');
			var $section = $('.rtab > div.tab_con_wrap').children('div.tab_con');
			$section.each(function(){
				$(this).hide();
				$section.eq(i).show();
			});
		});
	});
//	$(".above19 .p_img_box a").remove();
//	var showImgF = $("#item_s li.als-item > a").children("img").attr("src");
//	$("#item_show").attr("src", showImgF.replace());
	$('#item_s li.als-item > a').each(function(i){
		$(this).click(function(event){

			var showImg = $(this).children("img").attr("src");
			/*
			$('.rtab > ul.tab_title > li').removeClass('on');
			$(this).parent().addClass('on');
			var $section = $('.rtab > div.tab_con_wrap').children('div.tab_con');
			$section.each(function(){
				$(this).hide();
				$section.eq(i).show();
			});
			*/
			$("#item_show").attr("src", showImg.replace());
//			alert($(this).children("img").attr("src"));
		});
	});

});


function wrapWindowByMask(){
	var maskHeight = $(window).height();
	var maskWidth = $(window).width();

	$('#mask').fadeIn(300);

	$('.allWrap').show();
	$('html, body').css('overflow-y','hidden');
	$('html, body').css('height','100%');
}
$(document).ready(function(){
	$('a.bt-menu').click(function(e){
		e.preventDefault();
		wrapWindowByMask();
		$('html, body').css('overflow-y','hidden');
		$('html, body').css('height','100%');
	});

	$('#mask').click(function () {
		$(this).hide();
		$('.allWrap').hide();
		$('html, body').css('overflow-y','auto');
		$('html, body').css('height','auto');
	});
	$('.menu_closed a').click(function () {
		$('#mask').hide();
		$('.allWrap').hide();
		$('html, body').css('overflow-y','auto');
		$('html, body').css('height','auto');
	});
});

function openAddress(zipcode, address, focus) {
	OpenWindows("../main/pop_address.jsp?z=" + zipcode + "&a=" + address + "&f=" + focus, 'OA001', 540, 500);
}

//**/
var _CalendarObject_;
function CalendarConvertor() {
	var inputs = document.getElementsByTagName("input");
	for(var i=0; i<inputs.length; i++) {

		//auto popup calendar
		try {
			if(inputs[i].className.indexOf("cal01") != -1) {
				if(inputs[i].className == "cal01") {
					var img = document.createElement("img");
					img.src = "/html/images/btn/btn_cal.png";
					img.style.cursor = "pointer";
					img.style.verticalAlign = "top";
					img.onclick = function() {
						try { new CalendarFrame.Calendar(this.previousSibling); } catch(e) {}
					}
					inputs[i].parentNode.insertBefore(img, inputs[i].nextSibling);
				}
				inputs[i].readOnly = true;
				inputs[i].style.backgroundColor = "#F4F4F4";
				inputs[i].style.textAlign = "center";
				inputs[i].style.width = "90px";
				inputs[i].onfocus = function() {
					try { _CalendarObject_ = new CalendarFrame.Calendar(this); } catch(e) {}
				}
			}
		} catch(e) {}
	}
}

function previewImg(s) {
	var cd;
	var ci;
	if(document.getElementById("_previewImage_")) {
		cd = document.getElementById("_previewImage_");
		ci = cd.getElementsByTagName("img")[0];
	} else {
		cd = document.createElement("div");
		cd.setAttribute('id',"_previewImage_");
		cd.style.backgroundColor= "#ffffff";
		cd.style.position= "absolute";
		cd.style.display= "none";
		cd.style.zIndex= "999";
		cd.style.border= "1px solid #707070";
		cd.style.lineHeight= "0";
		ci = document.createElement("img");
		ci.setAttribute('src',"");
		ci.setAttribute('width',"150");
		cd.appendChild(ci);
		document.getElementsByTagName('body')[0].appendChild(cd);
	}
	ci.src = s.getAttribute("isrc");

	ci.onload = function() {
		var offset = new Offset(s);
		cd.style.display = "block";

		if(Math.max(document.documentElement.clientHeight, document.body.clientHeight) - 200 <= offset.top) {
			cd.style.top = offset.top - (10 + ci.height) + "px";
			cd.style.left = offset.left  + "px";
		} else {
			cd.style.top = offset.top + 20 + "px";
			cd.style.left = offset.left  + "px";
		}
	}
	/*
	var offset = new Offset(s);
	cd.style.top = offset.top + 20 + "px";
	cd.style.left = offset.left  + "px";
	ci.src = s.getAttribute("isrc");
	cd.style.display = "block";
	*/

}

function hidePreviewImage() {
	try { document.getElementById("_previewImage_").style.display = "none";	document.getElementById("_previewImage_").getElementsByTagName("img")[0].src = ""; } catch (e) { }
}

function goLogin(url) {
	if(!url) return;
	try {
		if(!confirm("회원서비스입니다. 로그인페이지로 이동합니다.")) return;
		location.href = "/member/login.jsp?returl=" + escape(url);
	} catch(e) {}
}

function goItem(prod_type, prod_id, popup) {
	var itemUrl = "";
	if(prod_type == "G") itemUrl = "/shop/view.jsp?id=" + prod_id + "";
	else if(prod_type == "E") itemUrl = "/design/printing_request.jsp?id=" + prod_id + "";

	if(popup == "popup") {
		try {
			opener.location.href = itemUrl;
		} catch(err) { }
	} else {
		location.href = itemUrl;
	}
}