/**
 * [config 全局配置]
 * @type {Object}
 */
const config = {
	base: 'http://localhost:8999',
	href: {
		repo:'repo'
	},
	orderDefaultImg:'../../assets/images/order.png'
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