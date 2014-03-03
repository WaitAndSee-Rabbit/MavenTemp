/**
 * 汽车定位
 */

function fixedPosition(){
	var carIds = zTree.getSelectNodesCarIds();
	if(carIds ==""){
		alert("请选择你要定位的车辆！");
		return;
	}
	if(monitorTrackTask){
		if(confirm("是否停止上次定位操作？")){
			clearTimeout(monitorTrackTask);
		}else{
			return;
		}
		
	}
	_googleMap.clearAll();
	var params = {"carIds":carIds};
	searchCusPosition("../vehicleTrack/fixedPosition.do",carIds);
	
	monitorTrackTask = setTimeout(function(){searchCusPosition('../vehicleTrack/getCusPosition.do',carIds)},20000);
}

//画位置
function searchCusPosition(url,params){
	//alert("执行"+monitorTrackTask);
	_googleMap.clearAll();
	jx.post(url,{"carIds":params},function(data){
		if (!data) return;
		var coordinate = '';
		var zoom = 12;
		var centerPostX = 39.92753125;
		var centerPostY = 116.333970625;
		
		//设置地图
		if(data.map){
			centerPostX = (Number(data.map.zoom.maxX)+Number(data.map.zoom.minX))/2;
			centerPostY = (Number(data.map.zoom.maxY)+Number(data.map.zoom.minY))/2;
			zoom = _googleMap.getBoundsZoomLevel(data.map.zoom.maxX,data.map.zoom.maxY,data.map.zoom.minX,data.map.zoom.minY);
			zoom -= 1;
		}else{
			centerPostX = data.carInfos[0].longitude;
			centerPostY = data.carInfos[0].latitude;
		}
		_googleMap.setCenterAndZoom(centerPostY,centerPostX,zoom);
		
		//取车辆位置
		jx.each(data.carInfos, function(i, item) {
			
				centerPostX = item.longitude;
				centerPostY = item.latitude;
				var direction = item.direction.split(";");
				
				var plateNo = item.platNo;
				if (!plateNo){
					plateNo = item.mphone;
				}
				var str = "<br><font color='#31879B'>车牌:</font>"+plateNo
				+ "<br><font color='#31879B'>时速:</font>"+item.speed+"km/h"
				+ "<br><font color='#31879B'>方向:</font>"+direction[0]
				+ "<br><font color='#31879B'>时间:</font>";
				var createDate = (new Date()).getTime();

				if (item.poiUpdateDate){
					str+=item.poiUpdateDate.replace('T'," ")
					var curDate = new Date();
					createDate = Date.parse(item.poiUpdateDate.replace(/-/g,"/").replace('T'," "));
					
					if ((curDate.getTime()-createDate) > 2*60*1000){
						if("116.33397062500" == item.longitude && "39.9275312500" == item.latitude){
							str = str + "<br><font color='#31879B'>描述:出厂位置</font>";
						}
						str = str + "<br><font color='#31879B'>描述:最后位置</font>"; 
					}else{
						str = str + "<br><font color='#31879B'>描述:当前位置</font>";
					}
				}
				
				var tu = "../images/car/"+direction[1];
				var laln = item.longitude+","+item.latitude-0.00071;
				markerObj = _googleMap.addMarker(tu,centerPostY,centerPostX,str);
				previousPoint = new TCar(0,'','','',createDate);
		});
	});
}



/**
 * 汽车轨迹监控
 * @return
 */
var monitorInterval = 5;
var markerObj;


function monitorTrack(obj){
	var carIds = zTree.getSelectNodesCarIds();
	if(carIds ==""){
		alert("请选择你要定位的车辆！");
		return;
	}
	
	if(carIds.split(",").length > 1){
		alert("请选择一台车辆！");
		return;
	}
	if(monitorTrackTask){
		if(confirm("是否停止上次定位操作？")){
			clearTimeout(monitorTrackTask);
		}else{
			return;
		}
		
	}
//	obj.onclick = function(){stopMonitorTrack(obj)};
//	jx(obj).html("停止追踪");
	_googleMap.clearAll();
	searchCusPosition("../vehicleTrack/monitorTrack.do",carIds);
	monitorTrackTask = setTimeout(function(){searchMonitorPosition('../vehicleTrack/getCusPosition.do',carIds)},monitorInterval*1000);
}


function searchMonitorPosition(url,params){
	jx.post(url,{"carIds":params},function(data){
		if(!data) return;
		if(!data.carInfos[0].poiUpdateDate) return;
		
		var preDate = previousPoint.updateTime;
		var curDate = Date.parse(data.carInfos[0].poiUpdateDate.replace(/-/g,"/").replace('T'," "));
		if (curDate < preDate){
			//无效点
			return;
		}
		
		//有效点
		if(markerObj){
			_googleMap.removeObjcet(markerObj);
		}
		
		var direction = data.carInfos[0].direction.split(";");
		var plateNo = data.carInfos[0].platNo;
		if (!plateNo){
			plateNo = data.carInfos[0].mphone;
		}
		var str = "<br><font color='#31879B'>车牌:</font>"+plateNo
		+ "<br><font color='#31879B'>时速:</font>"+data.carInfos[0].speed+"km/h"
		+ "<br><font color='#31879B'>方向:</font>"+direction[0]
		+ "<br><font color='#31879B'>时间:</font>"+data.carInfos[0].poiUpdateDate.replace('T'," ");
		var tu = "../images/car/"+direction[1];
		markerObj = _googleMap.addMarker(tu, data.carInfos[0].latitude, data.carInfos[0].longitude, str);
		_googleMap.setCenter(data.carInfos[0].latitude, data.carInfos[0].longitude);
		
		if (previousPoint.countPoint > 0){//从第一个点开始画线
			_googleMap.addLine( previousPoint.posY,previousPoint.posX,data.carInfos[0].latitude, data.carInfos[0].longitude);
		}
		previousPoint.setParams(data.carInfos[0].carId,plateNo,data.carInfos[0].longitude,data.carInfos[0].latitude,Date.parse(data.carInfos[0].poiUpdateDate.replace(/-/g,"/").replace('T'," ")));
		previousPoint.countPoint++;
	});	
	monitorTrackTask = setTimeout(function(){searchMonitorPosition('../vehicleTrack/getCusPosition.do',params)},monitorInterval*1000);
			
}


/**
 * 停止监控
 */
function stopMonitorTrack(){
//	obj.onclick = function(){js100002(obj)};
//	jx(obj).html("实时追踪 ");
	var carIds = zTree.getSelectNodesCarIds();
	if(carIds ==""){
		alert("请选择你要停止定位的车辆！");
		return;
	}
	
	if(carIds.split(",").length > 1){
		alert("请选择一台车辆！");
		return;
	}
	var url = "../vehicleTrack/stopMonitor.do";
	var params = zTree.getSelectNodesCarIds();
	jx.post(url,{"carIds":params},function(data){
	});
	previousPoint.setParams(0,'','','',new Date().getTime());//初始化上一个位置对象
	previousPoint.countPoint = 0;
	if(monitorTrackTask){//取消监控任务
		clearTimeout(monitorTrackTask);
		alert("已经停止对当前车辆的监控");
	}
}

function lookUpTrack(){
	var carIds = zTree.getSelectNodesCarIds();
	if(carIds ==""){
		alert("请选择你要定位的车辆！");
		return;
	}
	
	if(carIds.split(",").length > 1){
		alert("请选择一台车辆！");
		return;
	}
  	var url = '../vehicleTrack/toPlay.do?&carIds='+carIds;
  	
  	indexF(url,'历史轨迹',800,600);
	//window.open(url, "_blank","height=600, width=800, top=150, left=250,scrollbars=yes,location=no");	
}

var TCar = function(carId,plateNo,posX,posY,updateTime){
	this.carId=carId;
	this.plateNo=plateNo;
	this.posX=posX;
	this.posY=posY;
	this.updateTime=updateTime;
	this.curProgress = 0;
	this.countPoint = 0;
	
	this.setParams = function(carId,plateNo,posX,posY,updateTime){
		this.carId=carId;
		this.plateNo=plateNo;
		this.posX=posX;
		this.posY=posY;
		this.updateTime=updateTime;
	};
	this.setCurProgress = function(curProgress){
		this.curProgress = curProgress;
	}
}

var previousPoint = new TCar(0,'','','',new Date().getTime());//上一个位置点