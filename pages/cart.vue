<template>
    <div>
        <Nav/>
        <b-container fluid class='mt-4'>
            <b-row>
                <b-col>
                    <h2>カート一覧</h2>
                </b-col>
            </b-row>

            <b-row>
                <b-col class="text-center">
                    <b-table bordered hover :items='cart' :fields="fields">
                        <template v-slot:cell(#)='data'>
                            {{data.index+1}}
                        </template>
                        <template v-slot:cell(price)='data'>  
                            {{data.item.price*data.item.quantity}}
                        </template>
                        <template v-slot:cell(remove)='data'>
                            <b-bottun @click="remove(data.item.id)" variant="danger" class="mr-2">
                                ×
                            </b-bottun>
                        </template>
                        <template v-slot:cell(quantity)='data'>
                            <b-row>
                                <b-col cols="3" class="text-center">
                                    <b-button :disabled="data.item.quantity <=1" variant="primary"
                                    @click="decrement(data.item.id)" class="mr-2"> 
                                    -
                                    </b-button>
                                </b-col>
                                <b-col cols="6" class="text-center">
                                    <h4>{{data.item.quantity}}</h4>
                                </b-col>
                                <b-col cols="3" class="text-center">
                                    <b-button variant="primary" @click="increment(data.item.id)" class="mr-2">
                                        +
                                    </b-button>
                                </b-col>
                            </b-row>
                        </template>

                        <template v-slot:cell(image)='data'>
                            <b-col class="text-center">
                                <b-img style='max-width:5rem' fluid alt='Responsive image' :src= data.item.img></b-img>
                            </b-col>
                        </template>
                    </b-table>
                </b-col>
            </b-row>
            <b-row class="text-center" v-if="cart.length>0">
                <b-col></b-col>
                <b-col></b-col>
                <b-col></b-col>
                <b-col></b-col>
                <b-col><h3>Total</h3></b-col>
                <b-col><h3>${{total}}</h3></b-col>
            </b-row>
            <b-row class="mt-4 text-center" v-if='cart.length>0'> 
                <b-col>
                    <b-button @click="clean" variant="info" block class="mr-2">
                        全てクリア
                    </b-button>
                </b-col>
                <b-col></b-col>
                <b-col></b-col>
                <b-col>
                    <b-button @click="buy" variant="success" block class="mr-2">
                        購入
                    </b-button>
                </b-col>
            </b-row>
            <b-modal hide-header-close no-close-on-esc no-close-on-backdrop ref="modal-1"
            centered title="購入完了">
            <template slot="modal-footer">
                    <b-button class="mt-3" variant="info" block @click="clean">閉じる</b-button>

            </template>
            <p class="mb-4">商品</p>
            <ul v-for="productfinal in ticket.products" :key="productfinal.id">
                <li>
                    商品名:{{productfinal.name}}
                </li>
                <li>
                    数量:{{productfinal.quantity}}
                </li>
                <li>
                    値段:{{productfinal.price}}
                </li>
                <li>
                    合計金額:${{productfinal.price*productfinal.quantity}}
                </li>
            </ul>
            <h2 class="'my-4 text-center">合計: ${{ticket.total}}</h2>
            </b-modal>
        </b-container>
    </div>
</template>

<script>
import Nav from '~/components/Nav.vue'
import { getFirestore, collection, addDoc } from 'firebase/firestore'

  export default {
  components: { Nav },
    data() {
      return {
        fields: ['id', 'remove', 'image', 'name', 'quantity','price'],
        cart:[],
        counter:0,
        ticket:{
            products:null,
            total:0
        }
      }
    },
    methods: {

      clean(){
          this.cart=[]
          for(const key in this.cart){
              this.items[key].cart = false
              this.cart[key].quantity=1
          }
          localStorage.setItem('product',JSON.stringify(this.cart))
          this.$refs['modal-1'].hide()

      },

      remove(id){
          console.log('ugiteiruyo');
          for (let index = 0; index < this.cart.length; index++) {
              if(this.cart[index].id==id){
                  this.cart.splice(index,1)
                  localStorage.setItem('product',JSON.stringify(this.cart))
              }
              
          }
      },

      buy(){
          this.ticket={
              products : this.cart,
              total: this.total
          }
          const db = getFirestore()
         const docRef = addDoc(collection(db, 'vue'),{
        products: this.cart,
        total: this.total,
      })
        //   db.collection('vue').add(this.ticket)
          this.$refs['modal-1'].show()
      },

      increment(id){
          console.log(id);
          for (let index = 0; index < this.cart.length; index++) {
              if(this.cart[index].id == id){
                  this.cart[index].quantity++
                  localStorage.setItem('product',JSON.stringify(this.cart))
              }
              
          }
      },

      decrement(id){
          for (let index = 0; index < this.cart.length; index++) {
              if(this.cart[index].id==id){
                  this.cart[index].quantity--
                  localStorage.setItem('product',JSON.stringify(this.cart))
              }
              
          }
      }

    },

    computed:{
        total(){
            let t = 0
            for (let index = 0; index < this.cart.length; index++) {
                t += this.cart[index].price*this.cart[index].quantity
                
            }
            return t

        }
    },

    mounted(){
        if(JSON.parse(localStorage.getItem('product'))){
            this.cart= JSON.parse(localStorage.getItem('product'))
            console.log(this.cart);
        }else{
            this.cart= []
        }
    }
  }
</script>