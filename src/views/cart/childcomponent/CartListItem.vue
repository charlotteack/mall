<template>
  <div id="cart-item">
    <div class="item-selector">
      <!--注意，按钮是否选中还是应该放到商品对象里面，而不是在组件里面定义属性-->
      <CheckButton :is-checked="itemInfo.checked" @click.native="checkClick"></CheckButton>
    </div>
    <div class="item-img">
      <img :src="itemInfo.imgUrl" alt="商品图片">
    </div>
    <div class="item-info">
      <div class="item-title">{{itemInfo.title}}</div>
      <div class="item-desc">商品描述: {{itemInfo.desc}}</div>
      <div class="info-bottom">
        <div class="item-price left">¥{{itemInfo.price}}</div>
        <div class="item-count right">
          <button @click="decrement">-</button>
          x{{count}}
          <button @click="increment">+</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import CheckButton from 'components/content/checkbutton/CheckButton'
  import { mapActions } from 'vuex'
  import { Dialog } from 'vant'
  export default {
    name: "CartListItem",
    props: {
      itemInfo: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    computed: {
      count: {
        get: function() {
          return this.itemInfo.count
        },
        set: function() {
          //要修改的话必须要set，内容可以为空
        }

      }
    },
    components: {
      CheckButton
    },
    methods: {
      ...mapActions(['addCart']),
      ...mapActions(['subtractCart']),
      ...mapActions(['deleteCart']),
      checkClick() {
        this.itemInfo.checked = !this.itemInfo.checked
      },
      decrement() {
        if(this.count>1){
          this.count--
          this.subtractCart(this.itemInfo.iid).then(res => {
            this.$toast.show(res, 1000)
          })
        }else {
          Dialog.alert({
            title: '注意',
            message: '确定要删除商品吗',
          }).then(() => {
            this.deleteCart(this.itemInfo.iid).then(res => {
              this.$toast.show(res, 1000)
            })
          });
        }

      },
      increment() {
        this.count++
        this.addCart({iid: this.itemInfo.iid,count: 1}).then(res => {
          this.$toast.show(res, 1000)
        })
      }
    }
  }
</script>

<style scoped>
  #cart-item {
    width: 100%;
    display: flex;
    font-size: 0;
    padding: 5px;
    border-bottom: 1px solid #ccc;
  }

  .item-selector {
    width: 25px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .item-title, .item-desc {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .item-img {
    padding: 5px;
    /*border: 1px solid #ccc;*/
  }

  .item-img img {
    width: 80px;
    height: 100px;
    display: block;
    border-radius: 5px;
  }

  .item-info {
    font-size: 15px;
    color: #333;
    padding: 5px 10px;
    position: relative;
    overflow: hidden;
  }

  .item-info .item-desc {
    font-size: 13px;
    color: #666;
    margin-top: 15px;
  }

  .info-bottom {
    margin-top: 10px;
    position: absolute;
    bottom: 10px;
    left: 10px;
    right: 10px;
  }

  .info-bottom .item-price {
    color: orangered;
  }

  button {
    height: 15px;
    width: 15px;
    background-color: #f6f6f6;
    border: none;
  }
</style>
