<template>
  <div class="v-button"  @click="showMyInsurance">
    <img v-bind:src="image" class="v-button-icon"/>
    <p class="v-button-title">{{ title }}</p>
  </div>
</template>

<script>
  export default {
    name: 'v-image-button',
    props: {
      title: {
        type: String,
        default: '标题'
      },
      image: {
        type: String,
        default: '../static/images/logo.png'
      },
      status: {
        type: String
      }
    },
    data () {
      return {}
    },
    methods: {
      showMyInsurance () {
        this.$store.commit('setSelectedOrderStatus', this.status)
        this.$router.push('/my-insurance')
      }
    }
  }
</script>

<style scoped>

  .v-button {
    -webkit-flex: 1;
    flex: 1;
    text-align: center;
  }

  .v-button-icon {
    width: 2.5rem;
    height: 2.5rem;;
  }

  .v-button-title {
    margin-top: 0.5rem;
    color: #212121;
    font-size: 1rem;
  }
</style>
