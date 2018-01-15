<template>
  <div class="page-field">

    <div style="background: white">
      <img src="../../static/images/openSolutionDownImg.jpeg"/>

      <span class="p-detail-desc">{{ $store.state.currentIns.description }}</span>
    </div>

    <div class="table-head-title">投保人信息</div>
    <div class="page-part">
      <mt-field label="被保险人姓名" placeholder="请输入用户姓名" :attr="{ maxlength: 10 }" v-model="applicant"></mt-field>
      <mt-field label="身份证号码" placeholder="16岁以上" v-model="idNumber"></mt-field>
      <mt-field label="手机号码" placeholder="请输入手机号" type="tel" v-model="phoneNumber"></mt-field>
      <mt-field label="中控设备号" placeholder="请输入设备号" v-model="ccuSn"></mt-field>
    </div>

    <div class="table-head-title">被保险车辆信息</div>
    <div class="page-part">
      <mt-field label="购买日期" placeholder="请输入购买日期" type="date" v-model="buyTime"></mt-field>
      <mt-field label="车辆品牌" placeholder="请输入车辆品牌" v-model="brand"></mt-field>
      <mt-field label="车辆型号" placeholder="请输入车辆型号" v-model="model"></mt-field>
      <mt-field label="车架号" placeholder="请输入车辆号" v-model="vin"></mt-field>
      <mt-field label="购买金额" placeholder="请输入购买金额" v-model="buyPrice"></mt-field>
      <mt-cell title="所在省市" :value="address" @click.native="cityPickerVisible = true"></mt-cell>

      <mt-cell title="购车发票">
        <div class="avatar">
          <img :src="billImg" />
          <input class="upImg" name="file" accept="image/png,image/gif,image/jpeg" type="file" @change="updateImg('billImg')"/>
        </div>
      </mt-cell>

      <mt-cell title="车辆图片">
        <span class="lm-font-sm lm-text-second">正面照：</span>
        <div class="avatar">
          <img :src="scooterImg1" />
          <input class="upImg" name="file" accept="image/png,image/gif,image/jpeg" type="file" @change="updateImg('scooterImg1')"/>
        </div>

        <div style="width: 0.5rem"></div>
        <span class="lm-font-sm lm-text-second">背面照：</span>
        <div class="avatar">
          <img :src="scooterImg2" />
          <input class="upImg" name="file" accept="image/png,image/gif,image/jpeg" type="file" @change="updateImg('scooterImg2')"/>
        </div>
      </mt-cell>

    </div>

    <div class="table-head-title">保险方案</div>
    <mt-radio
      align="right"
      class="page-part"
      v-model="optionValue"
      :options="options">
    </mt-radio>

    <div class="p-detail-container lm-font-sm">

      <label class="mint-checklist-label">
        <span class="mint-checkbox">
          <input class="mint-checkbox-input" type="checkbox" v-model="agreement">
          <span class="mint-checkbox-core"></span>
        </span>
        我已阅读并同意
      </label>
      <a class="p-link lm-font-default" href="http://cjl3.rokyinfo.net/anbxtk/zabxtk.html">《保险条款》</a>。
    </div>

    <div class="p-detail-container-1 lm-font-sm">

      <label class="mint-checklist-label">
        <span class="mint-checkbox">
          <input class="mint-checkbox-input" type="checkbox" v-model="agreement1">
          <span class="mint-checkbox-core"></span>
        </span>
        已知本保险承担的"两轮非机动车"定义以《中华人名共和国道路交通法》及其他相关法律法规规定为准。
      </label>

    </div>

    <div class="settlement">
      <div>
        <div class="lm-font-default"><span class="lm-text-red lm-font-head">{{ finalPrice }}</span>元 保<span class="lm-text-text lm-font-head">{{ selectedSolution }}</span>元</div>
      </div>

      <div class="tobuy" @click="addOrder">立即购买</div>
    </div>

    <div class="hide" v-html="alipay"></div>

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
  import {Indicator, Toast} from 'mint-ui'
  import {address, slots} from '../components/address'
  export default {
    name: 'insurance-detail',
    data () {
      return {
        agreement: false,
        agreement1: false,
        applicant: null,
        phoneNumber: null,
        idNumber: null,
        province: null,
        city: null,
        district: null,
        brand: null,
        model: null,
        vin: null,
        buyTime: null,
        buyPrice: null,
        ccuSn: null,
        billImg: '../static/images/icon-default.png',
        billFile: null,
        scooterImg1: '../static/images/icon-default.png',
        scooterFile1: null,
        scooterImg2: '../static/images/icon-default.png',
        scooterFile2: null,
        cityPickerVisible: false,
        addressSlots: slots,
        address: '请点击选择省市',
        tempAddress: '',
        optionValue: '0',
        options: [],
        alipay: ''// ali支付form表单信息
      }
    },
    computed: {
      finalPrice: function () {
        if (this.options && this.options.length > 0) {
          return this.options[Number(this.optionValue)].price
        } else {
          return ''
        }
      },
      selectedSolution: function () {
        if (this.options && this.options.length > 0) {
          return this.options[Number(this.optionValue)].desc
        } else {
          return ''
        }
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
          this.province = values[0].aname
          this.city = values[1].aname
          this.district = values[2].aname
        }
      },
      loadSolutionList () {
        this.axios.get('/v1.0/solutions',
          {
            params: {
              page: 1,
              limit: 20,
              sidx: 'id',
              order: 'asc',
              productId: this.$store.state.currentIns.id
            }
          }
        ).then((res) => {
          if (res.data.data.list) {
            let index = 0
            this.options = res.data.data.list.map(function (item) {
              item.label = item.name
              item.value = String(index++)
              item.disabled = false

              return item
            })
          }
        })
          .catch(error => {
            console.log(error)
          })
      },
      updateImg (tag) {
        console.log(tag)
        let reader = new FileReader()
        let img1 = event.target.files[0]
        reader.readAsDataURL(img1)
        let that = this
        reader.onloadend = function () {
          if (tag === 'billImg') {
            that.billImg = reader.result
            that.billFile = img1
          } else if (tag === 'scooterImg1') {
            that.scooterImg1 = reader.result
            that.scooterFile1 = img1
          } else if (tag === 'scooterImg2') {
            that.scooterImg2 = reader.result
            that.scooterFile2 = img1
          }
        }
      },
      addOrder () {
        console.log(this.agreement)
        if (!this.applicant) {
          Toast('请输入用户姓名！')
          return false
        }
        if (!this.idNumber) {
          Toast('请输入身份证号码！')
          return false
        }
        if (!this.phoneNumber) {
          Toast('请输入手机号码！')
          return false
        }
        if (!this.ccuSn) {
          Toast('请输入设备SN号！')
          return false
        }
        if (!this.buyTime) {
          Toast('请输入购买日期！')
          return false
        }
        if (!this.brand) {
          Toast('请输入品牌！')
          return false
        }
        if (!this.model) {
          Toast('请输入型号！')
          return false
        }
        if (!this.vin) {
          Toast('请输入车架号！')
          return false
        }
        if (!this.buyPrice) {
          Toast('请输入购买金额！')
          return false
        }
        if (!this.province) {
          Toast('请选择城市！')
          return false
        }
        if (!this.city) {
          Toast('请选择城市！')
          return false
        }
        if (!this.billFile) {
          Toast('请添加发票图片！')
          return false
        }
        if (!this.scooterFile1) {
          Toast('请添加车辆图片！')
          return false
        }
        if (!this.scooterFile2) {
          Toast('请添加车辆图片！')
          return false
        }
        if (!this.agreement) {
          Toast('请勾选 我已阅读并同意《保险条款》和《投保须知》')
          return false
        }
        let param = new FormData()
        param.append('applicant', this.applicant)
        param.append('idType', '0')
        param.append('idNumber', this.idNumber)
        param.append('province', this.province)
        param.append('city', this.city)
        param.append('district', this.district)
        param.append('brand', this.brand)
        param.append('model', this.model)
        param.append('vin', this.vin)
        if (this.buyTime.length === 10) {
          param.append('buyTime', this.buyTime + ' 00:00:00')
        } else {
          param.append('buyTime', this.buyTime)
        }
        param.append('buyPrice', this.buyPrice)
        param.append('ccuSn', this.ccuSn)
        param.append('productId', this.$store.state.currentIns.id)
        param.append('solutionId', this.options[Number(this.optionValue)].id)
        param.append('price', this.options[Number(this.optionValue)].price)
        param.append('phoneNumber', this.phoneNumber)
        param.append('userId', this.$store.state.qddUserId)
        param.append('billFile', this.billFile, this.billFile.name)
        param.append('scooterFiles', this.scooterFile1, this.scooterFile1.name)
        param.append('scooterFiles', this.scooterFile2, this.scooterFile2.name)

        let config = {
          headers: {'Content-Type': 'multipart/form-data'}
        }
        Indicator.open('提交中...')
        this.axios.post('/v1.0/orders', param, config)
          .then((res) => {
            console.log(res)
            Indicator.close()
            if (res.data.code === 0) {
              this.alipay = res.data.data
              setTimeout(function () {
                document.forms['_alipaysubmit_'].submit()
              }, 0)
            } else {
              Toast(res.data.msg)
            }
          }).catch(error => {
            console.log(error)
            Indicator.close()
          })
      }
    },
    mounted () {
      this.initAddress()
      if (!this.$store.state.currentIns.description) {
        this.$router.go(-1)
      }
      document.title = this.$store.state.currentIns.title
      this.loadSolutionList()
    }
  }
</script>

<style scoped>

  .hide {
    display: none;
  }

  .p-detail-desc {
    word-wrap: break-word;
    word-break: break-all;
    overflow: hidden;
    margin: 1rem;
    font-size: 0.875rem;
    color: #212121;
  }

  .table-head-title {
    margin-left: 1rem;
    margin-top: 1rem;
    margin-bottom: 0.5rem;
    font-size: 0.75rem;
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
    z-index: 99999;
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

  .p-link{
    color: #3B9AD9;
    margin-top: -5px;
  }

  .p-detail-container {
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
    margin: 1rem 1rem 0 1rem;
  }

  .p-detail-container-1 {
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
    margin: 1rem 1rem 4rem 1rem;
  }

  .settlement {
    width: 100%;
    bottom: 0;
    position: fixed;
    height: 3rem;
    padding-left: 1rem;
    box-shadow: 0 -1px 15px #888888;
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .settlement > div:first-child {
    display: flex;
    align-items: center;
  }

  .settlement .tobuy {
    text-align: center;
    line-height: 3rem;
    color: #ffffff;
    width: 7rem;
    height: 100%;
    background-color: #3B9AD9;
    font-size: 0.9375rem;
  }

  .avatar{
    position: relative;
    width: 2.5rem;
    height: 2.5rem;
  }

  .avatar > img {
    width: 2.5rem;
    height: 2.5rem;
  }
  .avatar .upImg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 100;
    opacity: 0;
  }

</style>
