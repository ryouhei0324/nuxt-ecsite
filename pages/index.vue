<template>
<div>
  <Nav/>
  <Back/>
  <Product/>
</div>

  
</template>

<script lang="ts">
import Vue from 'vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import Back from '~/components/Back.vue'
import Product from '~/components/product.vue'

export default Vue.extend({
  components: { Back, Product },
  
})
</script>
