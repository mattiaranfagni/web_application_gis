<?php
try {
    $dbh=new PDO('pgsql:host=127.0.0.1;port=5432;dbname=provapostgis_postgres;user=useraccessoqgis;password=ubuntu');
    $stm= $dbh->prepare('SELECT idtipousotbl,descrizioneuso FROM schema_db_alternanza.tbl_tipouso WHERE idusotbl=:uso ORDER BY idtipousotbl asc;');
    $stm->bindValue(':uso',$_GET['uso']);
    if($stm->execute()) {}
    $comuni=$stm ->fetchAll();
    $objjson = json_encode($comuni);
    print($objjson);
}
catch(PDOException $e) {}

?>