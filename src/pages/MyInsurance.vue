<template>
  <div class="page-navbar">
    <div style="padding-top: 0.1875rem;background: white" ></div>
    <mt-navbar class="page-part" v-model="selected">
      <mt-tab-item id="0">待支付</mt-tab-item>
      <mt-tab-item id="1">待审核</mt-tab-item>
      <mt-tab-item id="2">保障中</mt-tab-item>
      <mt-tab-item id="3">已过期</mt-tab-item>
    </mt-navbar>
    <div style="padding-top: 0.1875rem;background: white" ></div>

    <mt-tab-container  v-model="selected">
      <mt-tab-container-item id="0">

        <div v-for="(item,index)  in orderList" style="background: white">
          <div v-if="index === 0" style="width:100%;height:1px;margin:0px ;autopadding:0px;background-color:#E0E0E0;overflow:hidden;"></div>

          <insurance-item :key="item.id" :index="index" :title="item.insuranceProductEntity.name" :desc="item.solutionEntity.name" :createTime="item.createTime"></insurance-item>

          <div v-if="index !== orderList.length-1" style="width:100%;height:1px;margin:0px ;autopadding:0px;background-color:#E0E0E0;overflow:hidden; margin-left: 1rem"></div>
          <div v-else style="width:100%;height:1px;margin:0px ;autopadding:0px;background-color:#E0E0E0;overflow:hidden"></div>

        </div>

      </mt-tab-container-item>
      <mt-tab-container-item id="1">
        <div v-for="(item,index)  in orderList" style="background: white">
          <div v-if="index === 0" style="width:100%;height:1px;margin:0px ;autopadding:0px;background-color:#E0E0E0;overflow:hidden;"></div>

          <insurance-item :key="item.id" :index="index" :title="item.insuranceProductEntity.name" :desc="item.solutionEntity.name" :createTime="item.createTime"></insurance-item>

          <div v-if="index !== orderList.length-1" style="width:100%;height:1px;margin:0px ;autopadding:0px;background-color:#E0E0E0;overflow:hidden; margin-left: 1rem"></div>
          <div v-else style="width:100%;height:1px;margin:0px ;autopadding:0px;background-color:#E0E0E0;overflow:hidden"></div>

        </div>
      </mt-tab-container-item>
      <mt-tab-container-item id="2">
        <div v-for="(item,index)  in orderList" style="background: white">
          <div v-if="index === 0" style="width:100%;height:1px;margin:0px ;autopadding:0px;background-color:#E0E0E0;overflow:hidden;"></div>

          <insurance-item :key="item.id" :index="index" :title="item.insuranceProductEntity.name" :desc="item.solutionEntity.name" :createTime="item.createTime"></insurance-item>

          <div v-if="index !== orderList.length-1" style="width:100%;height:1px;margin:0px ;autopadding:0px;background-color:#E0E0E0;overflow:hidden; margin-left: 1rem"></div>
          <div v-else style="width:100%;height:1px;margin:0px ;autopadding:0px;background-color:#E0E0E0;overflow:hidden"></div>

        </div>
      </mt-tab-container-item>
      <mt-tab-container-item id="3">
        <div v-for="(item,index)  in orderList" style="background: white">
          <div v-if="index === 0" style="width:100%;height:1px;margin:0px ;autopadding:0px;background-color:#E0E0E0;overflow:hidden;"></div>

          <insurance-item :key="item.id" :index="index" :title="item.insuranceProductEntity.name" :desc="item.solutionEntity.name" :createTime="item.createTime"></insurance-item>

          <div v-if="index !== orderList.length-1" style="width:100%;height:1px;margin:0px ;autopadding:0px;background-color:#E0E0E0;overflow:hidden; margin-left: 1rem"></div>
          <div v-else style="width:100%;height:1px;margin:0px ;autopadding:0px;background-color:#E0E0E0;overflow:hidden"></div>

        </div>
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
        selected: this.$store.state.selectedOrderStatus,
        orderList: []
      }
    },
    watch: {
      selected (val, oldval) {
        this.$store.commit('setSelectedOrderStatus', this.selected)
        this.loadMyInsuranceList()
      }
    },
    methods: {
      loadMyInsuranceList () {
        this.axios.get('/v1.0/orders',
          {
            params: {
              page: 1,
              limit: 999,
              sidx: 'id',
              order: 'desc',
              status: this.$store.state.selectedOrderStatus,
              userId: this.$store.state.qddUserId
            }
          }
        ).then((res) => {
          this.orderList = res.data.data.list
          this.$store.commit('setOrderList', this.orderList)
        })
          .catch(error => {
            console.log(error)
          })
      }
    },
    mounted () {
      document.title = '我的保险'
      this.loadMyInsuranceList()
      if (!this.$store.state.qddUserId) {
        this.$router.go(-1)
      }
    }
  }
</script>

<style scoped>

</style>
