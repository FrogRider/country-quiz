<template>
  <div class="hp-bar" :title="title" v-show="display">
    <div 
      class="hp-bar__item" 
      v-for="(heart, idx) in livesTotal" 
      :key="idx"
      :class="{'wasted': livesRemain.indexOf(idx) === -1}"
    >
    </div>
  </div>
</template>

<script>
  import store from '@/store'

  export default {
    props: ['display'],
    computed: {
      livesTotal: function () {
        return [...Array(store.state.livesTotal).keys()]
      },
      livesRemain: function () {
        return [...Array(store.state.livesRemain).keys()]
      },
      title: function () {
        return `${this.livesRemain[this.livesRemain.length - 1] + 1}  lives left`
      }
    }
  }
</script>

<style scoped lang="scss">
  .hp-bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    overflow: hidden;
    padding: 5px;
    border-radius: 5px;
    background-color: rgba(204, 204, 204, .2);
    transform: rotate(180deg);

    &__item {
      width: 20px;
      height: 20px;
      background-image: url('../assets/heart.svg');
      background-position: center;
      background-repeat: no-repeat;
      background-size: contain;
      position: relative;
      transform: rotate(180deg);

      &::before, &::after {
          content: '';
          position: absolute;
          width: 2px;
          height: 100%;
          border-radius: 2px;
          background-color: red;
          left: 50%;
          top: 0;
          transition: transform .5s ease-in-out, opacity .9s;
          opacity: 0;
        }

        &::before {
          transform: translate(20px, -20px) rotate(45deg);
        }

        &::after {
          transform: translate(-20px, -20px) rotate(-45deg);
        }

      &.wasted {
        &::before, &::after {
          opacity: .5;
        } 

        &::before {
          transform: translate(-50%, 0%) rotate(45deg);
        }

        &::after {
          transform: translate(-50%, 0%) rotate(-45deg);
        }
      }

      & + & {
        margin-left: 5px;
      }
    }
  }
</style>