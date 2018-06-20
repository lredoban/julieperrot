import * as basicScroll from 'basicscroll'

export default {
  install(Vue, options) {
    Vue.$basicScroll = basicScroll
    Vue.directive('basicscroll', {
      inserted (el, binding) {
        el.$BSInstance = basicScroll.create({
          elem: el,
          ...binding.value
        })
        if (typeof binding.modifiers.selfStart === 'undefined'){
          el.$BSInstance.start()
        }
      },
      unbind(el) {
        el.$BSInstance.destroy()
      }
    })
  }
}
