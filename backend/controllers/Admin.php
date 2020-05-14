<?php

class AdminController extends ControllerHandler implements ControllerInterface {
    function __construct() {
        parent::__construct();
    }

    function Index() {
        global $_router, $_viewData;

        $object = new Room();

        $_viewData["roomList"] = $object->GetList();

        $_router->View("Index");
    }

    function Save() {
        global $_data, $_errors, $_dateFormat;

        $object = new Room();
        $object->GetFromPost();
        $object->changedate = (new DateTime())->format($_dateFormat);

        $error = $object->Save($_data["action"]);

        if (!empty($error)) {
            array_push($_errors, $error);
        }
    }

    function Delete() {
        global $_data;

        if (!empty($_data["id"]) && !empty($_data["type"])) {
            $object = new Room();

            $object->Remove($_data["id"]);
        }
    }

    function UploadFile() {
        global $_data;

        if (!empty($_data["file"])) {
            $fileHandler = new FileHandler();

            $fileName = $fileHandler->Save($_data["file"]);

            return array(
                "file" => $fileName
            );
        }
        // var_dump($_data);
    }
}

?>