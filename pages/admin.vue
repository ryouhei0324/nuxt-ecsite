<template>
    <div>
        <adminNav/>
        <b-container class="mt-4" fluid>
            <b-table :buys='buys' bordered :fields="fields" hover :items='items'>
                <template v-slot:cell(products)='data'> 
                    <ul v-for="(product,index) in data.item.products" :key='index'>
                        <li>名前:{{product.name}}</li>
                        <li>値段:{{product.price}}</li>
                        <li>数量:{{product.quantity}}個</li>
                    </ul>
                </template>
                <template v-slot:cell(total)='data'>
                    <h2>¥{{data.item.total}}</h2>
                </template>
                <template v-slot:cell(delete)='data'>
                    {{data.item.fid}}
                    <b-button @click="deletesale(data.item.fid)" block class="mt-4"
                    style='top:50%!important' size="lg" variant="danger">削除</b-button>
                </template>
                <template v-slot:table-buys>
                    <div class="text-center text-success my-2">
                        <b-spinner class="align-middle"></b-spinner>
                        <strong>loading...</strong>
                    </div>
                </template>
            </b-table>
        </b-container>
    </div>
</template>

<script>
import { getFirestore, collection, getDocs, deleteDoc,doc } from 'firebase/firestore'
import adminNav from '~/components/adminNav.vue'
export default {
  components: { adminNav },
  data(){
      return{
          data:'',
          buys:true,
          items:[],
          fields:[
              {key:'products',label:'購入品'},
              {key:'total',label:'合計金額'},
              {key:'delete',label:'削除'},
          ]
          }
  },
  mounted(){
    const db = getFirestore()
    if (!db) { return; }
    getDocs(collection(db, 'vue'))
      .then((querySnapshot) => {
         this.items=[]
          this.buys= true

        querySnapshot.forEach((i) => {
              const ii = i.data()
              console.log(i.id);
              ii.id = i.data()
                console.log(ii.id);
            ii.fid = i.id
            console.log(ii.fid);

              this.items.push(ii)
              console.log(this.items);
        });
                  if(this.items.length){
              this.buys=false
          }else{
              this.buys=false
          }
      });


    //   db.collection('vue').onSnapshot(querySnapshot=>{
    //       this.items=[]
    //       this.buys= true
          
    //       querySnapshot.forEach(i => {
    //           const ii = i.data()
    //           ii.id = i.data
    //           this.items.push(ii)
    //       });
    //       if(this.items.length){
    //           this.buys=false
    //       }else{
    //           this.buys=false
    //       }
    //   })
  },

  methods:{
      deletesale(id){
        const db = getFirestore()
        deleteDoc(doc(db, `vue/${id}`));

        //   db.collection('vue').doc(id).delete().then(function(){

        //   })
      }
  }
    
}
</script>