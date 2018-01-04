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
      <mt-field label="所在省市" placeholder="请选择城市" @click.native="cityPickerVisible = true" ></mt-field>
      <mt-cell title="购车发票">
        <img src="../assets/logo.png" style="width: 2.5rem;height: 2.5rem">
      </mt-cell>
    </div>

    <div class="table-head-title">被保险车辆信息</div>

    <mt-popup v-model="cityPickerVisible" position="bottom" class="qdd-popup-bottom">
      <div> </div>
      <mt-picker :slots="dateSlots" @change="onDateChange" :visible-item-count="5" :show-toolbar="false"></mt-picker>
    </mt-popup>
  </div>

</template>

<script>
  export default {
    name: 'insurance-detail',
    data () {
      return {
        cityPickerVisible: false,
        dateSlots: [
          {
            flex: 1,
            values: ['2016-01', '2016-02', '2016-03', '2016-04', '2016-05', '2016-06'],
            className: 'slot1',
            textAlign: 'right'
          }, {
            divider: true,
            content: '-',
            className: 'slot2'
          }, {
            flex: 1,
            values: ['2016-01', '2016-02', '2016-03', '2016-04', '2016-05', '2016-06'],
            className: 'slot3',
            textAlign: 'left'
          }
        ]
      }
    },
    methods: {
      onDateChange (picker, values) {
        if (values[0] > values[1]) {
          picker.setSlotValue(1, values[0])
        }
        this.dateStart = values[0]
        this.dateEnd = values[1]
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

  .qdd-popup-bottom {
    width: 100%;
  }


</style>
