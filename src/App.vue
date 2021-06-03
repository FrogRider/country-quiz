<template>
  <div id="app">
    <div class="wrapper">
      <questionsCard v-if="true"/>
    </div>
  </div>
</template>

<script>
  import mixin from '@/mixins/dataManipulating'
  import store from '@/store'
  import questionsCard from '@/components/questionsCard.vue'

  export default {
    mixins: [mixin],
    components: {questionsCard},
    data: function () {
      return {
        data: []
      }
    },
    mounted() {
      store.dispatch('fillData')
      store.dispatch('getUserInfo')
    }
  }
  
</script>

<style lang="scss">
  @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@200;300;400;600;700;800&display=swap');

  html, body {
    font-family: 'Nunito', sans-serif;
  }

  *, *::before, *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  #app {
    width: 100vw;
    min-height: 100vh;
    background-image: url('./assets/background.png');
    background-size: cover;
    background-repeat: no-repeat;
    overflow-y: scroll;
  }

  .wrapper {
    max-width: 400px;
    width: 100%;
    margin: 0 auto;
    min-height: 100vh;
    display: grid;
    align-items: center;
    padding: 0 10px;
    
  }
</style>
