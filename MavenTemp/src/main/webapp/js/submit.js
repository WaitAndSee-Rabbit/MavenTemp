//报警处理信息提交的方法
function alarmSubmit() {
	var serialNumber = RndNum();
	var data = $("#form").serialize();
	var url = "../alarmInfo/alarmInfoAction!updateAlamInfoById.do?";
	data = data + "&serialNumber" + serialNumber;
	$.post(url, data, function(d) {
		alert("报警信息处理成功");
		window.parent.serachInfo();
		window.parent.tagWin.close();
	});
}
function RndNum() {
	var rnd = "";
	for ( var i = 0; i < 5; i++)
		rnd += Math.floor(Math.random() * 10);
	return "A"+rnd;
}
//添加车辆信息提交的方法
function addCarSubmit() {
	var flag=checkAddCar();
	if(flag){
		var serialNumber = RndNum();
		var data = $("#form").serialize();
		var url = "../carManager/carDetailAction!addCar.do?";
		data = data + "&serialNumber" + serialNumber;
		$.post(url, data, function(d) {
			alert("添加车辆成功");
			customerCarPage(1);
		});
	}
}
//修改车辆信息的提交方法
function updateCarSubmit() {
	var flag=checkUpdateCar();
	if(flag){
		var serialNumber = RndNum();
		var data = $("#form").serialize();
		var url = "../carManager/carDetailAction!updateCarDetail.do?";
		data = data + "&serialNumber" + serialNumber;
		$.post(url, data, function(d) {
			alert("车辆信息更新成功");
			window.parent.closeme(1);
		});
	}
}
//修改客户信息的提交方法
function updateCustomerSubmit(){
	var flag=checkUpdateCustomer();
	if(flag){
		var serialNumber = RndNum();
		var data = $("#form").serialize();
		var url = "../carManager/customerInfoAction!updateCustomerInfo.do?";
		data = data + "&serialNumber" + serialNumber;
		$.post(url, data, function(d) {
			alert("用户信息更新成功");
			window.parent.serachInfo();
			window.parent.father.close();
		});
	}
}
//添加客户信息提交的方法
function addCustomerSubmit(){
	var flag=checkAddCustomer();
	if(flag){
		var serialNumber = RndNum();
		var data = $("#form").serialize();
		var url = "../carManager/customerInfoAction!addCustomerInfo.do?";
		data = data + "&serialNumber" + serialNumber;
		$.post(url, data, function(d) {
			window.parent.serachInfo();
			window.parent.father.close();
		});
	}
}