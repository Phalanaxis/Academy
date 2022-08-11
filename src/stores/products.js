import { defineStore } from 'pinia'

export const useProductsStore = defineStore('products', {
  state: () => ({
    products: [],
    inCart: [],
    foundProduct: ''
  }),
  getters: {
    GET_PRODUCTS: (state) => {
      return state.products
    },
    GET_FOUNDPRODUCT: (state) => {
      return state.foundProduct
    }
  },
  actions: {
    async fetchProducts () {
      await fetch(import.meta.env.VITE_SERVER_ROUTE + '/products?populate=deep', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      }).then((response) => {
        return response.json()
      }).then((data) => {
        this.products = data.data
      })
      return true
    },
    searchProduct (id) {
      this.foundProduct = this.products.find(item => item.id === Number(id))
    }
  }
})