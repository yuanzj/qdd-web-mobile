<template>
  <div>
    <div class="h-buttons-container">
      <v-image-button title="待领取/审核" image="../static/images/icon-inprogress.png"></v-image-button>
      <v-image-button title="保障中" image="../static/images/icon-safe.png"></v-image-button>
      <v-image-button title="已过期" image="../static/images/icon-expired.png"></v-image-button>
    </div>
    <mt-loadmore>
      <product-item></product-item>
      <product-item></product-item>
    </mt-loadmore>
  </div>
</template>

<script>
  import VImageButton from '@/components/VImageButton'
  import ProductItem from '@/components/ProductItem'

  export default {
    name: 'insurance-list',
    components: {
      VImageButton,
      ProductItem
    }
  }
</script>

<style scoped>
  .h-buttons-container {
    display: -webkit-flex;
    display: flex;
    padding: 1rem;
  }


</style>
