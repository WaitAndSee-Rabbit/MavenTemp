/********************************车辆追踪****************************/
//实时定位  
function js100001(){
	fixedPosition();
}
 
//实时追踪 
 function js100002(obj){
	 monitorTrack(obj);
 }
 
 //历史轨迹 
 function js100003(){
	 lookUpTrack();
 }
 
 //停止追踪
 function js100004(){
	 stopMonitorTrack();
 }
 
 /********************************车辆任务****************************/
 //驾驶救援
 function js100501(){
	 jx(".rtittle").load("../vehicleRescue/vehicleRescue/vehicleRescue_gotoRightTitle.do");
	 jx(".rcontent").load("../vehicleRescue/vehicleRescue/vehicleRescue_gotoVehicleRescueControl.do");
	 isMap = 1;
 }
 
 
 //车辆打点 
 var artWindow;
function js100502(){
	var carIds = zTree.getSelectNodesCarIds();
	if(carIds ==""){
		alert("请选择你要下发任务的车辆！");
		return;
	}
	artWindow = art.dialog.open("../vehicleTask/toVehiclePOI.do",{id:'memdiv',width :1000,height:580,title:'目的地下发'}).lock();
}
 
 //通知下发 
function js100504(){
	var carIds = zTree.getSelectNodesCarIds();
	if(carIds ==""){
		alert("请选择你要下发通知的车辆！");
		return;
	}
	artWindow = art.dialog.open("../vehicleTask/toSendNotice.do",{id:'memdiv',width :1000,height:500,title:'通知下发'}).lock();
}
 
 
/********************************车辆报警****************************/
//围栏设置 
function js101001(){
	var carIds = zTree.getSelectNodesCarIds();
	if(carIds ==""){
		alert("请选择你设置围栏的车辆！");
		return;
	}
	artWindow = art.dialog.open("../vehicleAlarm/toSetCarRegion.do",{id:'memdiv',width :1000,height:650,title:'围栏设置 '}).lock();
}

//报警查询 
function js101004(){
	isMap = 1;
	jx(".rtittle").html("车辆管理>>报警信息管理");
	jx(".rcontent").load("../alarmInfo/alarmInfoAction!getAllAlarmInfo.do?"+RndNumA());
}


/********************************车辆管理****************************/

//客户管理
function js101505(){
	jx(".rtittle").html("<strong>车辆管理:</strong> 客户信息管理");
	jx(".rcontent").load("../carManager/customerInfoAction!getCustomerByCondition.do?"+RndNumA());
}
//车辆管理
function js101501(){
	jx(".rtittle").html("<strong>车辆管理:</strong> 客户信息管理");
	jx(".rcontent").load("../carManager/carDetailAction!getCarDetailByCondition.do?condition.customerId=");
}
//分组管理
function js101502(){
	jx(".rtittle").html("<strong>车辆管理:</strong> 分组管理");
	jx(".rcontent").load("../groupInfo/groupInfoAction!getMyGroupInfo.do?"+RndNumA());
}
//保养登记
function js101503(){
	jx(".rtittle").html("<strong>车辆管理:</strong> 保养登记");
	jx(".rcontent").load("../maintain/toMaintainManager.do?"+RndNumA());
}

//保养查询
function js101504(){
	jx(".rtittle").html("<strong>车辆管理:</strong> 保养查询");
	jx(".rcontent").load("../maintain/toSearchMaintain.do?"+RndNumA());
}

/********************************收藏夹****************************/
//区域设置 
function js102501(){
	jx(".rtittle").load("../regionManage/regionManage/regionManage_GoToRightTitle.do");
	jx(".rcontent").load("../regionManage/regionManage/regionManage_GoToControl.do");
}

// 目的地管理 
function js102502(){
	jx(".rtittle").load("../bookmark/bookmark/bookmark_GoToRightTitle.do");
	jx(".rcontent").load("../bookmark/bookmark/bookmark_GoToControl.do");
}

//通知管理
function js102503(){
	jx(".rtittle").load("../noticeInfo/noticeInfo/noticeInfo_GoToRightTitle.do");
	jx(".rcontent").load("../noticeInfo/noticeInfo/noticeInfo_GoToControl.do");  
}

/********************************车辆任务****************************/
//人员管理 
function js103001(){
	jx(".rtittle").load('../systemManage/systemManage/systemManage_GoToRightTitle.do');
	jx(".rcontent").load("../systemManage/systemManage/systemManage_GoToControl.do");
}


//修改密码
function js103002(){
    	jx(".rtittle").load('../systemManage/systemManage/systemManage_GoToRightTitle.do');
	jx(".rcontent").load("../systemManage/systemManage/systemManage_GoToChangeMyPWD.do");
}

//平台转移 
function js103003(){
	jx(".rtittle").load('../systemManage/systemManage/systemManage_GoToRightTitle.do');
	jx(".rcontent").load("../systemManage/systemManage/shopChange_goToChangeMyShopId.do");
}

//换机换卡
function js103004(){
	jx(".rtittle").html("<strong>系统管理:</strong> 换机换卡");
	jx(".rcontent").load("../carManager/carDetailAction!getCarDetailByCondition2.do?condition.customerId=");
}


/********************************人员管理*************************************/


function RndNumA() {
	var rnd = "";
	for ( var i = 0; i < 5; i++)
		rnd += Math.floor(Math.random() * 10);
	return "A"+rnd;
}

