<?php

class FileHandler {
    function __construct() {    
        global $_filePath;

        if (!file_exists($_filePath)) {
            mkdir($_filePath, 0777, true);
        }
    }

    public function Save($content) {
        global $_filePath;

        $fileExt = pathinfo(
            $content["name"],
            PATHINFO_EXTENSION
        );

        $fileName = str_replace(
            "." . $fileExt,
            "",
            $content["name"]
        );

        $fileExt == "jpeg" ? "jpg" : $fileExt;

        $name = $fileName . "." . $fileExt;
        $num = 0;

        while (file_exists($_filePath . "/" . $name)) {
            $num++;
            $name = sprintf(
                "%s-%s.%s",
                $fileName,
                $num,
                $fileExt
            );
        }

        move_uploaded_file(
            $content['tmp_name'], 
            $_filePath . "/" . $name
        );

        return $name;
    }
}

?>