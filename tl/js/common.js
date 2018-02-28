
/***variable**/
//溧水 192.168.4.68
//常州 192.168.13.251
var domainpath = "/nariacs/";
var domainpathname = "/nariacs/static/";
var login = getCookie("login");
if(document.location.protocol == "http:" || document.location.protocol == "https:"){
	if(login != "1" && document.location.pathname != "/nariacs/login.do"){
		//location.href = "/nariacs/login.do";
	}
}
/***消息提示**/
function showMsg(msg){
	if(msg === "" || msg === null){
		return null;
	}
	if(typeof(msg) !== "string"){
		return null;
	}
	$(".msg").html(msg).addClass("msgin").css("right","0px");
	return false;
}
//写cookies
function setCookie(name,value){
	var Days = 30;
	var exp = new Date();
	exp.setTime(exp.getTime() + Days*24*60*60*1000);
	//document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
	//document.cookie = name + "="+ escape (value);
	document.cookie = name + "="+ encodeURI(value);
}
//读cookies
function getCookie(name){
	var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
	if(arr=document.cookie.match(reg))
		return decodeURI(arr[2]);
	else
		return null;
}
//删除cookies
function delCookie(name){
	var exp = new Date();
	exp.setTime(exp.getTime() - 1);
	var cval=getCookie(name);
	if(cval!=null)
		document.cookie= name + "="+cval+";expires="+exp.toGMTString();
}
/***获取url中的参数***/
function getUrlParam(name){
	if(name === "" || name === null){
		return null;
	}
	if(typeof(name) !== "string"){
		return null;
	}
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");//正则
	var r = window.location.search.substr(1).match(reg);
	if(r!=null){
		return unescape(r[2]);
	}else{
		return null;
	}
	
}

/***去空格***/
String.prototype.trim = function(type){
	if(typeof(type) == undefined){
		type = 1;
	}
	if(type=1){
		/***去掉两边空格***/
		return this.replace(/^\s+|\s+$/g,"");
	}
	if(type=2){
		/***去掉左边空格***/
		return this.replace(/^\s*/,"");
	}
	if(type=3){
		/***去掉右边空格***/
		return this.replace(/(s*$)|/g,"");
	}
	if(type=4){
		/***去掉所有空格***/
		return this.replace(/\s+/g,"");
	}
}
/***检测ip***/
var reSpaceCheck = /^(\d+)\.(\d+)\.(\d+)\.(\d+)$/;
String.prototype.isIP = function(){
	if(reSpaceCheck.test(this)){
		if(RegExp.$1 <= 255 && RegExp.$1>=0 && RegExp.$2 <= 255 && RegExp.$2>=0 && RegExp.$3 <= 255 && RegExp.$3>=0 && RegExp.$4 <= 255 && RegExp.$4>=0 ){
			
			return true;
		}else{
			return false;
		}	
	}else{
		return false;
	}
}
//比较两个ip的大小,如果大于，返回true，等于返回true，小于返回false
function compareIP(ipBegin, ipEnd){  
    var temp1;  
    var temp2;
    temp1 = ipBegin.split(".");  
    temp2 = ipEnd.split(".");     
    for (var i = 0; i < 4; i++){
    	temp1[i] = parseInt(temp1[i]);
    	temp2[i] = parseInt(temp2[i]);
        if (temp1[i]>temp2[i]){  
            return false;  
        }  
        else if (temp1[i]<temp2[i]){  
            return true;  
        } 
    }
    return true;     
}  
/***检测mac地址***/
var temp = /[A-Fa-f0-9]{2}:[A-Fa-f0-9]{2}:[A-Fa-f0-9]{2}:[A-Fa-f0-9]{2}:[A-Fa-f0-9]{2}:[A-Fa-f0-9]{2}/;
String.prototype.isMAC = function(){
	if(!temp.test(this)){
		return false;
	}
	return true;
}
/***检测子网掩码***/
var maskexp = /^(254|252|248|240|224|192|128|0)\.0\.0\.0|255\.(254|252|248|240|224|192|128|0)\.0\.0|255\.255\.(254|252|248|240|224|192|128|0)\.0|255\.255\.255\.(254|252|248|240|224|192|128|0)$/;  
String.prototype.isMASK = function(){
	if(this.match(maskexp) == null){
		return false;
	}
	return true;
}
/***检测int***/
var intexp = /^[0-9]+.?[0-9]*$/;//判断字符串是否为数字 //判断正整数 /^[1-9]+[0-9]*]*$/
String.prototype.isNumber = function() {
	if(this.match(intexp) == null){
		return false;
	}
	return true;
}
/***判断经纬度***/
var mbexp = /^\d+(\.\d+)?$/;
String.prototype.isLogic = function(){
	if(this.match(mbexp) == null){
		return false;
	}
	return true;
}
/***判断正整数***/
var mbexp2 = /^[0-9]*[1-9][0-9]*$/;
String.prototype.isInt = function(){
	if(this.match(mbexp2) == null){
		return false;
	}
	return true;
}
/***判断数字字母下划线***/
var mbexp3 = /^\w+$/;
String.prototype.isMM = function(){
	if(this.match(mbexp3) == null || mbexp3.length > 20){
		return false;
	}
	return true;
}
/***判断手机号码***/
var regphone = /^1[3|4|5|7|8][0-9]{9}$/;
String.prototype.isPhone = function(){
	if(this.match(regphone) == null){
		return false;
	} 
	return true;
}
/***判断邮箱***/
var regmail = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
String.prototype.isMail = function(){
	if(this.match(regmail) == null){
		return false;
	}
	return true;
}
/***判断中文***/
var ischina = /[^\u4e00-\u9fa5]/;
String.prototype.isChinese = function(){
	if(this.match(ischina) == null){
		return true;
	}
	return false;
}
Array.prototype.contains = function (obj) {  
    var i = this.length;  
    while (i--) {  
        if (this[i] == obj) {  
            return true;  
        }  
    }  
    return false;  
}
/***流量换算***/
function getFlow(flow){
	nflow = Number(flow);
	var htmlstr = '';
	if(nflow > 100000000000){
		nflow = nflow/1024/1024/1024;
		nflow = nflow.toFixed(2);
		nflow = nflow.toString();
		htmlstr = nflow+'(GB)';
	}else if(nflow > 100000000){
		nflow = nflow/1024/1024;
		nflow = nflow.toFixed(2);
		nflow = nflow.toString();
		htmlstr = nflow+'(MB)';
	}else if(nflow > 100000){
		nflow = nflow/1024;
		nflow = nflow.toFixed(2);
		nflow = nflow.toString();
		htmlstr = nflow+'(KB)';
	}else{
		htmlstr = nflow+'(B)';
	}
	return htmlstr;
}
/***检测对象是否为空***/
var ti = null;
function isEmpty(data){
	if(data === '' || data === null){
		return false;
	}
	if(typeof(data) !== "object"){
		return false;
	}
	for(ti in data){
		if(data[ti] === ""){
			return false;
		}
	}
	return true;
}
function isString(str){
	return (typeof str=='string')&&str.constructor==String;
} 
function paramCheck(k,vi){
	if(!(isString(k) && isString(vi))){
		showMsg("参数错误，请重新填写");
		return;
	}
	var v = vi.toString();
	switch(k){
		case "X_NARI_COM.LTE.CheckDest1":case "X_NARI_COM.LAN.{0}.IPAddress":case "X_NARI_COM.LAN.{1}.IPAddress":
		case "X_NARI_COM.LAN.{2}.IPAddress":case "X_NARI_COM.LAN.{3}.IPAddress":case "X_NARI_COM.IPSEC.SBIp":
		case "X_NARI_COM.IPSEC.SDIp":case "X_NARI_COM.IPSEC.YBIp":case "X_NARI_COM.IPSEC.YDIp":
			if(!v.isIP()){
				showMsg("请填写正确的IP地址");
				return false;
			}
			return true;
			break;
		case "X_NARI_COM.LAN.{0}.NetMask":case "X_NARI_COM.LAN.{1}.NetMask":case "X_NARI_COM.LAN.{2}.NetMask":
		case "X_NARI_COM.LAN.{3}.NetMask":
			if(!v.isMASK()){
				showMsg("请填写正确的子网掩码");
				return false;
			}
			return true;
			break;
		case "X_NARI_COM.LTE.BusinessType":
			if(!v.isChinese()){
				showMsg("请填写中文");
				return false;
			}
			return true;
			break;
		case "X_NARI_COM.LTE.Address":
			if(!isString(v)){
				showMsg("参数错误，请重新填写");
				return false;
			}
			return true;
			break;
		case "X_NARI_COM.APN.Password":case "X_NARI_COM.APN.Username":
			if(!v.isMM()){
				showMsg("请输入数字字母下划线,20个字符以内");
				return false;
			}
			return true;
			break;
		case "X_NARI_COM.LTE.MacBind":case "X_NARI_COM.DHCP.Enable":case "X_NARI_COM.USB.Enable":case "ManagementServer.PeriodicInformEnable":
		case "X_NARI_COM.IPSEC.Enable":case "X_NARI_COM.LAN.{0}.Enable":case "X_NARI_COM.LAN.{1}.Enable":case "X_NARI_COM.LAN.{2}.Enable":
		case "X_NARI_COM.LAN.{3}.Enable":case "X_NARI_COM.IPSEC.Enable":
			if(v != "0" && v != "1"){
				showMsg("请填写0或者1(0否 1是)");
				return false;
			}
			return true;
			break;
		case "X_NARI_COM.LTE.Latitude":case "X_NARI_COM.LTE.Longitude":
			
			if(!v.isLogic()){
				showMsg("请输入数字");
				return false;
			}
			return true;
		case "X_NARI_COM.IPSEC.YBMaskLen":case "X_NARI_COM.IPSEC.YDMaskLen":
			if(!v.isInt()){
				showMsg("请输入正整数");
				return false;
			}
			return true;

		default:
			return true;
	}
}
var deskey = "A1B2C3D4"
// DES加密
function encryptByDES(message) {
    var keyHex = CryptoJS.enc.Utf8.parse(deskey);
    var encrypted = CryptoJS.DES.encrypt(message, keyHex, {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
    });
    return encrypted.toString();
}
//解密
function decryptByDES(ciphertext) {
	var keyHex = CryptoJS.enc.Utf8.parse(deskey);
	var decrypted = CryptoJS.DES.decrypt({
        ciphertext: CryptoJS.enc.Base64.parse(ciphertext)
    }, keyHex, {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
	});
	return decrypted.toString(CryptoJS.enc.Utf8);
}
// 标签页初始化
function initOpt(){
	
	$("#navication span:first").addClass("ck");
	//$(".content1").addClass("show");
	$(".content1").show();
	$("#navication span").click(function(i){
		$("#navication span").removeClass("ck");
		$(this).addClass("ck");
		
		//$(".content").removeClass("show");
		//$(".content"+$(this).attr("data-page")).addClass("show");
		$(".content").hide();
		$(".content"+$(this).attr("data-page")).show();
	});
}
//AJAX幕布
var curtain = 0;
function showCurtain(){
	curtain++;
	if($("body").find(".curtain").length == 0){
		$("body").append("<div class='curtain'><div class='curtain_dv'></div><i class='icon-spinner icon-spin'></i></div>")
	}
}
function hideCurtain(){
	if(curtain != 0){
		curtain--;
		if(curtain == 0){
			$("body").find(".curtain").remove();
		}
	}
}
//获取对象长度
function getSize(obj){
	var size =0,key;
	for(key in obj){
		if(obj.hasOwnProperty(key)){
			size++;
		}
	}
	return size;
}
/********************
 * 取窗口滚动条高度 
 ******************/
function getScrollTop(){
    var scrollTop=0;
    if(document.documentElement&&document.documentElement.scrollTop)
    {
        scrollTop=document.documentElement.scrollTop;
    }
    else if(document.body)
    {
        scrollTop=document.body.scrollTop;
    }
    return scrollTop;
}
/***告警状态***/
var alarmtype = ['提示告警','次要告警','主要告警','严重告警'];
var alarmtypeclass = ['cue','minor','main','serious'];
/***任务类型***/
var tasktype={'1':'升级版本','5':'备份日志'};
/***触发类型***/
var eventtriggertype = {'1':'初次上线','2':'周期到达','3':'设备重启'};
//页面cookie值key
var cookkey={
	"eqset":{
		0:"sh", 		//页面滚动高度
		1:"pageIndex", 	//分页页数
		2:"pageNum",	//分页显示数目
	},
	"eqlit":{
		0:"sh", 		//页面滚动高度
		1:"pageIndex", 	//分页页数
		2:"pageNum",	//分页显示数目
	},
	"warnl":{
		0:"sh", 		//页面滚动高度
		1:"pageIndex", 	//分页页数
		2:"pageNum",	//分页显示数目
	},
	"warnh":{
		0:"sh", 		//页面滚动高度
		1:"pageIndex", 	//分页页数
		2:"pageNum",	//分页显示数目
	}
}
/***页面加载完操作的元素***/
$(document).ready(function(){
	/***添加消息框***/
	if($("body").find(".msg").length == 0){
		$("body").append("<div class='msg'></div>")
	}
	/***添加对话框***/
	if($("body").find("#btn-dialogBox").length == 0){
		$("body").append("<div id='btn-dialogBox'></div>")
	}

	if(self.frameElement && self.frameElement.tagName == "IFRAME") {
　　	$("body").css("margin-bottom","50px");
	}
    if($('[name="busstype"]').length > 0){
    	$.ajax({
    		url:domainpath+"man/cpe/getallbusstypes.do",
    		dataType:"json",
			async:false,
    		success:function(data){
    			var len = $('[name="busstype"]').find("option[value='']").length;
    			
    			var optionstr = "";
    			if(data.successful == "true"){
    				if(len > 0){
    					optionstr +=  "<option value=''>全部</option>";
    				}
    				for(var t = 0;t<data.resultValue.items.length;t++){
    					optionstr += "<option>"+data.resultValue.items[t].bussname+"</option>";
    				}
    			}
    			$('[name="busstype"]').html(optionstr);
    			$('[name="busstypechoose"]').html(optionstr);
    		},
    		error:function(data){

    		}
    	})
    }
    
    /*for(var k in tasktype){
    	$('[name="tasktype"]').append('<option value="'+k+'">'+tasktype[k]+'</option>');
    }*/
	/***全部选中***/
	var selstate = 0;
	$("#selectall").click(function(){
		if(selstate == 0){
			selstate = 1; 
			var ids = $("input[name='ids[]']");
			for(var t=0;t<ids.length;t++){
				if(!$(ids[t]).is(':checked')){
					$(ids[t]).trigger('click');
				}
			}
		}else{
			var ids = $("input[name='ids[]']");
			for(var t=0;t<ids.length;t++){
				if($(ids[t]).is(':checked')){
					$(ids[t]).trigger('click');
				}
			}
			selstate = 0; 
		}
	})
	/***消息***/
	$(".msg").click(function(){
		$(this).removeClass("msgin").removeAttr("style");
	})
	/***table单行搜索***/
	$("th .tbsearch").bind("click",function(e){
		window.event? window.event.cancelBubble = true : e.stopPropagation();
	})
	/***区间插入元素***/
	var substr = "<i data-type='con'>~</i><input data-type='con' type='text'>"
	$("th .tbsearch li select.condition").change(function(){
		if(this.value == "区间"){
			//$(this).prepend(substr);
			$(this).parent().append(substr);
			$(this).parent().find("input").css("width","49px");
		}else{
			$(this).parent().find("[data-type='con']").remove();
			$(this).parent().find("input").removeAttr("style");
		}
	})
	$("th").bind({
		click:function(e){
			if($(this).find(".tbsearch").css("display") == "none"){
				$(this).children(".icon-caret-down").eq(0).css({
					"transform":"rotate(180deg)",
					"-webkit-transform":"rotate(180deg)",
					"-moz-transform":"rotate(180deg)",
					"-o-transform":"rotate(180deg)",
					"-webkit-transform":"rotate(180deg)"
				});
			 	var sew = Number($(this).find(".tbsearch").outerWidth());
			    var thw = Number($(this).outerWidth());
			    var ser = (thw - sew)/2;
			    if($(document).width() - $(this).width() - $(this).offset().left<15){
			    	ser = 0;
			    }
				$(this).find(".tbsearch").css({"display":"block","top":($(this).outerHeight()-2),"right":ser});
				/*var cssstr = "<style>th .tbsearch:after{top："+($(this).outerHeight()+$(this).find(".tbsearch").outerHeight())+"px;left:"+ser+"px;}</style>";
				console.log(cssstr);
				$(cssstr).appendTo('head');
				console.log(document.styleSheets[0]);
				document.styleSheets[0].addRule("",cssstr)*/
			}else{
				$(this).find(".tbsearch").css("display","none");
				$(this).children(".icon-caret-down").removeAttr("style");
			}
		},
		mouseleave:function(e){
                var o = e.relatedTarget || e.toElement;
                if (!o) return; //增加移动到的对象判断，为option时退出
				$(this).find(".tbsearch").css("display","none");
				$(this).children(".icon-caret-down").removeAttr("style");
		}
	})
	$("th .icon-plus-sign").bind("click",function(e){
		var len = $(this).parent().parent().children("li").length;
		$(this).parent().parent().children("li").eq(len-2).after($(this).parent().parent().children("li").eq(1).clone());
	})
	$("th .icon-minus-sign").bind("click",function(e){
		var len = $(this).parent().parent().children("li").length;
		if(len > 4){
			$(this).parent().parent().children("li").eq(len-2).remove();
		}
	})
	/***清空***/
	$("th .btn-warning").bind("click",function(e){
		$(this).parent().parent().find("input").val('');
	})
	/***取消***/
	$("th .btn-info").bind("click",function(e){
		var len = Number($(this).parent().parent().children("li").length);
		while(len > 4){
			$(this).parent().parent().children("li").eq(len-2).remove();
			len--;
		}
		if($(this).parent().prev().find("input").length > 0){
			$(this).parent().parent().parent().parent().removeAttr("style").trigger("click").find("input").val('');
			$(this).prev().trigger("click");
		}else{
			var sels = $(this).parent().parent().parent().parent().removeAttr("style").trigger("click").find("select");
			sels.each(function(i){
				$(sels[i]).find("option")[0].selected = true;
			})
			$(this).prev().trigger("click");
		}
	})
	/***table列控制***/
	$("#tabcolumn").find("[type='radio']").each(function(i){
		this.checked = true;
	})
	$("#tabcolumn").find("[type='radio']").click(function(){
		if($(this).attr("date-checked") == "true"){
			$(this).context.checked = false;
			$(this).attr("date-checked","false");
		}else{
			$(this).attr("date-checked","true");
		}
		$("[data-column='"+$(this).context.value+"']").slideToggle();
	})
})