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
	console.info(url.movieIndex);
	http.getRequest(url.movieIndex,null,cb);
}
/**
 * [queryHistory 获取历史信息]
 * @Author   shanjing
 * @DateTime 2019-07-02T17:41:03+0800
 * @param    {Function}               cb [回调函数]
 * @return   {[type]}                    [description]
 */
function queryHistory(cb){
	console.info(url.queryHistory);
	http.getRequest(url.queryHistory,{
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
 * @return   {[type]}                    [description]
 */
function queryCollection(cb){
	console.info(url.queryCollection);
	http.getRequest(url.queryCollection,{
		'pageSize': 300,
		'userId': user.uid(),
		'category': '电影'
	},cb);
}

export default{
	getMovieIndex,
	queryHistory,
	queryCollection
}