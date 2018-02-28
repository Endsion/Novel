$(document).ready(function(){
	var id = getUrlParam("id");
	if(id == ""){
		alert("信息错误");
	}else{
		$.ajax({
			url:"function.php",
			type:'post',
			data:{"id":id,"type":"getInfo"},
			dataType:'json',
			timeout : 6000000, //超时时间设置，单位毫秒
			success:function(data){
				if(data["code"] != 200){
					$(".title").find("table").html("<caption>"+data["msg"]+"</caption>");
				}else{
					$(".title").html(data['title'])
					for(var i = 0;i<data["data"].length;i++){
						$(".chapters").append("<li><a href='info.html?id="+data["data"][i]["id"]+"&bid="+id+"'>"+data["data"][i]["title_two"]+"</a></li>");
					}
				}
				if(getCookie(id+"sh") != null){
					$(window).scrollTop(getCookie(id+"sh"));
				}
			},
			error:function(data){
				alert("系统错误");
			},
			complete : function(XMLHttpRequest,status){ //请求完成后最终执行参数
				console.log(status);
		　　　　if(status=='timeout'){//超时,status还有success,error等值的情况
		　　　　　  alert("超时");
		　　　　}
		　　}
		})
	}
	//滚动高度记忆
	$(window).scroll(function(){
		var sh = getScrollTop();
		setCookie(id+"sh",sh);
	})
	
})
