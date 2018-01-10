<template>
  <router-link to="/my-insurance-detail">
    <div class="p-container">
      <div class="p-content">
        <div class="p-title">盗抢险</div>
        <div class="p-title1">保3500元</div>
      </div>
      <div class="p-desc">
        提交时间:2018-01-10
      </div>
    </div>
  </router-link>
</template>

<script>
  export default {
    name: 'insurance-item'
  }
</script>

<style scoped>
  .p-container {
    height: 4.5rem;
    background: white;
  }

  .p-content {
    flex-grow: 1;
    display: -webkit-flex;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: flex-start;
    align-items: flex-start;
    align-content: flex-start;
    margin-left: 1rem;
    margin-right: 1rem;
  }

  .p-title {
    margin-top: 1rem;
    color: #212121;
    font-size: 1rem;
    flex-grow: 1;
  }

  .p-title1  {
    margin-top: 1rem;
    color: #212121;
    font-size: 1rem;
    flex-grow: 0;
  }

  .p-desc {
    font-size: 0.875rem;
    color: #757575;
    margin: 0.3rem 0 0 1rem;
  }

</style>
