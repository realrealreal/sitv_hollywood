import Vue from "vue"
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios, axios)

export default {
	getRequest(url, params, cb) {
		return new Promise((resolve, reject) => {
		  Vue.axios.get(url,{
			params: params
			})
		    .then(cb)
		    .catch((err) => {
		      reject(err);
		    });
		});
	},
	postRequest(url, params, cb) {
		return new Promise((resolve, reject) => {
		Vue.axios.post(url,params)
		  .then(cb)
		  .catch((err) => {
		    reject(err);
		  });
		});
	}
}







/*import vueResource from "vue-resource"

Vue.use(vueResource);
Vue.http.options.emulateJSON = true;

export default{
	getRequest(url,cb) {
		return new Promise((resolve, reject) => {
		  Vue.http.get(url)
		    .then(cb)
		    .catch((err) => {
		      reject(err);
		    });
		});
	},
	postRequest(url, params,cb) {
		return new Promise((resolve, reject) => {
		Vue.http.post(url,params)
		  .then(cb)
		  .catch((err) => {
		    reject(err);
		  });
		});
	}
}*/