<?php
function get_fcontent($url,  $timeout = 5000 ) {
        $url = str_replace( "&amp;", "&", urldecode(trim($url)) );
        $cookie = tempnam ("/tmp", "CURLCOOKIE");
        $ch = curl_init();
        curl_setopt($ch,CURLOPT_USERAGENT,"Mozilla/5.0 (Windows; U; Windows NT 5.1; rv:1.7.3) Gecko/20041001 Firefox/0.10.1");
        curl_setopt( $ch, CURLOPT_URL, $url);
        //curl_setopt( $ch, CURLOPT_COOKIEJAR, $cookie );
        curl_setopt( $ch, CURLOPT_FOLLOWLOCATION, true );
        curl_setopt( $ch, CURLOPT_ENCODING, "gzip" );
        curl_setopt( $ch, CURLOPT_RETURNTRANSFER, true );
        curl_setopt( $ch, CURLOPT_AUTOREFERER, true );
        curl_setopt( $ch, CURLOPT_SSL_VERIFYPEER, false ); 
        curl_setopt( $ch, CURLOPT_CONNECTTIMEOUT, $timeout );
        curl_setopt( $ch, CURLOPT_TIMEOUT, $timeout );
        curl_setopt( $ch, CURLOPT_MAXREDIRS, 10 );
        $content = curl_exec( $ch );
        curl_close ( $ch );
        return $content;
    }