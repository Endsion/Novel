<?php
	require('phpQuery/phpQuery.php');
	require('common.php');
	header("Content-type: text/html; charset=utf-8"); 

	/*
	$title = '遮天';
	$encode = mb_detect_encoding($title, array("ASCII","UTF-8","GB2312","GBK",'BIG5')); 
	$strUTF8 = mb_convert_encoding($title , 'gb2312', $encode);
	$title = urlencode($strUTF8);
			$titlepath = 'http://www.biquge.com.tw/modules/article/soshu.php?searchkey=+'.$title;
	phpQuery::newDocumentFile($titlepath);  
	
	$companies = pq('#content')->find("tr"); 
	var_dump(count($companies)); 
	if(count($companies)>1){
		foreach($companies as $company)  {
			if(count(pq($company)->find('.odd')) <=0){
				continue;
			}
			echo pq($company)->find('.odd')->eq(0)->text();
					$u = pq($company)->find('.odd')->eq(0)->find("a")->attr("href");
					//$ti = mb_convert_encoding($ti , 'utf-8', 'gb2312');
					$u = strstr($u ,'tw/');
					$u = str_replace('tw/', '', $u);
					$u = str_replace('/', '', $u);
					var_dump($u);
					exit;
			echo pq($company)->find('.odd')->eq(0)->text();
			$ti = pq($company)->find('.odd')->eq(1)->text();
			//$ti = mb_convert_encoding($ti , 'utf-8', 'gb2312');
			var_dump($ti); 
		}
	}
	exit;*/
	$bqg_url = 'http://www.biquge.com.tw/'; //笔趣阁
	$result = array(
		'code'=>'200',
		'data'=>[],
		'msg'=>''
	);
	$type = $_POST['type'];
	switch($type){
		case "getTitles":
			$title = $_POST['title'];
			$encode = mb_detect_encoding($title, array("ASCII","UTF-8","GB2312","GBK",'BIG5')); 
			$strUTF8 = mb_convert_encoding($title , 'gb2312', $encode);
			$title = urlencode($strUTF8);
			$titlepath = $bqg_url.'modules/article/soshu.php?searchkey='.$title;
			phpQuery::newDocumentFile($titlepath);  
			if(pq('#info')->find('h1')->text() == $_POST['title']){
				$tid = pq('#list')->find("dd")->eq(0)->find("a")->attr("href");
				$tarr = explode('/',$tid);
				$tid = $tarr[1];
				$result['data']['tid'] = $tid;
			}else{
				$companies = pq('#content')->find('tr');
				if(count($companies)>1){
					foreach($companies as $company)  {  
						if(count(pq($company)->find('.odd')) <=0){
							continue;
						}
						$title_info = []; 
						$title_info['title'] = pq($company)->find('.odd')->eq(0)->text();
						$title_info['author'] = pq($company)->find('.odd')->eq(1)->text();
						$u = pq($company)->find('.odd')->eq(0)->find("a")->attr("href");
						$u = strstr($u ,'tw/');
						$u = str_replace('tw/', '', $u);
						$u = str_replace('/', '', $u);
						$title_info['id'] = $u;
						$result['data'][] = $title_info;
					}
				}else{
					$result['code'] = 300;
					$result['msg']='抱歉，搜索没有结果^_^';
				}
			}
			//$html_str= file_get_contents($titlepath);
			break;
		case "getInfo":
			$id = $_POST['id'];
			$bookpath = $bqg_url.$id;
			phpQuery::newDocumentFile($bookpath);  
			$title = pq('#info')->find('h1')->text();
			$result['title'] = $title;
			$chapters = pq('#list')->find("dd");
			$result['c'] = count($chapters);
 			foreach ($chapters as $key => $value) {
				$chapter=[];
				$chapter['title_two'] = pq($value)->text();
				$u = pq($value)->find('a')->attr("href");
				$u = $u = strstr($u ,$id.'/');
				$u = str_replace($id.'/', '', $u);
				$u = str_replace('.html', '', $u);
				$chapter['id'] = $u;
				$result['data'][] = $chapter;
			}
			break;
		case "kc":
			$id = '404243';
			$bookpath = "http://www.xiaoxiaoshuwu.net/read/".$id.'.html';
			//ini_set('user_agent','Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1; SV1; .NET CLR 2.0.50727;)'); 
			//$html = file_get_contents($bookpath);
			//phpQuery::newDocumentFile($bookpath);       
	        //$content = get_fcontent($bookpath);
	        $content = http_get($bookpath);
	        phpQuery::newDocumentHTML($content);
			$title = pq('.title')->find('h3')->text();
			//$title = mb_convert_encoding($title , 'gbk', 'utf-8');
			//$title = iconv("utf-8", "gbk//IGNORE",$title); 
			$result['title'] = $title;
			$chapters = pq('.chapter')->find("li");
			$result['c'] = count($chapters);
 			foreach ($chapters as $key => $value) {
				$chapter=[];
				$chapter['title_two'] = pq($value)->text();
				$chapter['title_two'] = mb_convert_encoding($chapter['title_two'], 'utf-8', 'GBK,UTF-8,ASCII');
				$u = pq($value)->find('a')->attr("href");
				$u = $u = strstr($u ,$id.'/');
				$u = str_replace($id.'/', '', $u);
				$u = str_replace('.shtml', '', $u);
				$chapter['id'] = $u;
				$result['data'][] = $chapter;
			}
			break;
		case "getContent":
			$id = $_POST['id'];
			$bid = $_POST['bid'];
			if($bid == '404243'){
				$charppath = 'http://www.xiaoxiaoshuwu.net/shtml/404/'.$bid.'/'.$id.'.shtml';
		        $content = http_get($charppath);
		        phpQuery::newDocumentHTML($content);
			}else{
				$charppath = $bqg_url.$bid.'/'.$id.'.html';	
				phpQuery::newDocumentFileHTML($charppath);
			}
			$info = [];
			if($bid == '404243'){
				$info['chaptername'] = pq(".content")->find("h3")->text();
			}else{
				$info['chaptername'] = pq(".bookname")->find("h1")->text();
			}
			if($bid == '404243'){
				$prev =  pq(".page")->find("a")->eq(0)->attr("href");
				$u = strstr($prev ,$bid.'/');
				$u = str_replace($bid.'/', '', $u);
				$u = str_replace('.shtml', '', $u);
			}else{
				$prev =  pq(".bookname")->find(".bottem1")->find("a")->eq(1)->attr("href");
				$u = strstr($prev ,$bid.'/');
				$u = str_replace($bid.'/', '', $u);
				$u = str_replace('.html', '', $u);
			}
			$info['prev'] = $u;
			if($bid == '404243'){
				$prev =  pq(".page")->find("a")->eq(2)->attr("href");
				$u = strstr($prev ,$bid.'/');
				$u = str_replace($bid.'/', '', $u);
				$u = str_replace('.shtml', '', $u);
			}else{
				$next =  pq(".bookname")->find(".bottem1")->find("a")->eq(3)->attr("href");
				$u = strstr($next ,$bid.'/');
				$u = str_replace($bid.'/', '', $u);
				$u = str_replace('.html', '', $u);
			}
			if($bid == '404243'){
				$info['next'] = $u;
				$content = pq("#chapterContent")->text();
				$info['content'] = $content;
			}else{
				$info['next'] = $u;
				$content = pq("#content")->text();
				$info['content'] = $content;
			}
			//$content = pq("#content")->text();
	//$encode = mb_detect_encoding($content, array("ASCII","UTF-8","GB2312","GBK",'BIG5')); 
			//$content = mb_convert_encoding($content,'GBK','utf-8');
			//$content = explode('\r\n',$content);
			//$content = str_replace(" ","dw",$content);
			//$content = strip_tags($content);
			//$content = explode('&nbsp', $content);
			//$info['content2'] = $content;
			$result['data'] = $info;
			break;
	}
	echo json_encode($result);
	exit;


// curl 伪造agent抓取页面
function http_get($URL) { 
    $c = curl_init(); 
	$ip = get_rand_ip(); //每次请求都切换ip防止被封
	$header = array( 
		'CLIENT-IP:'.$ip,
		'X-FORWARDED-FOR:'.$ip
	); 
    curl_setopt($c, CURLOPT_RETURNTRANSFER, 1);
	curl_setopt($c, CURLOPT_HTTPHEADER, $header); 
    curl_setopt($c,CURLOPT_USERAGENT,"Mozilla/5.0 (Windows; U; Windows NT 5.1; rv:1.7.3) Gecko/20041001 Firefox/0.10.1");
    curl_setopt($c, CURLOPT_HTTPHEADER,array('Accept-Encoding: gzip, deflate'));
    curl_setopt($c, CURLOPT_ENCODING, 'gzip,deflate');//这个是解释gzip内容.................
    curl_setopt($c, CURLOPT_URL, $URL); 
    curl_setopt($c, CURLOPT_TIMEOUT,2);
    $contents = curl_exec($c); 
    $contents = mb_convert_encoding($contents, 'utf-8', 'GBK,UTF-8,ASCII');
    curl_close($c);
    return $contents;
}

//返回随机国内ip
function get_rand_ip(){
  $arr_1 = array("218","218","66","66","218","218","60","60","202","204","66","66","66","59","61","60","222","221","66","59","60","60","66","218","218","62","63","64","66","66","122","211");
  $randarr= mt_rand(0,count($arr_1)-1);
  $ip1id = $arr_1[$randarr];
  $ip2id=  round(rand(600000,  2550000)  /  10000);
  $ip3id=  round(rand(600000,  2550000)  /  10000);
  $ip4id=  round(rand(600000,  2550000)  /  10000);
  return  $ip1id . "." . $ip2id . "." . $ip3id . "." . $ip4id;
}