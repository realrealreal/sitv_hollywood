let base = 'http://192.169.2.186:8999/'

export default {
  dataApi: `${base}epg/api`,
  loginApi: `${base}epgps/api/login.json`,
  movieIndexApi: `${base}epg/ott/movie.main`,
  queryHistoryApi: `${base}epg/api/tvportal/queryHistory.json`,
  queryCollectionApi: `${base}epg/api/tvportal/queryCollection.json`,
  searchApi: `${base}epg/api/search.json`, //http://localhost:8999/epg/api/search.json?action=byTag&condition=美国,其他,好莱坞,改编,奥斯卡&curPage=1&pageSize=50&mainFolder=电影&hdType=1
  bizListApi: `${base}epg/api/bizlist/`,
  categroyListApi: `${base}epg/api/categoryitem/`
}



// const serverUrl = 'http://www.fooju.cn/fjw/api.php?'
// export default {
//   serverUrl: 'http://www.fooju.cn/',
//   map: 'http://online0.map.bdimg.com/tile/?qt=tile',
//   login: serverUrl + 's=Login/login', /* 登录 */
//   register: serverUrl + 's=Login/register', /* 注册 */
// }