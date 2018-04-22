import * as basicScroll from 'basicscroll'

export default {
  install(Vue, options) {
    Vue.$basicScroll = basicScroll
    Vue.directive('basicscroll', {
      bind (el) {
        console.warn('binded El', el)
        el.$BSInstance = basicScroll.create({
          elem: el,
          from: 'top-bottom',
          to: 'bottom-middle',
          props: {
            '--opacity': {
              from: .01,
              to: .99
            }
          }
        })
        el.$BSInstance.start()
      }
    })
  }
}
