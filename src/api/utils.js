
/**
 *  utils  工具
 */

export default {
	empty(obj){
		for (let key in obj){
			return false;    //非空
		}
		return true;       //为空
	},
	dateToStr(now){
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
	},
    scrollTo(el,scrollDuration,distance,direction,timer) {
	    var scrollStep = (distance-el[direction]) / (scrollDuration / 15)
	    clearInterval(timer);
	    if(scrollStep == 0) return;
	    timer = setInterval(function(){
	    	if ( el[direction] != distance ) {
	    		el[direction] += scrollStep;
	    		if(scrollStep < 0 && el[direction] < distance || scrollStep > 0 && el[direction] > distance){
	    			el[direction] = distance
	    		}
	    	}else {
	          clearInterval(timer);
	        }
	    },15);
	}
}
