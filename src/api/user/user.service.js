
/**
 * @name uid
 * @desc 获取用户ID
 * @returns {String} 用户ID
 */
function uid() {
    return typeof BesTVApp !== 'undefined'? BesTVApp.getUserId(): '0';
    //return typeof httpott !== 'undefined'? httpott.getUserId(): '8731204033622785';
}

/**
 * @name mac
 * @desc 获取机顶盒mac地址
 * @returns {String} 用户ID
 */
function mac() {
    return typeof BesTVApp !== 'undefined'? BesTVApp.getMac(): 'a4:5e:60:ef:ef:9f';
    //return typeof httpott !== 'undefined'? httpott.getMac(): 'a4:5e:60:ef:ef:9f';
}

/**
 * @name userName
 * @desc 获取userName
 * @returns {String} 用户name
 */
function userName() {
    return typeof BesTVApp !== 'undefined'? BesTVApp.getUserName(): 'test';
}

/**
 * @name appVersion
 * @desc 获取appVersion
 * @returns {String} appVersion
 */
function appVersion() {
    return typeof BesTVApp !== 'undefined'? BesTVApp.getAppVersion(): '5.6';
}

/**
 * @name aaaToken
 * @desc 获取aaaToken
 * @returns {String} aaaToken
 */
function aaaToken() {
    return typeof BesTVApp !== 'undefined'? BesTVApp.get3AToken(): 'test';
}



export default {
    uid,
    mac,
    userName,
    appVersion,
    aaaToken
}