import http from "../http.js"
import url from "../url-config.js"
import user from "../user/user.service.js"

/**
 * [login 登录]
 * @Author   shanjing
 * @DateTime 2019-07-02T15:11:18+0800
 * @param    {Function}               cb [回调函数]
 * @return   {[type]}                    [null]
 */
function login(cb){
	console.info(url.login);
	http.getRequest(url.login,{
		'uid': user.uid(),
		'mac': user.mac()
	}, cb);
}

export default{
	login
}