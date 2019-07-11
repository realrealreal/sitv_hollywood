import http from "../http.js"
import url from "../url-config.js"
import user from "../user/user.service.js"

/**
 * [getMovieIndex 获取首页信息]
 * @Author   shanjing
 * @DateTime 2019-07-02T15:08:37+0800
 * @param    {Function}               cb [回调函数]
 * @return   {[type]}                    [null]
 */
function getMovieIndex(cb){
	console.info(url.movieIndexApi);
	http.getRequest(url.movieIndexApi,null,cb);
}
/**
 * [queryHistory 获取历史信息]
 * @Author   shanjing
 * @DateTime 2019-07-02T17:41:03+0800
 * @param    {Function}               cb [回调函数]
 * @return   {[type]}                    [null]
 */
function queryHistory(cb){
	console.info(url.queryHistoryApi);
	http.getRequest(url.queryHistoryApi,{
		'pageSize': 300,
		'userId': user.uid(),
		'category': '电影'
	},cb);
}
/**
 * [queryCollection 获取收藏信息]
 * @Author   shanjing
 * @DateTime 2019-07-02T17:41:32+0800
 * @param    {Function}               cb [回调函数]
 * @return   {[type]}                    [null]
 */
function queryCollection(cb){
	console.info(url.queryCollectionApi);
	http.getRequest(url.queryCollectionApi,{
		'pageSize': 300,
		'userId': user.uid(),
		'category': '电影'
	},cb);
}

/**
 * [queryDetails 根据节目code查询节目信息]]
 * @Author   shanjing
 * @DateTime 2019-07-11T18:31:25+0800
 * @param    {[type]}                 type        [节目type]
 * @param    {[type]}                 programCode [节目code]
 * @param    {Function}               cb          [回调函数]
 * @return   {[type]}                             [null]
 */
function queryDetails(type, programCode, cb){
	console.info(`${url.dataApi}/${type}/${programCode}.json`);
	http.getRequest(`${url.dataApi}/${type}/${programCode}.json`,null,cb);
}

/**
 * [search 搜索api]
 * @Author   shanjing
 * @DateTime 2019-07-03T14:09:21+0800
 * @param    {[type]}                 params [query]
 * @param    {Function}               cb     [回调函数]
 * @return   {[type]}                        [null]
 */
function search(params,cb){
	console.info(url.searchApi);
	http.getRequest(url.searchApi,params,cb);
}

/**
 * [getbizList 获取子展示栏目]
 * @Author   shanjing
 * @DateTime 2019-07-11T13:52:12+0800
 * @param    {[type]}                 code [父级bizcode]
 * @param    {Function}               cb   [回调函数]
 * @return   {[type]}                      [description]
 */
function getbizList(code,cb){
	http.getRequest(`${url.bizListApi}${code}.json`,null,cb);
}

/**
 * [getCategroyList 获取编排节目]
 * @Author   shanjing
 * @DateTime 2019-07-11T14:22:09+0800
 * @param    {[type]}                 code [categoryCode]
 * @param    {Function}               cb   [description]
 * @return   {[type]}                      [description]
 */
function getCategroyList(code,cb){
	http.getRequest(`${url.categroyListApi}${code}.json?size=20000`,null,cb);
}
export default{
	getMovieIndex,
	queryHistory,
	queryCollection,
	queryDetails,
	search,
	getbizList,
	getCategroyList
}