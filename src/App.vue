<template>
  <div id="app">
    <button @click="get1">click1</button>
    <button @click="get2">click2</button>
  </div>
</template>

<script>
  import mixin from './mixins/getDataFromAPI'
  import store from '@/store'

  export default {
    mixins: [mixin],
    data: function () {
      return {
        data: {}
      }
    },
    methods: {
      get1 () {
        // let regionsList = store.getters.getUniqueRegions
        // let vatiantsAmount = store.getters.getVariantsAmount
        console.log(
          this.getSingleQuestion()
        )
      },
      get2 () {
        console.log(1)
      }
    },
    mounted() {
      store.dispatch('fillData')
    }
  }
  
</script>

<style lang="scss">

</style>
