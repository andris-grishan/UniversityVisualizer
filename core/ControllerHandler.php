<?php 
    interface ControllerInterface {
        function Index();
    }

    class ControllerHandler {
        function __construct() {
            global $_controller;
            
            $_controller = str_replace("Controller", "", get_class($this));
            $this->CallFunction();
        }

        function CallFunction() {
            global $_path, $_errors;

            $method = empty($_path[2]) ? "index" : $_path[2];
            $methodResult = null;
            $returnResult = array(
                "status" => "ok",
                "errors" => array()
            );

            if (method_exists($this, $method)) {
                $methodResult = $this->$method();
            } else {
                array_push(
                    $_errors,
                    "Such method does not exists!"
                );
            }

            if (!empty($_errors)) {
                $returnResult["status"] = "error";
                $returnResult["errors"] = $_errors;
            }

            if (!empty($methodResult)) {
                $returnResult = array_merge(
                    $returnResult,
                    $methodResult
                );
            }

            print(
                json_encode(
                    $returnResult,
                    JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES
                )
            );
        }

        function Index() {
            $api = new APIService();

            $classMethods = $api->getClassMethods(get_class($this));

            return array(
                "methods" => $classMethods
            );
        }
    }
?>