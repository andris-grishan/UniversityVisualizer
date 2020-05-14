<?php

class ModelHandler {
    public $id = "";
    public $changedate = "";

    private $modelName = "";
    private $pathToObject = "";
    private $fileInputArr = array(
        "images"
    );

    function __construct() {    
        global $_dataBasePath;

        $this->modelName = get_class($this);
        $this->pathToObject = sprintf(
            "%s/%s",
            $_dataBasePath,
            $this->modelName
        );

        if (!file_exists($this->pathToObject)) {
            mkdir($this->pathToObject, 0777, true);
        }
    }

    #region Open/Save/Remove/GetList

    public function Open($id) {
        global $_fileFolder, $_siteUrl, $_dateFormat;

        $filePath = $this->GetPathToObject($id);

        if (file_exists($filePath)) {
            $jsonContent = file_get_contents($filePath);

            if ($jsonContent === false) {
                return null;
            }

            $jsonObject = json_decode($jsonContent, true);
            if ($jsonObject === null) {
                return null;
            }

            foreach ($jsonObject as $fieldKey => $fieldValue) {
                $this->$fieldKey = $fieldValue;

                if (in_array($fieldKey, $this->fileInputArr)) {
                    foreach ($this->$fieldKey as $fileKey => $fileName) {
                        $this->$fieldKey[$fileKey] = $_siteUrl . $_fileFolder . "/" . $fileName;
                    }
                }
            }
        } else {
            $this->id = $id;
            $this->changedate = (new DateTime())->format($_dateFormat);
            $this->Save("create");
        }
    }

    public function Save($action) {
        $filePath = $this->GetPathToObject($this->id);

        if ($action == "create") {
            if (file_exists($filePath)) {
                return "Record with such Id already exists!";
            }
        }

        $fileContent = json_encode(
            $this,
            JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT
        );

        $file = fopen($filePath, "w") or die("Unable to open file!");
        fwrite($file, $fileContent);
        fclose($file);

        return null;
    }

    public function Remove($id) {
        $recordPath = $this->GetPathToObject($id);

        if (file_exists($recordPath)) {
            unlink($recordPath);
        }
    }

    public function GetList() {
        $dataArr = array();
        $fileArr = array_diff(
            scandir($this->pathToObject),
            array('..', '.')
        );

        foreach ($fileArr as $fileName) {
            $jsonContent = file_get_contents(
                $this->pathToObject."/".$fileName
            );

            if ($jsonContent !== false) {
                $jsonObject = json_decode($jsonContent, true);

                if (!empty($jsonObject)) {
                    $dataArr[$jsonObject["id"]] = $jsonObject;
                }
            }
        }

        return $dataArr;
    }

    #endregion

    #region HELPERS

    public function GetFromPost() {
        global $_data;

        $reflect = new ReflectionClass($this);
        $propsArr = $reflect->getProperties(ReflectionProperty::IS_PUBLIC);

        foreach ($propsArr as $prop) {
            $fieldName = $prop->name;
            $this->$fieldName = empty($_data[$fieldName]) ? null : $_data[$fieldName];

            if (
                in_array($fieldName, $this->fileInputArr)
                && !empty($this->$fieldName)
            ) {
                $this->$fieldName = json_decode($this->$fieldName, true);
            }
        }
    }

    // private function SaveFilesInModel() {
    //     $fileHandler = new FileHandler();
        
    //     foreach ($this->fileInputArr as $fileInput) {
    //         if (!empty($this->$fileInput)) {
    //             $fileNamesArr = array();

    //             $fileCount = empty($this->$fileInput["name"])
    //                 ? 0 
    //                 : (
    //                     is_array($this->$fileInput["name"]) && !empty($this->$fileInput["name"][0])
    //                         ? count($this->$fileInput["name"])
    //                         : (
    //                             is_array($this->$fileInput["name"]) 
    //                             || empty($this->$fileInput["name"]) 
    //                                 ? 0 : 1
    //                         )
    //                 );
                
    //             for ($i = 0; $i < $fileCount; $i++) {
    //                 $file = array(
    //                     "name" => $this->$fileInput["name"][$i],
    //                     "tmp_name" => $this->$fileInput["tmp_name"][$i]
    //                 );

    //                 array_push(
    //                     $fileNamesArr,
    //                     $fileHandler->Save($file)
    //                 );
    //             }

    //             $this->$fileInput = $fileNamesArr;
    //         }
    //     }
    // }

    private function GetPathToObject($id) {
        return sprintf(
            "%s/%s.json",
            $this->pathToObject,
            $id
        );
    }

    #endregion
}

?>