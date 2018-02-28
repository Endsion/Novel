<?php
echo phpinfo();
exit;
	//实例化redis
    $redis = new Redis();
    //连接
    $redis->connect('127.0.0.1', 6379);
	echo "Server is running: " . $redis->ping();