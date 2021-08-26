import Vue from 'vue'
import Vuex from 'vuex'
import router from "../router"
import axios from "../apis/server"
import Swal from "../apis/swal"


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    access_token:false,
    categories:[],
    messages:[],
    favorites:[],
    products:[],
    search:[],
    product:{},
  },
  mutations: {
    ISLOGIN(state,payload){
      state.access_token=payload
    },
    FETCH_CATEGORIES(state,payload){
      state.categories=payload
    },
    PUSH_MESSAGE(state,payload){
      state.messages.push(payload)
    },
    FETCH_FAVORITES(state,payload){
      state.favorites=payload
    },
    FETCH_PRODUCTS(state,payload){
      state.products=payload
    },
    FETCH_PRODUCT(state,payload){
      state.product=payload
    },
    FETCH_SEARCH(state,payload){
      state.search=payload
    },
  },
  actions: {
    submitLogin(context,payload){
      return new Promise((resolve,reject)=>{
        axios.post("/customers/login",payload)
        .then(({data})=>{
          console.log(data);
          localStorage.setItem("access_token",data.access_token)
          localStorage.setItem("email",payload.email)
          context.commit("ISLOGIN",true)
          resolve(data)
        })
        .catch(err=>{
          reject(err.response.data.message)
        })
      })
    },
    loginGoogle(context,payload){
      return new Promise((resolve,reject)=>{
        axios({
          method : 'POST',
          url : "/customers/glogin",
          data : {id_token:payload.id_token}
        })
        .then(({data})=>{
          console.log(data);
          localStorage.setItem("access_token", data.access_token)
          localStorage.setItem("email", payload.email)
          context.commit("ISLOGIN",true)
          resolve(data)
        })
        .catch(err=>{
          console.log(err.response.data);
          reject(err)
        })
      })
    },
    submitRegister(context,payload){
      return new Promise((resolve,reject)=>{
        axios.post("/customers/register",payload)
        .then(({data})=>{
          resolve(data)
        })
        .catch(err=>{
          reject(err)
        })
      })
    },
    handleLogout(context){
      localStorage.removeItem("access_token")
      localStorage.removeItem("email")
      context.commit("ISLOGIN",false)
      Swal.fire({
        icon:'success',
        title: `logout success`
      })
      router.push("/login");
    },
    fetchProducts(context,payload){
      return new Promise((resolve,reject)=>{
      axios({
        method:"GET",
        url: `/customers/categories/${payload}`
      })
      .then(({data})=>{
        context.commit("FETCH_PRODUCTS",data)
        resolve(data)
      })
      .catch((err)=>{
        console.log(err);
        reject(err)
      })
    })
    },
    fetchProduct(context,payload){
      return new Promise((resolve,reject)=>{
      axios({
        method:"GET",
        url: `/customers/product/${payload}`
      })
      .then(({data})=>{
        context.commit("FETCH_PRODUCT",data)
        resolve(data)
      })
      .catch((err)=>{
        console.log(err);
        reject(err)
      })
    })
    },
    fetchCategories(context){
      axios({
        method:"GET",
        url: "/customers/categories"
      })
      .then(({data})=>{
        context.commit("FETCH_CATEGORIES",data)
      })
      .catch((err)=>{
        console.log(err);
      })
    },
    fetchFavorites(context) {
      axios({
        method: "GET",
        url: "/customers/favorite",
        headers : {
          "access_token": localStorage.access_token
        }
      })
      .then(({ data }) => {
        context.commit("FETCH_FAVORITES", data)
      })
      .catch(err => {
        console.log(err.response.data);
      });
    },
    addFavorite(context,payload){
      return new Promise((resolve,reject)=>{
        axios({
          method : "POST",
          url : `customers/favorite`,
          data:{
            image_url:payload.image_url,
            nameDrug: payload.nameDrug,
            sellingUnitDrug: payload.sellingUnitDrug,
            minPriceDrug:payload.minPriceDrug,
            BasePriceDrug:payload.BasePriceDrug
          },
          headers : {
            "access_token": localStorage.access_token
          }
        })
        .then(({data})=>{
          resolve(data)
        })
        .catch(err => {
          reject(err.response.data)
        });
      })
    },
    removeFavorite(context,payload){
      return new Promise((resolve,reject)=>{
        axios({
          method : "DELETE",
          url : `customers/favorite/${payload}`,
          headers : {
            "access_token": localStorage.access_token
          }
        })
        .then(({data})=>{
          resolve(data)
        })
        .catch(err => {
          console.log(err);
          reject(err)
        });
      })
    },
    submitSearch(context,payload){
      return new Promise((resolve,reject)=>{
      axios({
        method:"GET",
        url: `/customers/search/${payload.cari}`
      })
      .then(({data})=>{
        context.commit("FETCH_SEARCH",data)
        resolve(data)
      })
      .catch((err)=>{
        console.log(err);
        reject(err)
      })
    })
    },
  },
  modules: {
  }
})
