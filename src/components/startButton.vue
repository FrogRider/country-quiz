<template>
  <div class="btn" @click="handleClick">
    {{title}}
  </div>
</template>

<script>
  export default {
    props: ['title'],
    methods: {
      handleClick () {
        this.$emit('customClickedEvent')
      }
    }
  }
</script>

<style scoped lang="scss">
  .btn {
    text-transform: uppercase;
    font-weight: bold;
    padding: 12px 32px;
    background-color: #f9a926;
    color: #fff;
    display: inline-block;
    transition: transform .3s, opacity .3s;
    border-radius: 12px;
    box-shadow: 0 2px 4px rgba(252,168,47,.4);

    &:hover {
      transform: translateY(-1px);
      cursor: pointer;
    }

    &.disabled {
      opacity: .5;

      &:hover {
      transform: none;
      cursor: not-allowed;
    }
    }
  }
</style>