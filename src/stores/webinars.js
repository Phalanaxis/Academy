import { defineStore } from 'pinia'

export const useWebinarsStore = defineStore('webinars', {
  state: () => ({
    webinars: [],
    foundWebinar: null
  }),
  getters: {
    GET_WEBINARS: (state) => {
      return state.webinars
    },
    GET_FOUNDWEBINAR: (state) => {
      return state.foundWebinar
    }
  },
  actions: {
    async fetchWebinars () {
      await fetch(import.meta.env.VITE_SERVER_ROUTE + '/webinars?populate=deep&sort=id:desc', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      }).then((response) => {
        return response.json()
      }).then((data) => {
        this.webinars = data.data
      })
      return true
    },
    async fetchOneWebinar (id) {
      let result = false
      await fetch(import.meta.env.VITE_SERVER_ROUTE + '/webinars/' + id + '?populate=deep', {
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
          this.foundWebinar = data.data
        }
      })
      return result
    },
    searchWebinar (id) {
      this.foundWebinar = this.webinars.find(item => item.id === Number(id))
    }
  }
})