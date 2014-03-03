function format(date,format){
			var o =
			{
					"M+" : date.getMonth()+1, //month
					"d+" : date.getDate(),    //day
					"h+" : date.getHours(),   //hour
					"m+" : date.getMinutes(), //minute
					"s+" : date.getSeconds(), //second
					"q+" : Math.floor((date.getMonth()+3)/3),  //quarter
					"S" : date.getMilliseconds() //millisecond
			}
			if(/(y+)/.test(format)){
				format=format.replace(RegExp.$1,(date.getFullYear()+"").substr(4 - RegExp.$1.length));
			}
			for(var k in o){
				if(new RegExp("("+ k +")").test(format)){
					format = format.replace(RegExp.$1,RegExp.$1.length==1 ? o[k] : ("00"+ o[k]).substr((""+ o[k]).length));
				}
			}
			return format;
}
(function(jx){
	
	window.ProgressBar = function(){
		this.maxProgress = 0;//进度最大值
		this.progress = 0;//当前进度
		this.btnState = 0;//移动条状态。1-表示鼠标按下，0-表示鼠标弹起。
		this.progressBarWidth = 210;//进度条长度
		this.moveBarWidth = 16;//拖动条宽度
		this.finishedWidth = 0;//完成进度条的宽度
		this.remainderWidth = 210;//未完成的进度条的宽度
		this.signText = '0/0';
		this.ratio = 1;
		this.moveAbled = true;
		this.progressBarId = null;
		this.moveBarEvent = null;
		this.moveBarEventOnMouseUp = null;
	};
	window.ProgressBar.prototype = {
			/**
			 * 初始化参数和绑定鼠标事件（必须在页面加载完成时调用或者使用jQuery.ready加载）
			 * @param maxProgress
			 * @param oneStep
			 * @param progress
			 * @param progressBarWidth
			 * @param callBackFn
			 */
			init:function(progressBarId,progressBarWidth){
				this.progressBarId = progressBarId;
				this.progressBarWidth = progressBarWidth;//进度条中宽度
				this.remainderWidth = progressBarWidth;//未完成的进度条的宽度
				
				jx('#'+this.progressBarId).css('width',String(this.progressBarWidth+this.moveBarWidth) + "px");
				jx('#'+this.progressBarId+' .finished').css('width',String(this.finishedWidth) + "px");
				jx('#'+this.progressBarId+' .remainder').css('width',String(this.remainderWidth) + "px");
				this.setSignText();
				
				/*********************绑定鼠标拖动事件开始***********************************/
				var _progressBar = this;
				jx('#'+this.progressBarId+' .moveBar').bind('mousedown',function(event) {
					if (!_progressBar.moveAbled){
						_progressBar.setSignText('<span style="color:red;">播放后才能推动</span>')
						return;
					}
					_progressBar.btnState = 1;
					var startProgress = _progressBar.progress;
					var mouseStartPosX = event.pageX;
					jx('#'+_progressBar.progressBarId).mousemove(function(event){
						var movePosX = event.pageX - mouseStartPosX;//偏移量
						if (movePosX != 0){
						}
						var finished = movePosX/_progressBar.ratio + startProgress; //完成进度
						finished = Math.round(finished);
						if (_progressBar.btnState == 0){
							return;
						}
						if (finished < 0){
							finished = 0;
						}else if (finished > _progressBar.maxProgress){
							finished = _progressBar.maxProgress
						}
						
						_progressBar.progress = finished;
						jx('#'+_progressBar.progressBarId+' .finished').css("width", String(_progressBar.progress*_progressBar.ratio) + "px"); 
						jx('#'+_progressBar.progressBarId+' .remainder').css("width", String((_progressBar.maxProgress-_progressBar.progress)*_progressBar.ratio) + "px");
						_progressBar.setSignText();
						if (_progressBar.moveBarEvent){
							_progressBar.moveBarEvent();
						}
						
					});
				});
				jx(document).bind('mouseup',function() {
					_progressBar.btnState = 0;
					if (_progressBar.moveBarEventOnMouseUp){
						//_progressBar.moveBarEventOnMouseUp();
					}
				});
				/*********************绑定鼠标拖动事件结束***********************************/
				
				/*********************绑定单机鼠标点击进度条事件开始***********************************/
				jx('#'+this.progressBarId+' .finished').bind('click',function(event) {
					if (!_progressBar.moveAbled) return;
					var movePosX = event.pageX - jx('#'+_progressBar.progressBarId+' .moveBar').offset().left;//偏移量
					var finished = (jx('#'+_progressBar.progressBarId+' .finished').width() + movePosX)/_progressBar.ratio; //完成进度
					finished = Math.round(finished);
					if (finished >= 0){
						_progressBar.progress = finished;
						jx('#'+_progressBar.progressBarId+' .finished').css("width", String(_progressBar.progress*_progressBar.ratio) + "px"); 
						jx('#'+_progressBar.progressBarId+' .remainder').css("width", String((_progressBar.maxProgress-_progressBar.progress)*_progressBar.ratio) + "px");
						_progressBar.setSignText();
						if (_progressBar.moveBarEvent){
							_progressBar.moveBarEvent();
						}
					}
				});
				jx('#'+_progressBar.progressBarId+' .remainder').bind('click',function(event) {
					if (!_progressBar.moveAbled) return;
					var movePosX = event.pageX - jx('#'+_progressBar.progressBarId+' .moveBar').offset().left - _progressBar.moveBarWidth;//偏移量
					var finished = (jx('#'+_progressBar.progressBarId+' .finished').width() + movePosX)/_progressBar.ratio; //完成进度
					finished = Math.round(finished);
					if (finished <= (_progressBar.maxProgress)){
						_progressBar.progress = finished;
						jx('#'+_progressBar.progressBarId+' .finished').css("width", String(_progressBar.progress*_progressBar.ratio) + "px"); 
						jx('#'+_progressBar.progressBarId+' .remainder').css("width", String((_progressBar.maxProgress-_progressBar.progress)*_progressBar.ratio) + "px");
						_progressBar.setSignText();
						if (_progressBar.moveBarEvent){
							_progressBar.moveBarEvent();
						}
					}
				});
				/*********************绑定单机鼠标点击进度条事件结束***********************************/
			},
			setProgress:function(progress){
				this.progress = progress;
				jx('#'+this.progressBarId+' .finished').css("width", String(this.progress*this.ratio) + "px"); 
				jx('#'+this.progressBarId+' .remainder').css("width", String((this.maxProgress-this.progress)*this.ratio) + "px");
				this.setSignText();
			},
			setMaxProgress:function(maxProgress){
				this.maxProgress = maxProgress;
				this.ratio = this.progressBarWidth/maxProgress;
				this.setSignText();
			},
			setSignText:function(text){
				var sign = jx('#'+this.progressBarId+'Sign');
				if (sign){
					if (text){
						sign.html(this.progress+'/'+this.maxProgress+'('+text+')');
					}else{
						sign.html(this.progress+'/'+this.maxProgress);
					}
				}
			},
			
			getProgress:function(){
				return this.progress;
			},
			getMaxProgress:function(){
				return this.maxProgress;
			},
			setMoveBarEvent:function(moveBarEvent){
				this.moveBarEvent = moveBarEvent;
			},
			setMoveBarEventOnMouseUp:function(moveBarEventOnMouseUp){
				this.moveBarEventOnMouseUp = moveBarEventOnMouseUp;
			}
	};
})(jQuery);