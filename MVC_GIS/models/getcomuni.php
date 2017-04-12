<?php
try {
    $dbh=new PDO('pgsql:host=127.0.0.1;port=5432;dbname=provapostgis_postgres;user=useraccessoqgis;password=ubuntu');
    $stm= $dbh->prepare('SELECT codistatcomune,nomecomune FROM schema_db_alternanza.comuni ORDER BY nomecomune asc;');
    if($stm->execute()) {}
    $comuni=$stm ->fetchAll();
    $objjson = json_encode($comuni);
    print($objjson);
}
catch(PDOException $e) {}

?>