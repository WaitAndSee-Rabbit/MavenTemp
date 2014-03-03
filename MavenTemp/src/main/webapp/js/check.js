//addCar.jsp 的表单验证
//检查是否在数据库中存在 
//true 存在
//false 不存在
function checkUnique(url,data){
	var flag=true;
	$.ajax({
			type:"post",
			async:false,  // 设置同步方式
		    cache:false,
			url:url,
			data:data,
			success : function(me) {
				if(me=='true'){
                   flag=true;
                }
                else{
					flag=false;
                }
				return flag;
			}
		});
	return flag;
}
//检查机器手机号
function checkMphone(){
	var temp=$('#mymphone').val();
	var temp2=$("#doMphone").val();
	if(temp!=temp2){
		var flag=checkUnique("../carManager/carDetailAction!checkMphone.do","car.mphone="+temp);
		if(flag){
			alert("机器手机号已存在,请重新输入..");
			flag=false;
		}else{
			flag=true;
		}
	}else{
		return true;
	}
	return flag;
}
//检查车牌号是否唯一
function checkPlatNo(){
		var temp=$('#myplatNo').val();
		var flag=checkUnique("../carManager/carDetailAction!checkPlatNo.do","car.platNo="+temp);
		if(flag){
			flag=false;
		}else{
			flag=true;
		} 
		return flag;
}
// 检查字段是否为空格组成
function checkNull(temp,notice){
	if(Trim(temp)=='' || temp==null){
		alert(notice);
		return false;
	}
	else{
		return true;
	}
}
// 检查字段是否是合法的电话号码
function checkPhone(phone,notice){
	// 验证电话号码手机号码，包含至今所有号段
	var ab=/^(1[0-9][0-9]|15[0|3|6|7|8|9]|18[8|9])\d{8}$/;
    if(ab.test(phone) == false){
	    alert(notice);
	    return false;
	  }else{
		  return true;
	  }
}
// 检查字段是否都是数字
function checkNum(str,notice){
	if(isNaN(str)){
		alert(notice);
		return false;
	}else{
	    return true;	
	}
}
// 邮箱验证
function checkEmail(str,notice){
	var myreg =/^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;	
	if(!myreg.test(str)){
		alert(notice);
		return false;	
	}else{
		return true;
	}
}
//addCustomer 页面的验证
//检查登录号码
function checkLoginId(){
	var temp=document.getElementById("myloginId").value;
	var temp2=$('#doLoginId').val();
	if(temp!=temp2){
		var flag=checkUnique("../carManager/customerInfoAction!checkLoginId.do","customerInfo.loginId="+temp);
		if(flag){
			alert('登录号码已存在，请重新输入...');
			flag=false;
		}else{
			flag=true;
		}
		return flag;
	}else{
		return true;
	}
}
//修改车辆信息表单验证
function checkPlatNo(){
		var temp=$('#myplatNo').val();
		var temp2=$('#doPlatNo').val();
		if(temp1!=temp2){
			var flag=checkUnique("../carManager/carDetailAction!checkPlatNo.do","car.platNo="+temp);
			if(flag){
				alert('对不起,车牌号已存在,请修改车牌号');
			}
			return (!flag);
		}
		else{
			return true;
		}
}
//更新车辆表单验证
function checkUpdateCar(){
	var temp=document.getElementById("mymphone").value;
	var url='../carManager/carDetailAction!checkMphone.do';
	var data="car.mphone="+temp;
	if(!checkNull(temp,'对不起,机器号码不能为空..')){
		return false;
	}
	if(!checkPhone(temp,'对不起，请输入正确的手机号码...')){
		return false;
	}
	if(!checkMphone()){
		return false;
	}
	if($('#type').val()=='' || $('#type').val()=='-1'){
		alert("对不起，车辆类型不能为空....................");
		return false;
	}
	if($('#maintainKm').val()==''){
		alert("对不起,车辆保养间隔里程不能为空");
		return false;
	}
	if($('#lastDate').val()!='' && $('#lastKm').val()==''){
		alert("对不起，请输入最后保养里程...");
		return	false;
	}
	if($('#ck').val()==null || $('#ck').val()==''){
		alert("请输入当前里程..");
		return false;
	}
	return true;
}
//添加车辆表单验证
function checkAddCar(){
	var phone=$('#mymphone').val();
	var url='../carManager/carDetailAction!checkMphone.do?car.mphone';
	if(!checkNull(phone,'对不起,机器手机号不能为空..')){
		return false;	
	}
	if(!checkPhone(phone,'对不起，请检查您输入的机器手机号..')){
		return false;
	}
	if(!checkMphone()){
		return false;
	}
	if($('#type').val()=='' || $('#type').val()=='-1'){
		alert("对不起，车辆类型不能为空....");
		return false;
	}
	if($("#maintainKm").val()==''){
		alert("对不起,车辆保养里程不能为空...");
		return false;
	}
	if($('#lastDate').val()!='' && $('#lastKm').val()==''){
		alert("对不起，请输入最后保养里程...");
		return	false;
	}
	if($('#ck').val()==null || $('#ck').val()==''){
		alert("请输入当前里程..");
		return false;
	}
	return true;
}
//添加客户表单验证
function checkAddCustomer(){
	var temp=document.getElementById("myloginId").value;
	var url='../carManager/customerInfoAction!checkLoginId.do';
	if(!checkNull(temp,'对不起,登录号码不能为空..')){
		return false;
	}
	if(!checkLoginId()){
		return false;
	}
	if(!checkPhone(temp,'对不起，请输入合法的登录号码..')){
		return false;
	}
	return true;
}
//更新客户表单验证
function checkUpdateCustomer(){
	var temp=$('#myloginId').val();
	if(!checkNull(temp,'对不起,登录号码不能为空..')){
		return false;
	}
	if(!checkLoginId()){
		return false;
	}
	if(!checkPhone(temp,'对不起，请输入合法的登录号码..')){
		return false;
	}
	return true;
}