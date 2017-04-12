<?php
try {
    $dbh=new PDO('pgsql:host=127.0.0.1;port=5432;dbname=provapostgis_postgres;user=useraccessoqgis;password=ubuntu');
    if($_GET['comune'] == 0 ) {
         $stm= $dbh->prepare('SELECT a.idanagrafica,a.codiceanagrafica,a.documento,a.nmedpers,a.nmaxpers,a.denominazione,a.idcomune,a.proprieta,a.indirizzo,a.foglio,a.hgg,a.mesianno,a.particella,a.posizioneedificio,c.nomecomune,COUNT(*) as numerous,ST_AsGeoJSON(a.shape) as shape FROM schema_db_alternanza.anagrafiche as a JOIN schema_db_alternanza.comuni as c ON a.idcomune=c.codistatcomune LEFT JOIN schema_db_alternanza.us ON us.idanagrafica=a.codiceanagrafica WHERE lower(denominazione) LIKE ? GROUP BY a.codiceanagrafica,a.documento,a.nmedpers,a.nmaxpers,a.denominazione,a.idcomune,a.proprieta,a.indirizzo,a.foglio,a.hgg,a.mesianno,a.particella,a.posizioneedificio,c.nomecomune,a.shape,a.idanagrafica;');
         $stm->bindValue(1,'%'.strtolower($_GET['denom']).'%');
        
    }
    else {
        $stm= $dbh->prepare('SELECT a.idanagrafica,a.codiceanagrafica,a.documento,a.nmedpers,a.nmaxpers,a.denominazione,a.idcomune,a.proprieta,a.indirizzo,a.foglio,a.hgg,a.mesianno,a.particella,a.posizioneedificio,c.nomecomune,COUNT(*) as numerous,ST_AsGeoJSON(a.shape) as shape FROM schema_db_alternanza.anagrafiche as a JOIN schema_db_alternanza.comuni as c ON a.idcomune=c.codistatcomune LEFT JOIN schema_db_alternanza.us ON us.idanagrafica=a.codiceanagrafica WHERE lower(denominazione) LIKE ? AND idcomune=? GROUP BY a.codiceanagrafica,a.documento,a.nmedpers,a.nmaxpers,a.denominazione,a.idcomune,a.proprieta,a.indirizzo,a.foglio,a.hgg,a.mesianno,a.particella,a.posizioneedificio,c.nomecomune,a.shape,a.idanagrafica;');
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