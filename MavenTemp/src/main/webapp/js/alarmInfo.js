var map;
var tagWin;
function dealAlarm(me) {
	f(250,500, '车辆报警处理',
			'../alarmInfo/alarmInfoAction!getAlarmInfoToUpdate.do?alarmInfo.alarmId='
					+ me);
}
function viewAlarm(me) {
	f(500,800, '车辆报警信息',
			'../alarmInfo/alarmInfoAction!getAlarmInfoById.do?alarmInfo.alarmId='
					+ me);
}
// 公共调用的弹出窗口的方法
function f(height, width, t, href) {
	tagWin=art.dialog.open(href, {
		title : t,
		width : width,
		height : height
	});
}
function serachInfo() {
	var serialNumber = RndNum();
	var data = jx("#form").serialize();
	var url = "../alarmInfo/alarmInfoAction!getAllAlarmInfo.do?";
	data=data+ "&serialNumber" + serialNumber+"&model.pageNo=1";
	jx.post(url,data,function(d){
		jx(".rcontent").html(d);
	});
}
function RndNum() {
	var rnd = "";
	for ( var i = 0; i < 5; i++)
		rnd += Math.floor(Math.random() * 10);
	return rnd;
}
function alarmPage(pageNo) {
	var serialNumber = RndNum();
	var data = jx("#form").serialize();
	var url = "../alarmInfo/alarmInfoAction!getAllAlarmInfo.do";
	data=data+ "&serialNumber" + serialNumber+"&model.pageNo="+pageNo;
	jx.post(url,data,function(d){
		jx(".rcontent").html(d);
	});
}
/**
 * 地图操作
 */
function initMap(){
	map = new CjtMap();
	//cjtmap为装载地图的div
	map.initialize("cjtmap"); 
}
function mapInitOk(ok){
	var temp=document.getElementById("regionData").value;
	var type=document.getElementById("regionType").value;
	if(temp!=null && temp!=""){
		if(type!=2){
			drawPolygon(temp,'0xEB0506');
		}
		else{
			alert("对不起，此类型围栏不能显示围栏范围...");
		}
	}else{
		alert("对不起，围栏数据可能已经被删除....");
	}
	var lon=document.getElementById("alarmLongitude").value;
	var lat=document.getElementById("alarmlatitude").value;
	map.addPoint("111","车点",lon,lat,10,"black");
	map.setCenter(lon,lat);
}

function drawPolygon(string,color){
	var str=string.split(";");
	for ( var i = 0; i < str.length-1; i++) {
		map.addLineString(i,"",str[i]+";"+str[i+1],"2",color);
	}
	map.addLineString(100,"",str[str.length-1]+";"+str[0],"2",color);
}
