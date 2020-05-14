<?php

class MainController extends ControllerHandler {
    function __construct() {
        parent::__construct();
    }

    function Index() {
        global $_router, $_db;
        $api = new APIService();

        $defaultMessage = array(
            "controllers" => $api->getControllersInfo()
        );

        return $defaultMessage;
    }
}

?>