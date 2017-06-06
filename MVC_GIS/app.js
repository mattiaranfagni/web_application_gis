$(document).ready(function() {
	$('#pagepiling').pagepiling({
	    anchors: ['firstPage', 'secondPage', 'thirdPage', 'fourthPage', 'lastPage'],
        menu: '#myMenu',
        direction: 'vertical',
        verticalCentered: true,
        sectionsColor: [],
        scrollingSpeed: 700,
        easing: 'swing',
        loopBottom: false,
        loopTop: false,
        css3: true,
        navigation: {
            'textColor': '#000',
            'bulletsColor': '#000',
            'position': 'right',
            'tooltips': ['section1', 'section2', 'section3', 'section4']
        },
       	normalScrollElements: null,
        normalScrollElementTouchThreshold: 5,
        touchSensitivity: 5,
        keyboardScrolling: true,
        sectionSelector: '.section',
        animateAnchor: false,

		//events
		onLeave: function(index, nextIndex, direction){},
		afterLoad: function(anchorLink, index){},
		afterRender: function(){},
		
	});
	  $(window).on('resize',function() {
      $('#mapid').height(600);
  });
    var map = new L.Map('mapid', { center: new L.LatLng(44.005560919082903,11.236960037078143), zoom: 12});
    L.esri.basemapLayer('Imagery').addTo(map);
    L.esri.dynamicMapLayer({
    url: 'https://services.arcgisonline.com/arcgis/rest/services/Specialty/Soil_Survey_Map/MapServer',
    opacity: 0.7
  }).addTo(map);
});