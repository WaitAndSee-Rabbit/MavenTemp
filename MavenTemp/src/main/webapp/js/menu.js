function menu(){
	var selectMenu = jx('#menu img:first-child');
	jx(selectMenu).attr("src","../images/menu/" + jx(selectMenu).attr("id") + "(1).png");
	jx('#menu img').each(function(i){
		jx(this).mouseover(function() {//move up down out
				jx(this).attr("src","../images/menu/" + jx(this).attr("id") + "(1).png");
			});
		jx(this).mouseout(function() {//move up down
				jx(this).attr("src","../images/menu/" + jx(this).attr("id") + "(0).png");
				jx(selectMenu).attr("src","../images/menu/" + jx(selectMenu).attr("id") + "(1).png");
			});
		jx(this).mousedown(function() {//move up down	
				jx(selectMenu).attr("src","../images/menu/" + jx(selectMenu).attr("id") + "(0).png");
				selectMenu = jx(this);
				jx(this).attr("src","../images/menu/" + jx(this).attr("id") + "(1).png");
			});
	});
};
function getTreeTo(){
	if(isMap == 1){
		jx("#tree").html("<div style='width:98%;height:98%;text-align:center'><img st src='../images/05043143.gif' style='padding-top:20px'/></div>");
		jx(".ltree").show();
		var url="../customerTree/toCustomerTree.do";
		jx.post(url,"", function(d) {			
			jx("#tree").html(d);
		});
		jx(".rcontent").load("../home/googlemap.jsp");
		isMap = 0;
	}
	try{
		clearTimeout(monitorTrackTask);	
	}catch(e){
		
	};
}
var isMap = 1;

//车辆追踪
function js100000(channelId) {
	getTreeTo();
	jx('.lcontain').load('../home/leftMenu.do',{"channelId":channelId});
	jx(".rtittle").load("../vehicleTrack/rightTitle.jsp");
	resizeWin(true,220);
}
//车辆任务
function js100500(channelId) {
	getTreeTo();
	jx('.lcontain').load('../home/leftMenu.do',{"channelId":channelId});
	jx('.rtittle').load('../vehicleTask/rightTitle.jsp');
	resizeWin(true,215);

}
//车辆报警
function js101000(channelId) {
	getTreeTo();
	jx('.lcontain').load('../home/leftMenu.do',{"channelId":channelId});
	jx('.rtittle').load('../vehicleAlarm/rightTitle.jsp');
	resizeWin(true,215);
}

//车辆管理
function js101500(channelId) {
	isMap = 1;
	jx(".ltree").hide();
	jx('.lcontain').load('../home/leftMenu.do',{"channelId":channelId});
	
	resizeWin();
}
//车辆诊断
function js102000(channelId) {
	isMap = 1;
	jx(".ltree").hide();
	jx('.lcontain').load('../home/leftMenu.do',{"channelId":channelId});
	resizeWin();
}
//收藏夹
function js102500(channelId) {
	isMap = 1;
	jx(".ltree").hide();
	jx('.lcontain').load('../home/leftMenu.do',{"channelId":channelId});
	resizeWin();
}

//系统管理
function js103000(channelId) {
	isMap = 1;
	jx(".ltree").hide();
	jx('.lcontain').load('../home/leftMenu.do',{"channelId":channelId});
	resizeWin();
}
