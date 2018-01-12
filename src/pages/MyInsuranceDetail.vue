<template>
  <div>
    <div style="margin-top: 2rem"></div>
    <div class="page-cell">
      <mt-cell title="产品名称" :value="insuranceProductEntity.name"></mt-cell>
      <mt-cell title="保单状态" :value="status"></mt-cell>
      <mt-cell title="保单金额" :value="order.price+'元'"></mt-cell>
      <mt-cell title="保险金额" :value="solutionEntity.desc+'元'"></mt-cell>
      <mt-cell title="提交时间" :value="order.createTime"></mt-cell>
      <mt-cell title="受益人" :value="order.applicant"></mt-cell>
      <mt-cell title="理赔流程" >
        <span style="color: #3b9ad9">《理赔流程》</span>
      </mt-cell>
      <mt-cell title="适用条款" >
        <span style="color: #3b9ad9">《适用条款》</span>
      </mt-cell>
    </div>
    <div class="table-head-title">投保人</div>
    <div class="page-cell">
      <mt-cell title="姓名" :value="order.applicant"></mt-cell>
      <mt-cell title="身份证号码" :value="order.idNumber"></mt-cell>
      <mt-cell title="手机号码" :value="order.phoneNumber"></mt-cell>
    </div>
    <div class="table-head-title">被保险车辆</div>
    <div class="page-cell">
      <mt-cell title="购买日期" :value="buyTime"></mt-cell>
      <mt-cell title="车辆品牌" :value="order.brand"></mt-cell>
      <mt-cell title="车辆型号" :value="order.model"></mt-cell>
      <mt-cell title="车架号" :value="order.vin"></mt-cell>
      <mt-cell title="购买金额" :value="order.buyPrice + '元'"></mt-cell>
      <mt-cell title="发票图片" > <img :src="order.billImg"  style="width: 2.5rem;height: 2.5rem"/></mt-cell>
      <mt-cell title="车辆图片" >
        <img :src="scooterImg1"  style="width: 2.5rem;height: 2.5rem"/>
        <img :src="scooterImg2"  style="width: 2.5rem;height: 2.5rem;margin-left: 1rem"/>
      </mt-cell>
      <mt-cell title="绑定中控号" :value="order.ccuSn"></mt-cell>
    </div>
    <div style="margin-bottom: 6rem"></div>

    <div v-if="this.order.status === 2" class="settlement" @click="chgUe">
      <div class="toChg lm-font-default">
        更换设备
      </div>
    </div>
  </div>
</template>

<script>
  import { MessageBox } from 'mint-ui'
  export default {
    name: 'my-insurance-detail',
    data () {
      return {
        order: [],
        insuranceProductEntity: {},
        solutionEntity: {},
        scooterImg1: '',
        scooterImg2: ''
      }
    },
    computed: {
      status: function () {
        switch (this.order.status) {
          case 0:
            return '待支付'
          case 1:
            return '待审核'
          case 2:
            return '保障中'
          case 3:
            return '已过期'
          case 4:
            return '已拒绝，退款中'
          case 5:
            return '已拒绝，已退款'
          default:
            return ''
        }
      },
      buyTime: function () {
        if (this.order.buyTime) {
          return this.order.buyTime.substring(0, 10)
        } else {
          return ''
        }
      }
    },
    methods: {
      chgUe: function () {
        MessageBox.prompt(' ', '请输入新的设备SN号').then(({ value }) => {
          if (value) {
            console.log(value)
          }
        })
      }
    },
    mounted () {
      document.title = '保险详情'
      if (this.$store.state.orderList && this.$store.state.orderList.length > 0) {
        this.order = this.$store.state.orderList[this.$store.state.currentOrderIndex]
        this.insuranceProductEntity = this.order.insuranceProductEntity
        this.solutionEntity = this.order.solutionEntity
        this.scooterImg1 = this.order.scooterImg[0]
        this.scooterImg2 = this.order.scooterImg[1]
      } else {
        this.$router.go(-1)
      }
    }
  }
</script>

<style scoped>
  .table-head-title {
    margin-left: 1rem;
    margin-top: 1rem;
    margin-bottom: 0.5rem;
  }

  .settlement {
    width: 100%;
    bottom: 0;
    position: fixed;
    height: 3rem;
    box-shadow: 0 -1px 15px #888888;
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .toChg {
    text-align: center;
    line-height: 2.75rem;
    color: #3B9AD9;
    width: 100%;
    height: 100%;
  }
</style>
