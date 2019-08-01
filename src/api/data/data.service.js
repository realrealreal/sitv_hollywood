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
function queryHistory(cb,category){
	console.info(url.queryHistoryApi,category);
	http.getRequest(url.queryHistoryApi,{
		'pageSize': 300,
		'userId': user.uid(),
		'category': category
	},cb);
}
/**
 * [queryCollection 获取收藏信息]
 * @Author   shanjing
 * @DateTime 2019-07-02T17:41:32+0800
 * @param    {Function}               cb       [回调函数]
 * @param    {String}                 category [编排code]
 * @return   {[type]}                          [null]
 */
function queryCollection(cb,category){
	console.info(url.queryCollectionApi,category);
	http.getRequest(url.queryCollectionApi,{
		'pageSize': 1000,
		'userId': user.uid(),
		'category': category
	},cb);
}

/**
 * [queryIsCollected 获取单个节目收藏情况]
 * @Author   shanjing
 * @DateTime 2019-07-02T17:41:32+0800
 * @param    {Function}               cb          [回调函数]
 * @param    {String}                 programCode [节目code]
 * @return   {[type]}                             [null]
 */
function queryIsCollected(cb,programCode){
	console.info(url.queryCollectionApi,programCode);
	http.getRequest(url.queryCollectionApi,{
		'userId': user.uid(),
		'contentId': programCode
	},cb);
}

/**
 * [deleteCollection 取消收藏]
 * @Author   shanjing
 * @DateTime 2019-08-01T16:59:28+0800
 * @param    {Function}               cb    [description]
 * @param    {[type]}                 query [description]
 * @return   {[type]}                       [description]
 */
function deleteCollection(cb,query){
	query.userId = user.uid();
	http.getRequest(url.deleteCollectionApi,query,cb);
}

/**
 * [addCollection 添加收藏]
 * @Author   shanjing
 * @DateTime 2019-08-01T16:59:33+0800
 * @param    {Function}               cb    [description]
 * @param    {[type]}                 query [description]
 */
function addCollection(cb,query){
	query.userId = user.uid();
	http.getRequest(url.addCollectionApi,query,cb);
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
	console.info(`${url.dataApi}/${type}/${programCode}.json?size=1000`);
	http.getRequest(`${url.dataApi}/${type}/${programCode}.json?size=1000`,null,cb);
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
	getCategroyList,
	queryIsCollected
}