<?php
try {
    $dbh=new PDO('pgsql:host=127.0.0.1;port=5432;dbname=provapostgis_postgres;user=useraccessoqgis;password=ubuntu');
    if($_GET['layeranagrafica'] == 1 ) {
         $stm= $dbh->prepare('SELECT denominazione FROM schema_db_alternanza.anagrafiche;');
    }
    else if($_GET['layeranagrafica'] == 2 ) {
            $stm= $dbh->prepare('SELECT denominazioneus as den FROM schema_db_alternanza.us;');       
    }
    else {
        $stm= $dbh->prepare('SELECT denominazione as den FROM schema_db_alternanza.anagrafiche;');
    }
    if($stm->execute()) {}
    $anagrafica=$stm ->fetchAll();
    $objjson = json_encode($anagrafica);
    print($objjson);
}
catch(PDOException $e) {}

?>