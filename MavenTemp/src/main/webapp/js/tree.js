var setting = {
		async:{
			enable: true,
			url: "../customerTree/getCustomerTree.do",
			autoParam: ["id"]  
		},
		check:{
			enable:true,
			chkStyle:"checkbox"
		},
		data:{
			key:{
				checked : "checked",
				children : "children",
				name : "name",
				title : "title",
				url : "url"
			}
		},
		view: {
			showTitle:true
		}
	};


function refreshTree(asyncUrl) {
	zTreeObj = jx.fn.zTree.init(jx("#customerTree"), setting);
}

/**
 * 模糊查找节点
 */
function getNodesByParamFuzzy(carIds,val){
	if(carIds=='shangzezhong'){
		var keywords = jx("#key").attr("value");
		keywords = keywords.replace(/[ ]/g,"");
		var online = jx("#online").val();
		setting.async.url = encodeURI("../customerTree/getCustomerTree.do");
		setting.async.otherParam = { "keywords":keywords, "online":online};
		refreshTree();
	}else{
		jx("#online").val(val);
		jx("#key").val("");
		setting.async.url = encodeURI("../customerTree/getCustomerTree.do");
		setting.async.otherParam = {'carIds':carIds};
		refreshTree();
	}
}

function advancedSearch(){
	var url = "../customerTree/toAdSearch.do";
	art.dialog.open(url,
				{id:'my', 
			     skin:'chrome',
			     title:'高级查询(ESC取消)', 
			     lock: true,width: '1000px',height: '550px'});

}

var zTree = {
		getSelectNodesCarIds:function(){
			var nodes = zTreeObj.getCheckedNodes(true);
			var carIds = "";
			 for(var i=0;i<nodes.length;i++){
				 if(!nodes[i].isParent){
					 carIds += nodes[i].id+",";
				 }
			 }
			 if(carIds != ""){
				 carIds = carIds.substr(0,carIds.length-1);
			 }
			 return carIds;
		}
}