
function use(deps,callback){
	if(deps.length==0){callback();}
	var length = deps.length;
	var param = [];
	for(var i=0;i<length;i++){
		//加载依赖模块
		(function(j){
			loadMod(deps[j],function(params){
				length--;
				param[j]= params;
				if(length===0){
					callback.apply(null,param);
				}
			});
		})(i);
	}
}


var modMap =[];  //mobMap.a.{callback}

function define(name,callback){
	modMap[name] = {};
	modMap[name].callback = callback;
	//var a = modMap[a].callback();
}

function loadMod(name,callback){
	use([],function(){
		loadScript(name,callback)
	});
	
}

function loadScript(name,callback){
	var doc =document;
	var node =doc.createElement("script");
	node.src = name+".js";
	doc.body.appendChild(node)
	node.onload =function(){
		var params =modMap[name].callback();
		callback(params);
	}

}

