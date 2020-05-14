<?php
class Router {
    function __construct() {
        global $_path, $_siteUrl;

        $_path = array($_siteUrl, 'main');

        $url = preg_replace('~[^a-z0-9\/\-\_,.]+~', '', strtolower($_SERVER['REQUEST_URI']));
        $urlData = explode('/', $url);

        if (sizeof($urlData) > 1 && $urlData[1] != "") {
            $_path = $urlData;
            $_path[0] = $_siteUrl;
        }
    }

    function Redirect($pageUrl) {
        header("Location: $pageUrl", true, 301);
        exit();
    }

    function View($file) {
        global $_controller;

        $path = sprintf(
            'views/%s/%s.php',
            $_controller,
            $file
        );

        // var_dump($path);

        if (file_exists($path)) {
            global $_pageBody;
        
            $_pageBody = $path;

            $this->RenderPage();
        } else {
            echo sprintf(
                'View %s does not exists in controller %s!',
                $file, 
                $_controller
            );
        }
    }

    function RenderPage() {
        header('Content-Type: text/html');
        include_once('views/_layout.php');
        die();
    }
}