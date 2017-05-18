<?php
try {
    $dbh=new PDO('pgsql:host=127.0.0.1;port=5432;dbname=provapostgis_postgres;user=useraccessoqgis;password=ubuntu');
    $stm= $dbh->prepare('SELECT ST_AsGeoJSON(shape) as shape FROM schema_db_alternanza.anagrafica WHERE codanagrafica=:anag');
    $stm->bindValue(':anag',$_GET['idanag']);
    if($stm->execute()) {}
    $anagrafica=$stm ->fetchAll();
    $objjson = json_encode($anagrafica);
    print($objjson);
}
catch(PDOException $e) {}

?>

