<template>
  <div>
    <div style="margin-top: 2rem"></div>
    <div class="page-cell">
      <mt-cell title="产品名称" :value="insuranceProductEntity.name"></mt-cell>
      <mt-cell title="保单状态" :value="status"></mt-cell>
      <mt-cell title="保单金额" :value="order.price+'元'"></mt-cell>
      <mt-cell title="保险金额" :value="solutionEntity.coverage+'元'"></mt-cell>
      <mt-cell title="提交时间" :value="order.createTime"></mt-cell>
      <mt-cell title="受益人" :value="order.applicant"></mt-cell>
      <mt-cell title="理赔流程" >
        <a style="color: #3b9ad9" href="http://cjl3.rokyinfo.net/anbxtk/zalplc.html">《理赔流程》</a>
      </mt-cell>
      <mt-cell title="适用条款" >
        <a style="color: #3b9ad9" href="http://cjl3.rokyinfo.net/anbxtk/zabxtk.html">《保险条款》</a>
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
      <mt-cell title="发票图片" > <img :src="order.billImg"  class="img"/></mt-cell>
      <mt-cell title="车辆图片" >
        <img :src="scooterImg1"  class="img"/>
        <div style="width: 1rem"></div>
        <img :src="scooterImg2"  class="img"/>
      </mt-cell>
      <mt-cell title="绑定中控号" :value="order.ccuSn"></mt-cell>
    </div>
    <div style="margin-bottom: 6rem"></div>

    <div v-if="this.order.status === 2" class="settlement" @click="chgUe">
      <div class="toChg lm-font-default">
        更换设备
      </div>
    </div>

    <div v-if="this.order.status === 0" class="settlement" @click="pay">
      <div class="toChg lm-font-default">
        支付
      </div>
    </div>
    <div class="hide" v-html="alipay"></div>
  </div>
</template>

<script>
  import {Indicator, Toast, MessageBox} from 'mint-ui'
  export default {
    name: 'my-insurance-detail',
    data () {
      return {
        order: [],
        insuranceProductEntity: {},
        solutionEntity: {},
        scooterImg1: '',
        scooterImg2: '',
        // ali支付form表单信息
        alipay: ''
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
        MessageBox.prompt('请输入新的设备SN号').then(({ value }) => {
          if (value && value.length === 10) {
            console.log(value)
            Indicator.open('更换中...')
            this.axios.put('/v1.0/orders/update?' + 'ccuSn=' + value + '&orderNo=' + this.order.orderNo).then((res) => {
              console.log(res)
              Indicator.close()
              if (res.data.code === 0) {
                Toast('更换成功！')
                this.order.ccuSn = value
              } else {
                Toast(res.data.msg)
              }
            })
              .catch(error => {
                Indicator.close()
                console.log(error)
              })
          } else {
            Toast('请输入10位设备SN号')
          }
        })
      },
      pay: function () {
        Indicator.open('获取支付信息...')
        this.axios.get('/v1.0/orders/payinfo-web',
          {
            params: {
              orderNo: this.order.orderNo
            }
          }
        ).then((res) => {
          console.log(res)
          Indicator.close()
          if (res.data.code === 0) {
            if (res.data.data) {
              this.alipay = res.data.data
              setTimeout(function () {
                document.forms['_alipaysubmit_'].submit()
              }, 0)
            }
          } else {
            Toast(res.data.msg)
          }
        })
          .catch(error => {
            Indicator.close()
            console.log(error)
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
    font-size: 0.75rem;
  }

  img {
    width: auto;
    height: auto;
    max-width: 2.5rem;
    max-height: 2.5rem;
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
