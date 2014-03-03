/**
 * 地图操作
 */
var nmMap;
var old_marker;

function resizeWin() {
	var height = document.documentElement.clientHeight;
	var width = document.documentElement.clientWidth;

	jx('#cjtMap').css('height',height-120);
}

function initMap() {
	if (GBrowserIsCompatible()) {
		nmMap = new GMap2(document.getElementById("cjtMap"));
		nmMap.setCenter(new GLatLng(37.9275312500, 116.00397062500), 4);
		nmMap.setUIToDefault();
	}
	  document.getElementById("cjtMap").childNodes[1].style.display = "none"; 
      document.getElementById("cjtMap").childNodes[2].style.display = "none";
      document.getElementById("cjtMap").childNodes[3].style.display = "none"; 
}
function clearMap(){
	nmMap.clearOverlays();
}

function addMarker(point, imgPath, contentInfo){
	var truckIcon = new GIcon(G_DEFAULT_ICON);
    truckIcon.image= imgPath;
    truckIcon.shadow = null;
    truckIcon.iconSize = new GSize(50, 50);
    truckIcon.iconAnchor = new GPoint(18, 18);
    truckIcon.infoWindowAnchor = new GPoint(18, 18);    
    var markerOptions = { icon:truckIcon };
    var marker = new GMarker(point,markerOptions);
    nmMap.addOverlay(marker,markerOptions);
    marker.openInfoWindowHtml(contentInfo);
    if(contentInfo!=""){
        GEvent.addListener(marker,"click", function() {
                marker.openInfoWindowHtml(contentInfo);
          });
    }
    if(old_marker!=null)  
        nmMap.removeOverlay(old_marker);
    else{
    	if(nmMap.getZoom()==4)
    		nmMap.setCenter(marker.getPoint(), 13);
    }
    old_marker = marker;
    
}
/**
 * 轨迹播放
 */
var hearInfoJson = null;
function play(){
	if (!hearInfoJson){
		//var pattern = /^((\d{2}(([02468][048])|([13579][26]))\-((((0[13578])|(1[02]))\-((0[1-9])|([1-2][0-9])|(3[01])))|(((0[469])|(11))\-((0[1-9])|([1-2][0-9])|(30)))|(02\-((0[1-9])|([1-2][0-9])))))|(\d{2}(([02468][1235679])|([13579][01345789]))\-((((0[13578])|(1[02]))\-((0[1-9])|([1-2][0-9])|(3[01])))|(((0[469])|(11))\-((0[1-9])|([1-2][0-9])|(30)))|(02\-((0[1-9])|(1[0-9])|(2[0-8]))))))(\/(((0[0-9])|(2[0-3])|(1[0-9]))\:([0-5][0-9])))?$/;
		var startTime = jx('#startTime').val();
		var endTime = jx('#endTime').val();
		var minTime = jx('#minTime').val();
		var maxTime = jx('#maxTime').val();
			
		if(startTime == ''){
			alert('请输入开始时间');
			return;
		}else if(endTime == ''){
			alert('请输入结束时间');
			return;
		}
		var startDate = Date.parse(startTime.replace(/-/g,"/"));
		var endDate = Date.parse(endTime.replace(/-/g,"/"));
		var minDate = Date.parse(minTime.replace(/-/g,"/"));
		var maxDate = Date.parse(maxTime.replace(/-/g,"/"));
		
		if (startDate < minDate || startDate >= maxDate){
			alert('请输入正确的开始时间');
			return;
		}else if (endDate <= minDate || endDate > maxDate){
			alert('请输入正确的结束时间');
			return;
		}else if ((endDate - startDate)/(24*60*60*1000) > 3){
			alert('只能播放3天内的轨迹');
			return;
		}
		
		var params = {
				carIds:jx('#carId').val(),
				startTime:startTime,
				endTime:endTime
		};
		searchHistoryTrack(params,function(length){			
			if (length > 0){
				progressBar.moveAbled = true;//设置拖动条可移动
				progressBar.setMoveBarEvent(function(){
					//previousPoint.setParams(0,'','','',0);//初始化上一个位置对象
//					previousPoint.setCurProgress(0);
					var heartInfo = hearInfoJson[progressBar.getProgress()];
					progressBar.setSignText('当前时间：'+heartInfo.createDate);
					/*if (playTrackTask){
						clearTimeout(playTrackTask);
					}*/
					clearMap();
				});
				progressBar.setMoveBarEventOnMouseUp(function(){
					drawTrack();
				});
			}
		});
	}else{
		drawTrack();
	}
	
	jx("#fixedPosBtn").attr('disabled',true);
	jx("#monitorTrackBtn").attr('disabled',true);
	jx("#playTrackBtn").hide();
	jx("#suspendBtn").show();
	jx("#lookUpTrackBtn").attr('disabled',true);
	mapUseState = 'playHistoryTrack';
	jx("#noticeMsg").hide();
	jx("#stateMsg").html('轨迹回放中，请稍后...');
}
function rePlay(){
	if (hearInfoJson){
		clearMap();
		jx("#playTrackBtn").hide();
		jx("#suspendBtn").show();
		//previousPoint.setParams(0,'','','',0);//初始化上一个位置对象
		//previousPoint.setCurProgress(0);
		progressBar.setProgress(0);
		drawTrack();
	}
}
/**
 * 暂停播放
 */
function suspendPlay(){
	jx("#playTrackBtn").show();
	jx("#suspendBtn").hide();
	if (playTrackTask){
		clearTimeout(playTrackTask);
	}
}

function stopPlay(){
	clearMap();
	hearInfoJson = null;
	jx("#playTrackBtn").show();
	jx("#suspendBtn").hide();
	jx("#fixedPosBtn").attr('disabled',false);
	jx("#monitorTrackBtn").attr('disabled',false);
	jx("#lookUpTrackBtn").attr('disabled',false);
	jx("#noticeMsg").show();
	jx("#stateMsg").html('');
	mapUseState = null;
	//previousPoint.setParams(0,'','','',0);//初始化上一个位置对象
	//previousPoint.setCurProgress(0);
	if(playTrackTask){//取消监控任务
		clearTimeout(playTrackTask);
	}
	progressBar.setProgress(0);
	progressBar.setMaxProgress(0);
}

/**
 * 查询历史轨迹
 * @param params
 */
function searchHistoryTrack(params,callBack){
	clearMap();
	var url = "../vehicleTrack/searchCarHistoryTrack.do";
	jx.post(url,params,function(data){		
		hearInfoJson = data;
		progressBar.setMaxProgress(hearInfoJson.length);
		
		if (callBack){
			callBack(progressBar.getMaxProgress());
		}
		drawTrack();
	});
}

var playTrackTask = null;
/**
 * 播放轨迹
 */
var oldProgress = 0;
function drawTrack(){
	var curProgress  = progressBar.getProgress();
	var heartInfo = hearInfoJson[curProgress];
	if (curProgress == progressBar.getMaxProgress()){
		playOver();
		return;
	}
	//alert(curProgress+"=="+oldProgress);
	if(curProgress!=oldProgress+1){//拖动后开始
		old_marker = null;	
		clearMap();
	}
	oldProgress = curProgress;
	
	var direction = heartInfo.direction.split(";");
	var plateNo = heartInfo.plateNo;
	if (!plateNo){
		plateNo = heartInfo.machinePhone;
	}
	var content = "<br><font color='#31879B'>车牌:</font>"+plateNo
			+ "<br><font color='#31879B'>时速:</font>"+heartInfo.speed+"km/h"
			+ "<br><font color='#31879B'>方向:</font>"+direction[0]
			+ "<br><font color='#31879B'>时间:</font>"+heartInfo.createDate;
			//+ "<br><font color='#31879B'>计数:</font>"+curProgress;
	var img = "../images/car/"+direction[1];
    //img = "imgs/tcar2/car.png";
	if(old_marker!=null){
		var point = new GLatLng(heartInfo.posY,heartInfo.posX);		
	  	var line = new GPolyline([old_marker.getPoint(),point],"#C00080", 5,0.7);
	  	nmMap.addOverlay(line);
	}
  	addMarker(new GLatLng(heartInfo.posY,heartInfo.posX), img, content);  	
  	
	progressBar.setProgress(curProgress+1);
	progressBar.setSignText('当前时间：'+heartInfo.createDate);

	var playSpeed = 5000;
	var reg = /^\d+$/;
	if (jx('#playSpeed').val()){
		if (!jx('#playSpeed').val().match(reg)){
			//alert('无效的播放速度');
		}else if (jx('#playSpeed').val() < 1){
			//alert('无效的播放速度');
		}else{
			playSpeed = 1000*jx('#playSpeed').val();
		}
	}
	if(playTrackTask){//取消回放任务
		clearTimeout(playTrackTask);
		playTrackTask = null;
	}
	playTrackTask = setTimeout('drawTrack()',playSpeed);
}
/**
 * 停止轨迹播放
 * @returns {Boolean}
 */
function closePlayWindow(){
	var result = true;
	jx("#fixedPosBtn").attr('disabled',false);
	jx("#monitorTrackBtn").attr('disabled',false);
	jx("#lookUpTrackBtn").attr('disabled',false);
	jx("#noticeMsg").show();
	jx("#stateMsg").html('');
	//previousPoint.setParams(0,'','','',0);//初始化上一个位置对象
	//previousPoint.setCurProgress(0);
	if(playTrackTask){//取消回放任务
		clearTimeout(playTrackTask);
	}
	mapUseState = null;
	hearInfoJson = null;
	return result;
}

function playOver(){
	if(playTrackTask){//取消监控任务
		clearTimeout(playTrackTask);
	}
}

