var myx;
var myy;
var _googleMap = {
		
	//添加marker
	addMarker : function(tu,x,y,content){
		myx=x;
		myy=y;
		var point = new GLatLng(x,y);
		var blueIcon = new GIcon(G_DEFAULT_ICON);
		blueIcon.shadow = null;
		blueIcon.iconSize = new GSize(50, 50);
		blueIcon.iconAnchor = new GPoint(25, 25);
		blueIcon.infoWindowAnchor = new GPoint(25, 25);
		blueIcon.image = tu;
		                
		// Set up our GMarkerOptions object
		markerOptions = { icon:blueIcon };
		var marker = new GMarker(point,markerOptions);
		googleMap.addOverlay(marker);
		
		marker.openInfoWindowHtml(content);
		GEvent.addListener(marker,"click", function() {
	        marker.openInfoWindowHtml(content);
		});
		return marker;
	},
	
	clearAll:function(){
		googleMap.clearOverlays();
	},
	setZoom:function(zoom){
		var gLatLng = googleMap.getCenter();
		googleMap.setCenter(gLatLng,zoom);
	},
	setCenter:function(x,y){
		var point = new GLatLng(x,y);
		googleMap.setCenter(point);
	},
	setCenterAndZoom:function(x,y,zoom){
		var point = new GLatLng(x,y);
		googleMap.setCenter(point,zoom);
	},
	removeObjcet:function(obj){
		googleMap.removeOverlay(obj);
	},
	addLine:function(x1,y1,x2,y2){
		var destinationA = new GLatLng(x1,y1);
		var destinationB = new GLatLng(x2,y2);
		var line1 = new GPolyline([destinationA,destinationB],"#C00080", 5,0.7);
		googleMap.addOverlay(line1);
	},
	getBoundsZoomLevel:function (maxX,maxY,minX,minY){
		var sw = new GLatLng(minY,minX);  //西南
		var ne = new GLatLng(maxY,maxX);  //东北
		var bound = new GLatLngBounds(sw,ne);
		return googleMap.getBoundsZoomLevel(bound);
	}
	
};


