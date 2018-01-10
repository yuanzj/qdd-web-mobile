<template>
  <div class="page-navbar">
    <div style="padding-top: 0.1875rem;background: white" ></div>
    <mt-navbar class="page-part" v-model="selected">
      <mt-tab-item id="1">全部</mt-tab-item>
      <mt-tab-item id="2">待支付</mt-tab-item>
      <mt-tab-item id="3">审核中</mt-tab-item>
      <mt-tab-item id="4">保障中</mt-tab-item>
      <mt-tab-item id="5">已过期</mt-tab-item>
    </mt-navbar>
    <div style="padding-top: 0.1875rem;background: white" ></div>

    <mt-tab-container  v-model="selected">
      <mt-tab-container-item id="1">
        <div style="width:100%;height:1px;margin:0px ;autopadding:0px;background-color:#E0E0E0;overflow:hidden;"></div>
        <insurance-item></insurance-item>
        <div style="width:100%;height:1px;margin:0px ;autopadding:0px;background-color:#E0E0E0;overflow:hidden;"></div>
      </mt-tab-container-item>
      <mt-tab-container-item id="2">

      </mt-tab-container-item>
      <mt-tab-container-item id="3">

      </mt-tab-container-item>
      <mt-tab-container-item id="4">

      </mt-tab-container-item>
      <mt-tab-container-item id="5">

      </mt-tab-container-item>
    </mt-tab-container>
  </div>
</template>

<script>
  import InsuranceItem from '@/components/InsuranceItem'
  export default {
    name: 'my-insurance',
    components: {
      InsuranceItem
    },
    data () {
      return {
        selected: '1'
      }
    }
  }
</script>

<style scoped>

</style>
