<?php
try {
    $dbh=new PDO('pgsql:host=127.0.0.1;port=5432;dbname=provapostgis_postgres;user=useraccessoqgis;password=ubuntu');
    $stm= $dbh->prepare('SELECT denominazione FROM schema_db_alternanza.anagrafiche ;');
    if($stm->execute()) {}
    $denominazioni = array();
    while($row = $stm->fetch() ){
        $denominazione = $row['denominazione'];
        $denominazioni[''.$denominazione.''] = null;
       // print_r($denominazione);
        
    }
    //print_r($denominazioni);
    $objjson = json_encode($denominazioni);
    print($objjson);
    //print('ciao');
}
catch(PDOException $e) {}

?>