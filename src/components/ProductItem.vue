<template>
  <router-link to="/p-detail">
    <div class="p-container">
      <img class="p-image" src="../../static/images/p1.png"/>
      <div class="p-content">
        <div class="p-title">盗抢险</div>

        <div class="p-desc">盗抢险盗抢险盗抢险盗抢险盗抢险</div>

        <div class="p-price">
          <span style="font-size: 1.5rem;color: #E64E42;font-weight: bold">68.0</span> 元
        </div>
      </div>
    </div>
  </router-link>
</template>

<script>
  export default {
    name: 'product-item'
  }
</script>

<style scoped>

  .p-container {
    display: -webkit-flex;
    display: flex;
    /*横向*/
    flex-direction: row;
    /*不换行*/
    flex-wrap: nowrap;
    /*排列 起始端对齐*/
    justify-content: flex-start;
    /*对齐 居中对齐*/
    align-items: center;
    align-content: flex-start;
    height: 8.25rem;
    background: white;
  }

  .p-image {
    width: 6.25rem;
    height: 6.25rem;
    margin-left: 1rem;
  }

  .p-content {
    flex-grow: 1;
    display: -webkit-flex;
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    justify-content: flex-start;
    align-items: flex-start;
    align-content: flex-start;
    height: 8.25rem;
    margin-left: 1rem;
    margin-right: 1rem;
  }

  .p-title {
    margin-top: 1rem;
    color: #212121;
    font-size: 1rem;
  }

  .p-desc {
    word-wrap: break-word;
    word-break: break-all;
    overflow: hidden;
    flex-grow: 1;
    max-height: 3.75rem;
    margin-top: 0.5rem;
    font-size: 0.875rem;
    color: #757575;
  }

  .p-price {
    text-align: right;
    width: 100%;
    margin-bottom: 1rem;
    color: #212121;
    font-size: 0.875rem;
  }


</style>
