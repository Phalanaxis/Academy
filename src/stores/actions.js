import { defineStore } from 'pinia'
import { useProfileStore } from './profile'
export const useActionsStore = defineStore('actions', {
  state: () => ({
    actions: [],
  }),
  getters: {
    GET_ACTIONS: (state) => {
      return state.actions
    },
    GET_TOKEN: () => {
      const profile = useProfileStore()
      return profile.token
    }
  },
  actions: {
    async fetchActions () {
      await fetch(import.meta.env.VITE_SERVER_ROUTE + '/actions?populate=deep&sort=id:desc', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': ('Bearer ' + this.GET_TOKEN)
        }
      })
      .then((response)=> {
        return response.json()
      })
      .then((data)=> {
        this.actions = data.data
        console.log(this.actions, 'aa')
      })
    }
  }
})