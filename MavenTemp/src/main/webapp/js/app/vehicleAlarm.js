//设置围栏
function setRegion(){
	var obj = jx('#menu li')[0];
	jx(obj).addClass("selectTag").siblings().removeClass("selectTag");
	jx("#tagContent").html("正在加载...");
	jx("#tagContent").load("../vehicleAlarm/toSetRegion.do");
}

//围栏管理
function vehicleRegionManager(){
	var obj = jx('#menu li')[1];
	jx(obj).addClass("selectTag").siblings().removeClass("selectTag");
	jx("#tagContent").html("正在加载...");
	jx("#tagContent").load("../vehicleAlarm/toCarFence.do");
}

//分页查询区域
function showRegionInfoPage(pageNo){
	var  destCode = jx("#searchCode").val();
	var  destName = jx("#searchName").val();
	var createdDateEnd = jx("#createDateEnd").val();
	var createdDateStart = jx("#createDateStart").val();
	var param = {"regionInfo.regionType":-1,"regionInfo.status":-1,"regionInfo.regionName":destName,"regionInfo.regionCode":destCode,"regionInfo.createdDateEnd":createdDateEnd,"regionInfo.createdDateStart":createdDateStart};
	jx("#dataList").load("../vehicleAlarm/searchRegionInfo.do?regionInfoPageModel.pageNo="+pageNo,param);
}

//选择区域
function selectRegionInfo(regionId){
	cjtMap.clearPoints();
	cjtMap.clearMarkers();
	cjtMap.clearPolygons();
	cjtMap.clearLineStrings();

	jx.post("../vehicleAlarm/getRegionInfoById.do",{"regionInfo.regionId":regionId},function(data){
		
		if(!data) return;
		jx("#regionCode").val(data.regionCode);
		jx("#regionName").val(data.regionName);
		jx("#regionId").val(data.regionId);
		if(data.regionType==1){
			jx("#areaRegion").attr("checked",'checked');
		}else{
			jx('input[name="regionType"]').each(function(i){
				if(jx(this).val()== data.regionType){
					jx(this).attr("checked",'checked');//.siblings().removeAttr("checked");
				}
			});
		}
	
		jx("#description").html(data.description);
		jx("#regionData").attr("value",data.regionData);
		
		if(data.regionType == 2){
			js("#district").val(data.regionData);
		}else{
			points = data.regionData;
			var pois = data.regionData.split(";");
			cjtMap.setCenter(pois[0].split(",")[0],pois[0].split(",")[1])
			for(var i=1;i<pois.length;i++){
				var coordinators = pois[i-1].split(",")[0]+","+pois[i-1].split(",")[1]+";"+pois[i].split(",")[0]+","+pois[i].split(",")[1];
				cjtMap.addLineString(i,i,coordinators,2,'0xEB0506');
			}
			var coordinators = pois[pois.length-1].split(",")[0]+","+pois[pois.length-1].split(",")[1]+";"+pois[0].split(",")[0]+","+pois[0].split(",")[1];
			cjtMap.addLineString(i,i,coordinators,2,'0xEB0506');
		}
	})
}

var isModify=false;
//设置围栏
function setFence(){
	var regionCode = jx("#regionCode").val().replace(/[ ]/g,"");
	var regionName = jx("#regionName").val().replace(/[ ]/g,"");
	var description = jx("#description").val().replace(/[ ]/g,"");
	var regionId = jx("#regionId").val();
	var regionType = jx('input[name="regionType"]:checked').val();
	var regionData = jx("#regionData").val().replace(/[ ]/g,"");
//	var isSelect = jx('input[name="isSave"]:checked').val();
	var isSave=false;
	var data="";
	if(regionType == 2 ){
		data = regionData;
	}else{
		data = points;
		regionData = points;
	}
	
	if(regionType==""||!regionType){
		alert("请选择区域类型");
		return false;
	}
	if(regionData==""||!regionData){
		alert("请选择要设定的区域");
		return false;
	}
	if(confirm("是否将此区域保存在收藏夹内?")){
		isSave=true;
	}

	var carIds = parent.zTree.getSelectNodesCarIds();
	var param = {"regionInfo.regionName":regionName,"regionInfo.regionCode":regionCode,"regionInfo.regionType":regionType,
			     "regionInfo.description":description,"regionInfo.regionId":regionId,
			     "carIds":carIds,"isSave":isSave
				};
	param["regionInfo.regionData"]=data;

	jx.post("../vehicleAlarm/setFenct.do",param,function(data){
		if(data == 0){
			alert("设置成功");
			parent.artWindow.close();
		}else{
			alert("设置失败，请重新设置");
		}
	});
	
}


//围栏设置查询
function selectFence(pageNo){
	var carIds = parent.zTree.getSelectNodesCarIds();
	var customerName = jx("#customerName").val().replace(/[ ]/g,"");
	var platNo = jx("#platNo").val().replace(/[ ]/g,"");
	var mphone = jx("#mphone").val().replace(/[ ]/g,"");
	var regionName = jx("#regionName").val().replace(/[ ]/g,"");
	
	var param = {"carBindRegion.customerName":customerName,"carBindRegion.platNo":platNo,"carBindRegion.mphone":mphone,"carBindRegion.regionName":regionName,
				"carIds":carIds};
	jx("#dataList").load("../vehicleAlarm/selectCarBindRegion.do?carBindRegionPageModel.pageNo="+pageNo,param);
}

function deleteCarFence(id,carId,regionId){
	var param = {"carBindRegion.id":id,"carBindRegion.carId":carId,"carBindRegion.regionId":regionId};
	jx.post("../vehicleAlarm/delCarBindRegionByID.do",param,function(data){
		if(data ==0){
			alert("删除成功");
			selectFence(1);
		}else{
			alert("删除失败");
		}
	});
}

function autoCityCode(){
	var url="../cityInfo/cityInfo_getCityInfosByKey.do";
	jx("#district").focus().autocomplete(url, {
	width:250,//提示的宽度，溢出隐藏
	max:20,//列表里的条目数
	autoFill : false, //自动填充
	highlight:false,scrollHeight:300,//提示的高度，溢出显示滚动条
	formatItem: function(data,idx,n,value) {
	//对于买一行进行处理。data 表示的是已经处理过的json对象
	return '<div style="width:94%;"><div style="float:left;width:49%,display:inline;">'+data.cityName+'</div><div style="float:right;width:49%,display:inline;">'+data.pinYin+'</div></div>';
	},
	//可以这么理解发起ajax请求后，其先进行的是parse解析并将其转换为json格式
	parse: function(data) {
	var Json=eval('('+data+')');
	var rows=[];
	jx(Json).each(function(idx,item) {
		rows.push({
			data:item,value:item.cityName+"-"+item.pinYin,result:item.cityName
		});
	});
	return rows;
	}
	}).result(function(event,row,formatted) {
	//当下拉框的信息被选中的情况下，触发的函数。
		jx("#regionData").attr("value",row.district);
		if(!jx("#regionName").val()){
		    jx("#regionName").attr("value",row.cityName);
		}
		jx("#areaRegionbyp").attr("checked","checked");
	});
}

var cjtMap;
function initMap(){
	cjtMap = new CjtMap();
	//cjtmap 为装载地图的div
	cjtMap.initialize("mapDiv");
}

function mapInitOk(ok){
}
function modiMap(){
	var regionType = jx('input[name="regionType"]:checked').val();
	isModify = true;
	mapCallBack = 0;
	cjtMap.clearPoints();
	cjtMap.clearMarkers();
	cjtMap.clearPolygons();
	cjtMap.clearLineStrings();
	if(regionType == 0){
		//地图区域
		cjtMap.drawPolygon(2,'0xEB0506');
	}else if(regionType == 3){
		//线路上下行
		cjtMap.drawLine(2,'0xEB0506');
	}
}

//地图回调
var mapCallBack = 0;
var points = "";
function getDrawPolygonLonLats(lola){
	mapCallBack++;
	if(mapCallBack > 1){
		return ;
	}
	if(lola.length > 0){
		points = lola.substring(1,lola.length-1)
	}
}
//地图回调
function getDrawLineStringLonLats(lolas){
	mapCallBack++;
	if(mapCallBack > 1){
		return ;
	}
	points = lolas;
}

