function loadData() {
	var serialNumber =RndNum();
	var data = jx("#form").serialize();
	var url="../groupInfo/groupInfoAction!getAllGroup.do";
	jx.post(url,"model.pageNo=1&"+data+"&serialNumber="+serialNumber,function(d){
		jx(".rcontent").html(d);
	});
}
function RndNum() {
	var rnd = "";
	for ( var i = 0; i <5; i++)
		rnd += Math.floor(Math.random() * 10);
	return rnd;
}
function addGroup() {
	f(200, 400, "增加组", "../groupInfo/addGroup.jsp");
}
function addCar(me) {
	f(500, 800, "车辆绑定", "../carInfo/carInfoAction!getAllCarInfos.do?groupId="
			+ me + "&NoGroupModel.pageNo=1&groupModel.pageNo=1");
}
function addToGroup(me, you) {
	if (confirm("确定要添加到当前组吗?")) {
		jx.ajax({
			type : "post",
			url : "../carInfo/carInfoAction!addCarInfo.do?carId=" + me
					+ "&groupId=" + you,
			success : function(me) {
				alert("操作完成");
				carInfoPage(1);
				noCarInfoPage(1);
			}
		});
	} else {
		alert("已撤销添加操作.");
	}
}
function delInto(me, you) {
	if (confirm("确定要从当前组删除此项吗?")) {
		jx.ajax({
			type : "post",
			url : "../carInfo/carInfoAction!delFromGroup.do?carId=" + me
					+ "&groupId=" + you,
			success : function(me) {
				alert("操作完成");
				carInfoPage(1);
				noCarInfoPage(1);
			}
		});
	} else {
		alert("已撤销添加操作.");
	}
}
function delGroup(me) {
	if (confirm("确定要清空数据吗？")) {
		jx.ajax({
			type : "post",
			url : "../groupInfo/groupInfoAction!delGroup.do?group.groupId="
					+ me,
			success : function(me) {
				alert("数据已删除");
				loadData();
			}
		});
	} else {
		alert("您已取消删除");
	}
}
function updateGroup(you) {
	f(200, 400, "修改组", "../groupInfo/groupInfoAction!getGroupById.do?group.groupId=" + you);

}
function showPage(pageNo) {
	var data = jx("#form").serialize();
	var serialNumber=RndNum();
	var url="../groupInfo/groupInfoAction!getAllGroup.do";
	jx.post(url,"model.pageNo="+pageNo+"&"+data+"&serialNumber="+serialNumber,function(d){
		jx(".rcontent").html(d);
	});
}
function carInfoPage(pageNo) {
	var data = jx('#carForm').serialize();
	var serialNumber=RndNum();
	var url="../carInfo/carInfoAction!getAllGroupCarInfos.do";
	var data="groupModel.pageNo="+ pageNo + "&" + data+"&serialNumber="+serialNumber;
	jx.post(url,data,function(d){
		jx(".Ingroup").html(d);
	});
}
function noCarInfoPage(pageNo) {
	var serialNumber=RndNum();
	var data = jx('#carForm').serialize();
	var url="../carInfo/carInfoAction!getNoGroupCarInfos.do";
	var data="NoGroupModel.pageNo="+ pageNo + "&" + data+"&serialNumber="+serialNumber;
	jx.post(url,data,function(d){
		jx(".Outgroup").html(d);
	});
}
