<?php
try {
    $dbh=new PDO('pgsql:host=127.0.0.1;port=5432;dbname=provapostgis_postgres;user=useraccessoqgis;password=ubuntu');
    $stm= $dbh->prepare('SELECT a.codanagrafica,a.documento,a.nmedpers,a.nmaxpers,a.denominazione,a.codistatcomune,a.idproprieta,a.indirizzo,a.foglio,a.hgg,a.mesianno,a.particella,a.posizioneedificio,c.nomecomune,COUNT(*) as numerous FROM schema_db_alternanza.anagrafica AS a INNER JOIN schema_db_alternanza.comune AS c ON a.codistatcomune=c.codistatcomune LEFT JOIN schema_db_alternanza.us ON us.codanagrafica=a.codanagrafica WHERE a.codanagrafica=:idanag GROUP BY a.codanagrafica,a.documento,a.nmedpers,a.nmaxpers,a.denominazione,a.codistatcomune,a.idproprieta,a.indirizzo,a.foglio,a.hgg,a.mesianno,a.particella,a.posizioneedificio,c.nomecomune;');
    $stm->bindValue(':idanag',$_GET['idanag']);
    if($stm->execute()) {}
    $anagrafica=$stm ->fetchAll();
    $objjson = json_encode($anagrafica);
    print($objjson);
}
catch(PDOException $e) {}

?>