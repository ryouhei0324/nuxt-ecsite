import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'


let firebaseConfig={
    apiKey: "AIzaSyDUnx5pPygjmGLOayUwYPlJ81yfr0UCaBU",
    authDomain: "nuxt-82fc0.firebaseapp.com",
    projectId: "nuxt-82fc0",
    storageBucket: "nuxt-82fc0.appspot.com",
    messagingSenderId: "1085696688516",
    appId: "1:1085696688516:web:b233d84f88d7af4d14ddd1",
    measurementId: "G-VKSSZ3JEE8"
}


const app = initializeApp(firebaseConfig)
// const auth = firebase.auth()
const analytics = getAnalytics(app)// const storage = firebase.storage()
// const functions = firebase.functions()



