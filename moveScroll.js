/**
 * [MoveScroll 允许传入的标签进行滚动]
 * @author 曾庆恺
 */
var MoveScroll = {
		obj:"",
		current:0,
		moveWidth:0,
		timeout:0,
		/**
		 * [初始化对象，对象入口* @]
		 * @param  {[obj]}   prev   [上一个按钮]
		 * @param  {[obj]}   next   [下一个按钮]
		 * @param  {[obj]}	 object [传入需要移动的对象]
		 * @param  {[String]} css    [需要修改的CSS名称]
		 * @param  {[String]} unit   [是否需要CSS单位]
		 * @param  {[int]}    mar    [要移动的距离]
		 * @param  {[int]} speed  [每次移动的距离]
		 * @param  {[int]} times  [每多少毫秒执行一次]
		 */
		init : function(prev,next,object,css,unit,mar,speed,times){
			_t = this;
			this.obj = object;
			//每3秒换一下
			_t.timeout = setInterval(function(){
				//length-1是因为减去div.cb。除3是每一栏3个，再减1是第一个
				if(_t.current<((object.children.length-1)/3)-1){
					_t.movePos(object,css,unit,_t.current*mar,(_t.current+1)*mar,speed,times,true);
					_t.current++;
				}else{
					_t.movePos(object,css,unit,_t.current*mar,0,-speed,times/2,false);
					_t.current=0;
				}
			},3000);
			this.setMouseListener(prev,next,object,css,unit,mar,speed,times);
		},
		/**
		 * [setMouseListener 初始化监听鼠标事件]
		 * @param {[type]}   prev   [上一栏]
		 * @param {Function} next   [下一栏]
		 * @param {[type]}   object [停留在obj的时候停止滚动]
		 */
		setMouseListener : function(prev,next,object,css,unit,mar,speed,times){
			prev.onclick = function(e){
				e = e||window.event;
				if(_t.current>0){
					//移动到上一栏
					_t.movePos(object,css,unit,_t.current*mar,(_t.current-1)*mar,-speed,times,false);
					_t.current--;
				}
			}
			next.onclick = function(e){
				e = e||window.event;
				if(_t.current<((object.children.length-1)/3)-1){
					//移动到下一栏
					_t.movePos(object,css,unit,_t.current*mar,(_t.current+1)*mar,speed,times,true);
					_t.current++;
				}
			}
			//鼠标在对象上的时候
			object.onmouseover = function(e){
				e = e||window.event;
				//停止计时器，不让它滚动
				clearInterval(_t.timeout);
			}
			//鼠标不在对象上的时候
			object.onmouseout = function(e){
				e = e||window.event;
				//停止计时器，不让它滚动
				_t.timeout = setInterval(function(){
					//length-1是因为减去div.cb。除3是每一栏3个，再减1是第一个
					if(_t.current<((object.children.length-1)/3)-1){
						_t.movePos(object,css,unit,_t.current*mar,(_t.current+1)*mar,speed,times,true);
						_t.current++;
					}else{
						_t.movePos(object,css,unit,_t.current*mar,0,-speed,times/2,false);
						_t.current=0;
					}
				},3000);
			}
		},
		movePos : function(obj,css,unit,startPos,endPos,speed,times,flag){
			//flag是true就是从左到右移动，否则就相反
			if(flag){
				if(startPos<=endPos){
					obj.style[css] = endPos+unit;
					return false;
				}
			}else{
				if(startPos>=endPos){
					obj.style[css] = 0+unit;
					return false;
				}
			}
			obj.style[css] = startPos + unit;
			//重新调用回自己
			setTimeout(function(){
				_t.movePos(obj,css,unit,startPos+speed,endPos,speed,times,flag);
			},times)
		}
	}
	//找到文档中的ul标签。ul需要设置绝对定位
	var newslist = document.getElementById("newsList").children[0];
	//上一个按钮
	var prev = document.getElementById("prev");
	//下一个按钮
	var next = document.getElementById("next");
	MoveScroll.init(prev,next,newslist,"left","px",-912,-38,20)