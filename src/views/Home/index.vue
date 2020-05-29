<template>
  <div class="home">
    <img alt="Vue logo" src="../../assets/logo.png">
    <h1>hot loading test</h1>
    <h2>{{ indexCount }}</h2>
    <h3>{{ indexName }}</h3>
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
// 在这里导入模块，而不是在 `store/index.js` 中
import barStoreModule from '@/store/modules/bar'
import titleMixins from '@/libs/title-mixin'

const fetchInitialData = ({ store }) => {
    store.registerModule('bar', barStoreModule)
    store.dispatch('bar/inc')
    return store.dispatch('bar/fetchBar')
}

export default {
  name: 'home',

  mixins: [titleMixins],

  asyncData: fetchInitialData,

  title() {
      const { title } = this.$route.meta
      return title
  },

  serverCacheKey: props => props.item.id,

  components: {
    HelloWorld
  },

  computed: {
    indexName() {
      return this.$store.state.bar.name
    },

    indexCount() {
      return this.$store.state.bar.count
    }
  },

  // 因为服务端渲染只有 beforeCreate 和 created 两个生命周期，不会走这里
  // 所以把调用 Ajax 初始化数据也写在这里，是为了供单独浏览器渲染使用
  mounted() {
    // let store = this.$store
    // fetchInitialData({ store })
  },

  destroyed() {
    this.$store.unregisterModule('bar')
  }
}
</script>