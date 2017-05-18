$(document).ready(function() {
    var ar=new Array(33,34,35,36,37,38,39,40);
    $(document).keydown(function(e) {
         var key = e.which;
          //console.log(key);
          //if(key==35 || key == 36 || key == 37 || key == 39)
          if($.inArray(key,ar) > -1) {
              e.preventDefault();
              return false;
          }
          return true;
    });
    $('.pushpin-demo-nav').each(function() {
      var $this = $(this);
      var $target = $('#' + $(this).attr('data-target'));
      $this.pushpin({
        top: $target.offset().top,
        bottom: $target.offset().top + $target.outerHeight() - $this.height()
      });
    });
   $('#mapid').height($('#sezmap').height()-$('#mapnav').height());
   $('#mapid').css("margin-top",$('#mapnav').height());
  $(window).on('resize',function() {
      $('#mapid').height($('#sezmap').height()-$('#mapnav').height());
      $('#mapid').css("margin-top",$('#mapnav').height());
  });
    var map = new L.Map('mapid', { center: new L.LatLng(44.005560919082903,11.236960037078143), zoom: 12});
    L.esri.basemapLayer('Imagery').addTo(map);
    L.esri.dynamicMapLayer({
    url: 'https://services.arcgisonline.com/arcgis/rest/services/Specialty/Soil_Survey_Map/MapServer',
    opacity: 0.7
  }).addTo(map);
   $.getJSON('/MVC_GIS/models/getdata.php',function(response) {
      if(response) {
          var geojsonfile= {
              "type": "FeatureCollection",
              "features": []
          };
          $.each(response,function(k,v) {
              var feature = {
                  "type": "Feature",
                  "properties": {
                      "codanagrafica": v['codanagrafica'],
                      "documento": v['documento'],
                      "denominazione" : v['denominazione'],
                  },
                  "geometry": JSON.parse(v['shape'])
              }
              geojsonfile.features.push(feature);
          });
          L.geoJSON(geojsonfile,{
              onEachFeature: function(feature, layer) {
                  var html='<table class="highlighted">';
                  for(var prop in feature.properties) {
                      html += '<tr> <th> '+prop+' </th> <td>'+feature.properties[prop]+'</td> </tr> ';
                  };
                  html += '</table> <div> <button class="waves-effect waves-light btn btnshowmore center-align" value="'+feature.properties['codanagrafica']+'" type="button" > Show more </button> </div>';
                  layer.bindPopup(html);
              }
          }).addTo(map);

          $('#mapid').trigger('loadSideNav');
      }
  });
  $('select').material_select();
  $.getJSON('/MVC_GIS/models/getcomuni.php',function(response) {
            if(response) {
                $.each(response,function(k,v) {
                    $('#comuneric').append('<option value="'+v['codistatcomune']+'" >'+v['nomecomune']+'</option>');
                    $('#comuneanag').append('<option value="'+v['codistatcomune']+'" >'+v['nomecomune']+'</option>');
                });
                $('#comuneric').trigger("loadSelect");
                $('#comuneanag').trigger("loadSelect");
            }
  });
  $.getJSON('/MVC_GIS/models/getdenominazione.php',function(response) {
            if(response) {
                $('input.autocomplete').autocomplete({
                    data: response,
                    limit: 20, // The max amount of results that can be shown at once. Default: Infinity.
                    onAutocomplete: function(val) {
                      // Callback function when value is autcompleted.
                    },
                    minLength: 1, // The minimum length of the input for the autocomplete to start. Default: 1.
                });
            }
  });
      
  $(document).on('loadSelect','#comuneric', function() {
        $('#comuneric').material_select();
    });
  $(document).on('loadSelect','#tipousotbl', function() {
        $('#tipousotbl').material_select();
    });
    $(document).on('loadSelect','#comuneanag', function() {
        $('#comuneanag').material_select();
    });
  $(document).on('loadSideNav','#mapid',function() {
    $('.button-collapse').sideNav({
      menuWidth: 500, // Default is 240
      edge: 'right', // Choose the horizontal origin
      closeOnClick: false // Closes side-nav on <a> clicks, useful for Angular/Meteor
    });

  });
  $(document).on('click','.btnshowmore',function() {
    $('.button-collapse').sideNav('show');
    $('#content-side-nav').empty();
    $.getJSON('/MVC_GIS/models/getmore.php',{ idanag : $(this).val() },function(response) {
            if(response) {
                var table=$('<div class="collection"></div>');
                    $.each(response,function(k,v) {
                        //table.append('<tr> <th> Codice anagrafica </th> <td>'+v['codiceanagrafica']+'</td> </tr> <tr> <th> Denominazione </th> <td>'+v['denominazione']+'</td> </tr> <tr> <th> Documento </th> <td>'+v['documento']+'</td> </tr> <tr> <th> Indirizzo </th> <td>'+v['indirizzo']+'</td> </tr> <tr> <th> Comune </th> <td>'+v['nomecomune']+'</td> </tr> <tr> <th> Codice Istat comune </th> <td>'+v['idcomune']+'</td> </tr> <tr> <th> Numero medio di persone </th> <td>'+v['nmedpers']+'</td> </tr> <tr> <th> Numero massimo di persone </th> <td>'+v['nmaxpers']+'</td> </tr> <tr> <th> Mesi di utilizzo all'+"'"+' anno </th> <td>'+v['mesianno']+'</td> </tr> <tr> <th> Foglio </th> <td>'+v['foglio']+'</td> </tr> <tr> <th> Ore di utilizzo giornaliere </th> <td>'+v['hgg']+'</td> </tr> <tr> <th> Particella </th> <td>'+v['particella']+'</td> </tr> <tr> <th> Posizione Edificio </th> <td>'+v['posizioneedificio']+'</td> </tr> <tr> <th> Propriet&agrave; </th> <td>'+v['proprieta']+'</td> </tr> <tr> <th> Numero unit&agrave; strutturali </th> <td>'+v['numerous']+'</td> </tr>');
                        table.append('<a class="collection-item active"><b>Codice Anagrafica</b> &nbsp '+v['codanagrafica']+'</a><a class="collection-item"><b>Denominazione</b> &nbsp '+v['denominazione']+'</a><a class="collection-item"><b>Documento</b> &nbsp '+v['documento']+'</a><a class="collection-item"><b>Indirizzo</b> &nbsp '+v['indirizzo']+'</a><a class="collection-item"><b>Comune</b> &nbsp '+v['nomecomune']+'</a><a class="collection-item"><b>Codice Istat Comune</b> &nbsp '+v['codistatcomune']+'</a><a class="collection-item"><b>Numero massimo di persone </b> &nbsp '+v['nmaxpers']+'</a><a class="collection-item"><b> Mesi di utilizzo all'+"'"+' anno</b> &nbsp '+v['mesianno']+'</a><a class="collection-item"><b> Foglio </b> &nbsp '+v['foglio']+'</a><a class="collection-item"><b> Ore di utilizzo giornaliere </b> &nbsp '+v['hgg']+'</a><a class="collection-item"><b> Particella </b> &nbsp '+v['particella ']+'</a><a class="collection-item"><b> Posizione Edificio </b> &nbsp '+v['posizioneedificio']+'</a><a class="collection-item"><b>Propriet&agrave; </b> &nbsp '+v['idproprieta']+'</a> <a class="collection-item"><b> Numero di unit&agrave; strutturali </b> &nbsp '+v['numerous']+'</a>');
                    });            
                $('#content-side-nav').append(table);
                
            }
        });
  });
  $(document).on('change','#usotbl',function() {
      if($('#usotbl').val() != 0 ){
          $('#tipousotbl').empty();
          $.getJSON('/MVC_GIS/models/gettipouso.php', {uso : $('#usotbl').val() } ,function(response) {
                    if(response) {
                        $.each(response,function(k,v) {
                            $('#tipousotbl').append('<option value="'+v['idtipousotbl']+'" ><blockquote>'+v['idtipousotbl']+' </blockquote>'+v['descrizioneuso']+'</option>');
                        });
                        $('#tipousotbl').trigger("loadSelect");
                    }
          });
      }
  });
  
$('#btnSearch').click(function(){
        $('#search-result').empty();
        map.eachLayer(function(layer) {
            if(typeof layer._url === "undefined") {
                map.removeLayer(layer);
            }
        });
        var search=$('<div class="collection"></div>');
        $.getJSON('/MVC_GIS/models/search.php',{ denom : $('#denominazione').val(),comune: $('#comuneric').val() },function(response) {
            if(response) {
                var geojsonfile= {
                "type": "FeatureCollection",
                "features": []
                };
                $.each(response,function(k,v) {
                        search.append('<a class="collection-item onresult" value="'+v['codanagrafica']+'"><b>'+v['codanagrafica']+'</b> &nbsp '+v['denominazione']+'</a>');
                        var feature = {
                        "type": "Feature",
                        "properties": {
                            "codanagrafica": v['codanagrafica'],
                            "documento": v['documento'],
                            "denominazione" : v['denominazione'],
                        },
                        "geometry": JSON.parse(v['shape'])
                        }
                        geojsonfile.features.push(feature);
                });
                L.geoJSON(geojsonfile, {
                onEachFeature: function(feature, layer) {
                    var html='<table class="highlighted">';
                    for(var prop in feature.properties) {
                        html += '<tr> <th> '+prop+' </th> <td>'+feature.properties[prop]+'</td> </tr> ';
                    };
                    html += '</table> <div> <button class="waves-effect waves-light btn btnshowmore center-align" value="'+feature.properties['codanagrafica']+'" type="button" > Show more </button> </div>';
                    layer.bindPopup(html,{closeButton:true,autoClose:false});
                }
                }).addTo(map);
                $('#search-result').append(search);
            }
        });
        
    });
  
   $(document).on('click','.onresult',function() {
     var idanag = $(this).attr('value');
     $("html, body").stop(true,true).animate({ scrollTop: 0 }, "slow","swing",function() {
        
         });
         
         $.getJSON('/MVC_GIS/models/getsingleshapeanag.php',{idanag : idanag}, function(response) 
            {
              if(response) 
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
                  var mappa = L.geoJSON(geojsonfile, {
                onEachFeature: function(feature, layer) {
                    var html='<table class="responsive-table striped">';
                    for(var prop in feature.properties) {
                        html += '<tr> <th> '+prop+' </th> <td>'+feature.properties[prop]+'</td> </tr> ';
                    };
                    html += '</table> <div> <button class="waves-effect waves-light btn btnshowmore center-align" value="'+feature.properties['codanagrafica']+'" type="button" > Show more </button> </div>';
                    layer.bindPopup(html,{closeButton:true,autoClose:false});
                }
                }).addTo(map);
                  
                  map.flyToBounds(mappa.getBounds());
                  map.removeLayer(mappa);
                  
              }
            });
            $('.button-collapse').sideNav('show');
            $('#content-side-nav').empty();
            $.getJSON('/MVC_GIS/models/getmore.php',{ idanag : idanag },function(response) {
                    if(response) {
                        var table=$('<div class="collection"></div>');
                            $.each(response,function(k,v) {
                                table.append('<a class="collection-item active"><b>Codice Anagrafica</b> &nbsp '+v['codanagrafica']+'</a><a class="collection-item"><b>Denominazione</b> &nbsp '+v['denominazione']+'</a><a class="collection-item"><b>Documento</b> &nbsp '+v['documento']+'</a><a class="collection-item"><b>Indirizzo</b> &nbsp '+v['indirizzo']+'</a><a class="collection-item"><b>Comune</b> &nbsp '+v['nomecomune']+'</a><a class="collection-item"><b>Codice Istat Comune</b> &nbsp '+v['codistatcomune']+'</a><a class="collection-item"><b>Numero massimo di persone </b> &nbsp '+v['nmaxpers']+'</a><a class="collection-item"><b> Mesi di utilizzo all'+"'"+' anno</b> &nbsp '+v['mesianno']+'</a><a class="collection-item"><b> Foglio </b> &nbsp '+v['foglio']+'</a><a class="collection-item"><b> Ore di utilizzo giornaliere </b> &nbsp '+v['hgg']+'</a><a class="collection-item"><b> Particella </b> &nbsp '+v['particella ']+'</a><a class="collection-item"><b> Posizione Edificio </b> &nbsp '+v['posizioneedificio']+'</a><a class="collection-item"><b>Propriet&agrave; </b> &nbsp '+v['idproprieta']+'</a> <a class="collection-item"><b> Numero di unit&agrave; strutturali </b> &nbsp '+v['numerous']+'</a>');
                            });            
                        $('#content-side-nav').append(table);
                        
                    }
                });
   });
  
  $('#mappabtn').click(function() {
    $("html, body").animate({ scrollTop: 0 }, "slow");
  });
  $('#ricercabtn').click(function() {
    var elementOffset = $('#sezric').offset().top;
    $("html, body").stop(true,true).animate({ scrollTop: elementOffset }, "slow","swing",function() {
      elementOffset = $('#sezric').offset().top;
      $("html, body").stop(true,true).animate({ scrollTop: elementOffset }, "slow");
    });


  });
    $('#inserimentobtn').click(function() {
      var elementOffset = $('#sezins').offset().top;
      $("html, body").animate({ scrollTop: elementOffset }, "slow");
  });

});