import { defineStore } from 'pinia'

export const useEventsStore = defineStore('events', {
  state: () => ({
    events: [],
    foundEvent: ''
  }),
  getters: {
    GET_EVENTS: (state) => {
      return state.events
    },
    GET_FOUNDEVENT: (state) => {
      return state.foundEvent
    }
  },
  actions: {
    searchEvent (id) {
      this.foundEvent = this.events.find(item => item.id === Number(id))
    },
    async fetchEvents () {
      await fetch(import.meta.env.VITE_SERVER_ROUTE + '/events?populate=deep&sort=id:desc', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      }).then((response) => {
        return response.json()
      }).then((data) => {
        this.events = data.data
      })
      return true
    }
  }
})