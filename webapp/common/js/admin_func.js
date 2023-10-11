
//회원메일 발송
function OpenPopSendMail(idx) {
	OpenWindow("../mail/pop_mail.jsp?idx=" + idx, "M607", 820, 775);
}
//회원SMS 발송
function OpenPopSendSms(idx) {
	OpenWindow("../sms/pop_sms.jsp?idx=" + idx, "S607", 535, 530);
}
function OpenPopSendMsg(idx) {
	OpenWindow("../message/pop_message.jsp?idx=" + idx, "ME607", 720, 605);
}

//성적분포
function OpenStatGraph(id, type, mid) {
	OpenWindow("../management/pop_graph.jsp?cid=" + id + "&gtype=" + type + "&mid=" + mid, "_gr02", 720, 520);
}

//성적분포
function OpenStatExam(cid, eid) {
	OpenWindow("../management/stat_exam.jsp?cid=" + cid + "&eid=" + eid, "MSE" + eid, 720, 540);
}
function OpenStatHomework(cid, hid) {
	OpenWindow("../management/stat_homework.jsp?cid=" + cid + "&hid=" + hid, "MSH" + hid, 720, 540);
}
function OpenStatForum(cid, fid) {
	OpenWindow("../management/stat_forum.jsp?cid=" + cid + "&fid=" + fid, "MSF" + fid, 720, 540);
}

//CRM창 열기
function OpenCRM(id) {
	OpenWindows("../crm/index.jsp?uid=" + id, "", 1100, 550);
}

//SET CRM
function setCRM() {
	$(".crm").each(function() {
		var id = $(this).attr("_id");
		if(!$.isNumeric(id)) {
			$(this).removeClass("crm");
			return;
		}
		$(this).wrap("<a href=\"javascript:OpenCRM('" + $(this).attr("_id") + "');\"></a>");
	});
}

//SET status
function setStatus() {
	var arr = { "사용" : "blue", "중지" : "gray" };
	$(".status").each(function() {
		var v = $(this).text();
		$(this).addClass(arr[v]);
	});
}

function toggleInfoArea(cookieName, display) {
	var area = document.getElementById("infoArea");
	var btn = document.getElementById("btnInfo");

	var flag = area.style.display == "none";
	if(display) flag = display == "Y";
	if(flag) {
		area.style.display = "block";
		btn.value = "접기";
		SetCookie(cookieName, "Y");
	} else {
		area.style.display = "none";
		btn.value = "펼치기";
		SetCookie(cookieName, "N");
	}
}

//**/
var _CalendarObject_;
function HtmlConvertor() {
	var tplRoot = "../html";
	var IE6 = /compatible; MSIE 6.0/.test(navigator.userAgent);
	var IE7 = /compatible; MSIE 7.0/.test(navigator.userAgent);
	var lteIE7 = IE6 || IE7;
	var FF = /Firefox/.test(navigator.userAgent);

	var inputs = document.getElementsByTagName("input");
	var classList = "|btn_simp|bttn|btn_save|btn_cls|btn_search|btn|btn_list|btn_ins|btn_mod|btn_del|btn_ccl|btn_cls|btn_sch|";
	for(var i=0; i<inputs.length; i++) {
		//auto img button
		try {
			if(inputs[i].type == "button" || inputs[i].type == "submit") {
				var stylesheet = inputs[i].currentStyle || window.getComputedStyle(inputs[i], null);
				var color = stylesheet.color;
				var bg = stylesheet.backgroundColor;
				if(inputs[i].className == "btn_smp") {
					inputs[i].onmouseover = function() { this.style.backgroundColor = "#eeeeee"; }
					inputs[i].onmouseout = function() { this.style.backgroundColor = bg; }
				}
				/*
				if(classList.indexOf("|" + inputs[i].className + "|") == -1) continue;
				if(/^[a-zA-Z0-9\s]+$/.test(inputs[i].value)) inputs[i].style.letterSpacing = "0px";
				if(lteIE7) inputs[i].style.overflow = "visible";
				if(IE6) inputs[i].style.paddingTop = parseInt(stylesheet.paddingTop) + 2 + "px";
				if(FF) inputs[i].style.paddingTop = parseInt(stylesheet.paddingTop) - 2 + "px";
				if(inputs[i].className == "btn_simp") inputs[i].style.paddingTop = parseInt(stylesheet.paddingTop) - 1 + "px";
				*/

				var className = inputs[i].className.indexOf("bttn") != -1
								? "bttn"
								: (inputs[i].className.indexOf("btn_simp") != -1 ? "btn_simp" : inputs[i].className);

				if(classList.indexOf("|" + className + "|") == -1) continue;
				if(/^[a-zA-Z0-9\s]+$/.test(inputs[i].value)) inputs[i].style.letterSpacing = "0px";
				if(lteIE7) inputs[i].style.overflow = "visible";
				if(IE6) inputs[i].style.paddingTop = parseInt(stylesheet.paddingTop) + 2 + "px";
				if(FF) inputs[i].style.paddingTop = parseInt(stylesheet.paddingTop) - 2 + "px";
				if(className == "btn_simp") inputs[i].style.paddingTop = parseInt(stylesheet.paddingTop) - 1 + "px";

				inputs[i].onfocus = function() { this.blur(); }
				var span = document.createElement("span");
				span.className = "bttns";
				//if(className == "btn_simp") span.className = "bttns_simp";
				if(inputs[i].className == "btn_simp") span.className = "bttns_simp";
				inputs[i].parentNode.insertBefore(span, inputs[i]);
				span.appendChild(inputs[i].parentNode.removeChild(inputs[i]));
			}
		} catch(e) {}

		//auto popup calendar
		try {
			if(inputs[i].className.indexOf("cal01") != -1 || inputs[i].className.indexOf("cal02") != -1) {
				if(inputs[i].className == "cal01") {
					var img = document.createElement("img");
					img.src = tplRoot + "/images/admin/common/calendar.gif";
					img.style.verticalAlign = "-3px";
					img.style.marginLeft = "1px";
					img.style.cursor = "pointer";
					img.onclick = function() {
						try { new CalendarFrame.Calendar(this.previousSibling); } catch(e) {}
					}
					inputs[i].parentNode.insertBefore(img, inputs[i].nextSibling);
				}
				inputs[i].readOnly = true;
				inputs[i].onfocus = function() {
					try { _CalendarObject_ = new CalendarFrame.Calendar(this); } catch(e) {}
				}
			}
		} catch(e) {}

		//readonly
		try {
			if(inputs[i].type == "text" && inputs[i].readOnly) {
				inputs[i].style.backgroundColor = "#F4F4F4";
				inputs[i].style.border = "1px solid #DEDEDE";
				inputs[i].style.paddingLeft = "3px";
			}
		} catch(e) {}
	}

	/*
	var divs = document.getElementsByTagName("div");
	for(var i=0; i<divs.length; i++) {
		//auto rounding box
		try {
			if(/^autoround[0-9]+/.test(divs[i].className)) {
				var el = divs[i];
				var stylesheet = el.currentStyle || window.getComputedStyle(el, null);
				el.style.width = el.offsetWidth
					- (stylesheet.paddingLeft ? parseInt(stylesheet.paddingLeft) : 0)
					- (stylesheet.paddingRight ? parseInt(stylesheet.paddingRight) : 0)
					- (stylesheet.borderLeftWidth ? parseInt(stylesheet.borderLeftWidth) : 0)
					- (stylesheet.borderRightWidth ? parseInt(stylesheet.borderLeftWidth) : 0)
					+ "px";
				var size = 0;
				try { size = el.className.match(/[0-9]+/)[0] * 1; } catch(e) {}
				var tl = document.createElement("div"); el.appendChild(tl);
				var tr = document.createElement("div"); el.appendChild(tr);
				var bl = document.createElement("div"); el.appendChild(bl);
				var br = document.createElement("div"); el.appendChild(br);

				tl.style.background = "url(" + tplRoot + "/images/global/rnd" + size + "_tl.gif) no-repeat left top";
				tl.style.width = size + "px"; tl.style.height = size + "px"; tl.style.position = "absolute"; tl.style.overflow = "hidden"; //ie height patch 6,7
				tl.style.top = "-1px"; tl.style.left = "-1px";
				tr.style.background = "url(" + tplRoot + "/images/global/rnd" + size + "_tr.gif) no-repeat left top";
				tr.style.width = size + "px"; tr.style.height = size + "px"; tr.style.position = "absolute"; tr.style.overflow = "hidden";
				tr.style.top = "-1px"; tr.style.left = el.offsetWidth - (size + 1) + "px"
				bl.style.background = "url(" + tplRoot + "/images/global/rnd" + size + "_bl.gif) no-repeat left top";
				bl.style.width = size + "px"; bl.style.height = size + "px"; bl.style.position = "absolute"; bl.style.overflow = "hidden";
				bl.style.top = el.offsetHeight - (size + 1) + "px";
				bl.style.left = "-1px"; br.style.background = "url(" + tplRoot + "/images/global/rnd" + size + "_br.gif) no-repeat left top";
				br.style.width = size + "px"; br.style.height = size + "px"; br.style.position = "absolute"; br.style.overflow = "hidden";
				br.style.top = el.offsetHeight - (size + 1) + "px"; br.style.left = el.offsetWidth - (size + 1) + "px";
			}
		} catch(e) {}
	}

	var tables = document.getElementsByTagName("TABLE");
	//auto caption
	try {
		for(var i=0; i<tables.length; i++) {
			if(tables[i].className == "c_tb01") {
				var caption = tables[i].getElementsByTagName("TR")[0].getElementsByTagName("TD")[0];
				caption.innerHTML = '<div style="float:left;width:6px;height:13px;background:silver;overflow:hidden;margin-top:1px;"></div>&nbsp;&nbsp;' + caption.innerHTML;
			}
		}
	} catch(e) {}
	*/
}

function setMaxLength(el, len) {
	if(el.value.length <= len) return true;
	el.value = el.value.substring(0, len);
	el.focus();
	alert(len + "자 이하로 입력하세요.");
	return false;
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
		ci = document.createElement("img");
		ci.setAttribute('src',"");
		ci.setAttribute('width',"300");
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

//기수목록
function setStep(selId, fn) {
	if(!fn) fn = "form1";
	var f = document.forms[fn];
	var keys = new Array("course_id", "year");
	var valueArr = new Array();
	for(var i=0; i<keys.length; i++) {
		if(f["s_" + keys[i]])
			valueArr.push(keys[i] + "=" + escape(f["s_" + keys[i]].value));
	}
	valueArr.push("sel=" + selId);

	call("../management/call_step.jsp?" + valueArr.join("&"), "stepArea");
}

function setNumber(el) {
	if(el.value.match(/[^0-9\.]+/gi)) el.value = el.value.replace(/[^0-9\.]+/gi, '');
}