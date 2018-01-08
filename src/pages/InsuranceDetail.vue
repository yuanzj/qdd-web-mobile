<template>

  <div class="page-field">
    <div class="table-head-title">投保人信息</div>
    <div class="page-part">
      <mt-field class="padding-common" label="被保险人姓名" placeholder="请输入用户姓名" :attr="{ maxlength: 10 }"></mt-field>
      <mt-field label="身份证号码" placeholder="16岁以上"></mt-field>
      <mt-field label="手机号码" placeholder="请输入手机号" type="tel"></mt-field>
      <mt-field label="中控设备号" placeholder="请输入设备号"></mt-field>
    </div>

    <div class="table-head-title">被保险车辆信息</div>
    <div class="page-part">
      <mt-field label="购买日期" placeholder="请输入用户名" type="date"></mt-field>
      <mt-field label="车辆品牌" placeholder="请输入车辆品牌"></mt-field>
      <mt-field label="车辆型号" placeholder="请输入车辆型号"></mt-field>
      <mt-field label="车架号" placeholder="请输入车辆号"></mt-field>
      <mt-field label="购买金额" placeholder="请输入购买金额"></mt-field>
      <mt-field label="所在省市" placeholder="请选择城市" @click.native="cityPickerVisible = true"></mt-field>
      <mt-cell title="购车发票">
        <img src="../assets/logo.png" style="width: 2.5rem;height: 2.5rem">
      </mt-cell>
    </div>

    <div class="table-head-title">被保险车辆信息</div>

    <mt-popup v-model="cityPickerVisible" position="bottom" class="qdd-popup-bottom">
      <div class="btn-wrap">
        <a class="btn-cancel" @click="cityPickerVisible = false">取消</a>
        <a class="btn-sure" @click="onFillAddress">确定</a>
      </div>
      <div style="width:100%;height:1px;margin:0px ;autopadding:0px;background-color:#E0E0E0;overflow:hidden;position: absolute;bottom: 13.25rem;"></div>
      <mt-picker class="select" :slots="addressSlots"  value-key="aname" @change="onValuesChange"></mt-picker>
    </mt-popup>
  </div>

</template>

<script>
  import {address, slots} from '../components/address'
  export default {
    name: 'insurance-detail',
    data () {
      return {
        cityPickerVisible: false,
        addressSlots: slots,
        address: '',
        tempAddress: ''
      }
    },
    methods: {

      initAddress () {
        this.addressSlots[0].values = address.filter((item, index) => {
          if (item.apid === 0) {
            return item
          }
        })
        this.addressSlots[1].values = address.filter((item, index) => {
          if (item.apid === this.addressSlots[0].values[0].aid) {
            return item
          }
        })
        this.addressSlots[2].values = address.filter((item, index) => {
          if (item.apid === this.addressSlots[1].values[0].aid) {
            return item
          }
        })
      },
      onFillAddress () {
        // 填入省市区
        this.address = this.tempAddress
        this.cityPickerVisible = !this.cityPickerVisible
      },
      onValuesChange (picker, values) {
        if (values[0]) {
          let city = address.filter((item, index) => {
            if (item.apid === values[0].aid) {
              return item
            }
          })
          picker.setSlotValues(1, city)
        }
        if (values[1]) {
          let area = address.filter((item, index) => {
            if (item.apid === values[1].aid) {
              return item
            }
          })
          picker.setSlotValues(2, area)
        }
        // 防止没有区时报错
        if (values[2]) {
          // 这里可以指定地址符，此处以空格进行连接
          this.tempAddress = values[0].aname + ' ' + values[1].aname + ' ' + values[2].aname
        }
      }
    },
    mounted () {
      this.initAddress()
    }
  }
</script>

<style scoped>

  .table-head-title {
    margin-left: 1rem;
    margin-top: 1rem;
    margin-bottom: 0.5rem;
  }

  .qdd-popup-bottom {
    width: 100%;
  }

  .btn-wrap {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 13.25rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 2.75rem;
    padding: 0 20px;
    font-size: 14px;
    background: #fff;
  }

  .btn-cancel {
    color: #999;
  }

  .btn-sure {
    color: #3B9AD9;
  }

  .select {
    margin-top: 1rem;
    margin-bottom: 1rem;
  }

</style>
