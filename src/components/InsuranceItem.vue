<template>
  <div class="p-container" @click="showMyInsuranceDetail">
    <div class="p-content">
      <div class="p-title">{{ title }}</div>
      <div class="p-title1">{{ desc }}</div>
    </div>
    <div class="p-desc">
      提交时间:{{ createTime }}
    </div>
  </div>
</template>

<script>
  export default {
    name: 'insurance-item',
    props: {
      index: {
        type: Number
      },
      title: {
        type: String
      },
      desc: {
        type: String
      },
      createTime: {
        type: String
      }
    },
    methods: {
      showMyInsuranceDetail () {
        this.$store.commit('setCurrentOrderIndex', this.index)
        this.$router.push('/my-insurance-detail')
      }
    }
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
