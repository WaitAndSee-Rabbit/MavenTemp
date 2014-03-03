function showDistPOIPage(pageNo){
	var  destCode = jx("#searchCode").val();
	var  destName = jx("#searchName").val();
	var createdDateEnd = jx("#createDateEnd").val();
	var createdDateStart = jx("#createDateStart").val();
	var param = {"destPoi.destName":destName,"destPoi.destCode":destCode,"destPoi.createdDateEnd":createdDateEnd,"destPoi.createdDateStart":createdDateStart};
	jx("#poiList").load("../vehicleTask/searchDestPOI.do?destPoi.id=0&destPOIPageModel.pageNo="+pageNo,param);
}

function selectDistPOI(id){
	jx.post("../vehicleTask/searchDestPOIByID.do",{"destPoi.id":id},function(data){
		if(!data) return;
		jx("#jiChupoiCode").val(data.destCode);
		jx("#jiChupoiName").val(data.destName);
		jx("#jiChupoiX").val(data.longitude);
		jx("#jiChupoiY").val(data.latitude);
		jx("#jiChunotice").val(data.poiNotice);
		cjtMap.clearPoints();
		cjtMap.setCenter(data.longitude,data.latitude);
		cjtMap.addPoint(1,data.destName,data.longitude,data.latitude, 5, '0x0000CC');
	});
}

function sendDistPOI(){

	var poiCode = jx("#jiChupoiCode").val().replace(/[ ]/g,"");
	var poiName = jx("#jiChupoiName").val().replace(/[ ]/g,"");
	var poiX = jx("#jiChupoiX").val().replace(/[ ]/g,"");
	var poiY = jx("#jiChupoiY").val().replace(/[ ]/g,"");
	var sendStartDate = jx("#jiChusendStartDate").val();
	var sendEndDate = jx("#jiChusendEndDate").val();
	var sendStartTime = jx("#jiChusendStartTime").val();
	var sendEndTime = jx("#jiChusendEndTime").val();
	var sendMode = jx("#jiChusendMode").val();
	var notice = jx("#jiChunotice").html().replace(/[ ]/g,"");
	var temp=jx("#jiChunotice").val().replace(/[ ]/g,"");;

	/**
	 * 检验为空
	 */
	if(!validateFloat(poiX)|| !validateFloat(poiY)){
		alert("请输入合法的经纬度...");
		return false;
	}
	if(!poiX || poiX == ""){
		alert("坐标点为空,未能正确获取!");
		return false;
	}else if(poiX < 72 || poiX > 156){
		alert("经度不在中国境内!");
		return false;
	}
	if(!poiY || poiY == ""){
		alert("坐标点为空,未能正确获取!");
		return false;
	}else if(poiY < 2 || poiY > 60){
		alert("纬度不在中国境内!");
		return false;
	}
	if(poiName==""){
		alert("坐标点名称不能为空");
		return false;
	}
	if(!!temp&&(!checkSpecialCharacter(temp) || Trim(temp)==''||temp.length>50)){
		alert("通知内容不能含有特殊字符,且长度不能大于50个字符");
		return false;
	}

	if(poiCode.length>15){
		alert("编号长度不能超过15位...");
	}
	if(poiName.length>23){
		alert("名称长度不能超过23位");
		return false;
	}
	
	if(poiY.length>10){
		poiY = poiY.substring(0,9);
	}
	if(poiX.length>10){
		poiX = poiX.substring(0,9);
	}

	var isSave = false;
	if(confirm("是否将信息点保存到收藏夹？")){
		isSave = true;
	   }
	
	var carIds = parent.zTree.getSelectNodesCarIds();
	var param = {"destPoi.destName":poiName,"destPoi.longitude":poiX,"destPoi.latitude":poiY,"destPoi.poiNotice":temp,"destPoi.destCode":poiCode,
				 "queueSender.sendMode":sendMode, "queueSender.beginHours":sendStartTime,"queueSender.endHours":sendEndTime,
				 "carIds":carIds,"isSave":isSave
				};
	if(sendStartDate != ""){
		param["queueSender.beginDate"]=sendStartDate;
	}
	if(sendEndDate != ""){
		param["queueSender.endDate"]=sendEndDate;
	}
	// "queueSender.beginDate":sendStartDate,"queueSender.endDate":sendEndDate,
	jx.post("../vehicleTask/sendDestPOI.do",param,function(data){
		if(data == 0){
			alert("下发成功");
			parent.artWindow.close();
		}else{
			alert("下发失败，请重新发送");
		}
		
	});
	
}
function validateFloat(val){// 验证小数
	var patten = /^-?(?:\d+|\d{1,3}(?:,\d{3})+)(?:\.\d+)?$/;
	return patten.test(val);
}
function checkSpecialCharacter(inputvalue)          
{      
    var str=inputvalue;   
    var SPECIAL_STR ="￥#$~!@%^&*();'\"?><[]{}\\|,:/=+—“”‘";   
    for(i=0;i<str.length;i++)
    {   
        if (SPECIAL_STR.indexOf(str.charAt(i)) !=-1) {   
            return false;   
        }   
    }
    return true;   
}
function showNoticePage(pageNo){
	var  destCode = jx("#searchType").val();
	var  destName = jx("#searchContent").val().replace(/[ ]/g,"");
	var createdDateEnd = jx("#createDateEnd").val();
	var createdDateStart = jx("#createDateStart").val();
	var param = {"noticeInfo.noticeType":destCode,"noticeInfo.broadcastType":destName,"noticeInfo.createdDate":createdDateEnd,"noticeInfo.updateDate":createdDateStart};
	jx("#dataList").load("../vehicleTask/searchNotice.do?noticeInfoPageModel.pageNo="+pageNo,param);
}

function selectNOtice(id){
	jx.post("../vehicleTask/selectNoticeById.do",{"noticeInfo.noticeId":id},function(data){
		if(!data) return;
		jx("#notice").val(data.content);
	});
}

function sendNotice(){
	var noticeType = jx("#noticeType").val()
	var broadcastType = jx("#broadcastType").val()
	var sendStartDate = jx("#sendStartDate").val();
	var sendEndDate = jx("#sendEndDate").val();
	var sendStartTime = jx("#sendStartTime").val();
	var sendEndTime = jx("#sendEndTime").val();
	var sendMode = jx("#sendMode").val().replace(/[ ]/g,"");
	var notice = jx("#notice").html().replace(/[ ]/g,"");
	var temp=jx("#notice").val().replace(/[ ]/g,"");
	if(temp==null||Trim(temp)==""){
		alert("通知内容不能为空");
		return false;
	}else{
		notice=Trim(temp);
	}
	if(temp!=''){
		if(notice.length>50){
			alert("内容长度不能超过50个字符");
			return false;
		}
	}

	if(!checkSpecialCharacter(temp) || temp==''){
		alert("对不起通知内容不能为空并且不能含有特殊字符...");
		return false;
	}
    var isSelect = jx('input[name="isSave"]:checked').val();
	
	var isSave = false;
	if(isSelect == 0){
		if(confirm("是否将通知保存到收藏夹？")){
			isSave = true;
		}
	}
	var carIds = parent.zTree.getSelectNodesCarIds();
	var param = {"noticeInfo.noticeType":noticeType,"noticeInfo.broadcastType":broadcastType,"noticeInfo.content":notice,
				 "queueSender.sendMode":sendMode, "queueSender.beginHours":sendStartTime,"queueSender.endHours":sendEndTime,
				 "carIds":carIds,"isSave":isSave
				};
	if(sendStartDate != ""){
		param["queueSender.beginDate"]=sendStartDate;
	}
	if(sendEndDate != ""){
		param["queueSender.endDate"]=sendEndDate;
	}
	// "queueSender.beginDate":sendStartDate,"queueSender.endDate":sendEndDate,
	jx.post("../vehicleTask/sendNoticeInfo.do",param,function(data){
		if(data == 0){
			alert("下发成功");
			parent.artWindow.close();
		}else{
			alert("下发失败，请重新发送");
		}
		
	});
	
}
function LTrim(str)
{
    var i;
    for(i=0;i<str.length;i++)
    {
        if(str.charAt(i)!=" "&&str.charAt(i)!=" ")break;
    }
    str=str.substring(i,str.length);
    return str;
}

function RTrim(str)
{
    var i;
    for(i=str.length-1;i>=0;i--)
    {
        if(str.charAt(i)!=" "&&str.charAt(i)!=" ")break;
    }
    str=str.substring(0,i+1);
    return str;
}

function Trim(str)
{
    return LTrim(RTrim(str));
}
function lenStr(s) { 
	var l = 0; 
	var a = s.split(""); 
	for (var i=0;i<a.length;i++) { 
	if (a[i].charCodeAt(0)<299) { 
		l++; 
		} else { 
		l+=2; 
		} 
	} 
	return l; 
}
