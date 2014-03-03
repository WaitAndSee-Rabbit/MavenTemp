function maintainCarInfoPage(pageNo){
	var platNo = jx("#platNo").val();
	var customerName = jx("#customerName").val();
	var mphone = jx("#mphone").val();
	var data = {"carInfoPageModel.pageNo":pageNo,"carInfo.customerName":customerName,"carInfo.mphone":mphone,"carDetail.platNo":platNo};
	jx.post("../maintain/getCarInfoPage.do",data,function(d){
		jx("#dataList").html(d);
	});
}

//保养登记
var artWindow;
function maintain(carId){
	artWindow = art.dialog.open("../maintain/maintain.do?carInfo.carId="+carId,{id:'memdiv',width :620,height:350,title:'保养登记'}).lock();
}

//设置保养间隔
function setMaintainKM(evt){
	jx("#maintainKM").val(jx("#carTypeMaintainKM").val());
	setNextMaintain(evt);
}


function cancel(){
	parent.artWindow.close();
}

//保养登记
function maintainConfirm(){
	var date=new Date();
	var maintainDate = jx("#maintainDate").val();
	var currentKm = jx("#currentKm").val();
	var maintainKM = jx("#maintainKM").val();
	var content = jx("#content").html();
	var temp=jx("#content").val().replace(/[ ]/g,"");
	var carId = jx("#carId").val();
	if(maintainDate == ""){
		alert("请输入保养日期！");
		return;
	}
	if(currentKm == ""){
		alert("请输入当前里程！");
		return;
	}
	if(!checkSpecialCharacter(temp)||temp==""){
		alert("下发内容不能为空,或者含有含有特殊字符|,!..");
		return;
	}
	if(maintainKM == ""){
		alert("请输入间隔里程！");
		return;
	}
	if(temp.length>70){
		alert("对不起，输入的字符长度不能超过70位!");
		return;
	}
	if(date<new Date(maintainDate)){
		alert("请选择正确的保养时间！");
		return;
	}
	var data = {"maintainInfo.maintainDate":maintainDate,
				"maintainInfo.currentKM":currentKm,
				"maintainInfo.carId":carId,
				"maintainInfo.maintainContent":temp,
				"maintainInfo.maintainKM":maintainKM};
	
	jx.post("../maintain/saveMaintain.do",data,function(d){
		if(d == 0){
			alert("登记成功！");
			cancel();
		}else{
			alert("登记失败，请重新登记！");
		}
	});
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
function getBytesCount(str)
{
  var bytesCount = 0;
  if (str != null)
  {
    for (var i = 0; i < str.length; i++)
    {
      var c = str.charAt(i);
      if (/[\u4E00-\u9FA5]/g.test(c))
      {
        bytesCount += 3;
      }
      else
      {
        bytesCount += 1;
      }
    }
  }
  return bytesCount;
}
function setNextMaintain(evt)
{
    evt = evt || window.event;
    
    if(evt.keyCode==13)
  { //屏蔽回车
    
    if(window.event)
    	 evt.returnValue = false;
    else
    	evt.preventDefault();
  }
  else
  {   
      
      var currentKm = document.getElementById("currentKm").value;
      var maintainKm =jx("#maintainKM").val();
      if(currentKm == null || currentKm=="")
      {
          return;
      }
      var patrn=/^\d+(\.\d+)?$/;
      if (!patrn.exec(currentKm))
      {
          alert("请输入正确的当前里程！");
          document.getElementById("currentKm").Value='';
          document.getElementById("currentKm").focus();
          return;
      }
      if(currentKm < 0){
    	  alert("请输入大于零的当前里程！");
    	  document.getElementById("currentKm").Value='';
          document.getElementById("currentKm").focus();
    	  return;
      }   	  
      
       if(maintainKm == null || maintainKm=="")
      {
          return;
      }
      
       if (!patrn.exec(maintainKm))
      {
          alert("请输入正确的保养间隔里程！");
          jx("#carTypeMaintainKM").val("");
          jx("#carTypeMaintainKM").focus();
          return;
      }
      
      if(currentKm!=""&&maintainKm!="")
      {
          document.getElementById("nextMaintain").value = parseInt(currentKm)+parseInt(maintainKm);
      }
  }
  
}
function maintainPage(pageNo){
	var customerName = jx("#customerName").val();
	var mphone = jx("#mphone").val();
	var data = {"maintainInfoPageModel.pageNo":pageNo,"maintainInfo.customerName":customerName,"maintainInfo.mphone":mphone};
	jx.post("../maintain/searchMaintainPage.do",data,function(d){
		jx("#dataList").html(d);
	});
}
