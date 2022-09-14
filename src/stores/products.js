import { defineStore } from 'pinia'

export const useProductsStore = defineStore('products', {
  state: () => ({
    products: [],
    inCart: [],
    foundProduct: null
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
      await fetch(import.meta.env.VITE_SERVER_ROUTE + '/products?populate=deep&sort=id:desc', {
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
    async fetchOneProduct (id) {
      let result = false
      await fetch(import.meta.env.VITE_SERVER_ROUTE + '/products/' + id + '?populate=deep', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      }).then((response) => {
        if (response.status === 200) {
          result = true
          return response.json()
        }
      }).then((data) => {
        if (data !== undefined) {
          this.foundProduct = data.data
        }
      })
      return result
    },
    searchProduct (id) {
      this.foundProduct = this.products.find(item => item.id === Number(id))
    }
  }
})