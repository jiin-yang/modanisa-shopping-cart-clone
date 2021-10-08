<template>
  <nav id="nav">
    <router-link to="/">
      <img :src="require(`@/assets/modanisa-logo.jpg`)" alt="modanisa">
    </router-link>
    <ul class="nav-links">
      <li class="links">
        <router-link to="/">
          Home
        </router-link>
      </li>
      <li v-for="category in categories"
          :key="category.name"
          class="links">
        <router-link :to="{
          name: 'CategoryDetails',
          params: { slug: category.slug}
        }">
          {{ category.name }}
        </router-link>
      </li>
      <li class="basket">
        <router-link :to="{
          name: 'Basket',
          params: { list: this.productArray }
        }">
          Sepetim <span v-if="productArray.length > 0">( {{ this.productArray.length }} )</span>
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
import store from "@/store";
import {eventBus} from "@/main";

export default {
  name: "Navigation",
  data(){
    return{
      categories: store.categories,
      productArray: [],
    }
  },
  mounted() {
    this.$nextTick(function () {
      eventBus.$on("productAdded", (product) => {
        let duplicateProduct = this.productArray.find((item) => {
          return item.id === product.id
        })

        if(duplicateProduct){
          duplicateProduct.amount++
          duplicateProduct.totalPrice = duplicateProduct.amount * parseFloat(duplicateProduct.price)
          duplicateProduct.stock -= 1
          for (let i = 0; i < this.productArray.length; i++){
            if(duplicateProduct.id === this.productArray[i]){
              this.productArray[i].stock = duplicateProduct.stock
            }
          }
        } else{
          let cloneProduct = {...product}
          cloneProduct.amount = 1
          let y = parseFloat(cloneProduct.price)
          cloneProduct.totalPrice = cloneProduct.amount * y
          this.productArray.push(cloneProduct)
        }
        console.log(this.categories)
      })
      eventBus.$on("buyProducts", list => {
        this.productArray = list
        console.log(this.categories)
      })
      eventBus.$on("removeProduct", (list, product) => {
        this.productArray = list

        let checkChange = false
        for(let i = 0; i < this.categories.length; i++){
          for(let j = 0; j < this.categories[i].products.length; j++){
            if (product.id === this.categories[i].products[j].id){
              this.categories[i].products[j].stock = product.stock
              checkChange = true
              break
            }
          }
          if (checkChange)break
        }
        console.log(this.categories)
        console.log(product)
      })
    })
  },
}
</script>

<style scoped>
#nav {
  display: flex;
  align-items: center;
  position: sticky;
  top: 0;
  background-color: white;
  z-index: 1;
  width: 1080px;
  margin: 0 auto;
}

#nav a {
  color: #2c3e50;
  text-decoration: none;
  font-weight: bold;
}

#nav a.router-link-exact-active {
  color: #F36A25;
}
.nav-links {
  display: flex;
}
.links {
  padding-right: 20px;
  list-style: none;
}
.links:hover {
  text-decoration: underline;
}
.basket {
  padding-right: 20px;
  list-style: none;
}
.basket a{
  color: #F36A25 !important;
  border: 1px solid black;
  border-radius: 5%;
}
.basket:hover {
  text-decoration: underline;
}
.logo {
  font-size: 20px;
  color: purple;
  font-weight: bold;
}
</style>