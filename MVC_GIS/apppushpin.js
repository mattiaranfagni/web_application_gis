$(document).ready(function() {

  $('.pushpin-demo-nav').each(function() {
    var $this = $(this);
    var $target = $('#' + $(this).attr('data-target'));
    $this.pushpin({
      top: $target.offset().top,
      bottom: $target.offset().top + $target.outerHeight() - $this.height()
    });
  });
 // var navheight = $('#blue > nav-wrapper').height();
 // $('#mapid').css("margin-top",navheight);
 // $('#mapid').height($(window).height()-navheight);
 $('#mapid').height($('#blue').height()-$('#bluenav').height());
 $('#mapid').css("margin-top",$('#bluenav').height());
    $(window).on('resize',function() {
      //$('#mapid').css("margin-top",navheight);
      //$('#mapid').height($(window).height()-navheight);
      $('#mapid').height($('#blue').height()-$('#bluenav').height());
      $('#mapid').css("margin-top",$('#bluenav').height());
  });
    var map = new L.Map('mapid', { center: new L.LatLng(44.005560919082903,11.236960037078143), zoom: 12});
    L.esri.basemapLayer('Imagery').addTo(map);
    L.esri.dynamicMapLayer({
    url: 'https://services.arcgisonline.com/arcgis/rest/services/Specialty/Soil_Survey_Map/MapServer',
    opacity: 0.7
  }).addTo(map);
  
  $('#mappabtn').click(function() {
    $("html, body").animate({ scrollTop: 0 }, "slow");
  });
  $('#ricercabtn').click(function() {
      var elementOffset = $('#red').offset().top;
      $("html, body").animate({ scrollTop: elementOffset }, "slow");
  });
    $('#inserimentobtn').click(function() {
      var elementOffset = $('#green').offset().top;
      $("html, body").animate({ scrollTop: elementOffset }, "slow");
  });

});