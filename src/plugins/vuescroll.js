import Vue from 'vue'
import vuescroll from 'vuescroll';


// 你可以在这里设置全局配置
Vue.use(vuescroll, {
  scrollPanel: {
    initialScrollY: false,
    initialScrollX: false,
    scrollingX: true,
    speed: 300,
    easing: undefined,
    verticalNativeBarPos: 'right',
    maxHeight:undefined,
    maxWidth:undefined,
  },
  ops: {
    bar: {
      showDelay: 500,
      onlyShowBarOnScroll: true,
      keepShow: false,
      background: '#c1c1c1',
      opacity: 1,
      hoverStyle: false,
      specifyBorderRadius: false,
      minSize: false,
      size: '6px',
      disable: false,
      locking: true,

    }
  }, // 在这里设置全局默认配置
  name: 'Scroll' // 在这里自定义组件名字，默认是vueScroll
});

