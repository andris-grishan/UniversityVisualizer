<?php

class Room extends ModelHandler {
    public $title = "";
    public $content = "";
    public $images = array();

    function __construct() {
        parent::__construct();
    }
}

?>