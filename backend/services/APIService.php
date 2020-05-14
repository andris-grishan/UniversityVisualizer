<?php

class APIService {
    private $controllerClassPrefix = "Controller";
    private $excludedClasses = array(
        "main"
    );
    private $excludedMethods = array(
        "__construct",
        "callfunction",
        "index"
    );

    public function __construct() {

    }

    public function getControllersInfo() {
        $controllers = array();

        foreach (glob('controllers/*.php') as $file) {
            $fileName = basename($file, '.php');
            $classFullName = $fileName.$this->controllerClassPrefix;

            if (class_exists($classFullName) && !in_array(strtolower($fileName), $this->excludedClasses)) {
                $arrayKey = strtolower($fileName);
                $controllers[$arrayKey] = array(
                    "methods" => $this->getClassMethods($classFullName)
                );
            }

        }

        return $controllers;
    }

    public function getClassMethods($className) {
        $methods = array();

        foreach(get_class_methods($className) as $meth) {

            if(!in_array(strtolower($meth), $this->excludedMethods)) {
                array_push($methods, strtolower($meth));
            }

        }

        return $methods;
    }
}

?>