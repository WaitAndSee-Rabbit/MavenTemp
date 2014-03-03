var father;
function serachInfo(){
	var serialNumber =RndNum();
	var data=jx("#form").serialize(); 
	var url="../carManager/customerInfoAction!getCustomerByCondition.do";
	jx.post(url,data,function(d){
		jx(".rcontent").html(d);
	});
}
function carPage(pageNo){
	var data=jx("#form").serialize(); 
	var url="../carManager/customerInfoAction!getCustomerByCondition.do";
	data=data+"&model.pageNo="+pageNo;
	jx.post(url,data,function(d){
		jx(".rcontent").html(d);
	});
}
function RndNum() {
	var rnd = "";
	for ( var i = 0; i <5; i++)
		rnd += Math.floor(Math.random() * 10);
	return "A"+rnd;
}
function addCarMesg(){
   father=f(400,800, '添加客户信息','../carManager/addCustomer.jsp');
}
function addCar(me,you){
	father=f(500,800,'添加车辆信息','../carManager/carDetailAction!getCarDetailByCustomerId.do?model.pageNo=1&car.customerId='+me);
}
function delCustomer(me){
	if (confirm("确定要删除当前客户吗?")) {
		jx.ajax({
			type : "post",
			url : "../carManager/customerInfoAction!delCustomer.do?customerId="+me,
			success : function(me) {
				 alert("操作完成");
				 serachInfo(); 
			}
		});
	} else {
		alert("已撤销删除操作.");
	}
}
function updateCustomer(me){
	father=f(400,800, '修改客户信息','../carManager/customerInfoAction!getCustomerById.do?customerId='+me);
}
// 获取车品牌信息
function getCarBrands(){
	$.ajax({
		type:"post",
		url:"../carManager/carDetailAction!getAllCarBrand.do",
		success : function(me) {
		   eval("you="+me);
		   var str="<option value='-1'>- -请选择- -</option>";
		   for ( var i = 0; i < you.length; i++) {
			      str=str+"<option value='"+you[i].ID+"'>"+you[i].NAME+"</option>";
		    }
		    $('#brand').append(str);
		}
	});
}
// 根据车辆类型选择车辆品牌
function getCarTypes(){
	var id= $('#brand').val();
	if(id!=""){
		$.ajax({
			type:"post",
			url:"../carManager/carDetailAction!getAllCarType.do?brandId="+id,
			success : function(me) {
				eval("you="+me);
				var str="<option value=''>- -请选择- -</option>";
				var str2='';
				for ( var i = 0; i < you.length; i++) {
					str=str+"<option value='"+you[i].ID+"'>"+you[i].NAME+"</option>";
					str2=str2+'<input type="hidden" id=car'+you[i].ID+' value='+you[i].D+' />';
				}
				$('#type').html(str);
				$('#carTime').html(str2);
			}
		});
	}else{
		$('#type').html("<option value=''>--请选择--</option>");
	}
}
//获得默认的保养时间间隔
function getCarTime(){
	var temp=$('#type').val();
	var type=$('#car'+temp).val();
	$('#maintainKm').val(type);
}
function customerCarPage(pageNo){
    var customerId=$('#customerId').val();
    var url="../carManager/carDetailAction!getPageCar.do";
    $.post(url,"model.pageNo="+pageNo+"&car.customerId="+customerId,function(d){
		$(".shang").html(d);
	});
}
function updateCarInfo(me){
	art.dialog.open('../carManager/carDetailAction!getCarById.do?car.carId='+me, {
			title : '修改车辆信息',
			width : 800,
			height : 500,
			id:'myson'
	});
}
function updateCarBrands(id){
	if(id=='' || id==0){
		getCarBrands();
	}
	else{
		$.ajax({
			type:"post",
			url:"../carManager/carDetailAction!getAllTypesById.do?car.carType="+id,
			success : function(me) {
				eval("you="+me);
				var str="<option value='-1'>- -请选择- -</option>";
				for ( var i = 0; i < you.length; i++){
					if(you[i].ID==id){
						str=str+"<option value='"+you[i].ID+"' selected='selected'>"+you[i].NAME+"</option>";
					}
					else{
						str=str+"<option value='"+you[i].ID+"'>"+you[i].NAME+"</option>";
					}
				}
				$('#type').html(str);
				if(you[0]!=null){
					updateCarTypes(you[0].BID);
				}
			}
		});
	}
}
function updateCarTypes(bid){
	$.ajax({
		type:"post",
		url:"../carManager/carDetailAction!getAllCarBrand.do",
		success : function(me) {
			eval("you="+me);
			var str="<option value='-1'>- -请选择- -</option>";
			for ( var i = 0; i < you.length; i++) {
			    if(bid==you[i].ID){
			    	str=str+"<option value='"+you[i].ID+"'  selected='selected'>"+you[i].NAME+"</option>";
			    }
			    else{
			    	str=str+"<option value='"+you[i].ID+"' >"+you[i].NAME+"</option>";
			    }
		    }
		    $('#brand').append(str);
		}
	});
}
function searchInCar(){
	var obj = jx('#menu li')[0];
	jx(obj).addClass("selectTag").siblings().removeClass("selectTag");
	jx("#tagContent").html("正在加载...");
	jx("#tagContent").load("../carManager/carDetailAction!getCarByCondition.do?condition.customerId=");
}
function areaInSet(){
	var seriname=RndNum();
	var obj = jx('#menu li')[1];
	jx(obj).addClass("selectTag").siblings().removeClass("selectTag");
	jx("#tagContent").html("正在加载...");
	jx("#tagContent").load("../carManager/areaSet.jsp?aa="+seriname);
}
function searchCarInfo(){
	var data=jx("#cars").serialize()+"&model.pageNo=1"; 
	var url="../carManager/carDetailAction!getCarByCondition.do";
	jx.post(url,data,function(d){
		jx("#tagContent").html("正在加载...");
		jx("#tagContent").html(d);
	});
}
function carsPage(pageNo){
	var data=jx("#cars").serialize()+"&model.pageNo="+pageNo;
	var temp=jx('#carSelect').val();
	var url="../carManager/carDetailAction!getCarByCondition.do";
	jx.post(url,data,function(d){
		jx("#tagContent").html("正在加载...");
		jx("#tagContent").html(d);
		if(temp==3){
			jx("input[type='checkbox']").attr("checked", "true");
			jx('#carSelect').val(temp);
		}
	});
}
function getChecked(me){
	var temp=me.value;
	if(me.value==2){
		jx("input[type='checkbox']").attr("checked", "true");
	}else if(me.value==3){
		jx("input[type='checkbox']").attr("checked", "true");
	}else{
		jx("input[type='checkbox']").removeAttr("checked");
	}
}
function getSelected(){
	var aa='';
	var temp=jx('#carSelect').val();
	if(temp==3){
	var url='../carManager/carDetailAction!getSelectData.do';
	var data=jx("#cars").serialize();
		jx.post(url,data,function(d){
			var str='';
			eval("points="+d);
			if(points==null || points.length==0){
				alert("对不起，未获取到相应车辆信息...")
			}else{
				for ( var i = 0; i < points.length; i++) {
					str+=points[i].carId+',';
				}
				window.parent.getNodesByParamFuzzy(str.substring(0,str.length-1),jx('#online').val());
				window.parent.win.close();
			}
		});	
	}else{
		jx("input[type='checkbox']:checkbox:checked").each(function(){
			aa +=jx(this).val()+',';
		})
		window.parent.getNodesByParamFuzzy(aa.substring(0,aa.length-1),jx('#online').val());
		window.parent.win.close();
	}
}
var map;

function initMap(){
	map = new CjtMap();
	map.initialize("cjtmap"); 
}
function mapInitOk(ok){
	map.setZoom(8);
	map.setCenter("116.3972282409668","39.90960456049752");
}
// 画区域
function  draws(){
	mypoints="";
	var temp=jx('input:radio[name="areaSet"]:checked').val();
	if(temp==0){
		clears();
		map.drawPolygon("2","0xEB0506","green");
	}else{
		getDraw();
		map.drag();
	}
}
var k=0;
// 多边形区域的返回函数
function getDrawPolygonLonLats(lonlats){
	jx('#coords').val(lonlats);
}
// 清除所有的覆盖物
function clears(){
	map.clearPolygons();
	map.clearMarkers();
	jx('#coords').val('');
	k=0;
	jx('#ok').attr({"disabled":"disabled"});
	map.drag();
}
// 进入拖拽模式
function toDrag(){
	map.drag();
}
// 往后台传送多边形区域数据
function dome(){
	var str='';
	var temp=jx('input:radio[name="areaSet"]:checked').val();
	map.clearMarkers();
	var online=jx('#online').val();
	if(temp==0){
		var coords=jx('#coords').val();
		var url="../carManager/carDetailAction!getPointByCondition.do";
		var data="condition.customerId=&coords="+coords+"&condition.online="+online;
		if(coords==null || coords==''){
			alert("对不起，请选择地图区域");
		}else{
			jx.post(url,data,function(d){
				eval("points="+d);
				if(points==null || points.length==0){
					alert("对不起，未获取到相应车辆信息...")
				}else{
					for ( var i = 0; i < points.length; i++) {
						//map.addMarker("../images/marker_off.png", 24, 24, "m1", poiName, points[i].longitude,points[i].latitude,poiName, "0x000000", 1, "0xFF0000", 300, 200, false);
						//map.addPoint('1',points[i].carId,points[i].longitude,points[i].latitude,10,'black');
						var str2="<br>用户名:"+points[i].customerName+"<br>"+"机器手机号"+points[i].mphone+"<br>车牌号:";
						if(points[i].platNo!=null){
							str2+=points[i].platNo;
						}
						map.addMarker("../images/marker_off.png",24,24,'m1',points[i].carId,points[i].longitude,points[i].latitude,str2,
								"0x000000", 1, "0xFF0000", 200,150, false);
						str+=points[i].carId+',';
					}
					mypoints=str;
				}
				if(mypoints==null || mypoints.length==0){
					jx('#ok').attr({"disabled":"disabled"});
				}else{
					jx('#ok').removeAttr("disabled");
				}
			});
		}
	}else{
	    var url="../carManager/carDetailAction!getPointByCircle.do";
	    var x=jx('#x').val();
	    var y=jx('#y').val();
	    var radius=jx('#r').val();
		var data="condition.customerId=&center.x="+x+"&center.y="+y+"&radius="+radius+"&condition.online="+online;
		if(1!=1){
			alert("对不起，请选择地图区域");
		}else{
			jx.post(url,data,function(d){
				eval("points="+d);
				if(points==null || points.length==0){
					alert("对不起，未获取到相应车辆信息...")
				}else{
					for ( var i = 0; i < points.length; i++) {
						//select carl_id as carId, MPHONE as mphone, cd.customer_id as customerId, cd.customer_name as customerName, plat_no as platNo, engine_no as engineNo, latitude as latitude, longitude as longitude from car_info ci, car_detail cd left join car_type on ctype_id = car_type left join customer_info cui on cui.customer_id=cd.customer_id where cui.shop_id=? and cd.carl_id = ci.car_id order by carl_id desc
						var str2="<br>用户名:"+points[i].customerName+"<br>"+"机器手机号"+points[i].mphone+"<br>车牌号:";
						if(points[i].platNo!=null){
							str2+=points[i].platNo;
						}
						map.addMarker("../images/marker_off.png",24,24,"mi",points[i].carId,points[i].longitude,points[i].latitude,str2,
								"0x000000", 1, "0xFF0000", 200,150, false);
						str+=points[i].carId+',';
					}
					mypoints=str;
				}
				if(mypoints==null ||mypoints.length==0){
					jx('#ok').attr({"disabled":"disabled"});
				}else{
					jx('#ok').removeAttr("disabled");
				}
			});
		}
	}
	map.drag();
}
function searchByMap(){
	window.parent.getNodesByParamFuzzy(mypoints.substring(0,mypoints.length-1),jx('#online').val());
	mypoints="";
	window.parent.win.close();
}
// 选择区域模式
function areaSet(){
	var temp=jx('input:radio[name="areaSet"]:checked').val();
	if(temp==0){
		jx("#circle").hide();
		jx("#plo").show();
		jx("#circley").hide();
		jx("#ploy").show();
	}else{
		clears();
		jx("#plo").hide();
		jx("#circle").show();
		jx("#circley").show();
		jx("#ploy").hide();
		map.drag();
	}
}
// 圆心的返回函数
function getDrawPointLonlat(lon,lat){
	if(k==0){
		jx('#x').val(lon);
		jx('#y').val(lat);
		map.drag();
	}
	k++;
}
// 画圆心
function drawCenter(){
	 clears();
	 map.drawPoint("1",'black');
}
// 开始画圆
function getDraw() {
	var pox = document.getElementById("x");
	var poy = document.getElementById("y");
	var radis = document.getElementById("r");
	drawCircle(pox.value, poy.value, radis.value);
}
// 实际画圆的方法
function drawCircle(lon,lat, radius) {
	map.clearPolygons();
	jx('#coords').val('');
	map.drag();
	radius = (radius / 1000);
	map.setCenter(lon, lat);
	var earthRadius = 6371;
	// Բ��γ��
	var lat = (lat * Math.PI) / 180;
	// Բ�ľ���
	var lon = (lon * Math.PI) / 180;
	var d = parseFloat(radius) / earthRadius;
	var points = ";";
	for (i = 0; i <=360; i++) {
		var point = "";
		var bearing = i * Math.PI / 180;
		var mylat = Math.asin(Math.sin(lat) * Math.cos(d) + Math.cos(lat)
				* Math.sin(d) * Math.cos(bearing));
		var mylon = ((lon + Math.atan2(Math.sin(bearing) * Math.sin(d)
				* Math.cos(lat), Math.cos(d) - Math.sin(lat) * Math.sin(lat))) * 180)
				/ Math.PI;
		mylat = (mylat * 180) / Math.PI;
		points = points + mylon + "," + mylat + ";";
	}
	map.addPolygon(2, 'shang', points,2,'0xEB0506', 'black');
}
function getMapSelect(){
	var data=jx('#mapData').val();
}
try{
	var treeObj = window.parent.jx.fn.zTree.getZTreeObj("customerTree");
	var mynodes = treeObj.getNodes();
}catch(e){}

// 遍历树方法 递归
function checkTree(nodes,array){
	for (var i = 0; i < nodes.length; i++) {
		if(nodes[i].isParent){
			checkTree(nodes[i].children,array);
		}else{
			if(equalArray(array,nodes[i].id)){
				treeObj.checkNode(nodes[i],true, true); 
			}
		}
	}
}
// 判断一个值是否在数组中
function testTree(array){
	checkTree(mynodes,array);
}
function equalArray(array,temp){
	for ( var i = 0; i < array.length; i++) {
		if(array[i]==temp){
			return true;
		}
	}
	return false;
}