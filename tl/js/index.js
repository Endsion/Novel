$(document).ready(function(){
	$(".search").unbind("click").bind("click",function(){
		var title = $(".title").val();
		if(title.length <= 0){
			alert("请输入书名");
		}else{
			$.ajax({
				url:"function.php",
				type:'post',
				data:{"title":title,"type":"getTitles"},
				dataType:'json',
				beforeSend:function(){
						$(".title").find("table").html("<caption>请求中</caption>");
				},
				success:function(data){
					$(".title").find("table").html("");
					if(data["code"] != 200){
						$(".title").find("table").html("<caption>"+data["msg"]+"</caption>");
					}else{
						if(data["data"]["tid"] != undefined ){
							location.href='book.html?id='+data["data"]["tid"];
						}
						for(var i = 0;i<data["data"].length;i++){
							$(".title").find("table").append("<tr><td><a href='book.html?id="+data["data"][i]["id"]+"'>"+data["data"][i]["title"]+"</a></td><td>"+data["data"][i]["author"]+"</td></tr>");
						}
					}
				},
				error:function(data){
					alert("系统错误");
				}
			})
		}

	})
})