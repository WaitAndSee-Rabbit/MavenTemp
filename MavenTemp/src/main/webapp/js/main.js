
function winChange(havTree,size) {
	var height = document.documentElement.clientHeight - jx(".top").height()- jx(".menu").height() - jx("#foot").height() ;
	var width = document.documentElement.clientWidth - jx("#leftPanel").width()-20;
	jx("#center").height(height);
	jx("#rightPanel").width(width);
	jx(".rcontent").height(height-42);
	jx(".rcontent").width(width);
	
	if(havTree){
		jx(".lcontain").height(size);
		jx("#tree").height(height-36-34-size);
	}else{
		jx(".lcontain").height(height-42);
	}
	
}



//窗口大小改变时，自动调整布局大小 
function resizeWin(havTree,size) {
	winChange(havTree,size);

}


function initMap(){
	cjtMap = new CjtMap();
	//cjtmap 为装载地图的div
	cjtMap.initialize("mapDiv");
}

function mapInitOk(ok){
}


function initGoogleMap() {
	if (GBrowserIsCompatible()) {
		googleMap = new GMap2(document.getElementById("googleDiv"));
		googleMap.setCenter(new GLatLng(39.9275312500,116.33397062500), 13);
		googleMap.setUIToDefault();
		googleMap.addControl(new GLargeMapControl3D());
		document.getElementById("googleDiv").childNodes[1].style.display = "none"; 
	}
	googleMap.clearOverlays();
}