<?php

$directories = array(
    "core",
    "controllers",
    "services",
    "models"
);

foreach ($directories as $dir) {
    $fileList = array_diff(
        scandir($dir),
        array('..', '.')
    );

    foreach ($fileList as $file) {
        include_once($dir."/".$file);
    }
}