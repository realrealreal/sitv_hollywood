//utils  工具

/**
 * [empty 判断对象是否为空]
 * @Author   shanjing
 * @DateTime 2019-08-02T14:34:11+0800
 * @return   {[Boolean]}                 []
 */
function empty(obj){
	for (let key in obj){
		return false;    //非空
	}
	return true;       //为空
}

/**
 * [dateToStr 时间转string]
 * @Author   shanjing
 * @DateTime 2019-08-02T14:33:26+0800
 * @param    {[type]}                 now [时间]
 * @return   {[type]}                     [null]
 */
function dateToStr(now){
	var yy = now.getFullYear();      //年
	var mm = now.getMonth() + 1;     //月
	var dd = now.getDate();          //日
	var hh = now.getHours();         //时
	var ii = now.getMinutes();       //分
	var ss = now.getSeconds();       //秒
	//var clock = yy + "-";
	var clock = yy;
	if(mm < 10) clock += "0";
	clock += mm; //+ "-";
	if(dd < 10) clock += "0";
	clock += dd; //+ " ";
	if(hh < 10) clock += "0";
	clock += hh; //+ ":";
	if (ii < 10) clock += '0'; 
	clock += ii; //+ ":";
	if (ss < 10) clock += '0'; 
	clock += ss;
	console.info(clock); 
	return clock;
}

/**
 * [scrollTo 滚动效果函数 (暂时无法全局 this作用域)]
 * @Author   shanjing
 * @DateTime 2019-07-19T16:18:56+0800
 * @param    {[type]}                 el             [滚动元素]
 * @param    {[type]}                 scrollDuration [滚动时长]
 * @param    {[type]}                 distance       [滚动距离]
 * @param    {[type]}                 direction      [滚动方向 'scrollTop' 'scrollLeft']
 * @param    {[type]}                 num            [timer]
 * @param    {[type]}                 vm             [this]
 * @return   {[type]}                                [description]
 */
function scrollTo(el,scrollDuration,distance,direction,num,vm) {
    var scrollStep = (distance-el[direction]) / (scrollDuration / 15)
    clearInterval(vm.timer[num]);
    vm.timer[num] = setInterval(function(){
      if ( el[direction] != distance ) {
        el[direction] += scrollStep;
        if(scrollStep < 0 && el[direction] < distance || scrollStep > 0 && el[direction] > distance){
          el[direction] = distance
        }
      }else {
          clearInterval(vm.timer[num]);
      }
    },15);
}

export {
	empty,
	dateToStr,
	scrollTo
}