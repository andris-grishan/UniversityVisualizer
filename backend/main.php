<?php
ob_start();
header('Content-Type: application/json');

include_once("includes.php");
include_once("config.php");

global $_db, $_router, $_path, $_viewData, $_errors, $_pageBody, $_data;

$contentType = isset($_SERVER["CONTENT_TYPE"]) ? trim($_SERVER["CONTENT_TYPE"]) : '';

if (strcasecmp($contentType, 'application/json') != 0) {
    $_data = array();

    if (!empty($_POST)) {
        $_data = $_POST;
    }
    
    if (!empty($_FILES)) {
        $_data = array_merge($_data, $_FILES);
    }
}
else {
    $_data = trim(file_get_contents("php://input"));
    $_data = json_decode($_data, true);
}

$_router = new Router();
$_db = new DataBaseAdapter();
$_errors = array();

$className = $_path[1] . "Controller";
if (class_exists($className, true)) {
    $ctrl = new $className();
}

?>