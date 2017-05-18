<?php
try {
    $dbh=new PDO('pgsql:host=127.0.0.1;port=5432;dbname=provapostgis_postgres;user=useraccessoqgis;password=ubuntu');
    if($_GET['comune'] == 0 ) {
         $stm= $dbh->prepare('SELECT a.codanagrafica,a.documento,a.nmedpers,a.nmaxpers,a.denominazione,a.codistatcomune,a.idproprieta,a.indirizzo,a.foglio,a.hgg,a.mesianno,a.particella,a.posizioneedificio,c.nomecomune,COUNT(a.codanagrafica) as numerous,ST_AsGeoJSON(a.shape) as shape FROM schema_db_alternanza.anagrafica as a JOIN schema_db_alternanza.comune as c ON a.codistatcomune=c.codistatcomune LEFT JOIN schema_db_alternanza.us ON us.codanagrafica=a.codanagrafica WHERE lower(denominazione) LIKE ? GROUP BY a.codanagrafica,a.documento,a.nmedpers,a.nmaxpers,a.denominazione,a.codistatcomune,a.idproprieta,a.indirizzo,a.foglio,a.hgg,a.mesianno,a.particella,a.posizioneedificio,c.nomecomune,a.shape;');
         $stm->bindValue(1,'%'.strtolower($_GET['denom']).'%');
        
    }
    else {
        $stm= $dbh->prepare('SELECT a.codanagrafica,a.documento,a.nmedpers,a.nmaxpers,a.denominazione,a.codistatcomune,a.idproprieta,a.indirizzo,a.foglio,a.hgg,a.mesianno,a.particella,a.posizioneedificio,c.nomecomune,COUNT(a.codanagrafica) as numerous,ST_AsGeoJSON(a.shape) as shape FROM schema_db_alternanza.anagrafica as a JOIN schema_db_alternanza.comune as c ON a.codistatcomune=c.codistatcomune LEFT JOIN schema_db_alternanza.us ON us.codanagrafica=a.codanagrafica WHERE lower(denominazione) LIKE ? AND a.codistatcomune=? GROUP BY a.codanagrafica,a.documento,a.nmedpers,a.nmaxpers,a.denominazione,a.codistatcomune,a.idproprieta,a.indirizzo,a.foglio,a.hgg,a.mesianno,a.particella,a.posizioneedificio,c.nomecomune,a.shape;');
        $stm->bindValue(1,'%'.strtolower($_GET['denom']).'%');
        $stm->bindValue(2,$_GET['comune']);
        
    }
    if($stm->execute()) {}
    $anagrafica=$stm ->fetchAll();
    $objjson = json_encode($anagrafica);
    print($objjson);
}
catch(PDOException $e) {}

?>