<?php
try {
    $dbh=new PDO('pgsql:host=127.0.0.1;port=5432;dbname=provapostgis_postgres;user=useraccessoqgis;password=ubuntu');
    $stm= $dbh->prepare('SELECT idanagrafica,codiceanagrafica,documento,nmedpers,nmaxpers,denominazione, ST_AsGeoJSON(shape) as shape FROM schema_db_alternanza.anagrafiche ORDER BY schema_db_alternanza.anagrafiche.idanagrafica ASC');
    if($stm->execute()) {}
    $anagrafica=$stm ->fetchAll();
    $objjson = json_encode($anagrafica);
    print($objjson);
}
catch(PDOException $e) {}

?>


