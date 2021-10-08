<template>
  <div class="basket-area">

    <div class="products">

      <div v-for="product in list" :key="product.id">

        <div class="product">

          <div class="product-image">
            <img :src="require(`@/assets/${product.image}`)" :alt="product.name">
          </div>

          <div class="product-name">
            <p style="font-weight: bold">{{ product.name }}</p>
          </div>

          <div class="product-price-amount">{{ product.amount }} adet</div>
          <div class="product-price-detail">{{ product.price }} TL</div>
          <div class="product-total-price">Total : {{ product.totalPrice }} TL</div>

          <button class="remove-bttn" @click="removeProduct(product)">Remove</button>

        </div>

      </div>
    </div>

    <div v-show="list.length > 0" class="basket-preview">
      <h5>Sipariş Özeti</h5>
      <hr/>
      <div class="basket-preview-detail">
        <div class="basket-preview-detail-basket-total">
          <div class="total-basket-text">Basket Total : </div>
          <div class="total-basket-price">{{ calculate_total_price }} TL</div>
        </div>

        <button class="buy-bttn" @click="buyAllProducts()">BUY</button>

      </div>
    </div>

  </div>
</template>

<script>

import {eventBus} from "@/main";

export default {

  name: "Basket",
  props:{
    list: {
      type: Array,
      required: true
    }
  },
  methods:{
    removeProduct(product){
      console.log("sepetten ürünü çıkarmadan önce ki stock : "+product.stock)
      product.stock += product.amount
      console.log("sepetten ürünü çıkardıktan sonra ki stock : "+product.stock)
      this.list = this.list.filter(item => product !== item)
      eventBus.$emit("removeProduct", this.list , product)
    },
    buyAllProducts(){
      this.list = []
      eventBus.$emit("buyProducts", this.list)
    },
  },
  computed:{
    calculate_total_price(){
      let result = this.list.reduce(function(tot, arr) {
        return tot + arr.totalPrice;
      },0);

      return result
    },
  }
}
</script>

<style scoped>

.basket-area{
  display: flex;
  max-width: 1080px;
  margin: 0 auto;
  background-color: #f9f9f9;
}

.products{
  margin-right: auto;
  width: 75%;
}

.product{
  display: flex;
}

img{
  max-width: 100px;
  height: auto;
  padding-top: 45%;
}

.product-name{
  display: flex;
  margin: auto 5%;
  padding-top: 5%;
  height: auto;
  width: 30%;
}

.product-price-amount{
  border: 1px solid #eeded9;
  margin-top: 5%;
  padding: 2% 4%;
  align-self: center;
}

.product-price-detail{
  width: 20%;
  align-self: center;
  margin-top: 5%;

}

.product-total-price{
  width: 20%;
  align-self: center;
  margin-top: 5%;
  font-weight: bold;
  font-style: italic;
}

.remove-bttn{
  border: none;
  background-color: orangered;
  color: #FFFFFF;
  padding: 5px 10px;
  margin-top: 5%;
  margin-left: 2.5%;
  align-self: center;
}

.remove-bttn:active{
  background-color: orangered;
  box-shadow: 0 5px #FFFFFF;
  transform: translateY(4px);
}

.basket-preview{
  width: 15%;
  height: auto;
  align-self: start;
  margin-top: 5%;
  margin-right: 2.5%;
  padding: 2.5%;
}

.basket-preview-detail{
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.basket-preview-detail-basket-total{
  display: flex;
  flex-direction: row;
  font-size: small;
  margin: 5px 0;
}

.allTotal{
  font-size: small;
}

.buy-bttn{
  border: none;
  background-color: orangered;
  color: #FFFFFF;
  padding: 5px 10px;
  margin-top: 5%;
  width: auto;
  align-self: center;
}

.buy-bttn:active{
  background-color: orangered;
  box-shadow: 0 5px #FFFFFF;
  transform: translateY(4px);
}

</style>