$(document).ready(function() {
    $('select').material_select();
    var table;
    var denominazioni="";
    $('.progress').hide();
    $('#mapid').height($(window).height());
    $('#optCol').height($(window).height());
    $(window).on('resize',function() {
        $('#mapid').height($(window).height());
        $('#optCol').height($(window).height());
    });
    var map = new L.Map('mapid', { center: new L.LatLng(44.005560919082903,11.236960037078143), zoom: 12});
    L.esri.basemapLayer('Imagery').addTo(map);
    L.esri.dynamicMapLayer({
    url: 'https://services.arcgisonline.com/arcgis/rest/services/Specialty/Soil_Survey_Map/MapServer',
    opacity: 0.7
  }).addTo(map);
    //L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png').addTo(map);
    /*map.eachLayer(function(layer) {
        if(typeof layer._url === "undefined") {
            map.removeLayer(layer);
        }
    });*/
    $('.progress').show();
   $.getJSON('/MVC_GIS/models/getdata.php',function(response) {
        if(response) {
            var geojsonfile= {
                "type": "FeatureCollection",
                "features": []
            };
            table=$('<table class="responsive-table striped"> </table>');
            table.append('<thead> <tr> <th> Id Anagrafica </th>  <th> Codice Anagrafica </th> <th> Denominazione </th> <th> Documento </th>  </tr> </thead>');
            $.each(response,function(k,v) {
                var feature = {
                    "type": "Feature",
                    "properties": {
                        "idanagrafica": v['idanagrafica'],
                        "codiceanagrafica": v['codiceanagrafica'],
                        "documento": v['documento'],
                        "Denominazione" : v['denominazione'],
                    },
                    "geometry": JSON.parse(v['shape'])
                }
                geojsonfile.features.push(feature);
                table.append('<tr> <td>'+v['idanagrafica']+'</td> <td>'+v['codiceanagrafica']+'</td> <td>'+v['denominazione']+'</td> <td>'+v['documento']+'</td>  </tr>');
            });
            L.geoJSON(geojsonfile, {
                onEachFeature: function(feature, layer) {
                    var html='<table class="responsive-table striped">';
                    for(var prop in feature.properties) {
                        html += '<tr> <th> '+prop+' </th> <td>'+feature.properties[prop]+'</td> </tr> ';
                    };
                    //html += '<input type="hidden" value="'+feature.properties['idanagrafica']+'">';
                    html += '</table> <div> <button class="waves-effect waves-light btn btnshowmore center-align" value="'+feature.properties['idanagrafica']+'" type="button" > Show more </button> </div>';
                    layer.bindPopup(html);
                }
            }).addTo(map);
            $('#contentEv').append(table);
            
        }
    });
    $('.progress').hide();
    $('#btnCerca').click(function() {
        $('#contentEv').empty();
        var form =$('<div class="row"><form class="col s12"><div class="row"> <div class="input-field col s12"><textarea id="denominazione" class="materialize-textarea"></textarea><label for="denominazione">Denominazione</label></div></div><div class="input-field col s6"><select id="comune"> <option value="0" selected>Non specificato</option> </select> <label>Comune</label></div><div class="row"><div class="input-field col s6"><button type="button" class="waves-effect waves-light btn" id="btnSearch">Cerca</button> </div></div></form></div>');
        $('#contentEv').append(form);
        $('#comune').material_select();
        $.getJSON('/MVC_GIS/models/getcomuni.php',function(response) {
            if(response) {
                $.each(response,function(k,v) {
                    $('#comune').append('<option value="'+v['codistatcomune']+'" >'+v['nomecomune']+'</option>');
                });
                $('#comune').trigger("loadSelect");
            }
        });
        
    });
    $('#btnAnagrafiche').click(function() {
        $('#contentEv').empty();
        $('#contentEv').append(table); 
    });
    $(document).on('click','#btnSearch',function(){
        $('#collections').remove();
        map.eachLayer(function(layer) {
            if(typeof layer._url === "undefined") {
                map.removeLayer(layer);
            }
        });
        var search=$('<ul id="collections" class="collapsible" data-collapsible="accordion"> </ul>');
        $.getJSON('/MVC_GIS/models/search.php',{ denom : $('#denominazione').val(),comune: $('#comune').val() },function(response) {
            if(response) {
                var geojsonfile= {
                "type": "FeatureCollection",
                "features": []
                };
                $.each(response,function(k,v) {
                        search.append('<li><div value="'+v['idanagrafica']+'" class="optsearch collapsible-header">'+v['denominazione']+'</div><div class="collapsible-body"><table> <tr> <th> Codice anagrafica </th> <td>'+v['codiceanagrafica']+'</td> </tr> <tr> <th> Denominazione </th> <td>'+v['denominazione']+'</td> </tr> <tr> <th> Documento </th> <td>'+v['documento']+'</td> </tr> <tr> <th> Indirizzo </th> <td>'+v['indirizzo']+'</td> </tr> <tr> <th> Comune </th> <td>'+v['nomecomune']+'</td> </tr> <tr> <th> Codice Istat comune </th> <td>'+v['idcomune']+'</td> </tr> <tr> <th> Numero medio di persone </th> <td>'+v['nmedpers']+'</td> </tr> <tr> <th> Numero massimo di persone </th> <td>'+v['nmaxpers']+'</td> </tr> <tr> <th> Mesi di utilizzo all'+"'"+' anno </th> <td>'+v['mesianno']+'</td> </tr> <tr> <th> Foglio </th> <td>'+v['foglio']+'</td> </tr> <tr> <th> Ore di utilizzo giornaliere </th> <td>'+v['hgg']+'</td> </tr> <tr> <th> Particella </th> <td>'+v['particella']+'</td> </tr> <tr> <th> Posizione Edificio </th> <td>'+v['posizioneedificio']+'</td> </tr> <tr> <th> Propriet&agrave; </th> <td>'+v['proprieta']+'</td> </tr> <tr> <th> Numero unit&agrave; strutturali </th> <td>'+v['numerous']+'</td> </tr></table></div></li>');
                        var feature = {
                        "type": "Feature",
                        "properties": {
                            "idanagrafica": v['idanagrafica'],
                            "codiceanagrafica": v['codiceanagrafica'],
                            "documento": v['documento'],
                            "Denominazione" : v['denominazione'],
                        },
                        "geometry": JSON.parse(v['shape'])
                        }
                        geojsonfile.features.push(feature);
                });
                L.geoJSON(geojsonfile, {
                onEachFeature: function(feature, layer) {
                    var html='<table class="responsive-table striped">';
                    for(var prop in feature.properties) {
                        html += '<tr> <th> '+prop+' </th> <td>'+feature.properties[prop]+'</td> </tr> ';
                    };
                    html += '</table> <div> <button class="waves-effect waves-light btn btnshowmore center-align" value="'+feature.properties['idanagrafica']+'" type="button" > Show more </button> </div>';
                    layer.bindPopup(html);
                }
                }).addTo(map);
                $('#contentEv').append(search);
                $('.collapsible').collapsible();
            }
        });
        
    });
    $(document).on('loadSelect','#comune', function() {
        $('#comune').material_select();
    });
    $(document).on('click','.optsearch', function() {
         var idanag = $(this).attr('value');
         $.getJSON('/MVC_GIS/models/getsingleshapeanag.php',{idanag : idanag}, function(response) 
            {
                var geojsonfile= {
                "type": "FeatureCollection",
                "features": []
                };
                $.each(response,function(k, v) {
                    var feature = {
                        "type": "Feature",
                        "properties": {},
                        "geometry": JSON.parse(v['shape'])
                    }
                    geojsonfile.features.push(feature);
                });
               // alert(JSON.stringify(geojsonfile));
                
                var mappa = L.geoJSON(geojsonfile).addTo(map);
                map.flyToBounds(mappa.getBounds());
                map.removeLayer(mappa);
         });
    });
    $(document).on('click','.btnshowmore',function(){
        $('#contentEv').empty();
        $.getJSON('/MVC_GIS/models/getmore.php',{ idanag : $(this).val() },function(response) {
            if(response) {
                var table=$('<table class="responsive-table striped"> <tbody> </tbody> </table>');
                    $.each(response,function(k,v) {
                        table.append('<tr> <th> Codice anagrafica </th> <td>'+v['codiceanagrafica']+'</td> </tr> <tr> <th> Denominazione </th> <td>'+v['denominazione']+'</td> </tr> <tr> <th> Documento </th> <td>'+v['documento']+'</td> </tr> <tr> <th> Indirizzo </th> <td>'+v['indirizzo']+'</td> </tr> <tr> <th> Comune </th> <td>'+v['nomecomune']+'</td> </tr> <tr> <th> Codice Istat comune </th> <td>'+v['idcomune']+'</td> </tr> <tr> <th> Numero medio di persone </th> <td>'+v['nmedpers']+'</td> </tr> <tr> <th> Numero massimo di persone </th> <td>'+v['nmaxpers']+'</td> </tr> <tr> <th> Mesi di utilizzo all'+"'"+' anno </th> <td>'+v['mesianno']+'</td> </tr> <tr> <th> Foglio </th> <td>'+v['foglio']+'</td> </tr> <tr> <th> Ore di utilizzo giornaliere </th> <td>'+v['hgg']+'</td> </tr> <tr> <th> Particella </th> <td>'+v['particella']+'</td> </tr> <tr> <th> Posizione Edificio </th> <td>'+v['posizioneedificio']+'</td> </tr> <tr> <th> Propriet&agrave; </th> <td>'+v['proprieta']+'</td> </tr> <tr> <th> Numero unit&agrave; strutturali </th> <td>'+v['numerous']+'</td> </tr>');
                    });            
                $('#contentEv').append(table);            
            }
        });
    });
});

















/*var filegeojson = [
        { "type": "Feature", "properties": { "id": 0, "CODICE": "48002A02", "Documento": "liv0RT-liv0DPC", "Istat_Prov": "048", "Istat_Com": "002", "Comune": "Barberino di Mugello", "Foglio": "78", "Denomin": "Scuola Media Lorenzo De' Medici", "Indirizzo": "Via Agresti, 18 - Capoluogo", "Struttura": "c.a.", "N_US": "1", "Proprieta": "Comune", "Uso": "S04", "Anno_prog": "1972", "Anno_costr": "1974", "Rilevante": "SI", "Strategico": "NO", "Posiz_edif": "estremità", "Volume": "14555", "Piani_tot": "3", "hMedPiano": "3,45", "SupMedPian": "1400", "IntPreFin": "NO", "Tipo_int": null, "Anno_int": null, "N_MedPers": "305", "N_MaxPers": "333", "h_gg": "10", "mesi_anno": "10", "Note": null, "Segnalaz": "modificare geometria con terzo edificio non indagato", "Plla": 187 }, "geometry": { "type": "MultiPolygon", "coordinates": [ [ [ [ 11.236960037078143, 44.005560919082903 ], [ 11.237053995842189, 44.005186891517916 ], [ 11.237204387423315, 44.005202492301706 ], [ 11.237213841121083, 44.005165304469202 ], [ 11.237228675549485, 44.005111985758582 ], [ 11.237245507944781, 44.00503882113123 ], [ 11.237250425793967, 44.00501369623742 ], [ 11.236990341489506, 44.004986739246903 ], [ 11.236987217766785, 44.005003186033569 ], [ 11.236565271839195, 44.004957430452677 ], [ 11.236556158340257, 44.004997042403978 ], [ 11.236532648790185, 44.005121565211873 ], [ 11.236521630757325, 44.005176879814236 ], [ 11.23640993628956, 44.005165382124353 ], [ 11.236397135956054, 44.005219741272285 ], [ 11.236421190617001, 44.005222397565362 ], [ 11.236450627045066, 44.005225648145533 ], [ 11.236526283816632, 44.005234002668885 ], [ 11.236558079796259, 44.005237513776443 ], [ 11.236613198306246, 44.005243600279165 ], [ 11.236601544065156, 44.005301898363008 ], [ 11.236657706851062, 44.005307793818055 ], [ 11.236658648003328, 44.005307892611377 ], [ 11.236674378711033, 44.005228627546764 ], [ 11.236685393227347, 44.005173222968345 ], [ 11.236690227259666, 44.005149180109917 ], [ 11.236825988233985, 44.005163807458842 ], [ 11.236806272345166, 44.005261496477907 ], [ 11.236780984176949, 44.005386794805069 ], [ 11.236756442696947, 44.005384304379334 ], [ 11.236725893519154, 44.00553723474993 ], [ 11.236960037078143, 44.005560919082903 ] ] ] ] } }
        ];
        /*var filegeojson = $.getJSON('anagrafica.geojson',function() {
            console.log('Success!!');
        });*/
        
        
        
            /*map.on('popupopen',function(e) {
        //$('#contentEv').append();  //e.popup.getContent()
        //$('#contentEv').empty();
         var idanag = e.popup.getContent();
         alert($(idanag).find('input'));
         alert(idanag);
         $.getJSON('./getmore.php',{ idanagrafica : idanag },function(response)
         {
			if(response) {
				var table = $('<table class="table"> </table>');
				$.each(response,function(k,v) {
				    table.append('<tr>  <th> Id Anagrafica </th> <td> '+response['idanagrafica']+' </td>  </tr>');
				});
				$('#contentEv').append(table);
			}
		});
    });*/
    /*$(".buttonInfo").click(function() {
        alert('ciao');
    });*/