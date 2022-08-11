import { defineStore } from 'pinia'

export const useWebinarsStore = defineStore('webinars', {
  state: () => ({
    webinars: [],
    foundWebinar: ''
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
      await fetch(import.meta.env.VITE_SERVER_ROUTE + '/webinars?populate=deep', {
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
    searchWebinar (id) {
      this.foundWebinar = this.webinars.find(item => item.id === Number(id))
    }
  }
})