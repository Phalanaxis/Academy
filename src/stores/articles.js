import { defineStore } from 'pinia'

export const useArticlesStore = defineStore('articles', {
  state: () => ({
    articles: [],
    foundArticle: ''
  }),
  getters: {
    GET_ARTICLES: (state) => {
      return state.articles
    },
    GET_FOUNDARTICLE: (state) => {
      return state.foundArticle
    }
  },
  actions: {
    searchArticle (id) {
      this.foundArticle = this.articles.find(item => item.id === Number(id))
    },
    async fetchArticles () {
      await fetch(import.meta.env.VITE_SERVER_ROUTE + '/articles?populate=deep&sort=id:desc', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      }).then((response) => {
        return response.json()
      }).then((data) => {
        this.articles = data.data
      })
      return true
    }
  }
})