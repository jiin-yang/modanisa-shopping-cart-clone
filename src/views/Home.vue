<template>
  <div class="home">
    <div class="banner">
      <img :src="require(`@/assets/banner-960x80.gif`)" alt="banner gif">
    </div>
    <div class="categories">
      <div v-for="category in categories"
        :key="category.name">
        <router-link :to="{name: 'CategoryDetails', params: { slug: category.slug }}">
          <h2>{{ category.name }}</h2>
        </router-link>
        <figure>
          <router-link :to="{name: 'CategoryDetails', params: { slug: category.slug} }">
            <img :src="require(`@/assets/${category.image}`)" :alt="category.name">
          </router-link>
        </figure>
      </div>
    </div>
  </div>
</template>

<script>
import store from "@/store";

export default {
  name: "Home",
  data(){
    return{
      categories: store.categories
    }
  }
}
</script>

<style scoped>
.home{
  max-width: 1080px;
  margin: 0 auto;
  background-color: #f9f9f9;
}

img {
  max-width: 200px;
}

.banner img{
  width: 1080px !important;
  max-width: 1080px !important;
  height: 80px !important;
}

.categories {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
a {
  color: lightseagreen;
  text-decoration: none;
}
a:hover,
a:visited {
  text-decoration: underline;
}
</style>