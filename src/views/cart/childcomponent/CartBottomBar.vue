<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button :is-checked="isSelectAll"
                    class="check-button"
                    @click.native="checkClick"></check-button>
      <span>全选</span>
    </div>
    <div class="price">
      合计：{{totalPrice}}
    </div>
    <div class="calculate" @click="calcClick">
      去结算({{checkLength}})
    </div>
  </div>
</template>

<script>

  import CheckButton from 'components/content/checkbutton/CheckButton'
  import {mapGetters} from 'vuex';

  export default {
    name: "CartBottomBar",
    components:{CheckButton},
    computed:{
      ...mapGetters(['cartList']),
      checkLength() {
        return this.cartList.filter(item => item.checked).reduce((prev, cur) => {return prev + cur.count}, 0);
      },
      totalPrice() {
        return '¥' + this.$store.state.cartList.filter(item => item.checked).reduce((prev, cur)=>{
          return prev + cur.price * cur.count
        }, 0).toFixed(2);
      },
      //全选按钮状态
      isSelectAll() {
        if(this.cartList.length === 0) return false;
        //方式一：普通遍历
        // for(let item of this.cartList){
        //   if(!item.checked){
        //     return false
        //   }
        // }
        // return true

        //方式二：
        //return !this.cartList.filter(item => !item.checked).length;

        //方式三：
        return !this.cartList.find(item => !item.checked)
      }
    },
    methods:{
      checkClick() {
        if(this.isSelectAll) { //全部选中的话,点击就让它变成全部不选中
          this.cartList.forEach(item => item.checked = false)
        }else { //部分或全部不选中的话
          this.cartList.forEach(item => item.checked = true)
        }

      },
      calcClick(){
        if(this.checkLength === 0){
          this.$toast.show('请选择购买商品',2000)
        }else{
          this.$toast.show('购买成功',2000)
        }
      }
    }
  }
</script>

<style scoped>
  .bottom-bar{
    position: relative;
    display: flex;

    height: 40px;
    line-height: 40px;

    background: #eee;

    font-size: 14px;
  }
  .check-content{
    display: flex;
    height: 100%;
    margin-left: 10px;
    align-items: center;
    width: 60px;
  }
  .check-button{
    width: 19px;
    height: 19px;
    margin-right: 5px;
    line-height: 19px;
  }
  .price{
    margin-left: 30px;
    flex: 1;
  }
  .calculate{
    width: 90px;
    color: #FFF;
    text-align: center;
    background: var(--color-tint);
    font-size: 13px;
  }
</style>
