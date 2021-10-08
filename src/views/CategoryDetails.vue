<template>
  <div class="template">
    <section class="category">
      <h1>{{ category.name }}</h1>
      <div class="category-details">
        <div v-for="product in category.products"
              :key="product.name">
          <div class="product-card">
            <img :src="require(`@/assets/${product.image}`)" :alt="product.name">
            <div class="product-card-desc">
              <p>{{ product.name }}</p>
              <div style="font-style: italic">{{ product.price }} TL <span>( {{product.stock}} adet )</span></div>
              <button id="add-basket-btn" @click="reduce_stock(product)">Sepete Ekle</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import store from "@/store";
import {eventBus} from "@/main";

export default {
  name: "CategoryDetails",
  props:{
    slug: {
      type: String,
      required: true
    }
  },
  computed: {
    category(){
      return store.categories.find(
          category => category.slug === this.slug
      )
    }
  },
  methods: {

    reduce_stock(product){
      if (product.stock > 0){
        product.stock--
        eventBus.$emit("productAdded", product)
      }
      else
        alert("Stoğumuzda " + product.name + " bulunmamaktadır!")
    }
  }
}
</script>

<style scoped>

.template{
  max-width: 1080px;
  margin: 0 auto;
  background-color: #f9f9f9;
}

img{
  max-width: 500px;
  height: auto;
  width: 60%;
  max-height: 400px;
}

.category-details{
  display: inline-flex;
  flex-wrap: wrap;
  max-width: 1080px;
  margin: 0 auto;
}

p{
  margin: 0 40px;
  font-size: 20px;
  text-align: left;
}

.product-card{
  margin: 10px 20px;
}

.product-card-desc p{
  text-align: center;
  padding: 5px;
  font-weight: bold;
  justify-content: center;
}

.product-card-desc button{
  margin-top: 5px;
  padding: 10px;
  border: none;
  background-color: #F36A25;
  color: #FFF;
}

.product-card-desc button:active{
  background-color: #F36A25;
  box-shadow: 0 5px #666;
  transform: translateY(4px);
}

.cards img {
  max-height: 200px;
}

</style>