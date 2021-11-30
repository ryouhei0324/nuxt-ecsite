<template>
    <div>
        <b-container fluid class="bv-example-row mt-4">
            <b-row>
    <b-col cols='3' v-for='(fruit,index) in fruits' :key='index'>
    <b-card
        :title= fruit.name
        :img-src= fruit.img
        img-alt="Image"
        img-top
        tag="article"
        style="max-width: 20rem;"
        class="mb-2"
    >
        <b-card-text>
            <h5>価格: ¥{{fruit.price}}</h5>
        </b-card-text>

        <b-button v-if='!fruit.Cart' :disabled='fruit.Cart' @click='fruit.Cart=true,
        addtocart(JSON.parse(JSON.stringify(fruit)))' block href="#" variant="success">カートに入れる</b-button>
        <b-button v-if='fruit.Cart' :disabled='fruit.Cart' block href="#" variant="warning">すでにカートに入っています</b-button>
     </b-card>
     </b-col>
            </b-row>
        </b-container>
    </div>
</template>

<script>
export default {
    data(){
        return{
            fruits:[
                {
                    id:1,
                    quantity:1,
                    name:'りんご',
                    price:120,
                    img:'https://www.aomori-ringo.or.jp/wp-content/themes/aomori-ringo/img/woman/eyebg_center.jpg',
                    Cart:false
                },
                {
                    id:2,
                    quantity:1,
                    name:'ばなな',
                    price:100,
                    img:'https://mecchabananas.jp/wp-content/themes/banana/img/common/dummy_eye.png',
                    Cart:false
                },
                                {
                    id:3,
                    quantity:1,
                    name:'みかん',
                    price:100,
                    img:'https://video.kurashiru.com/production/articles/b1c11b99-5bcd-4d65-808b-e846da8097d9/wide_thumbnail_normal.jpg?1612341658',
                    Cart:false
                },
                                {
                    id:4,
                    quantity:1,
                    name:'ストロベリー',
                    price:100,
                    img:'https://www.cotta.jp/upload/product_image/025/025902/025902_2.jpg?v=1574669814',
                    Cart:false
                }
            ]
        }
    },

    methods:{
        addtocart(product){
            let Cart =[]
            if(JSON.parse(localStorage.getItem('product'))){
                Cart= JSON.parse(localStorage.getItem('product'))
            }else{
                Cart=[]
            }

            Cart.push(product)
            localStorage.setItem('product',JSON.stringify(Cart))
        }
    },

    mounted(){
            let Cart =[]
            if(JSON.parse(localStorage.getItem('product'))){
                Cart= JSON.parse(localStorage.getItem('product'))
            }else{
                Cart=[]
            }

            for (let index = 0; index < Cart.length; index++) {
                for (let index2 = 0; index2 < this.fruits.length; index2++) {
                    if(Cart[index].id == this.fruits[index2].id){
                        this.fruits[index2].Cart=true
                    }
                }
                
            }
    }
}
</script>