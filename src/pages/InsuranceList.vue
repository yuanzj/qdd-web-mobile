<template>
  <div>
    <div class="h-buttons-container">
      <v-image-button title="待领取/审核" image="../static/images/icon-inprogress.png"></v-image-button>
      <v-image-button title="保障中" image="../static/images/icon-safe.png"></v-image-button>
      <v-image-button title="已过期" image="../static/images/icon-expired.png"></v-image-button>
    </div>
    <mt-loadmore>
      <div style="width:100%;height:1px;margin:0px ;autopadding:0px;background-color:#E0E0E0;overflow:hidden;"></div>
      <product-item></product-item>
      <div style="width:100%;height:1px;margin:0px ;autopadding:0px;background-color:#E0E0E0;overflow:hidden;padding-left: 7.25rem"></div>
      <product-item></product-item>
      <div style="width:100%;height:1px;margin:0px ;autopadding:0px;background-color:#E0E0E0;overflow:hidden;"></div>
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
