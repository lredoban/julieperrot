import * as basicScroll from 'basicscroll'

export default {
  install(Vue, options) {
    Vue.$basicScroll = basicScroll
    Vue.directive('basicscroll', {
      inserted (el) {
        el.$BSInstance = basicScroll.create({
          elem: el,
          from: 'bottom-middle',
          to: 'bottom-top',
          props: {
            '--header-opacity': {
              from: 0,
              to: 1
            }
          }
        })
        el.$BSInstance.start()
      },
      unbind(el) {
        el.$BSInstance.destroy()
      }
    })
  }
}
