import toastcom from './toast.vue'
const toast = {}
toast.install = Vue => {
  const ToastCon = Vue.extend(toastcom)
  const ins = new ToastCon()
  ins.$mount(document.createElement('div'))
  document.body.appendChild(ins.$el)
  Vue.prototype.$toast = (msg, duration = 3000) => {
    ins.message = msg
    ins.visible = true
    setTimeout(() => {
      ins.visible = false
    }, duration)
  }
}
export default toast