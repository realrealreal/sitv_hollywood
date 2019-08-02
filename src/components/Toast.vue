<template>
  <transition name="alert-fade">
    <div v-show="visible" class="dialog-tips dialog-center">
      {{message}}
    </div>
  </transition>
</template>

<script>

export default {
  data() {
    return {
      visible: false,
      message: ''
    }
  }
}

</script>

<style scoped lang='stylus'>

.alert-fade-enter-active,.alert-fade-leave-active
  transition opacity 0.3s

.alert-fade-enter,.alert-fade-leave-to
  opacity 0

.dialog-tips {
  position fixed
  z-index 9999999
  min-width 220px
  padding 30px
  border-radius 15px
  white-space nowrap
  background-color rgba(0, 0, 0, 0.5)
  //box-shadow 0px 8px 30px 0 rgba(0, 0, 0, 0.363)
  text-align center
  color $whiteFontColor
}
.dialog-center
  bottom: 30px
  left 50%
  transform translate(-50%, -50%)
</style>