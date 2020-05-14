<?php

class ApiController extends ControllerHandler implements ControllerInterface {
    public function __construct() {
        parent::__construct();
    }

    public function Get() {
        global $_path;

        $list = array();

        if (!empty($_path[3]) && class_exists($_path[3])) {
            $object = new $_path[3];

            if (!empty($object)) {
                if (!empty($_path[4])) {
                    $object->Open($_path[4]);
                    $list = $object;
                } else {
                    $list = $object->GetList();
                }
            }
        }

        return array(
            "response" => $list
        );
    }
}

?>