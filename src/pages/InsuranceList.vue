<template>
  <div>
    <div class="h-buttons-container">
      <v-image-button status="1" title="待审核" image="../static/images/icon-inprogress.png"></v-image-button>
      <v-image-button status="2" title="保障中" image="../static/images/icon-safe.png"></v-image-button>
      <v-image-button status="3" title="已过期" image="../static/images/icon-expired.png"></v-image-button>
    </div>

    <div>

      <div v-for="(item,index)  in productList" style="background: white">
        <div v-if="index === 0" style="width:100%;height:1px;margin:0px ;autopadding:0px;background-color:#E0E0E0;overflow:hidden;"></div>

        <product-item :key="item.id" :id="item.id" :image="item.image" :imageLarge="item.imageLarge" :title="item.name" :desc="item.desc" :price="item.price" :model="item.model" :outUrl="item.outUrl"></product-item>

        <div v-if="index !== productList.length-1" style="margin-left: 8.25rem">
          <div  style="width:100%;height:1px;margin:0px ;autopadding:0px;background-color:#E0E0E0;overflow:hidden;"></div>
        </div>
        <div v-else style="width:100%;height:1px;margin:0px ;autopadding:0px;background-color:#E0E0E0;overflow:hidden"></div>

      </div>

    </div>
  </div>
</template>

<script>
  import VImageButton from '@/components/VImageButton'
  import ProductItem from '@/components/ProductItem'

  export default {
    name: 'insurance-list',
    components: {
      VImageButton,
      ProductItem
    },
    data () {
      return {
        productList: []
      }
    },
    methods: {
      loadProductList () {
        this.axios.get('/v1.0/products',
          {
            params: {
              page: 1,
              limit: 20,
              sidx: 'id',
              order: 'asc'
            }
          }
        ).then((res) => {
          this.productList = res.data.data.list
        })
          .catch(error => {
            console.log(error)
          })
      }
    },
    mounted () {
      document.title = '保险服务'
      this.loadProductList()
    }
  }
</script>

<style scoped>
  .h-buttons-container {
    display: -webkit-flex;
    display: flex;
    padding: 1rem;
  }


</style>
