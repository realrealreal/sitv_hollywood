/**
 * [config 全局配置]
 * @type {Object}
 */
const config = {
	base: 'http://192.169.2.51:8999',
	href: {
		repo:'repo'
	},
	orderDefaultImg:'../../assets/images/order.png',
	poster: {
		name: 'poster',
		initNumber: 15,
		lineNumber: 5,
		width: '168',
		scrollTop: '295', //单次滚动高度
		isImgIn: false
	},
	still: {
		name: 'still',
		initNumber: 12, //初始值总数量
		lineNumber: 3, //每行数量
		width: '264',
		scrollTop: '185', //单次滚动高度
		isImgIn: false
	},
	noImage: {
		name: 'noImage',
		initNumber: 28,
		lineNumber: 2,
		width: '168', //未用到
		scrollTop: '288', //单次滚动高度
		isImgIn: false
	}
}

/**
 * [store 会话存储]
 * @type {Object}
 */
const store = {
	page: 'index',
	programCode: '',
	//setPage(data){this.page = data},
	//getPage(){return this.page},
	getItem(key){
		return this[key];
	},
	setItem(key,value){
		this[key] = value;
	}
};

export default {
  config,
  store
}