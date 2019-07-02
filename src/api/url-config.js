let base = 'http://localhost:8999/'

export default {
  login: `${base}epgps/api/login.json`,
  movieIndex: `${base}epg/ott/movie.main`,
  queryHistory: `${base}epg/api/tvportal/queryHistory.json`,
  queryCollection: `${base}epg/api/tvportal/queryCollection.json`
}



// const serverUrl = 'http://www.fooju.cn/fjw/api.php?'
// export default {
//   serverUrl: 'http://www.fooju.cn/',
//   map: 'http://online0.map.bdimg.com/tile/?qt=tile',
//   login: serverUrl + 's=Login/login', /* 登录 */
//   register: serverUrl + 's=Login/register', /* 注册 */
// }